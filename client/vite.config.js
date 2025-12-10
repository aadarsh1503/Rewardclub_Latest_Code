import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  alias: {
    '@': '/src', 
  },
  build: {
    outDir: 'build', 
    sourcemap: true, 
    minify: 'esbuild',
  },
})
