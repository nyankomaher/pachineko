import { describe, expect, it } from 'vitest'

describe('useMetrics', () => {
  it('calcDeemedInvestment: 投資金額に持玉・貸玉の増減を加味する', () => {
    const { calcDeemedInvestment } = useMetrics()
    const result = calcDeemedInvestment({
      investment: 10000,
      startHeldBalls: 500,
      endHeldBalls: 200,
      startRentalBalls: 0,
      endRentalBalls: 0
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

  it('formatRotationsPer1000Yen: 数値を小数点1桁の文字列に整形する', () => {
    const { formatRotationsPer1000Yen } = useMetrics()
    expect(formatRotationsPer1000Yen(20)).toBe('20.0')
    expect(formatRotationsPer1000Yen(20.34)).toBe('20.3')
  })

  it('formatRotationsPer1000Yen: 数値以外は0.0を返す', () => {
    const { formatRotationsPer1000Yen } = useMetrics()
    expect(formatRotationsPer1000Yen(undefined)).toBe('0.0')
    expect(formatRotationsPer1000Yen(null)).toBe('0.0')
  })

  it('formatElapsedTime: 開始時刻と終了時刻の差分を「◯時間◯分」形式にする', () => {
    const { formatElapsedTime } = useMetrics()
    const start = new Date('2026-08-10T10:00:00')
    const end = new Date('2026-08-10T11:23:00')
    expect(formatElapsedTime(start.toISOString(), end)).toBe('1時間23分')
  })

  it('formatElapsedTime: 1時間未満は分のみ表示する', () => {
    const { formatElapsedTime } = useMetrics()
    const start = new Date('2026-08-10T10:00:00')
    const end = new Date('2026-08-10T10:45:00')
    expect(formatElapsedTime(start.toISOString(), end)).toBe('45分')
  })

  it('formatElapsedTime: 開始時刻が無ければ空文字を返す', () => {
    const { formatElapsedTime } = useMetrics()
    expect(formatElapsedTime(null, new Date())).toBe('')
  })
})
