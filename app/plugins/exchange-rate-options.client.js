export default defineNuxtPlugin(() => {
  const store = useExchangeRateOptionsStore()
  store.hydrate()
})
