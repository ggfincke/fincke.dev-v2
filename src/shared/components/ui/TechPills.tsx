// src/shared/components/ui/TechPills.tsx
// reusable technology pills w/ optional overflow count

import type { TechnologyId } from '~/content/technologies'
import type { Project } from '~/shared/types'
import { SkillPill } from '~/shared/components/ui/SkillPill'

// props for technology pills
interface TechPillsProps
{
  technologies: readonly TechnologyId[]
  maxVisible?: number
  size?: 'xs' | 'sm' | 'md'
  showProjectsOnHover?: boolean
  getRelatedProjects?: (technologyId: TechnologyId) => readonly Project[]
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
  const rendersList = Wrapper === 'ul'
  const visibleCount =
    maxVisible !== undefined ? Math.max(maxVisible, 0) : undefined
  const visible =
    visibleCount !== undefined
      ? technologies.slice(0, visibleCount)
      : technologies
  const overflowCount =
    visibleCount !== undefined
      ? Math.max(technologies.length - visibleCount, 0)
      : 0
  const overflowLabel = (
    <span className="inline-flex shrink-0 items-center whitespace-nowrap text-xs text-[var(--muted)]">
      +{overflowCount} more
    </span>
  )

  return (
    <Wrapper className={className}>
      {visible.map((technologyId) =>
        rendersList ? (
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
      {overflowCount > 0 &&
        (rendersList ? <li>{overflowLabel}</li> : overflowLabel)}
    </Wrapper>
  )
}
