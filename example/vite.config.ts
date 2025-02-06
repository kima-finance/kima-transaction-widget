import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf'],
  resolve: {
    alias: {
      '@kimafinance/kima-transaction-widget': path.resolve(__dirname, '../dist')
    }
  },
  server: {
    fs: {
      allow: ['..'] // Allow serving files from parent directory (where package is linked)
    }
  }
})
