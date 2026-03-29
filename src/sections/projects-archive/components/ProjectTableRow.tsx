// src/sections/projects-archive/components/ProjectTableRow.tsx
// desktop table row for project

import { getProjectsBySkill } from '~/content/projects'
import { ProjectLinks } from '~/shared/components/layout/ProjectLinks'
import { StatusCircle } from '~/shared/components/ui/StatusCircle'
import { TechPills } from '~/shared/components/ui/TechPills'
import type { Project } from '~/shared/types'
import { staggerDelay } from '~/shared/utils/animationConfig'
import { renderCollaborators } from '~/shared/utils/renderCollaborators'
import { getLiveLabel } from '../utils/getLiveLabel'
import { extractFirstYear } from '../utils/projectSort'
import { ExpandToggle } from './ExpandToggle'

// props for project table row
interface ProjectTableRowProps
{
  project: Project
  expanded: boolean
  onToggle: () => void
  index: number
}

// desktop table row for project
export function ProjectTableRow({
  project,
  expanded,
  onToggle,
  index,
}: ProjectTableRowProps)
{
  const year = extractFirstYear(project.dateRange)

  return (
    <tr
      className={`group/row cursor-pointer transition-colors hover:bg-[var(--card)]/40 hover:shadow-[inset_3px_0_0_var(--accent)] animate-slide-in-up opacity-0 ${expanded ? 'border-b-0' : 'border-b border-[var(--border)]'}`}
      style={{ animationDelay: staggerDelay(0.05, 0.025, index) }}
      onClick={onToggle}
    >
      <td className="py-4 pl-4 pr-1" onClick={(e) => e.stopPropagation()}>
        <ExpandToggle expanded={expanded} onToggle={onToggle} />
      </td>
      <td className="py-4 pl-4 pr-4 text-[var(--muted)]/70 font-mono text-sm">
        {year}
      </td>
      <td className="py-4 pl-4 pr-2">
        <div className="font-semibold text-[var(--white)] text-base">
          {project.title}
        </div>
        {project.collaborators && (
          <div className="text-sm text-[var(--muted)] mt-0.5">
            with {renderCollaborators(project.collaborators)}
          </div>
        )}
      </td>
      <td className="py-4 px-4 text-center">
        <StatusCircle status={project.status} size={28} />
      </td>
      <td className="py-4 pl-4 pr-4 text-[var(--muted)]">{project.madeFor}</td>
      <td className="py-4 pl-4 pr-4" onClick={(e) => e.stopPropagation()}>
        <TechPills
          technologies={project.technologies}
          maxVisible={3}
          size="xs"
          showProjectsOnHover
          getRelatedProjects={getProjectsBySkill}
          className="flex flex-wrap gap-2 items-center max-w-md"
        />
      </td>
      <td className="py-4 pl-4 pr-4 opacity-60 group-hover/row:opacity-100 transition-opacity">
        <div
          role="presentation"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <ProjectLinks
            repoUrl={project.repoUrl}
            liveUrl={project.liveUrl}
            additionalLinks={project.additionalLinks}
            variant="icon"
            liveLabel={
              project.liveUrl ? getLiveLabel(project.liveUrl) : undefined
            }
            className="flex space-x-4"
          />
        </div>
      </td>
    </tr>
  )
}
