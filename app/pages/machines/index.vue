<template>
  <div class="flex flex-col gap-4 p-4">
    <h1 class="text-xl font-bold">機種一覧</h1>

    <div>
      <Button label="新規登録" @click="goToCreate" />
    </div>

    <p v-if="machines.length === 0" class="text-sm text-zinc-500">登録された機種がありません。</p>

    <div v-else class="p-datatable p-component machines-table">
      <div class="p-datatable-table-container">
        <table class="p-datatable-table">
          <thead class="p-datatable-thead">
            <tr>
              <th>機種名</th>
              <th/>
            </tr>
          </thead>
          <draggable
            v-model="machines"
            tag="tbody"
            class="p-datatable-tbody"
            item-key="id"
            handle=".drag-handle"
            @end="handleReorder"
          >
            <template #item="{ element }">
              <tr class="cursor-pointer" @click="goToMachine(element.id)">
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

const machines = ref([])

async function load() {
  const db = useDb()
  machines.value = await db.machines.orderBy('order').toArray()
}

onMounted(load)

async function handleReorder() {
  const db = useDb()
  const reordered = machines.value.map((machine, index) => ({ ...machine, order: index }))
  machines.value = reordered
  await db.machines.bulkPut(reordered)
}

async function goToCreate() {
  await navigateTo('/machines/create')
}

async function goToMachine(machineId) {
  await navigateTo(`/machines/${machineId}`)
}
</script>

<style scoped>
.machines-table :deep(th),
.machines-table :deep(td) {
  white-space: normal;
  overflow-wrap: break-word;
}
</style>
