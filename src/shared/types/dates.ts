// src/shared/types/dates.ts
// shared date span types

// month-level date point
export interface YearMonth
{
  year: number
  month: number
}

// date span supporting single-month, ranged, & ongoing entries
export interface DateSpan
{
  start: YearMonth
  end?: YearMonth
  isCurrent?: boolean
}
