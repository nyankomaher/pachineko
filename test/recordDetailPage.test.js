import { beforeEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import RecordDetailPage from '~/pages/records/[recordId]/index.vue'
import { definitionValue, resetDb, seedRecord, settle, tableRows } from './helpers.js'

// 実績詳細画面の集計情報・当選実績・区間実績・収支再計算の各計算項目
//
// テストデータ（交換レート3.5、貯玉10,000から遊技開始）
//   区間1: 現金5,000円 + 貯玉1,000玉、300回転、当選なし
//   区間2: 現金2,000円 + 貯玉250玉、100回転、RUSH3連（出玉5,000、当選後持玉13,750）
//   区間3: 持玉750玉、120回転、チャージ1連（出玉300、当選後持玉13,300）
//   区間4: 持玉800玉、80回転、当選なし（終了持玉12,500で終了）
const PERIODS = [
  { startTime: '2026-10-04T01:00:00.000Z', endTime: '2026-10-04T01:30:00.000Z', investment: 5000, startHeldBalls: 10000, endHeldBalls: 9000, startRotations: 0, endRotations: 300 },
  { startTime: '2026-10-04T01:30:00.000Z', endTime: '2026-10-04T02:00:00.000Z', investment: 2000, startHeldBalls: 9000, endHeldBalls: 8750, startRotations: 300, endRotations: 400, winType: 'rush', continueCount: 3, wonBalls: 5000, postWinHeldBalls: 13750, postWinRentalBalls: 0 },
  { startTime: '2026-10-04T02:00:00.000Z', endTime: '2026-10-04T02:30:00.000Z', startHeldBalls: 13750, endHeldBalls: 13000, startRotations: 0, endRotations: 120, winType: 'charge', continueCount: 1, wonBalls: 300, postWinHeldBalls: 13300, postWinRentalBalls: 0 },
  { startTime: '2026-10-04T02:30:00.000Z', endTime: '2026-10-04T03:00:00.000Z', startHeldBalls: 13300, endHeldBalls: 12500, startRotations: 120, endRotations: 200 }
]

async function mountPage(recordId) {
  const wrapper = await mountSuspended(RecordDetailPage, { route: `/records/${recordId}` })
  await settle(wrapper)
  return wrapper
}

function sectionByHeading(wrapper, heading) {
  return wrapper.findAll('section').find((section) => section.find('h2').exists() && section.find('h2').text() === heading)
}

describe('実績詳細画面 集計情報セクション', () => {
  beforeEach(async () => {
    await resetDb()
    localStorage.clear()
    useRecordingSessionStore().end()
  })

  it('純投資: 総投資金額 + 総投資貯玉 = 純投資額 を表示する', async () => {
    const { recordId } = await seedRecord({ periods: PERIODS })
    const wrapper = await mountPage(recordId)
    // 総投資貯玉 = 10000 - min(9000, 8750, 13000, 12500) = 1250、7000 + 1250 × 3.5 = 11375
    expect(definitionValue(wrapper, '純投資')).toBe('7,000円 + 1,250玉 = 11,375円')
  })

  it('総投資: 総投資金額 + 総投資持玉 = 総実質投資額 を表示する', async () => {
    const { recordId } = await seedRecord({ periods: PERIODS })
    const wrapper = await mountPage(recordId)
    // 総投資持玉 = 1000 + 250 + 750 + 800 = 2800、7000 + 2800 × 3.5 = 16800
    expect(definitionValue(wrapper, '総投資')).toBe('7,000円 + 2,800玉 = 16,800円')
  })

  it('出玉: 各区間実績の出玉の合計を表示する', async () => {
    const { recordId } = await seedRecord({ periods: PERIODS })
    const wrapper = await mountPage(recordId)
    expect(definitionValue(wrapper, '出玉')).toBe('5,300玉')
  })

  it('持玉収支: 開始持玉 → 最終持玉 = 持玉収支 を表示し、増加した場合は「+」を付ける', async () => {
    const { recordId } = await seedRecord({ periods: PERIODS })
    const wrapper = await mountPage(recordId)
    expect(definitionValue(wrapper, '持玉収支')).toBe('10,000玉 → 12,500玉 = +2,500玉')
  })

  it('持玉収支: 減少した場合は負の値を表示する', async () => {
    const { recordId } = await seedRecord({
      periods: [{ startHeldBalls: 10000, endHeldBalls: 8750, endRotations: 250 }]
    })
    const wrapper = await mountPage(recordId)
    expect(definitionValue(wrapper, '持玉収支')).toBe('10,000玉 → 8,750玉 = -1,250玉')
  })

  it('持玉収支: 最終持玉は最後の区間実績の当選後持玉を優先する', async () => {
    const { recordId } = await seedRecord({
      periods: [{ investment: 1000, endHeldBalls: 0, endRotations: 20, winType: 'rush', continueCount: 1, wonBalls: 1500, postWinHeldBalls: 1500, postWinRentalBalls: 0 }]
    })
    const wrapper = await mountPage(recordId)
    expect(definitionValue(wrapper, '持玉収支')).toBe('0玉 → 1,500玉 = +1,500玉')
  })

  it('持玉収支: 区間実績が無い場合は0として表示する', async () => {
    const { recordId } = await seedRecord({ periods: [] })
    const wrapper = await mountPage(recordId)
    expect(definitionValue(wrapper, '持玉収支')).toBe('0玉 → 0玉 = 0玉')
  })

  it('最終持玉の項目は表示しない', async () => {
    const { recordId } = await seedRecord({ periods: PERIODS })
    const wrapper = await mountPage(recordId)
    expect(wrapper.findAll('dt').map((dt) => dt.text())).not.toContain('最終持玉')
  })

  it('回転数: 総回転数と総1000円あたり回転数を表示する', async () => {
    const { recordId } = await seedRecord({ periods: PERIODS })
    const wrapper = await mountPage(recordId)
    // 600回転 / ((7000 + 2800 × 4) / 1000) = 600 / 18.2 = 32.97
    expect(definitionValue(wrapper, '回転数')).toBe('600回転 (33.0回転)')
  })

  it('RUSH・通常・チャージ・大当たり: 当選回数と連荘数の合計を表示する', async () => {
    const { recordId } = await seedRecord({ periods: PERIODS })
    const wrapper = await mountPage(recordId)
    expect(definitionValue(wrapper, 'RUSH')).toBe('1')
    expect(definitionValue(wrapper, '通常')).toBe('0')
    expect(definitionValue(wrapper, 'チャージ')).toBe('1')
    // 3 + 1 = 4
    expect(definitionValue(wrapper, '大当たり')).toBe('4')
  })

  it('経過時間: 開始時刻から終了時刻までを表示する', async () => {
    const { recordId } = await seedRecord({
      record: { startTime: '2026-10-04T01:00:00.000Z', endTime: '2026-10-04T03:25:00.000Z' },
      periods: PERIODS
    })
    const wrapper = await mountPage(recordId)
    expect(definitionValue(wrapper, '経過時間')).toBe('2時間25分')
  })
})

describe('実績詳細画面 当選実績・区間実績セクション', () => {
  beforeEach(async () => {
    await resetDb()
    localStorage.clear()
    useRecordingSessionStore().end()
  })

  it('当選実績: チャージを含めない場合はRUSH/通常で区切って集計する', async () => {
    const { recordId } = await seedRecord({ periods: PERIODS })
    const wrapper = await mountPage(recordId)
    const rows = tableRows(sectionByHeading(wrapper, '当選実績'))
    expect(rows).toEqual([
      // 区間1〜2: 7000円・1250玉・400回転、400 / ((7000 + 5000) / 1000) = 33.3
      [['RUSH', '3連'], ['5,000玉'], ['7,000円', '1,250玉'], ['400', '33.3']],
      // 区間3〜4: 0円・1550玉・200回転、200 / 6.2 = 32.3
      [['なし'], ['300玉'], ['0円', '1,550玉'], ['200', '32.3']]
    ])
  })

  it('当選実績: チャージを含める場合はチャージ当選でも区切って集計する', async () => {
    const { recordId } = await seedRecord({ record: { includeChargeInBigWin: true }, periods: PERIODS })
    const wrapper = await mountPage(recordId)
    const rows = tableRows(sectionByHeading(wrapper, '当選実績'))
    expect(rows).toEqual([
      [['RUSH', '3連'], ['5,000玉'], ['7,000円', '1,250玉'], ['400', '33.3']],
      // 区間3: 120 / 3.0 = 40.0、チャージ1連は連荘数を表示しない
      [['チャージ'], ['300玉'], ['0円', '750玉'], ['120', '40.0']],
      // 区間4: 80 / 3.2 = 25.0
      [['なし'], ['0玉'], ['0円', '800玉'], ['80', '25.0']]
    ])
  })

  it('区間実績: 各区間の投資・持玉差分・回転数・1000円あたり回転数・当選を表示する', async () => {
    const { recordId } = await seedRecord({ periods: PERIODS })
    const wrapper = await mountPage(recordId)
    const rows = tableRows(sectionByHeading(wrapper, '区間実績')).map((row) => row.slice(1))
    expect(rows).toEqual([
      // 300 / ((5000 + 1000 × 4) / 1000) = 33.3
      [['5,000円', '1,000玉'], ['300', '33.3'], ['なし']],
      // 100 / ((2000 + 250 × 4) / 1000) = 33.3
      [['2,000円', '250玉'], ['100', '33.3'], ['RUSH', '3連']],
      [['0円', '750玉'], ['120', '40.0'], ['チャージ']],
      [['0円', '800玉'], ['80', '25.0'], ['なし']]
    ])
  })
})

// 収支は「正負切り替えボタン + 絶対値の入力欄」で表示するため、両者を合わせた符号付きの文字列にする
function displayedBalance(wrapper) {
  const sign = wrapper.find('button[aria-label="収支の正負を切り替え"]').text()
  const abs = wrapper.find('#record-balance').element.value
  return `${sign}${abs}`
}

describe('実績詳細画面 収支の再計算', () => {
  beforeEach(async () => {
    await resetDb()
    localStorage.clear()
    useRecordingSessionStore().end()
  })

  async function recalculate(wrapper) {
    await wrapper.find('button[aria-label="収支を再計算"]').trigger('click')
    await settle(wrapper)
    return displayedBalance(wrapper)
  }

  it('持玉収支 × 交換レート - 総投資金額 で収支を再計算する', async () => {
    const { recordId } = await seedRecord({ periods: PERIODS })
    const wrapper = await mountPage(recordId)
    // 持玉収支 = 12500 - 10000 = 2500、2500 × 3.5 - 7000 = 1750
    expect(await recalculate(wrapper)).toBe('+1750')
  })

  it('開始持玉10,000・最終持玉8,750・交換レート3.5の場合、収支は-4,375になる', async () => {
    const { recordId } = await seedRecord({
      record: { exchangeRate: 3.5 },
      periods: [{ startHeldBalls: 10000, endHeldBalls: 8750, endRotations: 250 }]
    })
    const wrapper = await mountPage(recordId)
    expect(await recalculate(wrapper)).toBe('−4375')
  })

  it('記録中は再計算ボタンを押下できない', async () => {
    const { recordId } = await seedRecord({ record: { endTime: null }, periods: PERIODS })
    useRecordingSessionStore().start(recordId)
    const wrapper = await mountPage(recordId)
    expect(wrapper.find('button[aria-label="収支を再計算"]').attributes('disabled')).toBeDefined()
  })
})

describe('実績詳細画面 収支の入力', () => {
  beforeEach(async () => {
    await resetDb()
    localStorage.clear()
    useRecordingSessionStore().end()
  })

  // 修正ボタンを活性にするため、店舗・機種を登録済みの実績を作成する
  async function seedEditableRecord(record) {
    const db = useDb()
    const hallId = await db.halls.add({ name: '店舗', order: 0 })
    const machineId = await db.machines.add({ name: '機種', order: 0 })
    return seedRecord({ record: { hallId, machineId, ...record }, periods: PERIODS })
  }

  async function submit(wrapper) {
    await wrapper.findAll('button').find((button) => button.text() === '修正').trigger('click')
    await settle(wrapper)
  }

  const signButton = (wrapper) => wrapper.find('button[aria-label="収支の正負を切り替え"]')

  it('入力欄はiPhoneでテンキーが表示されるよう inputmode="numeric" とする', async () => {
    const { recordId } = await seedRecord({ periods: PERIODS })
    const wrapper = await mountPage(recordId)
    expect(wrapper.find('#record-balance').attributes('inputmode')).toBe('numeric')
  })

  it('保存済みの負の収支は、正負切り替えボタンを「−」、入力欄を絶対値で表示する', async () => {
    const { recordId } = await seedRecord({ record: { balance: -4375 }, periods: PERIODS })
    const wrapper = await mountPage(recordId)
    expect(displayedBalance(wrapper)).toBe('−4375')
  })

  it('正負切り替えボタンで「−」にして数値を入力し修正すると、負の値で保存する', async () => {
    const { recordId } = await seedEditableRecord({ balance: 0 })
    const wrapper = await mountPage(recordId)

    expect(signButton(wrapper).text()).toBe('+')
    await signButton(wrapper).trigger('click')
    await wrapper.find('#record-balance').setValue('12500')
    expect(displayedBalance(wrapper)).toBe('−12500')
    await submit(wrapper)

    expect((await useDb().records.get(recordId)).balance).toBe(-12500)
  })

  it('負の収支の正負を切り替えて修正すると、正の値で保存する', async () => {
    const { recordId } = await seedEditableRecord({ balance: -3000 })
    const wrapper = await mountPage(recordId)

    await signButton(wrapper).trigger('click')
    await submit(wrapper)

    expect((await useDb().records.get(recordId)).balance).toBe(3000)
  })

  it('数字以外の文字は取り除く', async () => {
    const { recordId } = await seedEditableRecord({ balance: 0 })
    const wrapper = await mountPage(recordId)

    await wrapper.find('#record-balance').setValue('-1,500')
    await submit(wrapper)

    expect((await useDb().records.get(recordId)).balance).toBe(1500)
  })

  it('収支を空欄にして修正すると0として保存する', async () => {
    const { recordId } = await seedEditableRecord({ balance: -3000 })
    const wrapper = await mountPage(recordId)

    await wrapper.find('#record-balance').setValue('')
    await submit(wrapper)

    expect(Object.is((await useDb().records.get(recordId)).balance, 0)).toBe(true)
  })

  it('記録中は正負切り替えボタンを押下できない', async () => {
    const { recordId } = await seedRecord({ record: { endTime: null }, periods: PERIODS })
    useRecordingSessionStore().start(recordId)
    const wrapper = await mountPage(recordId)
    expect(signButton(wrapper).attributes('disabled')).toBeDefined()
  })
})
