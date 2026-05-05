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
  hasMedia: boolean
  detailsId: string
  detailsLabel: string
  imageAlt: string
}

// derive stable project view metadata from authored content
export function getProjectViewModel(project: Project): ProjectViewModel
{
  const hasLinks = project.contentStatus.links.availability === 'available'
  const hasMedia = project.contentStatus.media.availability === 'available'

  return {
    primaryHref: hasLinks ? (project.liveUrl ?? project.repoUrl) : undefined,
    startYear: getDateSpanStartYear(project.period),
    periodLabel: formatDateSpan(project.period),
    hasLinks,
    hasMedia,
    detailsId: `project-details-${project.id}`,
    detailsLabel: `Details for ${project.title}`,
    imageAlt: project.imageAlt ?? `${project.title} screenshot`,
  }
}
