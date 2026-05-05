// src/sections/projects-archive/components/ProjectMobileCard.tsx
// mobile card view for project row

import { memo } from 'react'

import { ProjectLinks } from '~/shared/components/layout/ProjectLinks'
import { ProjectCollaborators } from '~/shared/components/projects/ProjectCollaborators'
import { ProjectTechnologies } from '~/shared/components/projects/ProjectTechnologies'
import { StatusCircle } from '~/shared/components/ui/StatusCircle'
import { ChevronIcon } from '~/shared/components/ui/icons'
import type { Project, ProjectId } from '~/shared/types'
import { FOCUS_RING_CLASSES } from '~/shared/utils/classNames'
import type { ProjectViewModel } from '~/shared/utils/projectViewModel'

// props for mobile project card
interface ProjectMobileCardProps
{
  project: Project
  viewModel: ProjectViewModel
  expanded: boolean
  toggleRow: (id: ProjectId) => void
}

// mobile card view for project row
function ProjectMobileCardImpl({
  project,
  viewModel,
  expanded,
  toggleRow,
}: ProjectMobileCardProps)
{
  const onToggle = () => toggleRow(project.id)
  const titleId = `${viewModel.detailsId}-summary-title`

  return (
    <article
      className={`rounded-lg px-4 py-3 transition-[border-color,background-color] duration-200 hover:bg-[var(--card)]/50 ${expanded ? 'border border-[var(--accent)]/30 bg-[var(--card)]/50' : 'border border-[var(--border)] bg-[var(--card)]/30'}`}
      aria-labelledby={titleId}
    >
      {/* row 1: year, title, toggle */}
      <button
        type="button"
        onClick={onToggle}
        className={`group flex w-full touch-manipulation cursor-pointer appearance-none items-start justify-between gap-4 rounded-md border-0 bg-transparent p-0 text-left text-inherit ${FOCUS_RING_CLASSES}`}
        aria-expanded={expanded}
        aria-controls={viewModel.detailsId}
        aria-label={
          expanded
            ? `Collapse details for ${project.title}`
            : `Expand details for ${project.title}`
        }
      >
        <span className="min-w-[3rem] text-sm font-medium font-mono text-[var(--muted)]">
          {viewModel.startYear}
        </span>
        <span className="min-w-0 flex-1">
          <span
            id={titleId}
            className="block text-lg font-semibold text-[var(--fg)] transition-colors duration-150 group-hover:text-[var(--accent)]"
          >
            {project.title}
          </span>
        </span>
        <span
          className={`mt-0.5 flex-shrink-0 rounded p-1 transition-[background-color,color,transform] duration-150 group-hover:scale-110 group-active:scale-95 ${expanded ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : 'text-[var(--muted)] group-hover:bg-[var(--card)] group-hover:text-[var(--accent)]'}`}
          aria-hidden="true"
        >
          <ChevronIcon
            className={`transform transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`}
          />
        </span>
      </button>

      {project.collaborators && project.collaborators.length > 0 && (
        <ProjectCollaborators
          collaborators={project.collaborators}
          prefix="with "
          className="mt-0.5 ml-[3rem] block pl-4 text-sm text-[var(--muted)]"
        />
      )}

      {/* row 2: status, tech pills, links */}
      <div className="flex items-center gap-2 mt-2 ml-[3rem] pl-4">
        <StatusCircle status={project.status} size={22} />
        <ProjectTechnologies
          technologies={project.technologies}
          maxVisible={2}
          size="xs"
          showRelatedProjects
          className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5"
        />
        <ProjectLinks
          repoUrl={project.repoUrl}
          liveUrl={project.liveUrl}
          additionalLinks={project.additionalLinks}
          variant="icon"
          size="sm"
          className="flex flex-shrink-0 space-x-3"
          contextLabel={project.title}
        />
      </div>
    </article>
  )
}

export const ProjectMobileCard = memo(ProjectMobileCardImpl)
