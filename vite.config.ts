import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vitePluginSvgr from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // depending on your application, base can also be "/"
  base: '',
  plugins: [react(), viteTsconfigPaths(), vitePluginSvgr()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "src/variables" as *;
        `,
      },
    },
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
});
