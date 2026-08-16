<template>
  <div class="p-4">
    <h1 class="mb-4 text-xl font-bold">機種詳細</h1>
    <MachineForm v-if="machine" :initial="machine" submit-label="修正" :loading="updating" @submit="handleUpdate" />

    <div class="mt-6 flex justify-between">
      <Button label="戻る" text @click="goToList" />
      <Button label="削除" severity="danger" outlined @click="deleteDialogVisible = true" />
    </div>

    <p v-if="deleteError" class="mt-2 text-sm text-red-500">{{ deleteError }}</p>

    <Dialog v-model:visible="deleteDialogVisible" modal header="削除確認" :style="{ width: '20rem' }">
      <p>この機種を削除します。よろしいですか？</p>
      <template #footer>
        <Button label="キャンセル" text @click="deleteDialogVisible = false" />
        <Button label="削除" severity="danger" @click="handleDelete" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
const route = useRoute()
const machineId = Number(route.params.machineId)

const machine = ref(null)
const updating = ref(false)
const deleteDialogVisible = ref(false)
const deleteError = ref('')

async function load() {
  const db = useDb()
  machine.value = await db.machines.get(machineId)
}

onMounted(load)

async function handleUpdate(machineData) {
  updating.value = true
  try {
    const db = useDb()
    await db.machines.update(machineId, machineData)
    await load()
  } finally {
    updating.value = false
  }
}

async function goToList() {
  await navigateTo('/machines/')
}

async function handleDelete() {
  const db = useDb()
  const referencingCount = await db.records.where('machineId').equals(machineId).count()
  if (referencingCount > 0) {
    deleteError.value = 'この機種を使用している実績があるため削除できません。'
    deleteDialogVisible.value = false
    return
  }
  deleteError.value = ''
  await db.machines.delete(machineId)
  deleteDialogVisible.value = false
  await navigateTo('/machines/')
}
</script>
