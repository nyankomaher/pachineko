<template>
  <div class="p-4">
    <h1 class="mb-4 text-xl font-bold">区間実績詳細(新規・区間{{ periodNumber }})</h1>

    <PeriodForm
      v-if="record && periodDefaults"
      :key="formKey"
      :initial="periodDefaults"
      :baseline-totals="baselineTotals"
      :exchange-rate="record.exchangeRate"
      submit-label="記録"
      :loading="saving"
      @submit="handleSave"
    />

    <div class="mt-6">
      <Button label="キャンセル" severity="secondary" outlined @click="cancelDialogVisible = true" />
    </div>

    <Dialog v-model:visible="continueDialogVisible" modal header="記録中…" :style="{ width: '20rem' }">
      <p>遊技を継続しますか？終了しますか？</p>
      <p v-if="endError" class="mt-2 text-sm text-red-500">{{ endError }}</p>
      <template #footer>
        <Button label="終了する" severity="secondary" :loading="ending" @click="handleEnd" />
        <Button label="継続する" :loading="continuing" @click="handleContinue" />
      </template>
    </Dialog>

    <Dialog v-model:visible="cancelDialogVisible" modal header="キャンセル確認" :style="{ width: '20rem' }">
      <p>入力内容を破棄して実績詳細画面に戻ります。よろしいですか？</p>
      <template #footer>
        <Button label="いいえ" text @click="cancelDialogVisible = false" />
        <Button label="はい" severity="danger" @click="handleCancel" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
useSeoMeta({
  title: '区間実績を記録',
  description: '区間実績を記録します。'
})

const route = useRoute()
const recordId = Number(route.params.recordId)
const recordingSession = useRecordingSessionStore()
const { calcRecordAggregates, validateRentalBallsForEnd } = useMetrics()

const record = ref(null)
const periodDefaults = ref(null)
const periodNumber = ref(1)
const formKey = ref(0)
const saving = ref(false)
const continuing = ref(false)
const ending = ref(false)
const continueDialogVisible = ref(false)
const cancelDialogVisible = ref(false)
const endError = ref('')
const pendingPeriodData = ref(null)

function buildDefaults(periods) {
  const last = periods[periods.length - 1]
  const base = {
    startTime: new Date().toISOString(),
    endTime: null,
    investment: 0,
    startHeldBalls: 0,
    endHeldBalls: 0,
    startRentalBalls: 0,
    endRentalBalls: 0,
    startRotations: 0,
    endRotations: 0,
    winType: 'none',
    continueCount: 0,
    wonBalls: 0,
    postWinHeldBalls: null,
    postWinRentalBalls: null
  }
  if (!last) return base
  base.startRotations = (last.winType === 'rush' || last.winType === 'normal') ? null : last.endRotations
  base.startHeldBalls = last.postWinHeldBalls != null ? last.postWinHeldBalls : last.endHeldBalls
  base.endHeldBalls = base.startHeldBalls
  base.startRentalBalls = last.postWinRentalBalls != null ? last.postWinRentalBalls : last.endRentalBalls
  base.endRentalBalls = base.startRentalBalls
  return base
}

async function loadDefaults() {
  const db = useDb()
  record.value = await db.records.get(recordId)
  if (!record.value) return
  const periods = await db.periods.where('recordId').equals(recordId).sortBy('startTime')
  periodNumber.value = periods.length + 1
  periodDefaults.value = buildDefaults(periods)
}

const baselineTotals = computed(() => (record.value ? {
  totalRotations: record.value.totalRotations,
  totalInvestment: record.value.totalInvestment,
  totalInvestedBalls: record.value.totalInvestedBalls
} : null))

onMounted(loadDefaults)

function handleSave(periodData) {
  pendingPeriodData.value = periodData
  endError.value = ''
  continueDialogVisible.value = true
}

async function handleContinue() {
  continuing.value = true
  try {
    const db = useDb()
    await db.periods.add({ recordId, ...pendingPeriodData.value })
    const periods = await db.periods.where('recordId').equals(recordId).sortBy('startTime')
    const aggregates = calcRecordAggregates(periods)
    await db.records.update(recordId, aggregates)
    pendingPeriodData.value = null
    continueDialogVisible.value = false
    endError.value = ''
    await loadDefaults()
    formKey.value += 1
    await nextTick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } finally {
    continuing.value = false
  }
}

async function handleEnd() {
  const error = validateRentalBallsForEnd(pendingPeriodData.value)
  if (error) {
    endError.value = error
    return
  }
  ending.value = true
  try {
    const db = useDb()
    await db.periods.add({ recordId, ...pendingPeriodData.value })
    const periods = await db.periods.where('recordId').equals(recordId).sortBy('startTime')
    const aggregates = calcRecordAggregates(periods)
    await db.records.update(recordId, aggregates)
    pendingPeriodData.value = null
    continueDialogVisible.value = false
    await recordingSession.finishRecording(recordId)
    await navigateTo(`/records/${recordId}`)
  } finally {
    ending.value = false
  }
}

async function handleCancel() {
  cancelDialogVisible.value = false
  await navigateTo(`/records/${recordId}`)
}
</script>
