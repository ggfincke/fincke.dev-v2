// vite.config.ts
// vite build config w/ React, Tailwind, & path aliases

import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { applyRouteHead } from './scripts/lib/routeHtml.ts'
import {
  PUBLIC_ROUTES,
  SITE_ORIGIN,
} from './src/shared/routing/publicRoutes.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// emit `${slug}.html` per non-home route so hosts serve route-specific <head>
// meta at the bare path (Cloudflare & vite preview both map /x -> x.html)
function routeHeadPages(): Plugin
{
  return {
    name: 'route-head-pages',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle)
    {
      const index = bundle['index.html']
      if (index?.type !== 'asset' || typeof index.source !== 'string')
      {
        this.error('route-head-pages: built index.html not found')
      }

      for (const route of PUBLIC_ROUTES)
      {
        if (!('head' in route))
        {
          continue
        }
        this.emitFile({
          type: 'asset',
          fileName: `${route.slug}.html`,
          source: applyRouteHead(index.source, {
            ...route.head,
            url: new URL(route.path, SITE_ORIGIN).toString(),
          }),
        })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), routeHeadPages()],
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // keep core runtime packages in one stable vendor chunk
        manualChunks(id)
        {
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/react-router')
          )
          {
            return 'vendor'
          }
        },
      },
    },
  },
})
