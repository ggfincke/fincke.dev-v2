// src/content/projects/selectors.ts
// filtering utilities for project data

import type { TechnologyId } from '~/content/technologies'
import type { Project } from '~/shared/types'

import { projects } from './all'

// get featured projects filtered by viewport tier & global feature order
export const getFeaturedProjects = (includeWide = false): Project[] =>
{
  return projects
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
}

// get all projects
export const getAllProjects = (): Project[] =>
{
  return projects
}

// get projects filtered by canonical technology id
export const getProjectsByTechnology = (
  technologyId: TechnologyId
): Project[] =>
{
  return projects.filter((project) =>
  {
    return project.technologies.includes(technologyId)
  })
}
