// src/sections/projects-archive/components/ProjectMobileCard.tsx
// mobile card view for project row

import { memo } from 'react'

import { NestedInteractionBoundary } from '~/shared/components/layout/NestedInteractionBoundary'
import { ProjectLinks } from '~/shared/components/layout/ProjectLinks'
import { ProjectIdentity } from '~/shared/components/projects/ProjectIdentity'
import { ProjectTechnologies } from '~/shared/components/projects/ProjectTechnologies'
import { StatusCircle } from '~/shared/components/ui/StatusCircle'
import type { Project, ProjectId } from '~/shared/types'
import { getKeyboardActivationProps } from '~/shared/utils/interaction'
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
  const keyboardActivationProps =
    getKeyboardActivationProps<HTMLDivElement>(onToggle)

  return (
    <div
      className={`rounded-lg px-4 py-3 cursor-pointer transition-[border-color,background-color] duration-200 hover:bg-[var(--card)]/50 ${expanded ? 'border border-[var(--accent)]/30 bg-[var(--card)]/50' : 'border border-[var(--border)] bg-[var(--card)]/30'}`}
      onClick={onToggle}
      onKeyDown={keyboardActivationProps.onKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-controls={viewModel.detailsId}
      aria-label={`Toggle details for ${project.title}`}
    >
      {/* row 1: year, title, toggle */}
      <div className="flex items-start justify-between gap-4">
        <div className="text-[var(--muted)] font-mono text-sm font-medium min-w-[3rem]">
          {viewModel.startYear}
        </div>
        <div className="flex-1">
          <ProjectIdentity
            title={project.title}
            collaborators={project.collaborators}
            variant="archive"
            titleClassName="font-semibold text-[var(--fg)] text-lg"
            collaboratorsClassName="mt-0.5 block text-sm text-[var(--muted)]"
          />
        </div>
        <NestedInteractionBoundary>
          <ExpandToggle
            expanded={expanded}
            onToggle={onToggle}
            controlsId={viewModel.detailsId}
            title={project.title}
          />
        </NestedInteractionBoundary>
      </div>

      {/* row 2: status, tech pills, links */}
      <div className="flex items-center gap-2 mt-2 ml-[3rem] pl-4">
        <StatusCircle status={project.status} size={22} />
        <NestedInteractionBoundary className="flex-1 min-w-0">
          <ProjectTechnologies
            technologies={project.technologies}
            maxVisible={2}
            size="xs"
            showRelatedProjects
            className="flex flex-wrap gap-1.5 items-center"
          />
        </NestedInteractionBoundary>
        <NestedInteractionBoundary className="flex-shrink-0">
          <ProjectLinks
            repoUrl={project.repoUrl}
            liveUrl={project.liveUrl}
            additionalLinks={project.additionalLinks}
            variant="icon"
            size="sm"
            className="flex space-x-3"
            contextLabel={project.title}
          />
        </NestedInteractionBoundary>
      </div>
    </div>
  )
}

export const ProjectMobileCard = memo(ProjectMobileCardImpl)
