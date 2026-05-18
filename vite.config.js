import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Split vendor chunks so the deck shell loads fast and the
        // animation library can be cached independently of app code.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('framer-motion') || id.includes('motion-')) {
            return 'motion';
          }
          if (id.includes('react') || id.includes('scheduler')) {
            return 'react';
          }
          return 'vendor';
        },
      },
    },
  },
});
