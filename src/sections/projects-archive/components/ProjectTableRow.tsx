// src/sections/projects-archive/components/ProjectTableRow.tsx
// desktop table row for project

import { ProjectLinks } from '~/shared/components/layout/ProjectLinks'
import { ProjectIdentity } from '~/shared/components/projects/ProjectIdentity'
import { ProjectTechnologies } from '~/shared/components/projects/ProjectTechnologies'
import { StatusCircle } from '~/shared/components/ui/StatusCircle'
import type { Project } from '~/shared/types'
import { ANIMATION_DELAYS, staggerDelay } from '~/shared/utils/animationConfig'
import { getNestedInteractionProps } from '~/shared/utils/interaction'
import { getProjectViewModel } from '~/shared/utils/projectViewModel'
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
  const viewModel = getProjectViewModel(project)

  return (
    <tr
      className={`group/row cursor-pointer transition-colors hover:bg-[var(--card)]/40 hover:shadow-[inset_3px_0_0_var(--accent)] animate-slide-in-up opacity-0 ${expanded ? 'border-b-0' : 'border-b border-[var(--border)]'}`}
      style={{
        animationDelay: staggerDelay(
          ANIMATION_DELAYS.projectsArchive.desktop.base,
          ANIMATION_DELAYS.projectsArchive.desktop.step,
          index
        ),
      }}
      onClick={onToggle}
    >
      <td
        className="py-4 pl-4 pr-1"
        {...getNestedInteractionProps<HTMLTableCellElement>()}
      >
        <ExpandToggle
          expanded={expanded}
          onToggle={onToggle}
          controlsId={viewModel.detailsId}
          title={project.title}
        />
      </td>
      <td className="py-4 pl-4 pr-4 text-[var(--muted)]/70 font-mono text-sm">
        {viewModel.startYear}
      </td>
      <td className="py-4 pl-4 pr-2">
        <ProjectIdentity
          title={project.title}
          collaborators={project.collaborators}
          variant="archive"
          titleClassName="font-semibold text-[var(--white)] text-base"
          collaboratorsClassName="mt-0.5 block text-sm text-[var(--muted)]"
        />
      </td>
      <td className="py-4 px-4 text-center">
        <StatusCircle status={project.status} size={28} />
      </td>
      <td className="py-4 pl-4 pr-4 text-[var(--muted)]">{project.madeFor}</td>
      <td
        className="py-4 pl-4 pr-4"
        {...getNestedInteractionProps<HTMLTableCellElement>()}
      >
        <ProjectTechnologies
          technologies={project.technologies}
          maxVisible={3}
          size="xs"
          showRelatedProjects
          className="flex flex-wrap gap-2 items-center max-w-md"
        />
      </td>
      <td className="py-4 pl-4 pr-4 opacity-60 group-hover/row:opacity-100 transition-opacity">
        <div
          role="presentation"
          {...getNestedInteractionProps<HTMLDivElement>()}
        >
          <ProjectLinks
            repoUrl={project.repoUrl}
            liveUrl={project.liveUrl}
            additionalLinks={project.additionalLinks}
            variant="icon"
            className="flex space-x-4"
            contextLabel={project.title}
          />
        </div>
      </td>
    </tr>
  )
}
