import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mkcert from 'vite-plugin-mkcert'

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  // alias: {
  //   '@components': '/src/astro/components',
  //   '@layouts': '/src/astro/layouts',
  //   '@pages': '/src/astro/pages',
  //   '@styles': '/src/styles',
  //   '@scripts': '/src/scripts',
  // },
  base: '/playground/',
  devToolbar: { enabled: false },
  integrations: [react()],
  outDir: 'build',
  srcDir: './src/astro',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            $showMediaLabel: ${isDev};\n
          `
          // additionalData: `
          //   $showMediaLabel: ${isDev};\n
          //   @import 'src/styles/core/media-queries.scss';\n
          // `
        }
      }
    },
    plugins: [mkcert()],
    ssr: process.env.NODE_ENV !== "development" ? { noExternal: true } : undefined,
  },
})
