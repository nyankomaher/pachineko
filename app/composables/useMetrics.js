export function useMetrics() {
  function calcDeemedInvestment({ investment, startHeldBalls, endHeldBalls, startRentalBalls, endRentalBalls }) {
    return investment + ((startHeldBalls - endHeldBalls) + (startRentalBalls - endRentalBalls)) * 4
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

  function validateRentalBallsForEnd(period) {
    if (!period) return null
    const usesPostWin = period.postWinRentalBalls != null
    const finalRentalBalls = usesPostWin ? period.postWinRentalBalls : period.endRentalBalls
    if (finalRentalBalls === 0) return null
    return usesPostWin
      ? '当選後貸玉が0ではないため終了できません。区間実績を修正してください。'
      : '終了貸玉が0ではないため終了できません。区間実績を修正してください。'
  }

  return { calcDeemedInvestment, calcRotationsPer1000Yen, formatRotationsPer1000Yen, formatElapsedTime, calcRecordAggregates, validateRentalBallsForEnd }
}
