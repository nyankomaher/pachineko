export function useMetrics() {
  function calcDeemedInvestment({ investment, startHeldBalls, endHeldBalls, startRentalBalls, endRentalBalls }) {
    return investment + ((startHeldBalls - endHeldBalls) + (startRentalBalls - endRentalBalls)) * 4
  }

  function calcRotationsPer1000Yen(rotations, deemedInvestment) {
    if (deemedInvestment <= 0) return 0
    return rotations / (deemedInvestment / 1000)
  }

  return { calcDeemedInvestment, calcRotationsPer1000Yen }
}
