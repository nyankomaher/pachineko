<template>
  <div class="p-4">
    <h1 class="mb-4 text-xl font-bold">実績詳細(新規)</h1>
    <RecordBasicInfoForm
      submit-label="記録開始"
      :recording="true"
      :loading="creating"
      @submit="handleCreate"
    />
  </div>
</template>

<script setup>
const recordingSession = useRecordingSessionStore()
const creating = ref(false)

async function handleCreate(basicInfo) {
  creating.value = true
  try {
    const db = useDb()
    const recordId = await db.records.add({
      ...basicInfo,
      totalInvestment: 0,
      totalInvestedBalls: 0,
      finalHeldBalls: 0,
      totalRotations: 0,
      totalRotationsPer1000Yen: 0,
      rushWinCount: 0,
      normalWinCount: 0,
      chargeWinCount: 0,
      totalContinueCount: 0,
      totalWonBalls: 0,
      includeChargeInBigWin: false
    })
    recordingSession.start(recordId)
    await navigateTo(`/records/${recordId}/create`)
  } finally {
    creating.value = false
  }
}
</script>
