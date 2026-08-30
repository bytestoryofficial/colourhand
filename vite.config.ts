import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  build: {
    target: 'es2022',
    outDir: 'dist',
    sourcemap: true,
  },

  server: {
    port: 5173,
    open: true,
  },

  test: {
    environment: 'happy-dom',
    globals: true,
  },
});
