// tests/projectSort.test.ts
// lock archive Year sort to period.start (not latest-activity)

import { describe, expect, it } from 'vitest'

import type { Project } from '~/shared/types'
import {
  compareProjects,
  DEFAULT_PROJECT_SORT,
  nextSortState,
} from '~/sections/projects-archive/utils/projectSort'

function minimalProject(
  overrides: Pick<Project, 'id' | 'title' | 'period'>
): Project
{
  return {
    status: 'complete',
    madeFor: 'Personal',
    contentStatus: {
      links: { availability: 'not-applicable' },
      media: { availability: 'not-applicable' },
    },
    bulletPoints: [],
    technologies: [],
    ...overrides,
  }
}

describe('compareProjects year sort', () =>
{
  // ongoing earlier start would win under latest-activity; start-based Year
  // desc must keep the later start first
  const ongoingEarlierStart = minimalProject({
    id: 'coral',
    title: 'Ongoing Earlier',
    period: {
      start: { year: 2023, month: 1 },
      isCurrent: true,
    },
  })

  const completedLaterStart = minimalProject({
    id: 'loom',
    title: 'Completed Later',
    period: {
      start: { year: 2025, month: 6 },
      end: { year: 2025, month: 12 },
    },
  })

  it('orders Year desc by start month, not latest activity', () =>
  {
    const yearDesc = { key: 'year' as const, direction: 'desc' as const }

    expect(
      compareProjects(completedLaterStart, ongoingEarlierStart, yearDesc)
    ).toBeLessThan(0)
    expect(
      compareProjects(ongoingEarlierStart, completedLaterStart, yearDesc)
    ).toBeGreaterThan(0)
  })

  it('breaks Year ties by title', () =>
  {
    const alpha = minimalProject({
      id: 'beacon',
      title: 'Alpha',
      period: {
        start: { year: 2024, month: 5 },
      },
    })
    const beta = minimalProject({
      id: 'hopper',
      title: 'Beta',
      period: {
        start: { year: 2024, month: 5 },
      },
    })
    const yearDesc = { key: 'year' as const, direction: 'desc' as const }

    expect(compareProjects(alpha, beta, yearDesc)).toBeLessThan(0)
    expect(compareProjects(beta, alpha, yearDesc)).toBeGreaterThan(0)
  })
})

describe('nextSortState', () =>
{
  it('defaults Year to desc when switching columns', () =>
  {
    expect(nextSortState({ key: 'project', direction: 'asc' }, 'year')).toEqual(
      {
        key: 'year',
        direction: 'desc',
      }
    )
    expect(DEFAULT_PROJECT_SORT).toEqual({
      key: 'year',
      direction: 'desc',
    })
  })
})
