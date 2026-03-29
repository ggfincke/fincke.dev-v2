// tests/dateSpan.test.ts
// critical coverage for structured date span formatting & ordering

import { describe, expect, it } from 'vitest'

import type { DateSpan } from '~/shared/types'
import {
  compareDateSpansByLatestDesc,
  formatDateSpan,
} from '~/shared/utils/dateSpan'

import { REFERENCE_NOW } from './fixtures'

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

  it('sorts closed ranges by latest date across years', () =>
  {
    const newer: DateSpan = {
      start: {
        year: 2025,
        month: 3,
      },
      end: {
        year: 2025,
        month: 9,
      },
    }
    const older: DateSpan = {
      start: {
        year: 2024,
        month: 12,
      },
      end: {
        year: 2025,
        month: 3,
      },
    }

    expect(compareDateSpansByLatestDesc(newer, older)).toBeLessThan(0)
    expect(compareDateSpansByLatestDesc(older, newer)).toBeGreaterThan(0)
  })

  it('prioritizes ongoing ranges over completed entries', () =>
  {
    const ongoing: DateSpan = {
      start: {
        year: 2025,
        month: 10,
      },
      isCurrent: true,
    }
    const completed: DateSpan = {
      start: {
        year: 2025,
        month: 12,
      },
    }

    expect(
      compareDateSpansByLatestDesc(ongoing, completed, REFERENCE_NOW)
    ).toBeLessThan(0)
    expect(
      compareDateSpansByLatestDesc(completed, ongoing, REFERENCE_NOW)
    ).toBeGreaterThan(0)
  })
})
