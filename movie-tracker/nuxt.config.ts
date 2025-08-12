// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-08-11', // Fix for Nuxt 4 → Nitro 2.12+ runtime resolution
  devtools: { enabled: true },
  ssr: true,
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  css: ['@/assets/css/main.css'],

  runtimeConfig: {
    public: {
      tmdbApiKey: process.env.TMDB_API_KEY || 'YOUR_TMDB_API_KEY_HERE',
      tmdbBaseUrl: 'https://api.themoviedb.org/3',
      tmdbImageBaseUrl: 'https://image.tmdb.org/t/p'
    }
  },

  app: {
    head: {
      title: 'Movie Tracker',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Track your favorite movies and TV shows' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  nitro: {
    preset: 'node-server',
    esbuild: {
      options: {
        target: 'es2020'
      }
    }
  }
})
