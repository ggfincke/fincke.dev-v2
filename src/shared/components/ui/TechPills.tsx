// src/shared/components/ui/TechPills.tsx
// reusable technology pills w/ optional overflow count

import type { Project } from '~/shared/types';
import { SkillPill } from './SkillPill';

// props for technology pills
interface TechPillsProps {
  technologies: string[];
  maxVisible?: number;
  size?: 'xs' | 'sm' | 'md';
  showProjectsOnHover?: boolean;
  getRelatedProjects?: (name: string) => Project[];
  className?: string;
  as?: 'div' | 'ul';
}

// reusable technology pills w/ optional overflow count
export function TechPills({
  technologies,
  maxVisible,
  size = 'sm',
  showProjectsOnHover,
  getRelatedProjects,
  className,
  as: Wrapper = 'div',
}: TechPillsProps) {
  const visible =
    maxVisible !== undefined ? technologies.slice(0, maxVisible) : technologies;
  const overflowCount =
    maxVisible !== undefined ? technologies.length - maxVisible : 0;

  return (
    <Wrapper className={className}>
      {visible.map(tech =>
        Wrapper === 'ul' ? (
          <li key={tech}>
            <SkillPill
              name={tech}
              size={size}
              showProjectsOnHover={showProjectsOnHover}
              getRelatedProjects={getRelatedProjects}
            />
          </li>
        ) : (
          <SkillPill
            key={tech}
            name={tech}
            size={size}
            showProjectsOnHover={showProjectsOnHover}
            getRelatedProjects={getRelatedProjects}
          />
        )
      )}
      {overflowCount > 0 && (
        <span className="inline-flex shrink-0 items-center whitespace-nowrap text-xs text-[var(--muted)]">
          +{overflowCount} more
        </span>
      )}
    </Wrapper>
  );
}
