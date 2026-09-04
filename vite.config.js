import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ccs_app/', // important for project pages hosted at /ccs_app/
  plugins: [react()]
})