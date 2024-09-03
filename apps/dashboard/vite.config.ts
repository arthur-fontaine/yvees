import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ui } from 'ui/vite'
import agrume from '@agrume/plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    agrume({
      logger: {
        error: console.error,
        info: console.info,
      }
    }),
    react(),
    ui(),
  ],
})
