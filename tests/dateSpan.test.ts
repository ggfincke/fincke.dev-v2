// tests/dateSpan.test.ts
// critical coverage for structured date span formatting

import { describe, expect, it } from 'vitest'

import { formatDateSpan } from '~/shared/utils/dateSpan'

describe('date span utilities', () =>
{
  it('formats single-month entries', () =>
  {
    expect(
      formatDateSpan({
        start: {
          year: 2025,
          month: 12,
        },
      })
    ).toBe('Dec 2025')
  })

  it('formats closed and ongoing ranges', () =>
  {
    expect(
      formatDateSpan({
        start: {
          year: 2025,
          month: 8,
        },
        end: {
          year: 2025,
          month: 12,
        },
      })
    ).toBe('Aug 2025 – Dec 2025')

    expect(
      formatDateSpan({
        start: {
          year: 2025,
          month: 10,
        },
        isCurrent: true,
      })
    ).toBe('Oct 2025 – Present')
  })

  it('formats expected ranges with a caller-owned suffix', () =>
  {
    expect(
      formatDateSpan(
        {
          start: {
            year: 2024,
            month: 8,
          },
          end: {
            year: 2027,
            month: 5,
          },
        },
        { expected: true }
      )
    ).toBe('Aug 2024 – May 2027 (expected)')
  })
})
