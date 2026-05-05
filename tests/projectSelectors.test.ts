// tests/projectSelectors.test.ts
// critical coverage for project selection & curation helpers

import { describe, expect, it } from 'vitest'

import {
  getAllProjects,
  getFeaturedProjects,
  getProjectsByTechnology,
  projects,
} from '~/content/projects'
import type { Project } from '~/shared/types'

import {
  FEATURED_DEFAULT_PROJECT_IDS,
  FEATURED_WITH_WIDE_PROJECT_IDS,
} from './fixtures'

function forceMutableProjects(projectList: readonly Project[]): Project[]
{
  return projectList as Project[]
}

describe('project selectors', () =>
{
  it('preserves authored project order', () =>
  {
    expect(getAllProjects().map((project) => project.id)).toEqual(
      projects.map((project) => project.id)
    )
  })

  it('does not expose mutable project lists', () =>
  {
    const allProjects = getAllProjects()
    const featuredProjects = getFeaturedProjects(true)
    const postgresqlProjects = getProjectsByTechnology('postgresql')

    expect(Object.isFrozen(projects)).toBe(true)
    expect(Object.isFrozen(allProjects)).toBe(true)
    expect(Object.isFrozen(featuredProjects)).toBe(true)
    expect(Object.isFrozen(postgresqlProjects)).toBe(true)

    expect(() =>
    {
      forceMutableProjects(allProjects).sort((left, right) =>
        left.title.localeCompare(right.title)
      )
    }).toThrow(TypeError)

    expect(() =>
    {
      forceMutableProjects(postgresqlProjects).pop()
    }).toThrow(TypeError)
  })

  it('returns the default featured project order', () =>
  {
    expect(getFeaturedProjects().map((project) => project.id)).toEqual(
      FEATURED_DEFAULT_PROJECT_IDS
    )
  })

  it('includes wide-tier entries when requested', () =>
  {
    const featuredProjects = getFeaturedProjects(true)

    expect(featuredProjects.map((project) => project.id)).toEqual(
      FEATURED_WITH_WIDE_PROJECT_IDS
    )
    expect(featuredProjects.map((project) => project.feature?.order)).toEqual([
      1, 2, 3,
    ])
  })

  it('filters projects by canonical technology id', () =>
  {
    expect(
      getProjectsByTechnology('uikit').map((project) => project.id)
    ).toEqual(['ios-application-development-projects'])

    expect(
      getProjectsByTechnology('postgresql').map((project) => project.id)
    ).toEqual(['swimmate-v2', 'hopper', 'trackbasket', 'instock'])
  })
})
