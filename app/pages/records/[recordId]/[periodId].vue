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

    <div class="mt-6 flex items-center justify-between">
      <Button label="戻る" text @click="goToRecord" />
      <!-- 非表示のボタンも領域を確保し、もう一方のボタンの配置を変えない -->
      <div class="flex gap-2">
        <Button
          label="前区間"
          severity="secondary"
          outlined
          :class="{ invisible: !prevPeriodId }"
          @click="goToPrev"
        />
        <!-- 新区間は修正ボタンと同じデザイン(primary)にする -->
        <Button
          :label="nextPeriodId ? '次区間' : '新区間'"
          :severity="nextPeriodId ? 'secondary' : undefined"
          :outlined="!!nextPeriodId"
          :class="{ invisible: !nextPeriodId && !canStartNewPeriod }"
          @click="goToNext"
        />
      </div>
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
const recordingSession = useRecordingSessionStore()
const toast = useToast()

const record = ref(null)
const period = ref(null)
const periodsBeforeThis = ref([])
const periodNumber = ref(null)
const prevPeriodId = ref(null)
const nextPeriodId = ref(null)
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
  prevPeriodId.value = index > 0 ? periods[index - 1].id : null
  nextPeriodId.value = index !== -1 && index < periods.length - 1 ? periods[index + 1].id : null
}

onMounted(load)

// 記録中の実績の最後の区間では、次区間の代わりに新規区間の記録を開始できる
const canStartNewPeriod = computed(() => (
  periodNumber.value !== null && !nextPeriodId.value && recordingSession.recordId === recordId
))

async function goToRecord() {
  await navigateTo(`/records/${recordId}`)
}

async function goToPrev() {
  if (!prevPeriodId.value) return
  await navigateTo(`/records/${recordId}/${prevPeriodId.value}`)
}

async function goToNext() {
  if (nextPeriodId.value) {
    await navigateTo(`/records/${recordId}/${nextPeriodId.value}`)
  } else if (canStartNewPeriod.value) {
    await navigateTo(`/records/${recordId}/create`)
  }
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
