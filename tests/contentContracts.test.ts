// tests/contentContracts.test.ts
// minimal authored-data contract checks for stable ids & periods

import { describe, expect, it } from 'vitest'

import { WORK_EXPERIENCE } from '~/content/experience'
import { projects } from '~/content/projects'
import type { DateSpan, Project, ProjectFeature } from '~/shared/types'
import { WORK_EXPERIENCE_IDS } from '~/shared/types/experience'
import { PROJECT_IDS } from '~/shared/types/projects'
import { getYearMonthValue } from '~/shared/utils/dateSpan'

type FeaturedProject = Project & { feature: ProjectFeature }

function hasFeature(project: Project): project is FeaturedProject
{
  return Boolean(project.feature)
}

function expectValidPeriod(period: DateSpan, label: string)
{
  expect(period.start.month, `${label} start month`).toBeGreaterThanOrEqual(1)
  expect(period.start.month, `${label} start month`).toBeLessThanOrEqual(12)

  if (period.end)
  {
    expect(period.end.month, `${label} end month`).toBeGreaterThanOrEqual(1)
    expect(period.end.month, `${label} end month`).toBeLessThanOrEqual(12)
    expect(
      getYearMonthValue(period.end),
      `${label} end must not be before start`
    ).toBeGreaterThanOrEqual(getYearMonthValue(period.start))
  }

  if (period.isCurrent)
  {
    expect(period.end, `${label} cannot be both current and closed`).toBeFalsy()
  }
}

function getDuplicateValues(values: readonly string[]): string[]
{
  const seen = new Set<string>()
  const duplicates = new Set<string>()

  for (const value of values)
  {
    if (seen.has(value))
    {
      duplicates.add(value)
    }

    seen.add(value)
  }

  return [...duplicates]
}

describe('content contracts', () =>
{
  it('keeps project ids unique', () =>
  {
    const projectIds = projects.map((project) => project.id)

    expect(getDuplicateValues(projectIds)).toEqual([])
    expect(projectIds).toEqual(PROJECT_IDS)
  })

  it('keeps work experience ids unique', () =>
  {
    const workExperienceIds = WORK_EXPERIENCE.map((job) => job.id)

    expect(getDuplicateValues(workExperienceIds)).toEqual([])
    expect(workExperienceIds).toEqual(WORK_EXPERIENCE_IDS)
  })

  it('keeps featured order values globally unique', () =>
  {
    const featuredProjects = projects.filter(hasFeature)
    const orders = featuredProjects.map((project) => project.feature.order)

    expect(getDuplicateValues(orders.map(String))).toEqual([])

    for (const project of featuredProjects)
    {
      const order = project.feature.order
      expect(
        Number.isInteger(order) && order > 0,
        `feature order must be a positive integer: ${project.id}`
      ).toBe(true)
    }
  })

  it('keeps authored date spans internally valid', () =>
  {
    for (const project of projects)
    {
      expectValidPeriod(project.period, `project:${project.id}`)
    }

    for (const job of WORK_EXPERIENCE)
    {
      expectValidPeriod(job.period, `experience:${job.id}`)
    }
  })
})
