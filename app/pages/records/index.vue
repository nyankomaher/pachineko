<template>
  <div class="flex h-full flex-col gap-4 p-4">
    <h1 class="text-xl font-bold">実績一覧</h1>

    <Accordion>
      <AccordionPanel value="0">
        <AccordionHeader>絞り込み条件</AccordionHeader>
        <AccordionContent>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="flex flex-col gap-1">
              <label>日付</label>
              <div class="flex items-center gap-2">
                <div class="flex-1">
                  <DatePicker id="filter-date-from" v-model="dateFromFilter" date-format="yy-mm-dd" show-icon show-button-bar fluid />
                </div>
                <span class="text-zinc-500">〜</span>
                <div class="flex-1">
                  <DatePicker id="filter-date-to" v-model="dateToFilter" date-format="yy-mm-dd" show-icon show-button-bar fluid />
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <label for="filter-hall">店舗</label>
              <Select id="filter-hall" v-model="hallFilter" :options="hallOptions" placeholder="すべて" show-clear fluid />
            </div>
            <div class="flex flex-col gap-1">
              <label for="filter-machine">機種</label>
              <Select id="filter-machine" v-model="machineFilter" :options="machineOptions" placeholder="すべて" show-clear fluid />
            </div>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>

    <DataTable
      :value="filteredRows"
      data-key="id"
      scrollable
      scroll-height="flex"
      class="records-table min-h-0 flex-1 cursor-pointer bg-white dark:bg-zinc-900"
      :row-class="rowClass"
      @row-click="goToRecord"
    >
      <Column field="date" header="日付">
        <template #body="{ data }">
          <div class="flex flex-col">
            <span>{{ dateYear(data.date) }}</span>
            <span>{{ dateMonthDay(data.date) }}</span>
          </div>
        </template>
      </Column>
      <Column header="投資">
        <template #body="{ data }">
          <div class="flex flex-col text-right">
            <span>{{ formatNumber(data.totalInvestment) }}円</span>
            <span>{{ formatNumber(data.totalInvestedBalls) }}玉</span>
          </div>
        </template>
      </Column>
      <Column header="回転">
        <template #body="{ data }">
          <div class="flex flex-col text-right">
            <span>{{ formatNumber(data.totalRotations) }}</span>
            <span>{{ formatRotationsPer1000Yen(data.totalRotationsPer1000Yen) }}</span>
          </div>
        </template>
      </Column>
      <Column header="収支">
        <template #body="{ data }">
          <div class="text-right">
            <span :class="balanceClass(data.balance)">{{ formatBalance(data.balance) }}</span>
          </div>
        </template>
      </Column>
      <Column header="店舗・機種">
        <template #body="{ data }">
          <div class="flex flex-col">
            <span>{{ data.hallName }}</span>
            <span>{{ data.machineName }}（{{ data.machineNumber }}）</span>
          </div>
        </template>
      </Column>

      <template #empty>記録された実績がありません。</template>
    </DataTable>
  </div>
</template>

<script setup>
const recordingSession = useRecordingSessionStore()
const { formatRotationsPer1000Yen } = useMetrics()
const { formatNumber } = useFormat()

const records = ref([])
const halls = ref([])
const machines = ref([])

const dateFromFilter = ref(null)
const dateToFilter = ref(null)
const hallFilter = ref(null)
const machineFilter = ref(null)

function toDateOnlyString(value) {
  if (!value) return null
  const y = value.getFullYear()
  const m = String(value.getMonth() + 1).padStart(2, '0')
  const d = String(value.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function dateYear(dateStr) {
  return dateStr.split('-')[0]
}

function dateMonthDay(dateStr) {
  const [, month, day] = dateStr.split('-')
  return `${month}-${day}`
}

async function load() {
  const db = useDb()
  const [recordList, hallList, machineList] = await Promise.all([
    db.records.toArray(),
    db.halls.toArray(),
    db.machines.toArray()
  ])
  halls.value = hallList
  machines.value = machineList
  records.value = recordList
}

onMounted(load)

const hallOptions = computed(() => halls.value.map((h) => h.name))
const machineOptions = computed(() => machines.value.map((m) => m.name))

const rows = computed(() => {
  const hallMap = new Map(halls.value.map((h) => [h.id, h.name]))
  const machineMap = new Map(machines.value.map((m) => [m.id, m.name]))
  return records.value
    .map((record) => ({
      ...record,
      hallName: hallMap.get(record.hallId) ?? '',
      machineName: machineMap.get(record.machineId) ?? ''
    }))
    .sort((a, b) => b.date.localeCompare(a.date))
})

const filteredRows = computed(() => {
  const fromValue = toDateOnlyString(dateFromFilter.value)
  const toValue = toDateOnlyString(dateToFilter.value)
  return rows.value.filter((r) => {
    if (fromValue && r.date < fromValue) return false
    if (toValue && r.date > toValue) return false
    if (hallFilter.value && r.hallName !== hallFilter.value) return false
    if (machineFilter.value && r.machineName !== machineFilter.value) return false
    return true
  })
})

function formatBalance(value) {
  const num = value ?? 0
  const sign = num > 0 ? '+' : ''
  return `${sign}${formatNumber(num)}円`
}

function balanceClass(value) {
  const num = value ?? 0
  if (num > 0) return 'text-red-600 dark:text-red-400'
  if (num < 0) return 'text-blue-600 dark:text-blue-400'
  return ''
}

function isRecordingRow(record) {
  return recordingSession.isRecording && recordingSession.recordId === record.id
}

function rowClass(data) {
  return isRecordingRow(data) ? '!bg-[rgba(87,127,153,0.4)]' : undefined
}

async function goToRecord(event) {
  await navigateTo(`/records/${event.data.id}`)
}
</script>

<style scoped>
:deep(.records-table th),
:deep(.records-table td) {
  white-space: nowrap;
}
</style>
