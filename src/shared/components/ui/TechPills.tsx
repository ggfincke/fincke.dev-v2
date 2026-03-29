// src/shared/components/ui/TechPills.tsx
// reusable technology pills w/ optional overflow count

import type { TechnologyId } from '~/content/technologies'
import type { Project } from '~/shared/types'
import { SkillPill } from './SkillPill'

// props for technology pills
interface TechPillsProps
{
  technologies: TechnologyId[]
  maxVisible?: number
  size?: 'xs' | 'sm' | 'md'
  showProjectsOnHover?: boolean
  getRelatedProjects?: (technologyId: TechnologyId) => Project[]
  className?: string
  as?: 'div' | 'ul'
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
}: TechPillsProps)
{
  const visible =
    maxVisible !== undefined ? technologies.slice(0, maxVisible) : technologies
  const overflowCount =
    maxVisible !== undefined ? technologies.length - maxVisible : 0

  return (
    <Wrapper className={className}>
      {visible.map((technologyId) =>
        Wrapper === 'ul' ? (
          <li key={technologyId}>
            <SkillPill
              technologyId={technologyId}
              size={size}
              showProjectsOnHover={showProjectsOnHover}
              getRelatedProjects={getRelatedProjects}
            />
          </li>
        ) : (
          <SkillPill
            key={technologyId}
            technologyId={technologyId}
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
  )
}
