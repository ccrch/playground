import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

const isProd = import.meta.env?.MODE === 'production'

export default defineConfig({
  base: isProd ? '/astro-test/' : '/',
  integrations: [react()],
  outDir: 'build',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            $showMediaLabel: ${isProd ? 'false' : 'true'};
            @import 'src/styles/core/media-queries.scss';\n
          `
        }
      }
    }
  },
})
