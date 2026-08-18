<template>
  <div class="p-4">
    <h1 class="mb-4 text-xl font-bold">店舗詳細</h1>
    <HallForm v-if="hall" :initial="hall" submit-label="修正" :loading="updating" @submit="handleUpdate" />

    <div class="mt-6 flex justify-between">
      <Button label="戻る" text @click="goToList" />
      <Button label="削除" severity="danger" outlined @click="deleteDialogVisible = true" />
    </div>

    <p v-if="deleteError" class="mt-2 text-sm text-red-500">{{ deleteError }}</p>

    <Dialog v-model:visible="deleteDialogVisible" modal header="削除確認" :style="{ width: '20rem' }">
      <p>この店舗を削除します。よろしいですか？</p>
      <template #footer>
        <Button label="キャンセル" text @click="deleteDialogVisible = false" />
        <Button label="削除" severity="danger" @click="handleDelete" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
useSeoMeta({
  title: '店舗詳細',
  description: '店舗の詳細を表示・編集します。'
})

const route = useRoute()
const hallId = Number(route.params.hallId)
const toast = useToast()

const hall = ref(null)
const updating = ref(false)
const deleteDialogVisible = ref(false)
const deleteError = ref('')

async function load() {
  const db = useDb()
  hall.value = await db.halls.get(hallId)
}

onMounted(load)

async function handleUpdate(hallData) {
  updating.value = true
  try {
    const db = useDb()
    await db.halls.update(hallId, hallData)
    await load()
    toast.add({ severity: 'success', summary: '修正しました', life: 3000 })
  } finally {
    updating.value = false
  }
}

async function goToList() {
  await navigateTo('/halls/')
}

async function handleDelete() {
  const db = useDb()
  const referencingCount = await db.records.where('hallId').equals(hallId).count()
  if (referencingCount > 0) {
    deleteError.value = 'この店舗を使用している実績があるため削除できません。'
    deleteDialogVisible.value = false
    return
  }
  deleteError.value = ''
  await db.halls.delete(hallId)
  deleteDialogVisible.value = false
  await navigateTo('/halls/')
}
</script>
