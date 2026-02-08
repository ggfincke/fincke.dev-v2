// src/sections/projects-archive/components/ProjectTableRow.tsx
// desktop table row for project

import { ProjectLinks } from '~/shared/components/layout/ProjectLinks';
import { SkillPill } from '~/shared/components/ui/SkillPill';
import { StatusCircle } from '~/shared/components/ui/StatusCircle';
import type { Project } from '~/shared/types';
import { renderCollaborators } from '~/shared/utils/renderCollaborators';
import { ExpandToggle } from './ExpandToggle';

interface ProjectTableRowProps {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
  getLiveLabel: (url: string) => string;
}

// project table row component
export function ProjectTableRow({
  project,
  expanded,
  onToggle,
  getLiveLabel,
}: ProjectTableRowProps) {
  const year = project.dateRange.match(/\d{4}/)?.[0] ?? 'TBD';

  return (
    <tr className="border-b border-[var(--border)] hover:bg-[var(--card)] transition-colors">
      <td className="py-6 pl-6 pr-2">
        <ExpandToggle expanded={expanded} onToggle={onToggle} />
      </td>
      <td className="py-6 pl-4 pr-4 text-[var(--comments)] font-mono text-sm">
        {year}
      </td>
      <td className="py-6 pl-4 pr-2">
        <div className="font-semibold text-[var(--white)] text-lg mb-1">
          {project.title}
        </div>
        {project.collaborators && (
          <div className="text-sm text-[var(--muted)]">
            with {renderCollaborators(project.collaborators)}
          </div>
        )}
      </td>
      <td className="py-6 px-4 text-center">
        <StatusCircle status={project.status} />
      </td>
      <td className="py-6 pl-4 pr-4 text-[var(--muted)]">{project.madeFor}</td>
      <td className="py-6 pl-4 pr-4">
        <div className="flex flex-wrap gap-2 items-center max-w-md">
          {project.technologies.slice(0, 3).map(tech => (
            <SkillPill key={tech} name={tech} size="xs" showProjectsOnHover />
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[var(--muted)] text-xs">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      </td>
      <td className="py-6 pl-4 pr-4">
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
      </td>
    </tr>
  );
}
