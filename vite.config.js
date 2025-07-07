import { defineConfig, loadEnv } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [solidPlugin()],
    server: {
      port: parseInt(env.FRONTEND_PORT) || 3001,
      proxy: {
        '/api': {
          target: env.BACKEND_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      target: 'esnext',
    },
  };
});
