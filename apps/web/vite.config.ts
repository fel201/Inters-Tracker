import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import mkcert from 'vite-plugin-mkcert';
// https://vite.dev/config/


export default defineConfig({
  server: {
    proxy: {
      '/api': 'localhost:3000'
    },
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react()
  ],
});
