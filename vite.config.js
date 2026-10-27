import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { imageDimensionsPlugin } from './scripts/image-dimensions-plugin.mjs'
import { catalogDevPlugin } from './scripts/catalog-dev-plugin.mjs'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  define: {
    'import.meta.env.BUILD_YEAR': JSON.stringify(new Date().getUTCFullYear()),
  },
  build: { manifest: true },
  plugins: [
    imageDimensionsPlugin(),
    catalogDevPlugin(),
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react()
  ],
})
