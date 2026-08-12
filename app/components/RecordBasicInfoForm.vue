<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-1">
        <label for="record-date">日付</label>
        <DatePicker id="record-date" v-model="date" date-format="yy-mm-dd" show-icon fluid />
      </div>

      <div class="flex flex-col gap-1">
        <label for="record-hall">店舗</label>
        <AutoComplete
          id="record-hall"
          v-model="hallInput"
          :suggestions="hallSuggestions"
          option-label="name"
          dropdown
          fluid
          placeholder="店舗名を入力"
          @complete="searchHalls"
        />
      </div>
    </div>

    <div class="grid grid-cols-[3fr_1fr] gap-4">
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

      <div class="flex flex-col gap-1">
        <label for="record-machine-number">台番号</label>
        <InputText id="record-machine-number" v-model="machineNumber" placeholder="台番号" fluid />
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

    <Button
      class="mt-2"
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
const hallInput = ref(props.initial ? { id: props.initial.hallId, name: props.initial.hallName } : '')
const machineInput = ref(props.initial ? { id: props.initial.machineId, name: props.initial.machineName } : '')
const machineNumber = ref(props.initial?.machineNumber ?? '')
const startTime = ref(props.initial ? parseDateTime(props.initial.startTime) : new Date())
const endTime = ref(props.initial ? parseDateTime(props.initial.endTime) : null)
const submitting = ref(false)
const hallSuggestions = ref([])
const machineSuggestions = ref([])

async function searchHalls(event) {
  const db = useDb()
  const query = event.query.trim()
  const all = await db.halls.toArray()
  hallSuggestions.value = query ? all.filter((h) => h.name.includes(query)) : all
}

async function searchMachines(event) {
  const db = useDb()
  const query = event.query.trim()
  const all = await db.machines.toArray()
  machineSuggestions.value = query ? all.filter((m) => m.name.includes(query)) : all
}

const hallNameValue = computed(() => (typeof hallInput.value === 'object' ? hallInput.value?.name : hallInput.value))
const machineNameValue = computed(() => (typeof machineInput.value === 'object' ? machineInput.value?.name : machineInput.value))

const isValid = computed(() => {
  const baseOk = !!date.value
    && !!hallNameValue.value?.trim()
    && !!machineNameValue.value?.trim()
    && !!machineNumber.value?.trim()
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
    const hallId = await resolveId(db.halls, hallInput.value)
    const machineId = await resolveId(db.machines, machineInput.value)
    emit('submit', {
      date: toDateOnlyString(date.value),
      hallId,
      machineId,
      machineNumber: machineNumber.value.trim(),
      startTime: toIsoString(startTime.value),
      endTime: toIsoString(endTime.value)
    })
  } finally {
    submitting.value = false
  }
}
</script>
