// tests/browserAudit.test.ts
// shared browser-audit helper contracts

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import {
  DEFAULT_DEV_PORT,
  DEFAULT_PREVIEW_PORT,
  getLocalBaseUrl,
  getRouteUrl,
  LIGHTHOUSE_CHROME_FLAGS,
  PLAYWRIGHT_LAUNCH_ARGS,
  REPORTS_DIR,
  SCREENSHOTS_DIR,
} from '../scripts/lib/browserAudit'

const originalEnv = { ...process.env }

describe('browser audit helpers', () =>
{
  beforeEach(() =>
  {
    delete process.env.BASE_URL
    delete process.env.HOST
    delete process.env.PORT
  })

  afterEach(() =>
  {
    process.env = { ...originalEnv }
  })

  it('builds local base URLs from stable default ports', () =>
  {
    expect(DEFAULT_DEV_PORT).toBe('5173')
    expect(DEFAULT_PREVIEW_PORT).toBe('4173')
    expect(getLocalBaseUrl(DEFAULT_DEV_PORT)).toBe('http://127.0.0.1:5173')
    expect(getLocalBaseUrl(DEFAULT_PREVIEW_PORT)).toBe('http://127.0.0.1:4173')
  })

  it('allows explicit base URL and host/port overrides', () =>
  {
    process.env.BASE_URL = 'http://localhost:9999/'

    expect(getLocalBaseUrl()).toBe('http://localhost:9999')

    delete process.env.BASE_URL
    process.env.HOST = 'localhost'
    process.env.PORT = '3000'

    expect(getLocalBaseUrl()).toBe('http://localhost:3000')
  })

  it('resolves route URLs without double-slash drift', () =>
  {
    expect(getRouteUrl('http://127.0.0.1:4173', '/projects')).toBe(
      'http://127.0.0.1:4173/projects'
    )
    expect(getRouteUrl('http://127.0.0.1:4173/', '/')).toBe(
      'http://127.0.0.1:4173/'
    )
  })

  it('centralizes browser audit output paths and launch flags', () =>
  {
    expect(REPORTS_DIR).toContain('/reports')
    expect(SCREENSHOTS_DIR).toContain('/screenshots')
    expect(PLAYWRIGHT_LAUNCH_ARGS).toContain('--no-sandbox')
    expect(LIGHTHOUSE_CHROME_FLAGS).toContain('--force-prefers-reduced-motion')
  })
})
