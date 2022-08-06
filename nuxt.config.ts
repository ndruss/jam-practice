import { defineNuxtConfig } from "nuxt"
import eslintPlugin from "vite-plugin-eslint";

export default defineNuxtConfig({

  runtimeConfig: {
    notion: {
      secretKey: process.env.NOTION_SECRET_KEY,
      databaseId: process.env.NOTION_DATABASE_ID,
    },
    spotify: {
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    },
    foo: 'barf'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/styles/main.css'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'interactjs'
    ]
  },

  vite: {
    plugins: [eslintPlugin()]
  }
})
