import { defineConfig } from 'vitest/config';
import mkCert from 'vite-plugin-mkcert';
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkCert()],
  base: '/countdown-timer-frontend/',
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/tests/setup.ts'],
    globals: true,
    browser: {
      provider: 'playwright',
      enabled: true,
      name: 'chromium'
    }
  }
});
