import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import electron from 'vite-plugin-electron'

export default defineConfig({
  plugins: [
    vue(),
    electron({
      entry: 'electron/main.ts'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/styles/variables.less";`
      }
    }
  },
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
}) 