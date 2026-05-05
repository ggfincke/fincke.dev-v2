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

// project records are deep-frozen at the content boundary, so the view model
// is a pure function of stable input — cache it per project to keep memo'd
// children stable across re-renders.
const VIEW_MODEL_CACHE = new WeakMap<Project, ProjectViewModel>()

// derive stable project view metadata from authored content
export function getProjectViewModel(project: Project): ProjectViewModel
{
  const cached = VIEW_MODEL_CACHE.get(project)

  if (cached)
  {
    return cached
  }

  const hasLinks = project.contentStatus.links.availability === 'available'
  const hasMedia = project.contentStatus.media.availability === 'available'

  const viewModel: ProjectViewModel = {
    primaryHref: hasLinks ? (project.liveUrl ?? project.repoUrl) : undefined,
    startYear: getDateSpanStartYear(project.period),
    periodLabel: formatDateSpan(project.period),
    hasLinks,
    hasMedia,
    detailsId: `project-details-${project.id}`,
    detailsLabel: `Details for ${project.title}`,
    imageAlt: project.imageAlt ?? `${project.title} screenshot`,
  }

  VIEW_MODEL_CACHE.set(project, viewModel)
  return viewModel
}
