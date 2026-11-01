import { defineConfig } from 'vite';
// base relative : fonctionne sur GitHub Pages (https://<compte>.github.io/forgemon/)
export default defineConfig({ base: './', build: { outDir: 'dist', assetsInlineLimit: 0 } });
