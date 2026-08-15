<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <label for="record-date">日付</label>
      <DatePicker id="record-date" v-model="date" date-format="yy-mm-dd" show-icon fluid />
    </div>

    <div class="flex flex-col gap-1">
      <label for="record-hall">店舗</label>
      <div class="flex items-center gap-2">
        <div class="flex-1">
          <Select
            id="record-hall"
            v-model="hallId"
            :options="halls"
            option-label="name"
            option-value="id"
            placeholder="店舗を選択"
            fluid
          />
        </div>
        <Button rounded aria-label="店舗を追加" @click="addHallDialogVisible = true">
          <template #icon>
            <PlusIcon />
          </template>
        </Button>
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <label for="record-machine">機種</label>
      <AutoComplete
        id="record-machine"
        v-model="machineInput"
        :suggestions="machineSuggestions"
        option-label="name"
        dropdown
        fluid
        placeholder="機種名を入力"
        @complete="searchMachines"
      />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-1">
        <label for="record-machine-number">台番号</label>
        <InputText id="record-machine-number" v-model="machineNumber" placeholder="台番号" fluid />
      </div>

      <div class="flex flex-col gap-1">
        <label for="record-exchange-rate">交換レート</label>
        <Select
          id="record-exchange-rate"
          v-model="exchangeRate"
          :options="exchangeRateOptions"
          fluid
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-1">
        <label for="record-start-time">開始時刻</label>
        <DatePicker id="record-start-time" v-model="startTime" time-only hour-format="24" show-icon fluid />
      </div>

      <div class="flex flex-col gap-1">
        <label for="record-end-time">終了時刻</label>
        <DatePicker id="record-end-time" v-model="endTime" time-only hour-format="24" show-icon fluid :disabled="recording" />
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <label for="record-balance">収支</label>
      <InputNumber
        id="record-balance"
        v-model="balance"
        :use-grouping="false"
        :min-fraction-digits="0"
        :max-fraction-digits="2"
        fluid
        :disabled="recording"
      />
    </div>

    <Button
      class="mt-2"
      :label="submitLabel"
      :loading="loading || submitting"
      :disabled="!isValid || loading || submitting"
      @click="handleSubmit"
    />

    <Dialog v-model:visible="addHallDialogVisible" modal header="店舗を登録" :style="{ width: '20rem' }">
      <HallForm submit-label="登録" :loading="creatingHall" @submit="handleCreateHall" />
    </Dialog>
  </div>
</template>

<script setup>
import PlusIcon from '@primevue/icons/plus'

const props = defineProps({
  initial: { type: Object, default: null },
  submitLabel: { type: String, required: true },
  loading: { type: Boolean, default: false },
  recording: { type: Boolean, default: false }
})

const emit = defineEmits(['submit'])

function parseDateOnly(value) {
  return value ? new Date(`${value}T00:00:00`) : null
}

function toDateOnlyString(value) {
  if (!value) return null
  const y = value.getFullYear()
  const m = String(value.getMonth() + 1).padStart(2, '0')
  const d = String(value.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function parseDateTime(value) {
  return value ? new Date(value) : null
}

function toIsoString(value) {
  return value ? value.toISOString() : null
}

const date = ref(props.initial ? parseDateOnly(props.initial.date) : new Date())
const hallId = ref(props.initial?.hallId ?? null)
const machineInput = ref(props.initial ? { id: props.initial.machineId, name: props.initial.machineName } : '')
const machineNumber = ref(props.initial?.machineNumber ?? '')
const exchangeRateOptionsStore = useExchangeRateOptionsStore()
const exchangeRateOptions = computed(() => {
  const options = [...exchangeRateOptionsStore.options]
  if (props.initial?.exchangeRate != null && !options.includes(props.initial.exchangeRate)) {
    options.push(props.initial.exchangeRate)
  }
  return options.sort((a, b) => a - b)
})
const exchangeRate = ref(props.initial?.exchangeRate ?? exchangeRateOptions.value[0] ?? null)
const startTime = ref(props.initial ? parseDateTime(props.initial.startTime) : new Date())
const endTime = ref(props.initial ? parseDateTime(props.initial.endTime) : null)
const balance = ref(props.initial?.balance ?? 0)
const submitting = ref(false)
const machineSuggestions = ref([])
const halls = ref([])
const addHallDialogVisible = ref(false)
const creatingHall = ref(false)

async function loadHalls() {
  const db = useDb()
  halls.value = await db.halls.orderBy('order').toArray()
}

onMounted(loadHalls)

async function handleCreateHall(hallData) {
  creatingHall.value = true
  try {
    const db = useDb()
    const existing = await db.halls.toArray()
    const maxOrder = existing.reduce((max, hall) => Math.max(max, hall.order ?? -1), -1)
    const newHallId = await db.halls.add({ ...hallData, order: maxOrder + 1 })
    await loadHalls()
    hallId.value = newHallId
    addHallDialogVisible.value = false
  } finally {
    creatingHall.value = false
  }
}

async function searchMachines(event) {
  const db = useDb()
  const query = event.query.trim()
  const all = await db.machines.toArray()
  machineSuggestions.value = query ? all.filter((m) => m.name.includes(query)) : all
}

const machineNameValue = computed(() => (typeof machineInput.value === 'object' ? machineInput.value?.name : machineInput.value))

const isValid = computed(() => {
  const baseOk = !!date.value
    && hallId.value != null
    && !!machineNameValue.value?.trim()
    && !!machineNumber.value?.trim()
    && exchangeRate.value != null
    && !!startTime.value
  if (!baseOk) return false
  if (!props.recording && !endTime.value) return false
  return true
})

async function resolveId(table, input) {
  if (input && typeof input === 'object') return input.id
  const name = (input ?? '').trim()
  if (!name) return null
  const existing = await table.where('name').equals(name).first()
  if (existing) return existing.id
  return table.add({ name })
}

async function handleSubmit() {
  submitting.value = true
  try {
    const db = useDb()
    const machineId = await resolveId(db.machines, machineInput.value)
    emit('submit', {
      date: toDateOnlyString(date.value),
      hallId: hallId.value,
      machineId,
      machineNumber: machineNumber.value.trim(),
      exchangeRate: exchangeRate.value,
      startTime: toIsoString(startTime.value),
      endTime: toIsoString(endTime.value),
      balance: balance.value ?? 0
    })
  } finally {
    submitting.value = false
  }
}
</script>
