<template>
  <div class="p-4 pb-32">
    <!-- 修正完了のトースト（画面下部中央に表示）が戻る・削除ボタンに重ならないよう、下側に余白を設ける -->
    <h1 class="mb-4 text-xl font-bold">区間実績詳細(区間{{ periodNumber }})</h1>

    <PeriodForm
      v-if="record && period"
      :initial="period"
      :baseline-totals="baselineTotals"
      :exchange-rate="record.exchangeRate"
      submit-label="修正"
      :loading="saving"
      @submit="handleUpdate"
    />

    <div class="mt-6 flex justify-between">
      <Button label="戻る" text @click="goToRecord" />
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
useSeoMeta({
  title: '区間実績詳細',
  description: '区間実績の詳細を表示・編集します。'
})

const route = useRoute()
const recordId = Number(route.params.recordId)
const periodId = Number(route.params.periodId)
const { calcRecordAggregates } = useMetrics()
const toast = useToast()

const record = ref(null)
const period = ref(null)
const periodsBeforeThis = ref([])
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
  periodsBeforeThis.value = index === -1 ? [] : periods.slice(0, index)
}

onMounted(load)

async function goToRecord() {
  await navigateTo(`/records/${recordId}`)
}

const baselineTotals = computed(() => {
  if (!record.value || !period.value) return null
  const aggregates = calcRecordAggregates(periodsBeforeThis.value)
  return {
    totalRotations: aggregates.totalRotations,
    totalInvestment: aggregates.totalInvestment,
    totalInvestedBalls: aggregates.totalInvestedBalls
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
    await load()
    toast.add({ severity: 'success', summary: '修正しました', life: 3000 })
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
