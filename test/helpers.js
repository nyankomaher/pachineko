import { flushPromises } from '@vue/test-utils'

export async function resetDb() {
  const db = useDb()
  await Promise.all(db.tables.map((table) => table.clear()))
  return db
}

// 区間実績の既定値（各テストで必要な項目のみ上書きする）
export function buildPeriod(overrides = {}) {
  return {
    startTime: '2026-10-04T01:00:00.000Z',
    endTime: '2026-10-04T01:30:00.000Z',
    investment: 0,
    startHeldBalls: 0,
    endHeldBalls: 0,
    startRentalBalls: 0,
    endRentalBalls: 0,
    startRotations: 0,
    endRotations: 0,
    winType: 'none',
    continueCount: 0,
    wonBalls: 0,
    postWinHeldBalls: null,
    postWinRentalBalls: null,
    ...overrides
  }
}

// 実績と区間実績を登録し、アプリと同じ集計ロジックで実績テーブルの集計フィールドを更新する
export async function seedRecord({ record = {}, periods = [] } = {}) {
  const db = useDb()
  const { calcRecordAggregates } = useMetrics()
  const recordId = await db.records.add({
    date: '2026-10-04',
    hallId: null,
    machineId: null,
    machineNumber: '123',
    exchangeRate: 3.5,
    startTime: '2026-10-04T01:00:00.000Z',
    endTime: '2026-10-04T05:00:00.000Z',
    balance: 0,
    includeChargeInBigWin: false,
    ...record
  })
  const periodIds = []
  for (const period of periods) {
    periodIds.push(await db.periods.add({ recordId, ...buildPeriod(period) }))
  }
  const stored = await db.periods.where('recordId').equals(recordId).sortBy('startTime')
  await db.records.update(recordId, calcRecordAggregates(stored))
  return { recordId, periodIds }
}

// Dexie の非同期処理とそれに続く再描画を待つ
export async function settle(wrapper) {
  for (let i = 0; i < 5; i++) {
    await flushPromises()
    await new Promise((resolve) => setTimeout(resolve, 0))
  }
  await wrapper?.vm.$nextTick()
}

// <dt>ラベル</dt><dd>値</dd> 形式の表示値を取得する
export function definitionValue(wrapper, label) {
  const dt = wrapper.findAll('dt').find((el) => el.text() === label)
  if (!dt) throw new Error(`dt "${label}" が見つかりません`)
  return dt.element.nextElementSibling.textContent.trim()
}

// <span>ラベル</span><span>値</span> 形式（区間実績詳細のリアルタイム計算表示欄）の表示値を取得する
export function calcRowValue(wrapper, label) {
  const row = wrapper.findAll('div.justify-between').find((el) => el.find('span').exists() && el.find('span').text() === label)
  if (!row) throw new Error(`計算表示欄 "${label}" が見つかりません`)
  return row.findAll('span')[1].text()
}

// DataTable の各行のセルテキストを取得する
export function tableRows(tableWrapper) {
  return tableWrapper.findAll('tbody tr').map((tr) => tr.findAll('td').map((td) => td.findAll('span').map((span) => span.text())))
}
