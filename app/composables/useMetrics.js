export function useMetrics() {
  function calcDeemedInvestment({ investment, startHeldBalls, endHeldBalls, startRentalBalls, endRentalBalls }) {
    return investment + ((startHeldBalls - endHeldBalls) + (startRentalBalls - endRentalBalls)) * 4
  }

  function calcInvestedBalls({ startHeldBalls, endHeldBalls, startRentalBalls, endRentalBalls }) {
    return (startHeldBalls - endHeldBalls) + (startRentalBalls - endRentalBalls)
  }

  function calcActualInvestment({ investment, investedBalls, exchangeRate }) {
    return Math.round(investment + investedBalls * exchangeRate)
  }

  function calcRotationsPer1000Yen(rotations, deemedInvestment) {
    if (deemedInvestment <= 0 || rotations <= 0) return 0
    return rotations / (deemedInvestment / 1000)
  }

  function formatRotationsPer1000Yen(value) {
    return typeof value === 'number' ? value.toFixed(1) : '0.0'
  }

  function formatElapsedTime(startTime, endTime) {
    if (!startTime) return ''
    const diffMs = endTime.getTime() - new Date(startTime).getTime()
    const totalMinutes = Math.max(0, Math.floor(diffMs / 60000))
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return hours > 0 ? `${hours}時間${minutes}分` : `${minutes}分`
  }

  function calcRecordAggregates(periods) {
    const totals = {
      totalInvestment: 0,
      totalInvestedBalls: 0,
      finalHeldBalls: 0,
      totalRotations: 0,
      rushWinCount: 0,
      normalWinCount: 0,
      chargeWinCount: 0,
      totalContinueCount: 0,
      totalWonBalls: 0
    }

    for (const period of periods) {
      totals.totalInvestment += period.investment
      totals.totalInvestedBalls += (period.startHeldBalls - period.endHeldBalls) + (period.startRentalBalls - period.endRentalBalls)
      totals.totalRotations += period.endRotations - period.startRotations
      totals.finalHeldBalls = period.postWinHeldBalls != null ? period.postWinHeldBalls : period.endHeldBalls
      totals.totalContinueCount += period.continueCount
      totals.totalWonBalls += period.wonBalls
      if (period.winType === 'rush') totals.rushWinCount += 1
      else if (period.winType === 'normal') totals.normalWinCount += 1
      else if (period.winType === 'charge') totals.chargeWinCount += 1
    }

    const deemedInvestment = totals.totalInvestment + totals.totalInvestedBalls * 4
    totals.totalRotationsPer1000Yen = calcRotationsPer1000Yen(totals.totalRotations, deemedInvestment)

    return totals
  }

  function isBigWin(winType, includeCharge) {
    return winType === 'rush' || winType === 'normal' || (includeCharge && winType === 'charge')
  }

  function groupPeriodsByBigWin(periods, includeCharge = false) {
    const groups = []
    let current = []

    for (const period of periods) {
      current.push(period)
      if (isBigWin(period.winType, includeCharge)) {
        groups.push(current)
        current = []
      }
    }
    if (current.length > 0) {
      groups.push(current)
    }

    return groups.map((group) => {
      const investment = group.reduce((sum, period) => sum + period.investment, 0)
      const investedBalls = group.reduce((sum, period) => sum + calcInvestedBalls(period), 0)
      const rotations = group.reduce((sum, period) => sum + (period.endRotations - period.startRotations), 0)
      const continueCount = group.reduce((sum, period) => sum + period.continueCount, 0)
      const wonBalls = group.reduce((sum, period) => sum + period.wonBalls, 0)
      const deemedInvestment = investment + investedBalls * 4
      const last = group[group.length - 1]
      const winType = isBigWin(last.winType, includeCharge) ? last.winType : 'none'

      return {
        startTime: group[0].startTime,
        endTime: last.endTime,
        investment,
        investedBalls,
        rotations,
        rotationsPer1000Yen: calcRotationsPer1000Yen(rotations, deemedInvestment),
        winType,
        wonBalls,
        continueCount
      }
    })
  }

  function calcBalance({ finalHeldBalls, exchangeRate, investment, investedBalls }) {
    return Math.round(finalHeldBalls * exchangeRate - (investment + Math.max(investedBalls, 0) * exchangeRate))
  }

  function validateRentalBallsForEnd(period) {
    if (!period) return null
    const usesPostWin = period.postWinRentalBalls != null
    const finalRentalBalls = usesPostWin ? period.postWinRentalBalls : period.endRentalBalls
    if (finalRentalBalls === 0) return null
    return usesPostWin
      ? '当選後貸玉が0ではないため終了できません。区間実績を修正してください。'
      : '終了貸玉が0ではないため終了できません。区間実績を修正してください。'
  }

  return { calcDeemedInvestment, calcInvestedBalls, calcActualInvestment, calcRotationsPer1000Yen, formatRotationsPer1000Yen, formatElapsedTime, calcRecordAggregates, groupPeriodsByBigWin, calcBalance, validateRentalBallsForEnd }
}
