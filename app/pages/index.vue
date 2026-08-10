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
            <dd>{{ record?.totalInvestment }}円</dd>
            <dt class="text-zinc-500">回転数</dt>
            <dd>{{ record?.totalRotations }}回転</dd>
            <dt class="text-zinc-500">1000円あたり回転数</dt>
            <dd>{{ formattedRotationsPer1000Yen }}回転</dd>
          </dl>
        </template>
      </Card>
    </NuxtLink>
  </div>
</template>

<script setup>
import { NuxtLink } from '#components'

const recordingSession = useRecordingSessionStore()

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

const elapsedTimeLabel = computed(() => {
  if (!record.value?.startTime) return ''
  const diffMs = now.value.getTime() - new Date(record.value.startTime).getTime()
  const totalMinutes = Math.max(0, Math.floor(diffMs / 60000))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return hours > 0 ? `${hours}時間${minutes}分` : `${minutes}分`
})

const formattedRotationsPer1000Yen = computed(() => {
  const value = record.value?.totalRotationsPer1000Yen
  return typeof value === 'number' ? value.toFixed(1) : '0.0'
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
