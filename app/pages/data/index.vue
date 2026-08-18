<template>
  <div class="flex flex-col gap-4 p-4">
    <h1 class="text-xl font-bold">データ管理</h1>

    <p v-if="recordingSession.isRecording" class="text-sm text-amber-600 dark:text-amber-400">
      記録中はデータのエクスポート・インポートはできません。
    </p>

    <section class="flex flex-col gap-2">
      <h2 class="font-semibold">エクスポート</h2>
      <p class="text-sm text-zinc-500">すべてのデータ・設定をJSONファイルとして書き出します。</p>
      <div class="flex items-center gap-2">
        <Button
          label="エクスポート"
          :loading="exportPhase === 'generating'"
          :disabled="exportPhase === 'generating' || recordingSession.isRecording"
          @click="handleGenerate"
        />
        <Button
          v-if="exportPhase === 'ready'"
          label="ダウンロード"
          :disabled="recordingSession.isRecording"
          @click="handleDownload"
        />
        <span v-if="exportPhase === 'generating'" class="text-sm text-zinc-500">ファイルを生成中…</span>
      </div>
    </section>

    <section class="flex flex-col gap-2">
      <h2 class="font-semibold">インポート</h2>
      <p class="text-sm text-zinc-500">
        エクスポートしたJSONファイルを選択すると、既存のすべてのデータ・設定がファイルの内容に置き換わります。
      </p>
      <input
        ref="fileInputRef"
        type="file"
        accept="application/json"
        class="hidden"
        @change="handleFileChange"
      >
      <Button
        label="ファイルを選択"
        class="self-start"
        :disabled="recordingSession.isRecording"
        @click="fileInputRef.click()"
      />
      <p v-if="validationError" class="text-sm text-red-500">{{ validationError }}</p>
    </section>

    <Dialog v-model:visible="confirmVisible" modal header="インポート確認" :style="{ width: '24rem' }">
      <p>既存のすべてのデータ（店舗・機種・実績・区間実績）を削除し、選択したファイルの内容に置き換えます。この操作は取り消せません。よろしいですか？</p>
      <template #footer>
        <Button label="キャンセル" text :disabled="importing" @click="handleCancelImport" />
        <Button label="インポート" severity="danger" :loading="importing" @click="handleImport" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
const toast = useToast()
const exchangeRateOptionsStore = useExchangeRateOptionsStore()
const recordingSession = useRecordingSessionStore()

function pad(value) {
  return String(value).padStart(2, '0')
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/* ---------- エクスポート ---------- */

const exportPhase = ref('idle')
const prepared = ref(null)

function buildExportFilename() {
  const now = new Date()
  const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`
  const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
  return `pachineko-export-${date}-${time}.json`
}

async function buildExportData() {
  const db = useDb()
  const [halls, machines, records, periods] = await Promise.all([
    db.halls.toArray(),
    db.machines.toArray(),
    db.records.toArray(),
    db.periods.toArray()
  ])
  return {
    app: 'pachineko',
    dbVersion: db.verno,
    exportedAt: new Date().toISOString(),
    tables: { halls, machines, records, periods },
    settings: { exchangeRateOptions: exchangeRateOptionsStore.options }
  }
}

function downloadViaAnchor(blob, filename) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

// PC（マウス操作前提の環境）かどうかを判定する。iPadは「デスクトップ用Webサイトを表示」設定時に
// UAがMacと区別できなくなるため、タッチポイントの有無もあわせて判定する。
function isPc() {
  const ua = navigator.userAgent
  if (/Android|iPhone|iPod/i.test(ua)) return false
  if (/iPad/i.test(ua)) return false
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return false
  return true
}

async function handleGenerate() {
  exportPhase.value = 'generating'
  const minDuration = sleep(1000)
  const data = await buildExportData()
  const filename = buildExportFilename()
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const file = new File([blob], filename, { type: 'application/json' })
  await minDuration
  prepared.value = { blob, file, filename }
  exportPhase.value = 'ready'
}

// navigator.share() はユーザー操作の直接の結果として呼び出す必要があるため、
// この関数内でnavigator.shareを呼び出すまでの間に await を挟まないこと
// （挟むとブラウザによってはNotAllowedErrorになる）。ファイルは事前に生成済みのものを使う。
async function handleDownload() {
  const { blob, file, filename } = prepared.value
  if (!isPc() && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file] })
    } catch (error) {
      if (error?.name === 'AbortError') return
      downloadViaAnchor(blob, filename)
    }
  } else {
    downloadViaAnchor(blob, filename)
  }
  toast.add({ severity: 'success', summary: 'エクスポートしました', life: 3000 })
  exportPhase.value = 'idle'
  prepared.value = null
}

/* ---------- インポート ---------- */

const fileInputRef = ref(null)
const validationError = ref('')
// shallowRef: 中身をVueのリアクティブProxyでラップしない。ラップされたオブジェクトを
// IndexedDBへそのまま書き込もうとすると構造化クローンに失敗する（DataCloneError）ため。
const pendingImport = shallowRef(null)
const confirmVisible = ref(false)
const importing = ref(false)

function resetFileInput() {
  if (fileInputRef.value) fileInputRef.value.value = ''
}

function validateImportData(data, currentDbVersion) {
  if (data?.app !== 'pachineko') return 'パチネコのエクスポートファイルではありません'
  if (typeof data?.dbVersion !== 'number') return 'ファイルの形式が正しくありません'
  const tables = data?.tables
  const hasValidTables = tables
    && Array.isArray(tables.halls)
    && Array.isArray(tables.machines)
    && Array.isArray(tables.records)
    && Array.isArray(tables.periods)
  if (!hasValidTables) return 'ファイルの形式が正しくありません'
  if (data.dbVersion > currentDbVersion) return 'このファイルは新しいバージョンのアプリ用です。アプリを更新してください'
  return null
}

async function handleFileChange(event) {
  validationError.value = ''
  const file = event.target.files?.[0]
  if (!file) return

  let data
  try {
    data = JSON.parse(await file.text())
  } catch {
    validationError.value = 'ファイルの形式が正しくありません'
    resetFileInput()
    return
  }

  const db = useDb()
  const error = validateImportData(data, db.verno)
  if (error) {
    validationError.value = error
    resetFileInput()
    return
  }

  pendingImport.value = data
  confirmVisible.value = true
}

function handleCancelImport() {
  confirmVisible.value = false
  pendingImport.value = null
  resetFileInput()
}

async function handleImport() {
  importing.value = true
  try {
    const db = useDb()
    const { migrateTables } = useDbMigrations()
    const data = pendingImport.value
    const migrated = migrateTables(data.tables, data.dbVersion, db.verno)

    await Promise.all([db.halls.clear(), db.machines.clear(), db.records.clear(), db.periods.clear()])
    await Promise.all([
      db.halls.bulkPut(migrated.halls),
      db.machines.bulkPut(migrated.machines),
      db.records.bulkPut(migrated.records),
      db.periods.bulkPut(migrated.periods)
    ])

    const importedOptions = data.settings?.exchangeRateOptions
    exchangeRateOptionsStore.save(
      Array.isArray(importedOptions) && importedOptions.length > 0
        ? importedOptions
        : exchangeRateOptionsStore.defaultOptions
    )

    confirmVisible.value = false
    pendingImport.value = null
    resetFileInput()
    toast.add({ severity: 'success', summary: 'インポートしました', life: 3000 })
    await sleep(1000)
    window.location.reload()
  } finally {
    importing.value = false
  }
}
</script>
