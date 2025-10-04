// src/sections/projects-archive/components/ProjectMobileCard.tsx
// mobile card view for project row

import type { Project } from '~/shared/types';
import { renderCollaborators } from '~/shared/utils/renderCollaborators';
import { ExpandToggle } from './ExpandToggle';

interface ProjectMobileCardProps {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
}

export function ProjectMobileCard({
  project,
  expanded,
  onToggle,
}: ProjectMobileCardProps) {
  const year = project.dateRange.match(/\d{4}/)?.[0] ?? 'TBD';

  return (
    <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--card)]/30 hover:bg-[var(--card)]/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="text-[var(--muted)] font-mono text-sm font-medium min-w-[3rem]">
          {year}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-[var(--fg)] text-lg mb-1">
            {project.title}
          </div>
          {project.collaborators && (
            <div className="text-sm text-[var(--muted)]">
              with {renderCollaborators(project.collaborators)}
            </div>
          )}
        </div>
        <ExpandToggle expanded={expanded} onToggle={onToggle} />
      </div>
    </div>
  );
}
