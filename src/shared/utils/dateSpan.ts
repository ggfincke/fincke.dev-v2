// src/shared/utils/dateSpan.ts
// shared helpers for formatting & sorting month-level date spans

import type { DateSpan, YearMonth } from '~/shared/types'

interface FormatDateSpanOptions
{
  expected?: boolean
}

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

// expose so callers can compute "now" once & thread it through hot loops
export function getCurrentYearMonth(): YearMonth
{
  const now = new Date()

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  }
}

// integer key (YYYYMM) for ordered comparison of YearMonth values
export function getYearMonthValue(value: YearMonth): number
{
  return value.year * 100 + value.month
}

function getLatestPoint(period: DateSpan, now: YearMonth): YearMonth
{
  if (period.isCurrent)
  {
    return now
  }

  return period.end ?? period.start
}

export function formatYearMonth(value: YearMonth): string
{
  return `${MONTH_LABELS[value.month - 1]} ${value.year}`
}

export function formatDateSpan(
  period: DateSpan,
  options: FormatDateSpanOptions = {}
): string
{
  let label: string

  if (period.isCurrent)
  {
    label = `${formatYearMonth(period.start)} – Present`
  }
  else if (period.end)
  {
    label = `${formatYearMonth(period.start)} – ${formatYearMonth(period.end)}`
  }
  else
  {
    label = formatYearMonth(period.start)
  }

  return options.expected ? `${label} (expected)` : label
}

export function getDateSpanStartYear(period: DateSpan): string
{
  return `${period.start.year}`
}

export function compareDateSpansByLatestDesc(
  left: DateSpan,
  right: DateSpan,
  now = getCurrentYearMonth()
): number
{
  const latestDifference =
    getYearMonthValue(getLatestPoint(right, now)) -
    getYearMonthValue(getLatestPoint(left, now))

  if (latestDifference !== 0)
  {
    return latestDifference
  }

  return getYearMonthValue(right.start) - getYearMonthValue(left.start)
}
