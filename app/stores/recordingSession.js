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
