import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/my.portfolio/', // 👈 Add this line (must match your GitHub repo name)
  plugins: [react()],
});
