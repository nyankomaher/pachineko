export function useMetrics() {
  function calcDeemedInvestment({ investment, startMochidama, endMochidama, startKashidama, endKashidama }) {
    return investment + ((startMochidama - endMochidama) + (startKashidama - endKashidama)) * 4
  }

  function calcRotationsPer1000Yen(rotations, deemedInvestment) {
    if (deemedInvestment <= 0) return 0
    return rotations / (deemedInvestment / 1000)
  }

  return { calcDeemedInvestment, calcRotationsPer1000Yen }
}
