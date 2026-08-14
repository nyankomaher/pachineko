<template>
  <div class="flex h-screen flex-col overflow-hidden bg-zinc-50 dark:bg-zinc-950">
    <Button
      class="fixed right-4 top-4 z-[2000]"
      rounded
      text
      severity="secondary"
      aria-label="メニュー"
      @click="navVisible = !navVisible"
    >
      <template #icon>
        <TimesIcon v-if="navVisible" />
        <BarsIcon v-else />
      </template>
    </Button>

    <main class="flex flex-1 flex-col overflow-y-auto">
      <slot />
    </main>

    <Drawer v-model:visible="navVisible" position="left" header="メニュー" class="w-64">
      <nav class="flex flex-col gap-1">
        <NuxtLink
          v-for="tab in tabs"
          :key="tab.to"
          :to="tab.to"
          class="rounded px-3 py-2 text-zinc-700 dark:text-zinc-300"
          active-class="font-semibold text-[var(--p-primary-color)]"
          @click="navVisible = false"
        >
          {{ tab.label }}
        </NuxtLink>
      </nav>
    </Drawer>
  </div>
</template>

<script setup>
import BarsIcon from '@primevue/icons/bars'
import TimesIcon from '@primevue/icons/times'

const navVisible = ref(false)

const tabs = [
  { to: '/', label: 'TOP' },
  { to: '/records/', label: '履歴' },
  { to: '/analysis/', label: '分析' },
  { to: '/settings/', label: '設定' },
  { to: '/halls/', label: '店舗一覧' }
]
</script>
