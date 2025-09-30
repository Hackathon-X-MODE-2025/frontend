import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,           // true == 0.0.0.0 — слушать все интерфейсы
    port: 5173,
    strictPort: false,    // если порт занят — выбрать другой

  },
  plugins: [react(), tailwindcss(),],
})
