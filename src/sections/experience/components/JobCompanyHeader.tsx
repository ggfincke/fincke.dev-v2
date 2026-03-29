// src/sections/experience/components/JobCompanyHeader.tsx
// company name & date range header

import type { DateSpan } from '~/shared/types'
import { formatDateSpan } from '~/shared/utils/dateSpan'

// props for company header
interface JobCompanyHeaderProps
{
  company: string
  period: DateSpan
}

// company name & date range header
export function JobCompanyHeader({ company, period }: JobCompanyHeaderProps)
{
  return (
    <div className="mb-2 flex items-baseline justify-between gap-2">
      <h3 className="text-sm font-medium text-[var(--white)]">{company}</h3>
      <span className="text-xs text-[var(--muted)]">
        {formatDateSpan(period)}
      </span>
    </div>
  )
}
