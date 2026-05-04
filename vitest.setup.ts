// vitest.setup.ts
// shared test setup for UI interaction coverage

import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

import { installMatchMediaMock, resetMatchMedia } from './tests/ui/matchMedia'

// default: every test that touches `fetch` should opt in via mockResolvedValueOnce.
// returning a real Response so consumers that read `status`/`headers` don't NPE.
const fetchMock = vi.fn(async () => new Response(null, { status: 503 }))

vi.stubGlobal('fetch', fetchMock)

if (typeof window !== 'undefined')
{
  installMatchMediaMock(window)
}

beforeEach(() =>
{
  cleanup()
  resetMatchMedia()
  fetchMock.mockClear()

  if (typeof window !== 'undefined')
  {
    window.sessionStorage.clear()
  }
})

afterEach(() =>
{
  cleanup()
})
