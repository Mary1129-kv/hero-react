import path from 'path';
import tailwindcss from '@tailwindcss/vite';

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Permite servir la app con `vite preview` desde el dominio de Render
  preview: {
    allowedHosts: ['.onrender.com'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
