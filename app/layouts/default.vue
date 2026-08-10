<template>
  <div class="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
    <main class="flex-1 overflow-y-auto pb-16">
      <slot />
    </main>
    <nav class="fixed inset-x-0 bottom-0 flex border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <NuxtLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        class="flex flex-1 flex-col items-center gap-1 py-2 text-xs text-zinc-500 dark:text-zinc-400"
        active-class="text-primary-500 dark:text-primary-400"
      >
        <span>{{ tab.label }}</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
const tabs = [
  { to: '/', label: 'TOP' },
  { to: '/records/', label: '履歴' },
  { to: '/analysis/', label: '分析' },
  { to: '/settings/', label: '設定' }
]
</script>
