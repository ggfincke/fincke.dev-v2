// src/sections/experience/components/JobCompanyHeader.tsx
// company name & date range header

import { ExternalLinkIcon } from '~/shared/components/ui/icons'
import type { DateSpan } from '~/shared/types'
import { formatDateSpan } from '~/shared/utils/dateSpan'

// props for company header
interface JobCompanyHeaderProps
{
  company: string
  period: DateSpan
  hasExternalLink?: boolean
}

// company name & date range header w/ optional external-link indicator
export function JobCompanyHeader({
  company,
  period,
  hasExternalLink = false,
}: JobCompanyHeaderProps)
{
  return (
    <div className="mb-2 flex items-baseline justify-between gap-2">
      <h3 className="text-sm font-medium text-[var(--white)]">
        {company}
        {hasExternalLink && (
          <ExternalLinkIcon size={12} className="ml-1 inline-block" />
        )}
      </h3>
      <span className="text-xs text-[var(--muted)]">
        {formatDateSpan(period)}
      </span>
    </div>
  )
}
