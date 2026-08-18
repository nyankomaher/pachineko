import { fileURLToPath } from 'node:url'
import Aura from '@primeuix/themes/aura'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  app: {
    baseURL: '/pachineko/',
    head: {
      title: 'パチネコ',
      titleTemplate: '%s - パチネコ',
      meta: [
        { name: 'description', content: 'パチンコの遊戯実績を記録、分析するアプリケーション「パチネコ」' }
      ]
    }
  },

  devServer: {
    port: 54080
  },

  nitro: {
    output: {
      publicDir: fileURLToPath(new URL('./docs', import.meta.url))
    }
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt'
  ],

  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'パチネコ',
      short_name: 'パチネコ',
      description: 'パチンコの遊戯実績を記録、分析するアプリケーション',
      theme_color: '#18181b',
      background_color: '#18181b',
      display: 'standalone',
      icons: [
        {
          src: 'icons/icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
})
