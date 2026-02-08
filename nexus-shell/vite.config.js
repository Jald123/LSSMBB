import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    fs: {
      // Allow serving files from one level up to access 04-STATISTICS-TOOLS and 02-TEMPLATES
      allow: ['..'],
    },
  },
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, '..'),
    },
  },
})
