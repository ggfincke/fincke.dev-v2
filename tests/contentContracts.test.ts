// tests/contentContracts.test.ts
// minimal authored-data contract checks for stable ids & periods

import { describe, expect, it } from 'vitest'

import {
  DEPLOYMENT_PUBLIC_ASSETS,
  PUBLIC_RUNTIME_ASSETS,
  RETAINED_PUBLIC_ASSETS,
} from '~/content/assets'
import { EDUCATION, EDUCATION_CONTENT } from '~/content/education'
import { EXPERIENCE_CONTENT, WORK_EXPERIENCE } from '~/content/experience'
import {
  ABOUT_CONTENT,
  ABOUT_HIGHLIGHTS,
  HERO_CONTENT,
  SOCIAL_LINKS,
  SOCIAL_LINKS_CONTENT,
} from '~/content/home'
import { projects, PROJECTS_CONTENT } from '~/content/projects'
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

type FeaturedProject = Project & { readonly feature: ProjectFeature }

const UNAVAILABLE_RESOURCE_STATES = new Set<ProjectResourceAvailability>([
  'private',
  'archived',
  'not-applicable',
  'pending',
])

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

  it('keeps education ids unique', () =>
  {
    const educationIds = EDUCATION.map((entry) => entry.id)

    expect(getDuplicateValues(educationIds)).toEqual([])
    expect(educationIds).toEqual(EDUCATION_IDS)
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

  it('freezes authored content roots and a representative nested record', () =>
  {
    const roots = [
      projects,
      WORK_EXPERIENCE,
      EDUCATION,
      EDUCATION_CONTENT,
      PROJECTS_CONTENT,
      HERO_CONTENT,
      ABOUT_CONTENT,
      ABOUT_HIGHLIGHTS,
      SOCIAL_LINKS,
      SOCIAL_LINKS_CONTENT,
      EXPERIENCE_CONTENT,
      PUBLIC_RUNTIME_ASSETS,
      RETAINED_PUBLIC_ASSETS,
      DEPLOYMENT_PUBLIC_ASSETS,
    ]

    for (const root of roots)
    {
      expect(Object.isFrozen(root)).toBe(true)
    }

    // Spot-check one project's nested shape — covers deepFreeze recursion
    // without re-asserting the helper across every record.
    const sample = projects.find((project) => project.collaborators)

    expect(sample, 'expected at least one project with collaborators').toBeDefined()

    if (sample)
    {
      expect(Object.isFrozen(sample)).toBe(true)
      expect(Object.isFrozen(sample.period)).toBe(true)
      expect(Object.isFrozen(sample.period.start)).toBe(true)
      expect(Object.isFrozen(sample.bulletPoints)).toBe(true)
      expect(Object.isFrozen(sample.technologies)).toBe(true)
      expect(Object.isFrozen(sample.contentStatus)).toBe(true)
      expect(Object.isFrozen(sample.contentStatus.links)).toBe(true)
      expect(Object.isFrozen(sample.collaborators)).toBe(true)
      expect(Object.isFrozen(sample.collaborators?.[0])).toBe(true)
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
