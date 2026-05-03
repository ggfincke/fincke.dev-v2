// src/sections/education/components/EducationCard.tsx
// compact credential-style education row

import type { Education } from '~/shared/types'
import { formatDateSpan } from '~/shared/utils/dateSpan'
import { PennStateLogo, PittLogo } from './SchoolLogo'

// resolve a logo for the given education entry id
function renderSchoolLogo(educationId: string)
{
  switch (educationId)
  {
    case 'university-of-pittsburgh-mscs':
      return <PittLogo />
    case 'pennsylvania-state-university-bscs':
      return <PennStateLogo />
    default:
      return null
  }
}

// props for education row
interface EducationCardProps
{
  education: Education
}

// compact education row w/ logo, school, degree, & date
export function EducationCard({ education }: EducationCardProps)
{
  const dateLabel = education.isExpected
    ? `${formatDateSpan(education.period)} (expected)`
    : formatDateSpan(education.period)

  const logo = renderSchoolLogo(education.id)

  return (
    <div className="flex items-center gap-3">
      {logo && <div className="h-12 w-12 shrink-0">{logo}</div>}

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
          <h3 className="text-sm font-medium text-[var(--white)] sm:truncate">
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
    </div>
  )
}
