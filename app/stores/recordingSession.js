import { defineStore } from 'pinia'

const STORAGE_KEY = 'pachineko:recordingSession'

export const useRecordingSessionStore = defineStore('recordingSession', {
  state: () => ({
    recordId: null
  }),

  getters: {
    isRecording: (state) => state.recordId !== null
  },

  actions: {
    start(recordId) {
      this.recordId = recordId
      this.persist()
    },

    end() {
      this.recordId = null
      this.persist()
    },

    async finishRecording(recordId) {
      const db = useDb()
      const { calcNetInvestment, calcBalance } = useMetrics()
      const record = await db.records.get(recordId)
      const netInvestment = calcNetInvestment({
        investment: record.totalInvestment,
        investedSavedBalls: record.totalInvestedSavedBalls,
        exchangeRate: record.exchangeRate
      })
      const balance = calcBalance({
        finalHeldBalls: record.finalHeldBalls,
        exchangeRate: record.exchangeRate,
        netInvestment
      })
      await db.records.update(recordId, { endTime: new Date().toISOString(), balance })
      this.end()
    },

    hydrate() {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const data = JSON.parse(raw)
      this.recordId = data.recordId ?? null
    },

    persist() {
      if (this.recordId === null) {
        localStorage.removeItem(STORAGE_KEY)
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ recordId: this.recordId }))
      }
    }
  }
})
