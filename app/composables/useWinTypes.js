const WIN_TYPES = [
  { id: 'none', label: 'なし' },
  { id: 'rush', label: 'RUSH' },
  { id: 'normal', label: '通常' },
  { id: 'charge', label: 'チャージ' }
]

export function useWinTypes() {
  function getWinTypeLabel(id) {
    return WIN_TYPES.find((w) => w.id === id)?.label ?? ''
  }

  return { winTypes: WIN_TYPES, getWinTypeLabel }
}
