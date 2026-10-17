// src/content/projects/selectors.ts
// filtering utilities for project data

import type { TechnologyId } from '~/content/technologies'
import type { Project } from '~/shared/types'
import { projects } from '~/content/projects/all'

const FEATURED_PROJECTS = Object.freeze(
  projects
    .filter((project) => Boolean(project.feature))
    .sort((left, right) =>
    {
      return (left.feature?.order ?? 0) - (right.feature?.order ?? 0)
    })
)

// default-tier entries plus whichever optional tiers the viewport has room for
export const getFeaturedProjects = (
  includeWide = false,
  includeTall = false
): readonly Project[] =>
{
  return Object.freeze(
    FEATURED_PROJECTS.filter((project) =>
    {
      const tier = project.feature?.tier
      return (
        tier === 'default' ||
        (includeTall && tier === 'tall') ||
        (includeWide && tier === 'wide')
      )
    })
  )
}

export const getAllProjects = (): readonly Project[] =>
{
  return projects
}

// reverse index: technology id -> projects that use it
const PROJECTS_BY_TECHNOLOGY: ReadonlyMap<TechnologyId, readonly Project[]> =
  (() =>
  {
    const index = new Map<TechnologyId, Project[]>()
    for (const project of projects)
    {
      for (const technologyId of project.technologies)
      {
        let bucket = index.get(technologyId)
        if (!bucket)
        {
          bucket = []
          index.set(technologyId, bucket)
        }
        bucket.push(project)
      }
    }
    const readonlyIndex = new Map<TechnologyId, readonly Project[]>()

    for (const [technologyId, projectList] of index)
    {
      readonlyIndex.set(technologyId, Object.freeze(projectList))
    }

    return readonlyIndex
  })()

const EMPTY_PROJECT_LIST: readonly Project[] = Object.freeze([])

// projects using a canonical technology id; O(1) via the precomputed index
export const getProjectsByTechnology = (
  technologyId: TechnologyId
): readonly Project[] =>
{
  return PROJECTS_BY_TECHNOLOGY.get(technologyId) ?? EMPTY_PROJECT_LIST
}
