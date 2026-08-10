import { describe, expect, it } from 'vitest'

describe('useMetrics', () => {
  it('calcDeemedInvestment: 投資金額に持玉・貸玉の増減を加味する', () => {
    const { calcDeemedInvestment } = useMetrics()
    const result = calcDeemedInvestment({
      investment: 10000,
      startMochidama: 500,
      endMochidama: 200,
      startKashidama: 0,
      endKashidama: 0
    })
    expect(result).toBe(10000 + (500 - 200) * 4)
  })

  it('calcRotationsPer1000Yen: みなし投資金額1000円あたりの回転数を算出する', () => {
    const { calcRotationsPer1000Yen } = useMetrics()
    expect(calcRotationsPer1000Yen(300, 15000)).toBeCloseTo(20)
  })

  it('calcRotationsPer1000Yen: みなし投資金額が0以下なら0を返す', () => {
    const { calcRotationsPer1000Yen } = useMetrics()
    expect(calcRotationsPer1000Yen(300, 0)).toBe(0)
  })
})
