// vitest.setup.ts
// shared test setup for UI interaction coverage

import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

import { installMatchMediaMock, resetMatchMedia } from './tests/ui/matchMedia'

const fetchMock = vi.fn(async () => ({
  ok: false,
  json: async () => null,
}))

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
