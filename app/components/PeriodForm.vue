<template>
  <div class="flex flex-col gap-6">
    <section class="flex flex-col gap-4">
      <h2 class="font-semibold">時刻</h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <label for="period-start-time">開始時刻</label>
          <DatePicker id="period-start-time" v-model="startTime" time-only hour-format="24" fluid />
        </div>
        <div class="flex flex-col gap-1">
          <label for="period-end-time">終了時刻</label>
          <DatePicker id="period-end-time" v-model="endTime" time-only hour-format="24" fluid />
          <span class="text-xs text-zinc-500">未入力は現在時刻とみなす</span>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="font-semibold">投資・持玉</h2>
      <div class="flex flex-col gap-1">
        <label for="period-investment">投資金額</label>
        <InputNumber id="period-investment" :model-value="investment" :use-grouping="false" fluid @input="investment = $event.value" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <label for="period-start-held-balls">開始持玉</label>
          <InputNumber id="period-start-held-balls" :model-value="startHeldBalls" :use-grouping="false" fluid @input="startHeldBalls = $event.value" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="period-end-held-balls">終了持玉</label>
          <InputNumber id="period-end-held-balls" :model-value="endHeldBalls" :use-grouping="false" fluid @input="endHeldBalls = $event.value" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="period-start-rental-balls">開始貸玉</label>
          <InputNumber id="period-start-rental-balls" :model-value="startRentalBalls" :use-grouping="false" fluid @input="startRentalBalls = $event.value" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="period-end-rental-balls">終了貸玉</label>
          <InputNumber id="period-end-rental-balls" :model-value="endRentalBalls" :use-grouping="false" fluid @input="endRentalBalls = $event.value" />
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="font-semibold">回転数</h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <label for="period-start-rotations">開始回転数</label>
          <InputNumber id="period-start-rotations" :model-value="startRotations" :use-grouping="false" fluid @input="startRotations = $event.value" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="period-end-rotations">終了回転数</label>
          <InputNumber id="period-end-rotations" :model-value="endRotations" :use-grouping="false" fluid @input="endRotations = $event.value" />
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-2 rounded border border-zinc-200 p-3 text-sm dark:border-zinc-800">
      <div class="flex justify-between">
        <span class="text-zinc-500">みなし投資金額</span>
        <span>{{ periodDeemedInvestment }}円</span>
      </div>
      <div class="flex justify-between">
        <span class="text-zinc-500">回転数</span>
        <span>{{ periodRotations }}回転 ({{ formatRotationsPer1000Yen(periodRotationsPer1000Yen) }}回転)</span>
      </div>
      <div class="flex justify-between">
        <span class="text-zinc-500">総投資金額</span>
        <span>{{ cumulativeInvestment }}円</span>
      </div>
      <div class="flex justify-between">
        <span class="text-zinc-500">総回転数</span>
        <span>{{ cumulativeRotations }}回転 ({{ formatRotationsPer1000Yen(cumulativeRotationsPer1000Yen) }}回転)</span>
      </div>
    </section>

    <Button
      :label="submitLabel"
      :loading="loading || submitting"
      :disabled="!isValid || loading || submitting"
      @click="handleSubmit"
    />

    <section class="flex flex-col gap-4">
      <h2 class="font-semibold">当選</h2>
      <div class="flex flex-col gap-1">
        <label for="period-win-type">当選種別</label>
        <Select id="period-win-type" v-model="winType" :options="winTypes" option-label="label" option-value="id" fluid />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <label for="period-continue-count">連荘数</label>
          <InputNumber id="period-continue-count" :model-value="continueCount" :use-grouping="false" fluid @input="continueCount = $event.value" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="period-won-balls">獲得玉数</label>
          <InputNumber id="period-won-balls" :model-value="wonBalls" :use-grouping="false" fluid @input="wonBalls = $event.value" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <label for="period-post-win-held-balls">当選後持玉</label>
          <InputNumber id="period-post-win-held-balls" :model-value="postWinHeldBalls" :use-grouping="false" fluid @input="postWinHeldBalls = $event.value" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="period-post-win-rental-balls">当選後貸玉</label>
          <InputNumber id="period-post-win-rental-balls" :model-value="postWinRentalBalls" :use-grouping="false" fluid @input="postWinRentalBalls = $event.value" />
        </div>
      </div>
    </section>

    <Button
      :label="submitLabel"
      :loading="loading || submitting"
      :disabled="!isValid || loading || submitting"
      @click="handleSubmit"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  initial: { type: Object, default: null },
  baselineTotals: { type: Object, default: null },
  submitLabel: { type: String, required: true },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['submit'])

const { calcDeemedInvestment, calcRotationsPer1000Yen, formatRotationsPer1000Yen } = useMetrics()
const { winTypes } = useWinTypes()

function parseDateTime(value) {
  return value ? new Date(value) : null
}

function toIsoString(value) {
  return value ? value.toISOString() : null
}

const startTime = ref(parseDateTime(props.initial?.startTime) ?? new Date())
const endTime = ref(parseDateTime(props.initial?.endTime))
const investment = ref(props.initial?.investment ?? 0)
const startHeldBalls = ref(props.initial?.startHeldBalls ?? 0)
const endHeldBalls = ref(props.initial?.endHeldBalls ?? 0)
const startRentalBalls = ref(props.initial?.startRentalBalls ?? 0)
const endRentalBalls = ref(props.initial?.endRentalBalls ?? 0)
const startRotations = ref(props.initial?.startRotations ?? null)
const endRotations = ref(props.initial?.endRotations ?? null)
const winType = ref(props.initial?.winType ?? 'none')
const continueCount = ref(props.initial?.continueCount ?? 0)
const wonBalls = ref(props.initial?.wonBalls ?? 0)
const postWinHeldBalls = ref(props.initial?.postWinHeldBalls ?? null)
const postWinRentalBalls = ref(props.initial?.postWinRentalBalls ?? null)
const submitting = ref(false)

watch(winType, (newType) => {
  if ((newType === 'rush' || newType === 'normal') && !continueCount.value) {
    continueCount.value = 1
  }
})

const periodRotations = computed(() => {
  if (startRotations.value == null || endRotations.value == null) return 0
  return Math.max(0, endRotations.value - startRotations.value)
})

const periodDeemedInvestment = computed(() => calcDeemedInvestment({
  investment: investment.value ?? 0,
  startHeldBalls: startHeldBalls.value ?? 0,
  endHeldBalls: endHeldBalls.value ?? 0,
  startRentalBalls: startRentalBalls.value ?? 0,
  endRentalBalls: endRentalBalls.value ?? 0
}))

const periodRotationsPer1000Yen = computed(() => {
  return calcRotationsPer1000Yen(periodRotations.value, periodDeemedInvestment.value)
});

const cumulativeRotations = computed(() => (props.baselineTotals?.totalRotations ?? 0) + periodRotations.value)

const cumulativeInvestment = computed(() => (props.baselineTotals?.totalInvestment ?? 0) + (investment.value ?? 0))

const cumulativeDeemedInvestment = computed(() => {
  const baseInvestedBalls = props.baselineTotals?.totalInvestedBalls ?? 0
  const periodInvestedBalls = ((startHeldBalls.value ?? 0) - (endHeldBalls.value ?? 0)) + ((startRentalBalls.value ?? 0) - (endRentalBalls.value ?? 0))
  return cumulativeInvestment.value + (baseInvestedBalls + periodInvestedBalls) * 4
})

const cumulativeRotationsPer1000Yen = computed(() => calcRotationsPer1000Yen(cumulativeRotations.value, cumulativeDeemedInvestment.value))

const isValid = computed(() => (
  startTime.value != null
  && startRotations.value != null
  && endRotations.value != null
  && periodDeemedInvestment.value >= 1
))

async function handleSubmit() {
  submitting.value = true
  try {
    const resolvedEndTime = endTime.value ?? new Date()
    emit('submit', {
      startTime: toIsoString(startTime.value),
      endTime: toIsoString(resolvedEndTime),
      investment: investment.value ?? 0,
      startHeldBalls: startHeldBalls.value ?? 0,
      endHeldBalls: endHeldBalls.value ?? 0,
      startRentalBalls: startRentalBalls.value ?? 0,
      endRentalBalls: endRentalBalls.value ?? 0,
      startRotations: startRotations.value,
      endRotations: endRotations.value,
      winType: winType.value,
      continueCount: continueCount.value ?? 0,
      wonBalls: wonBalls.value ?? 0,
      postWinHeldBalls: postWinHeldBalls.value,
      postWinRentalBalls: postWinRentalBalls.value
    })
  } finally {
    submitting.value = false
  }
}
</script>
