<template>
  <div class="flex flex-1 flex-col items-center justify-center p-4">
    <Button
      v-if="!recordingSession.isRecording"
      :as="NuxtLink"
      to="/records/create"
      label="記録を始める"
      size="large"
    />

    <NuxtLink
      v-else
      :to="`/records/${recordingSession.recordId}/create`"
      class="block w-full max-w-sm"
    >
      <Card>
        <template #title>記録中</template>
        <template #content>
          <dl class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <dt class="text-zinc-500">台番号</dt>
            <dd>{{ record?.machineNumber }}</dd>
            <dt class="text-zinc-500">機種名</dt>
            <dd>{{ machineName }}</dd>
            <dt class="text-zinc-500">経過時間</dt>
            <dd>{{ elapsedTimeLabel }}</dd>
            <dt class="text-zinc-500">投資金額</dt>
            <dd>{{ formatNumber(record?.totalInvestment) }}円</dd>
            <dt class="text-zinc-500">回転数</dt>
            <dd>{{ formatNumber(record?.totalRotations) }}回転</dd>
            <dt class="text-zinc-500">1000円あたり回転数</dt>
            <dd>{{ formattedRotationsPer1000Yen }}回転</dd>
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
  { to: '/', label: 'TOP' },
  { to: '/records/', label: '履歴' },
  { to: '/analysis/', label: '分析' },
  { to: '/settings/', label: '設定' },
  { to: '/halls/', label: '店舗一覧' },
  { to: '/machines/', label: '機種一覧' }
]
const { formatRotationsPer1000Yen, formatElapsedTime } = useMetrics()
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
