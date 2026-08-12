export function useFormat() {
  function formatNumber(value) {
    return typeof value === 'number' ? value.toLocaleString('ja-JP') : String(value ?? '')
  }

  return { formatNumber }
}
