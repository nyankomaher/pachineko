<template>
  <div class="p-4">
    <h1 class="mb-4 text-xl font-bold">機種詳細(新規)</h1>
    <MachineForm submit-label="登録" :loading="creating" @submit="handleCreate" />
  </div>
</template>

<script setup>
useSeoMeta({
  title: '機種を登録',
  description: '新しい機種を登録します。'
})

const creating = ref(false)

async function handleCreate(machineData) {
  creating.value = true
  try {
    const db = useDb()
    const existing = await db.machines.toArray()
    const maxOrder = existing.reduce((max, machine) => Math.max(max, machine.order ?? -1), -1)
    await db.machines.add({ ...machineData, order: maxOrder + 1 })
    await navigateTo('/machines/')
  } finally {
    creating.value = false
  }
}
</script>
