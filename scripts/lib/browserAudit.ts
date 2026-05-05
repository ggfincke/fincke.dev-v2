// scripts/lib/browserAudit.ts
// shared browser-audit paths, local origins, & launch flags

import { join } from 'node:path'

import { REPO_ROOT } from '~/scripts/lib/paths'

export const DEFAULT_DEV_PORT = '5173'
export const DEFAULT_PREVIEW_PORT = '4173'
export const LOCALHOST = '127.0.0.1'

export const REPORTS_DIR = join(REPO_ROOT, 'reports')
export const SCREENSHOTS_DIR = join(REPO_ROOT, 'screenshots')

export const PLAYWRIGHT_LAUNCH_ARGS = ['--no-sandbox', '--disable-gpu'] as const

export const LIGHTHOUSE_CHROME_FLAGS = [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--force-prefers-reduced-motion',
] as const

export function getLocalBaseUrl(defaultPort = DEFAULT_PREVIEW_PORT): string
{
  const explicitBaseUrl = process.env.BASE_URL?.trim()
  if (explicitBaseUrl)
  {
    return trimTrailingSlashes(explicitBaseUrl)
  }

  const host = process.env.HOST?.trim() || LOCALHOST
  const port = process.env.PORT?.trim() || defaultPort

  return `http://${host}:${port}`
}

export function getRouteUrl(baseUrl: string, path: string): string
{
  return new URL(path, `${trimTrailingSlashes(baseUrl)}/`).toString()
}

function trimTrailingSlashes(value: string): string
{
  return value.replace(/\/+$/, '')
}
