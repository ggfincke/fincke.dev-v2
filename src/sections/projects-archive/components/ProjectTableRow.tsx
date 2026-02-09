// src/sections/projects-archive/components/ProjectTableRow.tsx
// desktop table row for project

import { getProjectsBySkill } from '~/content/projects';
import { ProjectLinks } from '~/shared/components/layout/ProjectLinks';
import { StatusCircle } from '~/shared/components/ui/StatusCircle';
import { TechPills } from '~/shared/components/ui/TechPills';
import type { Project } from '~/shared/types';
import { renderCollaborators } from '~/shared/utils/renderCollaborators';
import { getLiveLabel } from '../utils/getLiveLabel';
import { extractFirstYear } from '../utils/projectSort';
import { ExpandToggle } from './ExpandToggle';

// props for project table row
interface ProjectTableRowProps {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
}

// desktop table row for project
export function ProjectTableRow({
  project,
  expanded,
  onToggle,
}: ProjectTableRowProps) {
  const year = extractFirstYear(project.dateRange);

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
        <TechPills
          technologies={project.technologies}
          maxVisible={3}
          size="xs"
          showProjectsOnHover
          getRelatedProjects={getProjectsBySkill}
          className="flex flex-wrap gap-2 items-center max-w-md"
        />
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
