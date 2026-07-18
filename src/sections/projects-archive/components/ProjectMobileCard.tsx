// src/sections/projects-archive/components/ProjectMobileCard.tsx
// mobile card view for project row

import { memo } from 'react'

import { ProjectLinks } from '~/shared/components/layout/ProjectLinks'
import { ProjectCollaborators } from '~/shared/components/projects/ProjectCollaborators'
import { ProjectTechnologies } from '~/shared/components/projects/ProjectTechnologies'
import { StatusCircle } from '~/shared/components/ui/StatusCircle'
import type { Project, ProjectId } from '~/shared/types'
import { getNestedInteractionProps } from '~/shared/utils/interaction'
import type { ProjectViewModel } from '~/shared/utils/projectViewModel'
import { ExpandToggle } from '~/sections/projects-archive/components/ExpandToggle'

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
    // card-wide tap is a pointer convenience; ExpandToggle is the accessible control
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <article
      className={`group cursor-pointer rounded-lg px-4 py-3 transition-[border-color,background-color] duration-200 hover:bg-[var(--card)]/50 ${expanded ? 'border border-[var(--accent)]/30 bg-[var(--card)]/50' : 'border border-[var(--border)] bg-[var(--card)]/30'}`}
      aria-labelledby={titleId}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="min-w-[3rem] text-sm font-medium font-mono text-[var(--muted)]">
          {viewModel.startYear}
        </span>
        <h3
          id={titleId}
          className="min-w-0 flex-1 text-lg font-semibold text-[var(--fg)] transition-colors duration-150 group-hover:text-[var(--accent)]"
        >
          {project.title}
        </h3>
        <span
          className="flex shrink-0"
          {...getNestedInteractionProps<HTMLSpanElement>()}
        >
          <ExpandToggle
            expanded={expanded}
            onToggle={onToggle}
            controlsId={viewModel.detailsId}
            title={project.title}
          />
        </span>
      </div>

      {project.collaborators && project.collaborators.length > 0 && (
        <ProjectCollaborators
          collaborators={project.collaborators}
          prefix="with "
          className="mt-0.5 ml-[3rem] block pl-4 text-sm text-[var(--muted)]"
        />
      )}

      <div
        className="flex items-center gap-2 mt-2 ml-[3rem] pl-4"
        {...getNestedInteractionProps<HTMLDivElement>()}
      >
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
