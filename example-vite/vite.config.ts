import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf'],
  resolve: {
    alias: {
      '@kimafinance/kima-transaction-widget': path.resolve(
        __dirname,
        '../src'
      ),
      // Manually resolving paths
      '@store': path.resolve(__dirname, '../src/store'),
      '@plugins': path.resolve(__dirname, '../plugins'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@primary': path.resolve(__dirname, '../src/components/primary'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@pluginRegistry': path.resolve(__dirname, '../src/pluginRegistry.ts'),
      '@interface': path.resolve(__dirname, '../src/interface.tsx'),
      '@css': path.resolve(__dirname, '../src/index.css'),
    },
    
  },
  server: {
    fs: {
      allow: ['.', '../']
    },
    watch: {
      usePolling: true,
      ignored: ['!**/src/**']
    }
  },
  optimizeDeps: {
    include: ['@kimafinance/kima-transaction-widget']
  },
  esbuild: {
    target: 'esnext', // Match tsup's target
  },
})
