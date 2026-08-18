<template>
  <div class="flex flex-col gap-4 p-4">
    <h1 class="text-xl font-bold">収支カレンダー</h1>

    <div class="flex items-center justify-center gap-2">
      <Button rounded text aria-label="前月" @click="goToPrevMonth">
        <template #icon>
          <ChevronLeftIcon />
        </template>
      </Button>
      <DatePicker
        :model-value="selectedMonthDate"
        view="month"
        date-format="yy年mm月"
        fluid
        class="w-40"
        @update:model-value="handleMonthPick"
      />
      <Button rounded text aria-label="次月" @click="goToNextMonth">
        <template #icon>
          <ChevronRightIcon />
        </template>
      </Button>
    </div>

    <div class="text-center text-xl font-semibold" :class="balanceClass(monthTotalBalance)">
      {{ formatBalance(monthTotalBalance) }}
    </div>

    <div class="grid grid-cols-7 gap-px overflow-hidden rounded border border-zinc-200 bg-zinc-200 text-sm dark:border-zinc-800 dark:bg-zinc-800">
      <div
        v-for="(label, index) in weekdayLabels"
        :key="label"
        class="bg-white p-2 text-center font-semibold dark:bg-zinc-900"
        :class="weekdayHeaderClass(index)"
      >
        {{ label }}
      </div>
      <div
        v-for="(cell, index) in calendarCells"
        :key="index"
        class="relative flex min-h-16 flex-col gap-1 bg-white p-2 dark:bg-zinc-900"
        :class="[cell && cell.balance !== null ? 'cursor-pointer' : '', cell?.isToday ? 'ring-2 ring-inset ring-[var(--p-primary-color)]' : '']"
        @click="cell && cell.balance !== null && goToDay(cell.dateStr)"
      >
        <template v-if="cell">
          <span class="text-right">{{ cell.day }}</span>
          <span
            v-if="cell.balance !== null"
            class="absolute bottom-2 right-2 whitespace-nowrap text-[0.65em] tracking-[-0.04em]"
            :class="balanceClass(cell.balance)"
          >
            {{ formatBalance(cell.balance) }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import ChevronLeftIcon from '@primevue/icons/chevronleft'
import ChevronRightIcon from '@primevue/icons/chevronright'

useSeoMeta({
  title: '収支カレンダー',
  description: '月ごとの収支をカレンダー形式で日別に確認できます。'
})

const route = useRoute()
const router = useRouter()
const { formatNumber } = useFormat()

const records = ref([])

function pad(value) {
  return String(value).padStart(2, '0')
}

function parseMonthQuery(value) {
  if (typeof value === 'string' && /^\d{4}-\d{2}$/.test(value)) {
    const [year, month] = value.split('-').map(Number)
    if (month >= 1 && month <= 12) return { year, month }
  }
  const now = new Date()
  return { year: now.getFullYear(), month: now.getMonth() + 1 }
}

const current = ref(parseMonthQuery(route.query.month))

const monthQueryValue = computed(() => `${current.value.year}-${pad(current.value.month)}`)

watch(monthQueryValue, (value) => {
  router.replace({ query: { ...route.query, month: value } })
})

const selectedMonthDate = computed(() => new Date(current.value.year, current.value.month - 1, 1))

function handleMonthPick(value) {
  if (!value) return
  current.value = { year: value.getFullYear(), month: value.getMonth() + 1 }
}

function goToPrevMonth() {
  const date = new Date(current.value.year, current.value.month - 2, 1)
  current.value = { year: date.getFullYear(), month: date.getMonth() + 1 }
}

function goToNextMonth() {
  const date = new Date(current.value.year, current.value.month, 1)
  current.value = { year: date.getFullYear(), month: date.getMonth() + 1 }
}

async function load() {
  const db = useDb()
  records.value = await db.records.toArray()
}

onMounted(load)

const weekdayLabels = ['日', '月', '火', '水', '木', '金', '土']

function weekdayHeaderClass(index) {
  if (index === 0) return 'text-red-600 dark:text-red-400'
  if (index === 6) return 'text-blue-600 dark:text-blue-400'
  return ''
}

const dailyBalances = computed(() => {
  const map = new Map()
  const prefix = monthQueryValue.value
  for (const record of records.value) {
    if (!record.date.startsWith(prefix)) continue
    map.set(record.date, (map.get(record.date) ?? 0) + (record.balance ?? 0))
  }
  return map
})

const monthTotalBalance = computed(() => {
  let total = 0
  for (const value of dailyBalances.value.values()) total += value
  return total
})

function todayString() {
  const now = new Date()
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

const calendarCells = computed(() => {
  const { year, month } = current.value
  const firstDay = new Date(year, month - 1, 1)
  const daysInMonth = new Date(year, month, 0).getDate()
  const leadingBlanks = firstDay.getDay()
  const today = todayString()
  const cells = []

  for (let i = 0; i < leadingBlanks; i++) cells.push(null)

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${pad(month)}-${pad(day)}`
    const balance = dailyBalances.value.has(dateStr) ? dailyBalances.value.get(dateStr) : null
    cells.push({ day, dateStr, balance, isToday: dateStr === today })
  }

  while (cells.length % 7 !== 0) cells.push(null)

  return cells
})

function formatBalance(value) {
  const num = value ?? 0
  const sign = num > 0 ? '+' : ''
  return `${sign}${formatNumber(num)}`
}

function balanceClass(value) {
  const num = value ?? 0
  if (num > 0) return 'text-blue-600 dark:text-blue-400'
  if (num < 0) return 'text-red-600 dark:text-red-400'
  return ''
}

async function goToDay(dateStr) {
  await navigateTo({ path: '/records/', query: { dateFrom: dateStr, dateTo: dateStr } })
}
</script>
