import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base path ensures site works seamlessly whether uploaded to root or any subfolder created by supervisor
  base: './',
})


