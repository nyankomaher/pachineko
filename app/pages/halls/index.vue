<template>
  <div class="flex flex-col gap-4 p-4">
    <h1 class="text-xl font-bold">店舗一覧</h1>

    <div>
      <Button label="新規登録" @click="goToCreate" />
    </div>

    <p v-if="halls.length === 0" class="text-sm text-zinc-500">登録された店舗がありません。</p>

    <div v-else class="p-datatable p-component halls-table">
      <div class="p-datatable-table-container">
        <table class="p-datatable-table">
          <thead class="p-datatable-thead">
            <tr>
              <th>店舗名</th>
              <th/>
            </tr>
          </thead>
          <draggable
            v-model="halls"
            tag="tbody"
            class="p-datatable-tbody"
            item-key="id"
            handle=".drag-handle"
            @end="handleReorder"
          >
            <template #item="{ element }">
              <tr class="cursor-pointer" @click="goToHall(element.id)">
                <td class="break-words">{{ element.name }}</td>
                <td class="text-right">
                  <span class="drag-handle inline-flex cursor-move p-2 text-zinc-400" @click.stop>
                    <BarsIcon />
                  </span>
                </td>
              </tr>
            </template>
          </draggable>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable'
import BarsIcon from '@primevue/icons/bars'

useSeoMeta({
  title: '店舗一覧',
  description: '登録した店舗を一覧で確認・並び替えできます。'
})

const halls = ref([])

async function load() {
  const db = useDb()
  halls.value = await db.halls.orderBy('order').toArray()
}

onMounted(load)

async function handleReorder() {
  const db = useDb()
  const reordered = halls.value.map((hall, index) => ({ ...hall, order: index }))
  halls.value = reordered
  await db.halls.bulkPut(reordered)
}

async function goToCreate() {
  await navigateTo('/halls/create')
}

async function goToHall(hallId) {
  await navigateTo(`/halls/${hallId}`)
}
</script>

<style scoped>
.halls-table :deep(th),
.halls-table :deep(td) {
  white-space: normal;
  overflow-wrap: break-word;
}
</style>
