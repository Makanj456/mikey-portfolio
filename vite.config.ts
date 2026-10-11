import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://makanj456.github.io/mikey-portfolio/
  base: '/mikey-portfolio/',
  plugins: [react(), tailwindcss()],
  // three.js is lazy-loaded in its own ~130 kB (gzipped) chunk
  build: { chunkSizeWarningLimit: 700 },
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
})
