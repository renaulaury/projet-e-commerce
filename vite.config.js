import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // en dev, les appels /api partent vers le serveur Node (backend/index.js)
  server: {
    proxy: {
      '/api': 'http://localhost:4242',
    },
  },
})
