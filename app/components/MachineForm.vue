<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <label for="machine-name">機種名</label>
      <InputText id="machine-name" v-model="name" placeholder="機種名" fluid />
    </div>

    <Button
      :label="submitLabel"
      :loading="loading || submitting"
      :disabled="!isValid || loading || submitting"
      @click="handleSubmit"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  initial: { type: Object, default: null },
  submitLabel: { type: String, required: true },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['submit'])

const name = ref(props.initial?.name ?? '')
const submitting = ref(false)

const isValid = computed(() => !!name.value?.trim())

async function handleSubmit() {
  submitting.value = true
  try {
    emit('submit', { name: name.value.trim() })
  } finally {
    submitting.value = false
  }
}
</script>
