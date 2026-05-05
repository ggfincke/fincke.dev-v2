// tests/contentContracts.test.ts
// minimal authored-data checks for common portfolio content mistakes

import { describe, expect, it } from 'vitest'

import { EDUCATION } from '~/content/education'
import { WORK_EXPERIENCE } from '~/content/experience'
import { projects } from '~/content/projects'
import type {
  DateSpan,
  Project,
  ProjectFeature,
  ProjectResourceAvailability,
} from '~/shared/types'
import { PROJECT_RESOURCE_AVAILABILITIES } from '~/shared/types'
import { EDUCATION_IDS } from '~/shared/types/education'
import { WORK_EXPERIENCE_IDS } from '~/shared/types/experience'
import { PROJECT_IDS } from '~/shared/types/projects'
import { getYearMonthValue } from '~/shared/utils/dateSpan'

type FeaturedProject<T extends Project = Project> = T & {
  readonly feature: ProjectFeature
}

const UNAVAILABLE_RESOURCE_STATES = new Set<ProjectResourceAvailability>([
  'private',
  'archived',
  'not-applicable',
  'pending',
])

function hasFeature<T extends Project>(
  project: T
): project is FeaturedProject<T>
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

function hasProjectLinks(project: Project): boolean
{
  return Boolean(
    project.repoUrl ||
      project.liveUrl ||
      (project.additionalLinks && project.additionalLinks.length > 0)
  )
}

function hasProjectMedia(project: Project): boolean
{
  return Boolean(project.imagePath)
}

function expectResourceAvailability(
  availability: ProjectResourceAvailability,
  hasResource: boolean,
  note: string | undefined,
  label: string
)
{
  expect(
    PROJECT_RESOURCE_AVAILABILITIES.includes(availability),
    `${label} availability must use a known state`
  ).toBe(true)

  if (availability === 'available')
  {
    expect(hasResource, `${label} cannot be available without content`).toBe(
      true
    )
    expect(note, `${label} available resources should not need a note`).toBe(
      undefined
    )
    return
  }

  expect(
    UNAVAILABLE_RESOURCE_STATES.has(availability),
    `${label} unavailable state must be intentional`
  ).toBe(true)
  expect(hasResource, `${label} cannot be unavailable with content`).toBe(false)
  expect(
    note?.trim().length ?? 0,
    `${label} must explain absence`
  ).toBeGreaterThan(0)
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
  it('keeps authored ids and featured ordering stable', () =>
  {
    const projectIds = projects.map((project) => project.id)
    const workExperienceIds = WORK_EXPERIENCE.map((job) => job.id)
    const educationIds = EDUCATION.map((entry) => entry.id)
    const featuredProjects = projects.filter(hasFeature)
    const featuredOrders = featuredProjects.map(
      (project) => project.feature.order
    )

    expect(getDuplicateValues(projectIds)).toEqual([])
    expect(projectIds).toEqual(PROJECT_IDS)

    expect(getDuplicateValues(workExperienceIds)).toEqual([])
    expect(workExperienceIds).toEqual(WORK_EXPERIENCE_IDS)

    expect(getDuplicateValues(educationIds)).toEqual([])
    expect(educationIds).toEqual(EDUCATION_IDS)

    expect(getDuplicateValues(featuredOrders.map(String))).toEqual([])

    for (const project of featuredProjects)
    {
      const order = project.feature.order
      expect(
        Number.isInteger(order) && order > 0,
        `feature order must be a positive integer: ${project.id}`
      ).toBe(true)
    }
  })

  it('makes project link and media absence explicit', () =>
  {
    for (const project of projects)
    {
      expectResourceAvailability(
        project.contentStatus.links.availability,
        hasProjectLinks(project),
        project.contentStatus.links.note,
        `project:${project.id} links`
      )
      expectResourceAvailability(
        project.contentStatus.media.availability,
        hasProjectMedia(project),
        project.contentStatus.media.note,
        `project:${project.id} media`
      )

      if (project.imagePath)
      {
        expect(project.imageAlt?.trim().length ?? 0).toBeGreaterThan(0)
      }
      else
      {
        expect(project.imageAlt).toBeUndefined()
      }
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

    for (const education of EDUCATION)
    {
      expectValidPeriod(education.period, `education:${education.id}`)
    }
  })
})
