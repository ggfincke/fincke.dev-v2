// src/sections/projects-archive/components/ProjectMobileCard.tsx
// mobile card view for project row

import type { KeyboardEvent } from 'react'

import { ProjectLinks } from '~/shared/components/layout/ProjectLinks'
import { ProjectIdentity } from '~/shared/components/projects/ProjectIdentity'
import { ProjectTechnologies } from '~/shared/components/projects/ProjectTechnologies'
import { StatusCircle } from '~/shared/components/ui/StatusCircle'
import type { Project } from '~/shared/types'
import { getNestedInteractionProps } from '~/shared/utils/interaction'
import { getProjectViewModel } from '~/shared/utils/projectViewModel'
import { ExpandToggle } from './ExpandToggle'

// props for mobile project card
interface ProjectMobileCardProps
{
  project: Project
  expanded: boolean
  onToggle: () => void
}

// mobile card view for project row
export function ProjectMobileCard({
  project,
  expanded,
  onToggle,
}: ProjectMobileCardProps)
{
  const viewModel = getProjectViewModel(project)

  const handleKeyDown = (e: KeyboardEvent) =>
  {
    if (
      e.key === 'Enter' ||
      e.key === ' ' ||
      e.key === 'Space' ||
      e.key === 'Spacebar'
    )
    {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <div
      className={`rounded-lg px-4 py-3 cursor-pointer transition-[border-color,background-color] duration-200 hover:bg-[var(--card)]/50 ${expanded ? 'border border-[var(--accent)]/30 bg-[var(--card)]/50' : 'border border-[var(--border)] bg-[var(--card)]/30'}`}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-controls={viewModel.detailsId}
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
        <div
          role="presentation"
          {...getNestedInteractionProps<HTMLDivElement>()}
        >
          <ExpandToggle
            expanded={expanded}
            onToggle={onToggle}
            controlsId={viewModel.detailsId}
            title={project.title}
          />
        </div>
      </div>

      {/* row 2: status, tech pills, links */}
      <div className="flex items-center gap-2 mt-2 ml-[3rem] pl-4">
        <StatusCircle status={project.status} size={22} />
        <div
          className="flex-1 min-w-0"
          role="presentation"
          {...getNestedInteractionProps<HTMLDivElement>()}
        >
          <ProjectTechnologies
            technologies={project.technologies}
            maxVisible={2}
            size="xs"
            showRelatedProjects
            className="flex flex-wrap gap-1.5 items-center"
          />
        </div>
        <div
          className="flex-shrink-0"
          role="presentation"
          {...getNestedInteractionProps<HTMLDivElement>()}
        >
          <ProjectLinks
            repoUrl={project.repoUrl}
            liveUrl={project.liveUrl}
            additionalLinks={project.additionalLinks}
            variant="icon"
            size="sm"
            className="flex space-x-3"
            contextLabel={project.title}
          />
        </div>
      </div>
    </div>
  )
}
