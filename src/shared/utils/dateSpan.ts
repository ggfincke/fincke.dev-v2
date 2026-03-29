// src/shared/utils/dateSpan.ts
// shared helpers for formatting & sorting month-level date spans

import type { DateSpan, YearMonth } from '~/shared/types'

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

function getCurrentYearMonth(): YearMonth
{
  const now = new Date()

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  }
}

function getYearMonthValue(value: YearMonth): number
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

export function formatDateSpan(period: DateSpan): string
{
  if (period.isCurrent)
  {
    return `${formatYearMonth(period.start)} – Present`
  }

  if (period.end)
  {
    return `${formatYearMonth(period.start)} – ${formatYearMonth(period.end)}`
  }

  return formatYearMonth(period.start)
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
