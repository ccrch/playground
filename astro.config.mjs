import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  base: '/playground/',
  devToolbar: { enabled: false },
  integrations: [react()],
  outDir: 'build',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            $showMediaLabel: ${isDev};\n
            @import 'src/styles/core/media-queries.scss';\n
          `
        }
      }
    }
  },
})
