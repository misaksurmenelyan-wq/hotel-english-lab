import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
  },
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  devtools: {
    enabled: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
