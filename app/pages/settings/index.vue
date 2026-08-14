<template>
  <div class="flex flex-col gap-4 p-4">
    <h1 class="text-xl font-bold">設定</h1>

    <section class="flex flex-col gap-2">
      <h2 class="font-semibold">交換レート</h2>
      <label for="exchange-rate-chips">選択肢（円/玉）</label>
      <InputChips
        id="exchange-rate-chips"
        v-model="chips"
        :allow-duplicate="false"
        separator=","
        fluid
        @add="handleAdd"
      >
        <template #chipicon="{ class: iconClass, index, removeCallback }">
          <TimesIcon v-if="chips.length > 1" :class="iconClass" @click="removeCallback($event, index)" />
        </template>
      </InputChips>

      <Button label="登録" class="mt-2" @click="handleSave" />
      <p v-if="saved" class="text-sm text-zinc-500">保存しました。</p>
    </section>
  </div>
</template>

<script setup>
import TimesIcon from '@primevue/icons/times'

const store = useExchangeRateOptionsStore()
const chips = ref(store.options.map((value) => String(value)))
const saved = ref(false)

function handleAdd(event) {
  const seenNumbers = new Set()
  const cleaned = []
  for (const raw of event.value) {
    const num = Number(raw)
    const isValidNumber = raw !== '' && Number.isFinite(num)
    if (!isValidNumber || seenNumbers.has(num)) continue
    seenNumbers.add(num)
    cleaned.push(raw)
  }
  chips.value = cleaned
  saved.value = false
}

function handleSave() {
  store.save(chips.value.map((value) => Number(value)))
  saved.value = true
}
</script>
