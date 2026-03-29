// src/sections/projects-archive/components/ProjectMobileCard.tsx
// mobile card view for project row

import type { KeyboardEvent } from 'react'

import { getProjectsBySkill } from '~/content/projects'
import { ProjectLinks } from '~/shared/components/layout/ProjectLinks'
import { StatusCircle } from '~/shared/components/ui/StatusCircle'
import { TechPills } from '~/shared/components/ui/TechPills'
import type { Project } from '~/shared/types'
import { renderCollaborators } from '~/shared/utils/renderCollaborators'
import { extractFirstYear } from '../utils/projectSort'
import { getLiveLabel } from '../utils/getLiveLabel'
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
  const year = extractFirstYear(project.dateRange)

  const handleKeyDown = (e: KeyboardEvent) =>
  {
    if (e.key === 'Enter' || e.key === ' ')
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
    >
      {/* row 1: year, title, toggle */}
      <div className="flex items-start justify-between gap-4">
        <div className="text-[var(--muted)] font-mono text-sm font-medium min-w-[3rem]">
          {year}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-[var(--fg)] text-lg">
            {project.title}
          </div>
          {project.collaborators && (
            <div className="text-sm text-[var(--muted)] mt-0.5">
              with {renderCollaborators(project.collaborators)}
            </div>
          )}
        </div>
        <div
          role="presentation"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <ExpandToggle expanded={expanded} onToggle={onToggle} />
        </div>
      </div>

      {/* row 2: status, tech pills, links */}
      <div className="flex items-center gap-2 mt-2 ml-[3rem] pl-4">
        <StatusCircle status={project.status} size={22} />
        <div
          className="flex-1 min-w-0"
          role="presentation"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <TechPills
            technologies={project.technologies}
            maxVisible={2}
            size="xs"
            showProjectsOnHover
            getRelatedProjects={getProjectsBySkill}
            className="flex flex-wrap gap-1.5 items-center"
          />
        </div>
        <div
          className="flex-shrink-0"
          role="presentation"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <ProjectLinks
            repoUrl={project.repoUrl}
            liveUrl={project.liveUrl}
            additionalLinks={project.additionalLinks}
            variant="icon"
            size="sm"
            liveLabel={
              project.liveUrl ? getLiveLabel(project.liveUrl) : undefined
            }
            className="flex space-x-3"
          />
        </div>
      </div>
    </div>
  )
}
