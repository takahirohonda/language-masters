/// <reference types='vitest' />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
const isGitPageDeploy = Boolean(process.env.GIT_PAGE_DEPLOY)

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/react-voice-recorder',
  base: isGitPageDeploy ? '/voice-recorder' : '',
  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    nxViteTsPaths(),
    nxViteTsPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: manifestObj as any,
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/apps/react-voice-recorder',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
