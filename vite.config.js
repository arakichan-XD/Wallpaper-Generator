import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This setting allows access from any host, making it flexible for deployment
    // across different domains without needing configuration changes.
    // It resolves potential "Blocked request" errors on various hosting platforms.
    allowedHosts: ['.'],
  },
});
