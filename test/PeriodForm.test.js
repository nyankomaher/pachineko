import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PeriodForm from '~/components/PeriodForm.vue'
import { buildPeriod, calcRowValue } from './helpers.js'

// 区間実績詳細画面のリアルタイム計算表示欄（区間投資・区間回転数・総投資・総回転数）
async function mountForm({ initial = {}, baselineTotals = null, exchangeRate = 3.5 } = {}) {
  return mountSuspended(PeriodForm, {
    props: {
      initial: buildPeriod(initial),
      baselineTotals,
      exchangeRate,
      submitLabel: '記録'
    }
  })
}

async function input(wrapper, id, value) {
  await wrapper.find(`#${id} input`).setValue(String(value))
}

describe('PeriodForm リアルタイム計算表示欄', () => {
  it('区間投資: 投資金額 + 投資玉数 = 実質投資額 の形式で表示する', async () => {
    const wrapper = await mountForm({
      initial: { investment: 3000, startHeldBalls: 1000, endHeldBalls: 0, startRentalBalls: 0, endRentalBalls: 0 },
      exchangeRate: 3.5
    })
    // 3000 + 1000 × 3.5 = 6500
    expect(calcRowValue(wrapper, '区間投資')).toBe('3,000円 + 1,000玉 = 6,500円')
  })

  it('区間投資: 投資玉数は持玉と貸玉の増減を合算する', async () => {
    const wrapper = await mountForm({
      initial: { investment: 1000, startHeldBalls: 500, endHeldBalls: 300, startRentalBalls: 250, endRentalBalls: 50 },
      exchangeRate: 4
    })
    // 投資玉数 = (500 - 300) + (250 - 50) = 400、1000 + 400 × 4 = 2600
    expect(calcRowValue(wrapper, '区間投資')).toBe('1,000円 + 400玉 = 2,600円')
  })

  it('区間投資: 投資玉数が負の場合は「-」で表示する', async () => {
    const wrapper = await mountForm({
      initial: { investment: 3000, startHeldBalls: 0, endHeldBalls: 500 },
      exchangeRate: 3
    })
    expect(calcRowValue(wrapper, '区間投資')).toBe('3,000円 - 500玉 = 1,500円')
  })

  it('区間投資: 実質投資額の小数点以下は四捨五入する', async () => {
    const wrapper = await mountForm({
      initial: { investment: 100, startHeldBalls: 1, endHeldBalls: 0 },
      exchangeRate: 3.55
    })
    expect(calcRowValue(wrapper, '区間投資')).toBe('100円 + 1玉 = 104円')
  })

  it('区間回転数: 回転数と1000円あたり回転数（みなし投資金額は1玉4円）を表示する', async () => {
    const wrapper = await mountForm({
      initial: { investment: 5000, startHeldBalls: 1000, endHeldBalls: 0, startRotations: 100, endRotations: 400 },
      exchangeRate: 3.5
    })
    // みなし投資金額 = 5000 + 1000 × 4 = 9000、300 / 9 = 33.33
    expect(calcRowValue(wrapper, '区間回転数')).toBe('300回転 (33.3回転)')
  })

  it('区間回転数: 開始回転数が未入力の場合は0回転とする', async () => {
    const wrapper = await mountForm({
      initial: { investment: 1000, startRotations: null, endRotations: 20 }
    })
    expect(calcRowValue(wrapper, '区間回転数')).toBe('0回転 (0.0回転)')
  })

  it('区間回転数: 終了回転数が開始回転数より小さい場合は0回転とする', async () => {
    const wrapper = await mountForm({
      initial: { investment: 1000, startRotations: 50, endRotations: 20 }
    })
    expect(calcRowValue(wrapper, '区間回転数')).toBe('0回転 (0.0回転)')
  })

  it('総投資・総回転数: それ以前の区間実績の集計値にこの区間の値を加算する', async () => {
    const wrapper = await mountForm({
      initial: { investment: 2000, startHeldBalls: 500, endHeldBalls: 0, startRotations: 0, endRotations: 100 },
      baselineTotals: { totalInvestment: 10000, totalInvestedBalls: 1000, totalRotations: 500 },
      exchangeRate: 3.5
    })
    // 総投資金額 = 12000、総投資持玉 = 1500、12000 + 1500 × 3.5 = 17250
    expect(calcRowValue(wrapper, '総投資')).toBe('12,000円 + 1,500玉 = 17,250円')
    // 総回転数 = 600、総みなし投資金額 = 12000 + 1500 × 4 = 18000、600 / 18 = 33.33
    expect(calcRowValue(wrapper, '総回転数')).toBe('600回転 (33.3回転)')
  })

  it('総投資: 総投資持玉が負の場合は「-」で表示する', async () => {
    const wrapper = await mountForm({
      initial: { investment: 0, startHeldBalls: 0, endHeldBalls: 3000 },
      baselineTotals: { totalInvestment: 10000, totalInvestedBalls: 1000, totalRotations: 500 },
      exchangeRate: 4
    })
    // 総投資持玉 = 1000 - 3000 = -2000、10000 - 2000 × 4 = 2000
    expect(calcRowValue(wrapper, '総投資')).toBe('10,000円 - 2,000玉 = 2,000円')
  })

  it('総投資・総回転数: それ以前の集計値が無ければこの区間の値のみで算出する', async () => {
    const wrapper = await mountForm({
      initial: { investment: 1000, startRotations: 0, endRotations: 18 },
      baselineTotals: null,
      exchangeRate: 3.5
    })
    expect(calcRowValue(wrapper, '総投資')).toBe('1,000円 + 0玉 = 1,000円')
    expect(calcRowValue(wrapper, '総回転数')).toBe('18回転 (18.0回転)')
  })

  it('入力値を変更すると各計算項目が即座に再計算される', async () => {
    const wrapper = await mountForm({
      initial: { investment: 0, startRotations: 0, endRotations: 0 },
      baselineTotals: { totalInvestment: 5000, totalInvestedBalls: 0, totalRotations: 90 },
      exchangeRate: 3.5
    })

    await input(wrapper, 'period-investment', 1000)
    await input(wrapper, 'period-start-held-balls', 800)
    await input(wrapper, 'period-end-held-balls', 300)
    await input(wrapper, 'period-end-rotations', 60)

    // 区間: 投資玉数 500、1000 + 500 × 3.5 = 2750、みなし 1000 + 2000 = 3000、60 / 3 = 20.0
    expect(calcRowValue(wrapper, '区間投資')).toBe('1,000円 + 500玉 = 2,750円')
    expect(calcRowValue(wrapper, '区間回転数')).toBe('60回転 (20.0回転)')
    // 総: 6000円 + 500玉 = 7750、150回転 / (6000 + 2000) × 1000 = 18.75
    expect(calcRowValue(wrapper, '総投資')).toBe('6,000円 + 500玉 = 7,750円')
    expect(calcRowValue(wrapper, '総回転数')).toBe('150回転 (18.8回転)')
  })
})

describe('PeriodForm 当選セクション', () => {
  const WIN_FIELD_IDS = ['period-continue-count', 'period-won-balls', 'period-post-win-held-balls', 'period-post-win-rental-balls']

  function winFieldStates(wrapper) {
    return Object.fromEntries(WIN_FIELD_IDS.map((id) => {
      const el = wrapper.find(`#${id} input`).element
      return [id, { value: el.value, disabled: el.disabled }]
    }))
  }

  async function selectWinType(wrapper, winType) {
    wrapper.findComponent({ name: 'Select' }).vm.$emit('update:modelValue', winType)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
  }

  async function submit(wrapper) {
    const button = wrapper.findAll('button').find((el) => el.text() === '記録')
    await button.trigger('click')
    return wrapper.emitted('submit').at(-1)[0]
  }

  function accordionExpanded(wrapper) {
    return wrapper.find('.p-accordionheader').attributes('aria-expanded') === 'true'
  }

  const VALID = { investment: 1000, startRotations: 0, endRotations: 20 }

  it('当選種別が初期値「なし」の場合、連荘数〜当選後貸玉を非活性にし、当選セクションを閉じておく', async () => {
    const wrapper = await mountForm({ initial: { ...VALID, winType: 'none' } })
    expect(Object.values(winFieldStates(wrapper)).every((state) => state.disabled)).toBe(true)
    expect(accordionExpanded(wrapper)).toBe(false)
  })

  it('当選済みの区間を開いた場合、連荘数〜当選後貸玉を活性にし、当選セクションを開いておく', async () => {
    const wrapper = await mountForm({
      initial: { ...VALID, winType: 'rush', continueCount: 3, wonBalls: 4500, postWinHeldBalls: 4500, postWinRentalBalls: 0 }
    })
    expect(Object.values(winFieldStates(wrapper)).every((state) => !state.disabled)).toBe(true)
    expect(accordionExpanded(wrapper)).toBe(true)
  })

  it('「なし」以外に変更すると活性になり、連荘数は1、当選後持玉・当選後貸玉は0を初期値とする', async () => {
    const wrapper = await mountForm({ initial: { ...VALID, winType: 'none' } })
    await selectWinType(wrapper, 'rush')

    expect(winFieldStates(wrapper)).toEqual({
      'period-continue-count': { value: '1', disabled: false },
      'period-won-balls': { value: '0', disabled: false },
      'period-post-win-held-balls': { value: '0', disabled: false },
      'period-post-win-rental-balls': { value: '0', disabled: false }
    })
    expect(await submit(wrapper)).toMatchObject({ winType: 'rush', continueCount: 1, wonBalls: 0, postWinHeldBalls: 0, postWinRentalBalls: 0 })
  })

  it('「なし」以外の種別どうしで変更した場合は入力済みの値を保持する', async () => {
    const wrapper = await mountForm({
      initial: { ...VALID, winType: 'rush', continueCount: 3, wonBalls: 4500, postWinHeldBalls: 4500, postWinRentalBalls: 10 }
    })
    await selectWinType(wrapper, 'normal')

    expect(await submit(wrapper)).toMatchObject({ winType: 'normal', continueCount: 3, wonBalls: 4500, postWinHeldBalls: 4500, postWinRentalBalls: 10 })
  })

  it('「なし」に戻すと連荘数〜当選後貸玉の入力値を破棄して初期値に戻し、非活性にする', async () => {
    const wrapper = await mountForm({
      initial: { ...VALID, winType: 'rush', continueCount: 3, wonBalls: 4500, postWinHeldBalls: 4500, postWinRentalBalls: 10 }
    })
    await selectWinType(wrapper, 'none')

    expect(winFieldStates(wrapper)).toEqual({
      'period-continue-count': { value: '0', disabled: true },
      'period-won-balls': { value: '0', disabled: true },
      'period-post-win-held-balls': { value: '', disabled: true },
      'period-post-win-rental-balls': { value: '', disabled: true }
    })
    expect(await submit(wrapper)).toMatchObject({ winType: 'none', continueCount: 0, wonBalls: 0, postWinHeldBalls: null, postWinRentalBalls: null })
  })

  it('記録/修正ボタンは当選セクションの後に1つだけ配置する', async () => {
    const wrapper = await mountForm({ initial: VALID })
    const buttons = wrapper.findAll('button').filter((el) => el.text() === '記録')
    expect(buttons).toHaveLength(1)
    const accordion = wrapper.find('.p-accordion').element
    expect(accordion.compareDocumentPosition(buttons[0].element) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })
})
