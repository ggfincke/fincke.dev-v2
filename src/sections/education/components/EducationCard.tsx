// src/sections/education/components/EducationCard.tsx
// compact credential-style education row

import { InteractiveCard } from '~/shared/components/layout/InteractiveCard'
import type { Education } from '~/shared/types'
import { formatDateSpan } from '~/shared/utils/dateSpan'
import { SchoolLogo } from '~/sections/education/components/SchoolLogo'

// props for education row
interface EducationCardProps
{
  education: Education
}

// compact education row w/ logo, school, degree, & date
export function EducationCard({ education }: EducationCardProps)
{
  const dateLabel = formatDateSpan(education.period, {
    expected: education.isExpected,
  })

  return (
    <InteractiveCard
      href={education.url}
      contentClassName="flex items-center gap-3"
      withHoverBackdrop
    >
      {education.logo && (
        <SchoolLogo logo={education.logo} className="h-12 w-12 shrink-0" />
      )}

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
          <h3 className="text-sm font-medium text-[var(--white)] transition-colors sm:truncate lg:group-hover:text-[var(--yellow)]">
            {education.school}
          </h3>
          <span className="text-xs text-[var(--muted)] sm:shrink-0">
            {dateLabel}
          </span>
        </div>

        <p className="truncate text-xs text-[var(--muted)]">
          <span className="text-[var(--yellow)]">{education.degree}</span>
          <span className="px-1.5">·</span>
          {education.location}
        </p>

        {education.honors && (
          <p className="truncate text-[11px] text-[var(--muted)]/80">
            {education.honors}
          </p>
        )}
      </div>
    </InteractiveCard>
  )
}
