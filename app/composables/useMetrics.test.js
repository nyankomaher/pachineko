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

  it('calcInvestedBalls: 持玉・貸玉の増減から投資玉数を算出する', () => {
    const { calcInvestedBalls } = useMetrics()
    const result = calcInvestedBalls({
      startHeldBalls: 500,
      endHeldBalls: 200,
      startRentalBalls: 100,
      endRentalBalls: 50
    })
    expect(result).toBe((500 - 200) + (100 - 50))
  })

  it('calcInvestedBalls: 持玉・貸玉が増加した場合は負の値になる', () => {
    const { calcInvestedBalls } = useMetrics()
    const result = calcInvestedBalls({
      startHeldBalls: 0,
      endHeldBalls: 500,
      startRentalBalls: 0,
      endRentalBalls: 0
    })
    expect(result).toBe(-500)
  })

  it('calcActualInvestment: 投資金額に投資玉数×交換レートを加算する（区間投資の実質投資額）', () => {
    const { calcActualInvestment } = useMetrics()
    const result = calcActualInvestment({ investment: 3000, investedBalls: 1000, exchangeRate: 3.5 })
    expect(result).toBe(6500)
  })

  it('calcActualInvestment: 投資玉数が負の場合は投資金額から差し引かれる', () => {
    const { calcActualInvestment } = useMetrics()
    const result = calcActualInvestment({ investment: 3000, investedBalls: -500, exchangeRate: 3 })
    expect(result).toBe(1500)
  })

  it('calcActualInvestment: 小数点以下は四捨五入する', () => {
    const { calcActualInvestment } = useMetrics()
    expect(calcActualInvestment({ investment: 100, investedBalls: 1, exchangeRate: 3.55 })).toBe(104)
    expect(calcActualInvestment({ investment: 100, investedBalls: 1, exchangeRate: 3.44 })).toBe(103)
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

  it('calcRecordAggregates: 複数区間・当選種別混在を合算する', () => {
    const { calcRecordAggregates } = useMetrics()
    const periods = [
      {
        investment: 5000,
        startHeldBalls: 0,
        endHeldBalls: 0,
        startRentalBalls: 0,
        endRentalBalls: 0,
        startRotations: 0,
        endRotations: 500,
        winType: 'none',
        continueCount: 0,
        wonBalls: 0
      },
      {
        investment: 3000,
        startHeldBalls: 0,
        endHeldBalls: 200,
        startRentalBalls: 0,
        endRentalBalls: 0,
        startRotations: 500,
        endRotations: 700,
        winType: 'rush',
        continueCount: 3,
        wonBalls: 1500
      },
      {
        investment: 0,
        startHeldBalls: 1500,
        endHeldBalls: 0,
        startRentalBalls: 0,
        endRentalBalls: 0,
        startRotations: 0,
        endRotations: 300,
        winType: 'charge',
        continueCount: 0,
        wonBalls: 0
      }
    ]

    const result = calcRecordAggregates(periods)

    expect(result.totalInvestment).toBe(8000)
    expect(result.totalInvestedBalls).toBe(1300)
    expect(result.finalHeldBalls).toBe(0)
    expect(result.totalRotations).toBe(1000)
    expect(result.rushWinCount).toBe(1)
    expect(result.normalWinCount).toBe(0)
    expect(result.chargeWinCount).toBe(1)
    expect(result.totalContinueCount).toBe(3)
    expect(result.totalWonBalls).toBe(1500)
    expect(result.totalRotationsPer1000Yen).toBeCloseTo(1000 / (13200 / 1000))
  })

  it('calcRecordAggregates: 最後の区間実績に当選後持玉が入力されていれば最終持玉に優先反映する', () => {
    const { calcRecordAggregates } = useMetrics()
    const periods = [
      {
        investment: 1000,
        startHeldBalls: 0,
        endHeldBalls: 100,
        startRentalBalls: 0,
        endRentalBalls: 0,
        startRotations: 0,
        endRotations: 100,
        winType: 'rush',
        continueCount: 1,
        wonBalls: 1000,
        postWinHeldBalls: 800
      }
    ]

    const result = calcRecordAggregates(periods)

    expect(result.finalHeldBalls).toBe(800)
  })

  it('calcRecordAggregates: 最後の区間実績の当選後持玉が未入力なら終了持玉を最終持玉とする', () => {
    const { calcRecordAggregates } = useMetrics()
    const periods = [
      {
        investment: 1000,
        startHeldBalls: 0,
        endHeldBalls: 100,
        startRentalBalls: 0,
        endRentalBalls: 0,
        startRotations: 0,
        endRotations: 100,
        winType: 'none',
        continueCount: 0,
        wonBalls: 0,
        postWinHeldBalls: null
      }
    ]

    const result = calcRecordAggregates(periods)

    expect(result.finalHeldBalls).toBe(100)
  })

  it('calcRecordAggregates: 区間実績が無ければ全て0を返す', () => {
    const { calcRecordAggregates } = useMetrics()
    const result = calcRecordAggregates([])
    expect(result.totalInvestment).toBe(0)
    expect(result.totalRotations).toBe(0)
    expect(result.totalRotationsPer1000Yen).toBe(0)
  })

  it('groupPeriodsByBigWin: RUSH/通常ごとに区間実績をグルーピングし、チャージは区切りにしない', () => {
    const { groupPeriodsByBigWin } = useMetrics()
    const periods = [
      {
        startTime: '2026-08-10T10:00:00.000Z',
        endTime: '2026-08-10T10:10:00.000Z',
        investment: 1000,
        startHeldBalls: 0,
        endHeldBalls: 0,
        startRentalBalls: 0,
        endRentalBalls: 0,
        startRotations: 0,
        endRotations: 100,
        winType: 'none',
        continueCount: 0,
        wonBalls: 0
      },
      {
        startTime: '2026-08-10T10:10:00.000Z',
        endTime: '2026-08-10T10:20:00.000Z',
        investment: 2000,
        startHeldBalls: 0,
        endHeldBalls: 0,
        startRentalBalls: 0,
        endRentalBalls: 0,
        startRotations: 100,
        endRotations: 200,
        winType: 'rush',
        continueCount: 3,
        wonBalls: 1500
      },
      {
        startTime: '2026-08-10T10:20:00.000Z',
        endTime: '2026-08-10T10:25:00.000Z',
        investment: 0,
        startHeldBalls: 500,
        endHeldBalls: 0,
        startRentalBalls: 0,
        endRentalBalls: 0,
        startRotations: 0,
        endRotations: 50,
        winType: 'charge',
        continueCount: 0,
        wonBalls: 500
      },
      {
        startTime: '2026-08-10T10:25:00.000Z',
        endTime: '2026-08-10T10:30:00.000Z',
        investment: 500,
        startHeldBalls: 0,
        endHeldBalls: 0,
        startRentalBalls: 0,
        endRentalBalls: 0,
        startRotations: 50,
        endRotations: 150,
        winType: 'normal',
        continueCount: 2,
        wonBalls: 800
      }
    ]

    const result = groupPeriodsByBigWin(periods)

    expect(result).toHaveLength(2)

    expect(result[0].startTime).toBe('2026-08-10T10:00:00.000Z')
    expect(result[0].endTime).toBe('2026-08-10T10:20:00.000Z')
    expect(result[0].investment).toBe(3000)
    expect(result[0].rotations).toBe(200)
    expect(result[0].winType).toBe('rush')
    expect(result[0].continueCount).toBe(3)
    expect(result[0].wonBalls).toBe(1500)

    expect(result[1].startTime).toBe('2026-08-10T10:20:00.000Z')
    expect(result[1].endTime).toBe('2026-08-10T10:30:00.000Z')
    expect(result[1].investment).toBe(500)
    expect(result[1].investedBalls).toBe(500)
    expect(result[1].rotations).toBe(150)
    expect(result[1].winType).toBe('normal')
    expect(result[1].continueCount).toBe(2)
    expect(result[1].wonBalls).toBe(1300)
  })

  it('groupPeriodsByBigWin: 大当たりせず終了した場合は末尾の区間実績を「なし」の当選実績として追加する', () => {
    const { groupPeriodsByBigWin } = useMetrics()
    const periods = [
      {
        startTime: '2026-08-10T10:00:00.000Z',
        endTime: '2026-08-10T10:10:00.000Z',
        investment: 1000,
        startHeldBalls: 0,
        endHeldBalls: 0,
        startRentalBalls: 0,
        endRentalBalls: 0,
        startRotations: 0,
        endRotations: 100,
        winType: 'rush',
        continueCount: 1,
        wonBalls: 1000
      },
      {
        startTime: '2026-08-10T10:10:00.000Z',
        endTime: '2026-08-10T10:20:00.000Z',
        investment: 2000,
        startHeldBalls: 0,
        endHeldBalls: 0,
        startRentalBalls: 0,
        endRentalBalls: 0,
        startRotations: 100,
        endRotations: 150,
        winType: 'none',
        continueCount: 0,
        wonBalls: 0
      }
    ]

    const result = groupPeriodsByBigWin(periods)

    expect(result).toHaveLength(2)
    expect(result[0].winType).toBe('rush')
    expect(result[1].winType).toBe('none')
    expect(result[1].investment).toBe(2000)
    expect(result[1].startTime).toBe('2026-08-10T10:10:00.000Z')
    expect(result[1].endTime).toBe('2026-08-10T10:20:00.000Z')
    expect(result[1].wonBalls).toBe(0)
  })

  it('groupPeriodsByBigWin: 大当たりが1件も無ければ全区間実績を1件の「なし」当選実績にまとめる', () => {
    const { groupPeriodsByBigWin } = useMetrics()
    const periods = [
      {
        startTime: '2026-08-10T10:00:00.000Z',
        endTime: '2026-08-10T10:10:00.000Z',
        investment: 1000,
        startHeldBalls: 0,
        endHeldBalls: 0,
        startRentalBalls: 0,
        endRentalBalls: 0,
        startRotations: 0,
        endRotations: 100,
        winType: 'none',
        continueCount: 0,
        wonBalls: 0
      }
    ]

    const result = groupPeriodsByBigWin(periods)

    expect(result).toHaveLength(1)
    expect(result[0].winType).toBe('none')
  })

  it('groupPeriodsByBigWin: 区間実績が無ければ空配列を返す', () => {
    const { groupPeriodsByBigWin } = useMetrics()
    expect(groupPeriodsByBigWin([])).toEqual([])
  })

  it('validateRentalBallsForEnd: 区間実績が無ければエラーなし', () => {
    const { validateRentalBallsForEnd } = useMetrics()
    expect(validateRentalBallsForEnd(null)).toBeNull()
  })

  it('validateRentalBallsForEnd: 当選後貸玉が未入力で終了貸玉が0でなければ終了貸玉のエラーを返す', () => {
    const { validateRentalBallsForEnd } = useMetrics()
    const error = validateRentalBallsForEnd({ endRentalBalls: 5, postWinRentalBalls: null })
    expect(error).toBe('終了貸玉が0ではないため終了できません。区間実績を修正してください。')
  })

  it('validateRentalBallsForEnd: 当選後貸玉が入力されていれば終了貸玉が0でなくてもそちらを優先して判定する', () => {
    const { validateRentalBallsForEnd } = useMetrics()
    expect(validateRentalBallsForEnd({ endRentalBalls: 5, postWinRentalBalls: 0 })).toBeNull()
  })

  it('validateRentalBallsForEnd: 当選後貸玉が入力されていて0でなければ当選後貸玉のエラーを返す', () => {
    const { validateRentalBallsForEnd } = useMetrics()
    const error = validateRentalBallsForEnd({ endRentalBalls: 0, postWinRentalBalls: 3 })
    expect(error).toBe('当選後貸玉が0ではないため終了できません。区間実績を修正してください。')
  })

  it('validateRentalBallsForEnd: 終了貸玉・当選後貸玉ともに0ならエラーなし', () => {
    const { validateRentalBallsForEnd } = useMetrics()
    expect(validateRentalBallsForEnd({ endRentalBalls: 0, postWinRentalBalls: null })).toBeNull()
  })
})
