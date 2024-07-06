import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        venom: resolve(__dirname, '/src/venom-bee/index.html'),
        "water-tool": resolve(__dirname, '/src/water-tool/index.html'),
        "thank-you": resolve(__dirname, '/src/thank-you/index.html')
      }
    }
  }
});