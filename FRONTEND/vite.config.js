import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
 
    'global': 'window',
    'process.env': {},
  },
  resolve: {
    alias: {

      'global': 'window',
    },
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
})