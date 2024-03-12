import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {  // 配置开发环境中的服务器，允许外部访问方便在不同设备上调试
    host: true,
    // https: {  // 配置`https`，具体证书可以通过`mkcert`生成
    //   cert: fs.readFileSync("path\to\your\localhost.pem"),
    //   key: fs.readFileSync("path\to\your\localhost-key.pem")
    // }
  },
})
