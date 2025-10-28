import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use relative base so assets load correctly on GitHub Pages regardless of path
export default defineConfig({
  plugins: [react()],
  base: './',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
