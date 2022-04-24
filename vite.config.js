import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: 'electron/main.js'
      }
    })
  ],
  base: './', // index.html 中静态资源加载位置
  build: {
    outDir: resolve(__dirname, 'dist/build'),
    assetsDir: 'assets', // 资源路径
    rollupOptions: {
      output: {
        format: 'cjs' // 配置 Rollup 打包输出 CommonJs 格式
      },
      external: ['electron'] // 告诉 Rollup 不要去打包 electron
    }
  },
  optimizeDeps: {
    exclude: ['electron'] //  告诉 Vite 预构建中不要转换 electron 模块
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0'
  }
})
