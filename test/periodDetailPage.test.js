import { beforeEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PeriodDetailPage from '~/pages/records/[recordId]/[periodId].vue'
import PeriodCreatePage from '~/pages/records/[recordId]/create.vue'
import { calcRowValue, resetDb, seedRecord, settle } from './helpers.js'

// 区間実績詳細画面のリアルタイム計算表示欄の基準値（それ以前の区間実績の集計）と、修正時の実績集計の再計算
const PERIODS = [
  { startTime: '2026-10-04T01:00:00.000Z', investment: 5000, startHeldBalls: 10000, endHeldBalls: 9000, startRotations: 0, endRotations: 300 },
  { startTime: '2026-10-04T01:30:00.000Z', investment: 2000, startHeldBalls: 9000, endHeldBalls: 8750, startRotations: 300, endRotations: 400, winType: 'rush', continueCount: 3, wonBalls: 5000, postWinHeldBalls: 13750, postWinRentalBalls: 0 },
  { startTime: '2026-10-04T02:00:00.000Z', startHeldBalls: 13750, endHeldBalls: 13000, startRotations: 0, endRotations: 120, winType: 'charge', continueCount: 1, wonBalls: 300, postWinHeldBalls: 13300, postWinRentalBalls: 0 },
  { startTime: '2026-10-04T02:30:00.000Z', startHeldBalls: 13300, endHeldBalls: 12500, startRotations: 120, endRotations: 200 }
]

describe('区間実績詳細画面（既存区間の修正）', () => {
  beforeEach(async () => {
    await resetDb()
    localStorage.clear()
    useRecordingSessionStore().end()
  })

  async function mountPage(recordId, periodId) {
    const wrapper = await mountSuspended(PeriodDetailPage, { route: `/records/${recordId}/${periodId}` })
    await settle(wrapper)
    return wrapper
  }

  it('区間投資・区間回転数はこの区間実績の値のみで算出する', async () => {
    const { recordId, periodIds } = await seedRecord({ periods: PERIODS })
    const wrapper = await mountPage(recordId, periodIds[2])
    // 0 + 750 × 3.5 = 2625、120 / ((0 + 750 × 4) / 1000) = 40.0
    expect(calcRowValue(wrapper, '区間投資')).toBe('0円 + 750玉 = 2,625円')
    expect(calcRowValue(wrapper, '区間回転数')).toBe('120回転 (40.0回転)')
  })

  it('総投資・総回転数は、この区間より前の区間実績の集計にこの区間の値を加算して算出する（後続の区間は含めない）', async () => {
    const { recordId, periodIds } = await seedRecord({ periods: PERIODS })
    const wrapper = await mountPage(recordId, periodIds[2])
    // 区間1〜3: 7000円、1000 + 250 + 750 = 2000玉、7000 + 2000 × 3.5 = 14000
    expect(calcRowValue(wrapper, '総投資')).toBe('7,000円 + 2,000玉 = 14,000円')
    // 300 + 100 + 120 = 520回転、520 / ((7000 + 2000 × 4) / 1000) = 34.67
    expect(calcRowValue(wrapper, '総回転数')).toBe('520回転 (34.7回転)')
  })

  it('先頭の区間実績では総投資・総回転数は区間の値と一致する', async () => {
    const { recordId, periodIds } = await seedRecord({ periods: PERIODS })
    const wrapper = await mountPage(recordId, periodIds[0])
    expect(calcRowValue(wrapper, '総投資')).toBe(calcRowValue(wrapper, '区間投資'))
    expect(calcRowValue(wrapper, '総回転数')).toBe(calcRowValue(wrapper, '区間回転数'))
  })

  it('修正すると実績テーブルの集計フィールドを再計算して保存する', async () => {
    const { recordId, periodIds } = await seedRecord({ periods: PERIODS })
    const wrapper = await mountPage(recordId, periodIds[3])

    await wrapper.find('#period-end-held-balls input').setValue('11000')
    const submit = wrapper.findAll('button').find((button) => button.text() === '修正')
    await submit.trigger('click')
    await settle(wrapper)

    const record = await useDb().records.get(recordId)
    expect(record.finalHeldBalls).toBe(11000)
    // 区間4の投資玉数が 800 → 2300 になり、総投資持玉 = 1000 + 250 + 750 + 2300 = 4300
    expect(record.totalInvestedBalls).toBe(4300)
    expect(record.totalRotations).toBe(600)
  })
})

describe('区間実績詳細画面（新規記録）', () => {
  beforeEach(async () => {
    await resetDb()
    localStorage.clear()
  })

  async function mountPage(recordId) {
    const wrapper = await mountSuspended(PeriodCreatePage, { route: `/records/${recordId}/create` })
    await settle(wrapper)
    return wrapper
  }

  it('直前の区間実績の当選後持玉・終了回転数を初期値とし、総投資・総回転数は記録済み区間の集計に入力値を加算する', async () => {
    const { recordId } = await seedRecord({ record: { endTime: null }, periods: PERIODS })
    useRecordingSessionStore().start(recordId)
    const wrapper = await mountPage(recordId)

    // 初期値: 開始持玉・終了持玉 = 12500、開始回転数 = 200
    expect(calcRowValue(wrapper, '区間投資')).toBe('0円 + 0玉 = 0円')
    expect(calcRowValue(wrapper, '総投資')).toBe('7,000円 + 2,800玉 = 16,800円')

    await wrapper.find('#period-end-held-balls input').setValue('12000')
    await wrapper.find('#period-end-rotations input').setValue('300')

    // 区間: 500玉 → 0 + 500 × 3.5 = 1750、100 / 2 = 50.0
    expect(calcRowValue(wrapper, '区間投資')).toBe('0円 + 500玉 = 1,750円')
    expect(calcRowValue(wrapper, '区間回転数')).toBe('100回転 (50.0回転)')
    // 総: 7000円 + 3300玉 = 7000 + 11550 = 18550、700 / ((7000 + 3300 × 4) / 1000) = 700 / 20.2 = 34.65
    expect(calcRowValue(wrapper, '総投資')).toBe('7,000円 + 3,300玉 = 18,550円')
    expect(calcRowValue(wrapper, '総回転数')).toBe('700回転 (34.7回転)')
  })
})
