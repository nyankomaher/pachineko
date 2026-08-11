<template>
  <div class="p-4">
    <h1 class="mb-4 text-xl font-bold">区間実績詳細(区間{{ periodNumber }})</h1>

    <PeriodForm
      v-if="record && period"
      :initial="period"
      :baseline-totals="baselineTotals"
      submit-label="修正"
      :loading="saving"
      @submit="handleUpdate"
    />

    <div class="mt-4">
      <Button label="削除" severity="danger" outlined @click="deleteDialogVisible = true" />
    </div>

    <Dialog v-model:visible="deleteDialogVisible" modal header="削除確認" :style="{ width: '20rem' }">
      <p>この区間実績を削除します。よろしいですか？</p>
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
const periodId = Number(route.params.periodId)
const { calcRecordAggregates } = useMetrics()

const record = ref(null)
const period = ref(null)
const periodNumber = ref(null)
const saving = ref(false)
const deleteDialogVisible = ref(false)

async function load() {
  const db = useDb()
  const [fetchedRecord, fetchedPeriod, periods] = await Promise.all([
    db.records.get(recordId),
    db.periods.get(periodId),
    db.periods.where('recordId').equals(recordId).sortBy('startTime')
  ])
  record.value = fetchedRecord
  period.value = fetchedPeriod
  const index = periods.findIndex((p) => p.id === periodId)
  periodNumber.value = index === -1 ? null : index + 1
}

onMounted(load)

const baselineTotals = computed(() => {
  if (!record.value || !period.value) return null
  const investedBallsDelta = (period.value.startHeldBalls - period.value.endHeldBalls) + (period.value.startRentalBalls - period.value.endRentalBalls)
  return {
    totalRotations: record.value.totalRotations - (period.value.endRotations - period.value.startRotations),
    totalInvestment: record.value.totalInvestment - period.value.investment,
    totalInvestedBalls: record.value.totalInvestedBalls - investedBallsDelta
  }
})

async function handleUpdate(periodData) {
  saving.value = true
  try {
    const db = useDb()
    await db.periods.update(periodId, periodData)
    const periods = await db.periods.where('recordId').equals(recordId).sortBy('startTime')
    const aggregates = calcRecordAggregates(periods)
    await db.records.update(recordId, aggregates)
    await navigateTo(`/records/${recordId}`)
  } finally {
    saving.value = false
  }
}

async function handleDelete() {
  const db = useDb()
  await db.periods.delete(periodId)
  const periods = await db.periods.where('recordId').equals(recordId).sortBy('startTime')
  const aggregates = calcRecordAggregates(periods)
  await db.records.update(recordId, aggregates)
  deleteDialogVisible.value = false
  await navigateTo(`/records/${recordId}`)
}
</script>
