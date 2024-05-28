import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ui } from 'ui/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ui(),
  ],
})
