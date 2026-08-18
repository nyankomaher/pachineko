import { fileURLToPath } from 'node:url'
import Aura from '@primeuix/themes/aura'

const baseURL = '/pachineko/'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  app: {
    baseURL,
    head: {
      title: 'パチネコ',
      titleTemplate: '%s - パチネコ',
      meta: [
        { name: 'description', content: 'パチンコの遊戯実績を記録、分析するアプリケーション「パチネコ」' }
      ],
      // ブラウザは既定でドメイン直下の /favicon.ico を探すため、サブパス配信では
      // 明示的にbaseURLを含んだhrefでlinkタグを指定しないとfaviconが表示されない。
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${baseURL}favicon.ico` }
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
        preset: Aura,
        options: {
          // PrimeVueのCSSをネイティブの@layerでラップする。TailwindCSSのユーティリティクラス
          // （layer化されていない通常のCSS）は、常にlayer化されたCSSより優先されるため、
          // これによりPrimeVueコンポーネントのスタイル（例: .p-buttonのposition）よりも
          // Tailwindのユーティリティクラス（例: fixed）が確実に優先されるようにする。
          // 本番ビルド（generate）でスタイルの注入順序が変わり、PrimeVue側が勝ってしまう
          // 問題への対策。
          cssLayer: true
        }
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
