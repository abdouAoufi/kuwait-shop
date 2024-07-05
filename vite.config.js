import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        venom: resolve(__dirname, '/src/venom-bee/index.html'),
        "ship-water": resolve(__dirname, '/src/ship-water/index.html'),
        "thank-you": resolve(__dirname, '/src/thank-you/index.html'),
        "door-device": resolve(__dirname, '/src/self-close/index.html')
      }
    }
  }
});