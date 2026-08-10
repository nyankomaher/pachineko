export default defineNuxtPlugin(() => {
  const store = useRecordingSessionStore()
  store.hydrate()
})
