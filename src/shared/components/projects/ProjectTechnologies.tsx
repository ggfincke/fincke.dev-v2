// src/shared/components/projects/ProjectTechnologies.tsx
// shared project technology list w/ related-project hover wiring

import { getProjectsByTechnology } from '~/content/projects'
import type { TechnologyId } from '~/content/technologies'
import { TechPills } from '~/shared/components/ui/TechPills'

// props for project technology list
interface ProjectTechnologiesProps
{
  technologies: readonly TechnologyId[]
  maxVisible?: number
  size?: 'xs' | 'sm' | 'md'
  className?: string
  as?: 'div' | 'ul'
  showRelatedProjects?: boolean
}

// shared project technology list for featured & archive surfaces
export function ProjectTechnologies({
  technologies,
  maxVisible,
  size = 'sm',
  className,
  as = 'div',
  showRelatedProjects = false,
}: ProjectTechnologiesProps)
{
  return (
    <TechPills
      technologies={technologies}
      maxVisible={maxVisible}
      size={size}
      showProjectsOnHover={showRelatedProjects}
      getRelatedProjects={
        showRelatedProjects ? getProjectsByTechnology : undefined
      }
      className={className}
      as={as}
    />
  )
}
