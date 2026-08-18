import { defineStore } from 'pinia'

const STORAGE_KEY = 'pachineko:exchangeRateOptions'
const DEFAULT_OPTIONS = [3.5, 4.0]

export const useExchangeRateOptionsStore = defineStore('exchangeRateOptions', {
  state: () => ({
    options: [...DEFAULT_OPTIONS]
  }),

  getters: {
    defaultOptions: () => [...DEFAULT_OPTIONS]
  },

  actions: {
    hydrate() {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const data = JSON.parse(raw)
      if (Array.isArray(data) && data.length > 0) {
        this.options = data
      }
    },

    save(options) {
      this.options = options
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.options))
    }
  }
})
