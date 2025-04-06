import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/", // ✅ required so that asset paths are absolute
  build: {
    outDir: "dist", // ✅ matches what Flask is looking for
    emptyOutDir: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
