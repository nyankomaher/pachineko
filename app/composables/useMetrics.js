export function useMetrics() {
  function calcDeemedInvestment({ investment, startHeldBalls, endHeldBalls, startRentalBalls, endRentalBalls }) {
    return investment + ((startHeldBalls - endHeldBalls) + (startRentalBalls - endRentalBalls)) * 4
  }

  function calcRotationsPer1000Yen(rotations, deemedInvestment) {
    if (deemedInvestment <= 0) return 0
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

  return { calcDeemedInvestment, calcRotationsPer1000Yen, formatRotationsPer1000Yen, formatElapsedTime }
}
