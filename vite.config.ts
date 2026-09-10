import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
 
 
 
 // Step 5: Vite forwards /api/chat from port 5173 to the Express backend on port 3001 / 第五步：Vite 将 5173 端口的 /api/chat 请求转发到 3001 端口的 Express 后端。
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
