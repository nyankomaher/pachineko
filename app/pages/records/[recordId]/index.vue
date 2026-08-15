<template>
  <div class="flex flex-col gap-6 p-4">
    <h1 class="text-xl font-bold">実績詳細{{ isOwnSession ? '（記録中）' : '' }}</h1>

    <template v-if="record">
      <section>
        <RecordBasicInfoForm
          :initial="basicInfoInitial"
          submit-label="修正"
          :recording="isOwnSession"
          :loading="updating"
          @submit="handleUpdate"
        />
      </section>

      <section class="flex flex-col gap-2">
        <h2 class="font-semibold">集計</h2>
        <dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <dt class="text-zinc-500">経過時間</dt>
          <dd>{{ elapsedTimeLabel }}</dd>
          <dt class="text-zinc-500">投資金額</dt>
          <dd>{{ formatNumber(record.totalInvestment) }}円</dd>
          <dt class="text-zinc-500">投資持玉</dt>
          <dd>{{ formatNumber(record.totalInvestedBalls) }}玉</dd>
          <dt class="text-zinc-500">獲得玉数</dt>
          <dd>{{ formatNumber(record.totalWonBalls) }}玉</dd>
          <dt class="text-zinc-500">最終持玉</dt>
          <dd>{{ formatNumber(record.finalHeldBalls) }}玉</dd>
          <dt class="text-zinc-500">回転数</dt>
          <dd>{{ formatNumber(record.totalRotations) }}回転 ({{ formattedRotationsPer1000Yen }}回転)</dd>
          <dt class="text-zinc-500">RUSH当選数</dt>
          <dd>{{ formatNumber(record.rushWinCount) }}</dd>
          <dt class="text-zinc-500">通常当選数</dt>
          <dd>{{ formatNumber(record.normalWinCount) }}</dd>
          <dt class="text-zinc-500">チャージ当選数</dt>
          <dd>{{ formatNumber(record.chargeWinCount) }}</dd>
          <dt class="text-zinc-500">連荘数</dt>
          <dd>{{ formatNumber(record.totalContinueCount) }}</dd>
        </dl>
      </section>

      <section class="flex flex-col gap-2">
        <h2 class="font-semibold">区間実績</h2>
        <DataTable
          :value="periods"
          data-key="id"
          class="periods-table cursor-pointer"
          @row-click="goToPeriod"
        >
          <Column header="時間">
            <template #body="{ data }">
              <div class="flex flex-col">
                <span>{{ formatTime(data.startTime) }}</span>
                <span>{{ formatTime(data.endTime) }}</span>
              </div>
            </template>
          </Column>
          <Column header="投資">
            <template #body="{ data }">
              <div class="flex flex-col text-right">
                <span>{{ formatNumber(data.investment) }}円</span>
                <span>{{ formatNumber(periodBallsDiff(data)) }}玉</span>
              </div>
            </template>
          </Column>
          <Column header="回転">
            <template #body="{ data }">
              <div class="flex flex-col text-right">
                <span>{{ formatNumber(data.endRotations - data.startRotations) }}</span>
                <span>{{ formatRotationsPer1000Yen(periodRotationsPer1000Yen(data)) }}</span>
              </div>
            </template>
          </Column>
          <Column header="当選">
            <template #body="{ data }">
              <div class="flex flex-col">
                <span>{{ getWinTypeLabel(data.winType) }}</span>
                <span v-if="winContinueLabel(data)">{{ winContinueLabel(data) }}</span>
              </div>
            </template>
          </Column>
        </DataTable>
      </section>

      <section class="flex flex-col gap-2">
        <div class="flex flex-wrap gap-2">
          <Button v-if="state === 'A'" label="記録再開" @click="handleResumeFromNone" />
          <Button v-if="state === 'B'" label="記録開始" @click="goToNewPeriod" />
          <Button v-if="state === 'C'" label="記録継続" @click="goToNewPeriod" />
          <Button v-if="state === 'C'" label="記録終了" severity="danger" outlined @click="handleEndSession" />
        </div>
        <p v-if="endError" class="text-sm text-red-500">{{ endError }}</p>
      </section>

      <section class="flex justify-between pt-4">
        <Button label="戻る" text @click="goToList" />
        <Button label="削除" severity="danger" outlined @click="deleteDialogVisible = true" />
      </section>
    </template>

    <Dialog v-model:visible="deleteDialogVisible" modal header="削除確認" :style="{ width: '20rem' }">
      <p>この実績を削除します。よろしいですか？</p>
      <template #footer>
        <Button label="キャンセル" text @click="deleteDialogVisible = false" />
        <Button label="削除" severity="danger" @click="handleDelete" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
const route = useRoute()
const recordId = Number(route.params.recordId)
const recordingSession = useRecordingSessionStore()
const { calcDeemedInvestment, calcRotationsPer1000Yen, formatRotationsPer1000Yen, formatElapsedTime, validateRentalBallsForEnd } = useMetrics()
const { getWinTypeLabel } = useWinTypes()
const { formatNumber } = useFormat()

const record = ref(null)
const periods = ref([])
const machineName = ref('')
const now = ref(new Date())
const updating = ref(false)
const deleteDialogVisible = ref(false)
const endError = ref('')
let timer = null

async function loadRecord() {
  const db = useDb()
  const fetchedRecord = await db.records.get(recordId)
  if (!fetchedRecord) return
  const [machine, periodList] = await Promise.all([
    fetchedRecord.machineId ? db.machines.get(fetchedRecord.machineId) : null,
    db.periods.where('recordId').equals(recordId).sortBy('startTime')
  ])
  // machineName は record より先にセットする。RecordBasicInfoForm は
  // v-if="record" でマウントされ、その時点の props.initial を元に一度だけ
  // 内部状態を初期化するため、record を先に立てると空の機種名で
  // マウントされてしまう。
  machineName.value = machine?.name ?? ''
  periods.value = periodList
  record.value = fetchedRecord
  setupTimer()
}

function setupTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  if (record.value && !record.value.endTime) {
    timer = setInterval(() => {
      now.value = new Date()
    }, 60000)
  }
}

onMounted(loadRecord)
onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const basicInfoInitial = computed(() => (record.value ? {
  date: record.value.date,
  hallId: record.value.hallId,
  machineId: record.value.machineId,
  machineName: machineName.value,
  machineNumber: record.value.machineNumber,
  exchangeRate: record.value.exchangeRate,
  startTime: record.value.startTime,
  endTime: record.value.endTime,
  balance: record.value.balance
} : null))

const isOwnSession = computed(() => recordingSession.isRecording && recordingSession.recordId === recordId)
const isOtherSession = computed(() => recordingSession.isRecording && recordingSession.recordId !== recordId)
const state = computed(() => {
  if (!recordingSession.isRecording) return 'A'
  if (isOtherSession.value) return 'D'
  return periods.value.length === 0 ? 'B' : 'C'
})

const elapsedTimeLabel = computed(() => {
  const end = record.value?.endTime ? new Date(record.value.endTime) : now.value
  return formatElapsedTime(record.value?.startTime, end)
})

const formattedRotationsPer1000Yen = computed(() => formatRotationsPer1000Yen(record.value?.totalRotationsPer1000Yen))

function periodRotationsPer1000Yen(period) {
  const deemed = calcDeemedInvestment({
    investment: period.investment,
    startHeldBalls: period.startHeldBalls,
    endHeldBalls: period.endHeldBalls,
    startRentalBalls: period.startRentalBalls,
    endRentalBalls: period.endRentalBalls
  })
  return calcRotationsPer1000Yen(period.endRotations - period.startRotations, deemed)
}

function periodBallsDiff(period) {
  return (period.startHeldBalls - period.endHeldBalls) + (period.startRentalBalls - period.endRentalBalls)
}

function winContinueLabel(period) {
  if (period.winType === 'none') return ''
  if ((period.winType === 'charge' || period.winType === 'normal') && period.continueCount <= 1) return ''
  return `${period.continueCount}連`
}

function formatTime(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

async function goToPeriod(event) {
  await navigateTo(`/records/${recordId}/${event.data.id}`)
}

async function goToList() {
  await navigateTo('/records/')
}

async function handleResumeFromNone() {
  recordingSession.start(recordId)
  await navigateTo(`/records/${recordId}/create`)
}

async function goToNewPeriod() {
  await navigateTo(`/records/${recordId}/create`)
}

async function handleEndSession() {
  const last = periods.value[periods.value.length - 1]
  const error = validateRentalBallsForEnd(last)
  if (error) {
    endError.value = error
    return
  }
  endError.value = ''
  await recordingSession.finishRecording(recordId)
  await navigateTo('/')
}

async function handleUpdate(basicInfo) {
  updating.value = true
  try {
    const db = useDb()
    await db.records.update(recordId, basicInfo)
    await loadRecord()
  } finally {
    updating.value = false
  }
}

async function handleDelete() {
  const db = useDb()
  const wasOwnSession = isOwnSession.value
  await db.transaction('rw', db.records, db.periods, async () => {
    await db.periods.where('recordId').equals(recordId).delete()
    await db.records.delete(recordId)
  })
  deleteDialogVisible.value = false
  if (wasOwnSession) {
    recordingSession.end()
    await navigateTo('/')
  } else {
    await navigateTo('/records/')
  }
}
</script>

<style scoped>
@media (min-width: 1024px) {
  :deep(.periods-table .p-datatable-table) {
    width: auto;
  }
}
</style>
