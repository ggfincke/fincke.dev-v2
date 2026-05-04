// src/shared/utils/projectViewModel.ts
// derive shared display metadata for project surfaces

import type { Project } from '~/shared/types'
import { formatDateSpan, getDateSpanStartYear } from '~/shared/utils/dateSpan'

// shared display metadata for project layouts
export interface ProjectViewModel
{
  primaryHref?: string
  startYear: string
  periodLabel: string
  hasLinks: boolean
  detailsId: string
  detailsLabel: string
  imageAlt: string
}

// derive stable project view metadata from authored content
export function getProjectViewModel(project: Project): ProjectViewModel
{
  return {
    primaryHref: project.liveUrl ?? project.repoUrl,
    startYear: getDateSpanStartYear(project.period),
    periodLabel: formatDateSpan(project.period),
    hasLinks: Boolean(
      project.repoUrl ||
        project.liveUrl ||
        (project.additionalLinks && project.additionalLinks.length > 0)
    ),
    detailsId: `project-details-${project.id}`,
    detailsLabel: `Details for ${project.title}`,
    imageAlt: project.imageAlt ?? `${project.title} screenshot`,
  }
}
