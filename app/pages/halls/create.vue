<template>
  <div class="p-4">
    <h1 class="mb-4 text-xl font-bold">店舗詳細(新規)</h1>
    <HallForm submit-label="登録" :loading="creating" @submit="handleCreate" />
  </div>
</template>

<script setup>
useSeoMeta({
  title: '店舗を登録',
  description: '新しい店舗を登録します。'
})

const creating = ref(false)

async function handleCreate(hallData) {
  creating.value = true
  try {
    const db = useDb()
    const existing = await db.halls.toArray()
    const maxOrder = existing.reduce((max, hall) => Math.max(max, hall.order ?? -1), -1)
    await db.halls.add({ ...hallData, order: maxOrder + 1 })
    await navigateTo('/halls/')
  } finally {
    creating.value = false
  }
}
</script>
