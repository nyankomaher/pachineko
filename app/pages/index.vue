<template>
  <div class="flex flex-1 flex-col items-center justify-center p-4">
    <Button
      v-if="!recordingSession.isRecording"
      :as="NuxtLink"
      to="/records/create"
      label="記録開始"
      size="large"
    />

    <NuxtLink
      v-else
      :to="`/records/${recordingSession.recordId}/create`"
      class="block w-full max-w-sm"
    >
      <Card class="border-2 border-[var(--p-primary-color)] shadow-lg">
        <template #title>
          <div class="flex items-center gap-2 text-[var(--p-primary-color)]">
            <span class="h-3 w-3 rounded-full bg-[var(--p-primary-color)]" />
            <span>記録中</span>
          </div>
        </template>
        <template #content>
          <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <dt class="text-zinc-500">機種名</dt>
            <dd class="text-right">{{ machineName }}</dd>
            <dt class="text-zinc-500">台番号</dt>
            <dd class="text-right">{{ record?.machineNumber }}</dd>
            <dt class="text-zinc-500">経過時間</dt>
            <dd class="text-right">{{ elapsedTimeLabel }}</dd>
            <dt class="text-zinc-500">投資金額</dt>
            <dd class="text-right">{{ formattedInvestment }}</dd>
            <dt class="text-zinc-500">回転数</dt>
            <dd class="text-right">{{ formatNumber(record?.totalRotations) }}回転 ({{ formattedRotationsPer1000Yen }}回転)</dd>
          </dl>
        </template>
      </Card>
    </NuxtLink>

    <nav class="mt-16 flex w-full max-w-sm flex-col gap-1">
      <NuxtLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        class="rounded px-3 py-2 text-center text-zinc-700 dark:text-zinc-300"
        active-class="font-semibold text-[var(--p-primary-color)]"
      >
        {{ tab.label }}
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
import { NuxtLink } from '#components'

const recordingSession = useRecordingSessionStore()

const tabs = [
  { to: '/records/', label: '履歴' },
  { to: '/calendar/', label: '収支カレンダー' },
  { to: '/analysis/', label: '分析' },
  { to: '/settings/', label: '設定' },
  { to: '/halls/', label: '店舗一覧' },
  { to: '/machines/', label: '機種一覧' }
]
const { formatRotationsPer1000Yen, formatElapsedTime, calcActualInvestment } = useMetrics()
const { formatNumber } = useFormat()

const record = ref(null)
const machineName = ref('')
const now = ref(new Date())
let timer = null

async function loadRecord() {
  if (!recordingSession.isRecording) {
    record.value = null
    machineName.value = ''
    return
  }
  const db = useDb()
  record.value = await db.records.get(recordingSession.recordId)
  machineName.value = record.value?.machineId
    ? (await db.machines.get(record.value.machineId))?.name ?? ''
    : ''
}

const elapsedTimeLabel = computed(() => formatElapsedTime(record.value?.startTime, now.value))

const formattedRotationsPer1000Yen = computed(() => formatRotationsPer1000Yen(record.value?.totalRotationsPer1000Yen))

const formattedInvestment = computed(() => {
  if (!record.value) return ''
  const investment = record.value.totalInvestment
  const investedBalls = record.value.totalInvestedBalls
  const actualInvestment = calcActualInvestment({ investment, investedBalls, exchangeRate: record.value.exchangeRate })
  const sign = investedBalls < 0 ? '-' : '+'
  return `${formatNumber(investment)}円 ${sign} ${formatNumber(Math.abs(investedBalls))}玉 = ${formatNumber(actualInvestment)}円`
})

onMounted(() => {
  loadRecord()
  timer = setInterval(() => {
    now.value = new Date()
  }, 60000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

watch(() => recordingSession.recordId, loadRecord)
</script>
