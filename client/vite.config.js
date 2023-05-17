import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  outputDir: path.resolve(__dirname, '../server/dist'),
  devServer:{
    '/api': {
      target: 'http://localhost:5000' 
    }
  }
})

