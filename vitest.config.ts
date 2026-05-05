// vitest.config.ts
// Vitest config for minimal node-side tests

import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import { defineConfig } from 'vitest/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  resolve: {
    alias: {
      '~/scripts': resolve(__dirname, './scripts'),
      '~/tests': resolve(__dirname, './tests'),
      '~': resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
})
