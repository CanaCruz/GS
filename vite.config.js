import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path para GitHub Pages (nome do repositório)
  base: '/GS/',
  // Configuração para servir arquivos estáticos da pasta public
  publicDir: 'public',
  // Configuração do servidor de desenvolvimento
  server: {
    port: 5173,
    open: true, // Abre o navegador automaticamente
  },
  // Configuração de build
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})

