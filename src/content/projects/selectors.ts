// src/content/projects/selectors.ts
// filtering utilities for project data

import type { TechnologyId } from '~/content/technologies'
import type { Project } from '~/shared/types'
import { projects } from '~/content/projects/all'

// get featured projects filtered by viewport tier & global feature order
export const getFeaturedProjects = (
  includeWide = false
): readonly Project[] =>
{
  return Object.freeze(
    projects
      .filter((project) =>
      {
        if (!project.feature)
        {
          return false
        }

        return includeWide || project.feature.tier === 'default'
      })
      .sort((left, right) =>
      {
        return (left.feature?.order ?? 0) - (right.feature?.order ?? 0)
      })
  )
}

// get all projects
export const getAllProjects = (): readonly Project[] =>
{
  return projects
}

// reverse index: technology id → projects that use it
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

// get projects filtered by canonical technology id (O(1) lookup)
export const getProjectsByTechnology = (
  technologyId: TechnologyId
): readonly Project[] =>
{
  return PROJECTS_BY_TECHNOLOGY.get(technologyId) ?? EMPTY_PROJECT_LIST
}
