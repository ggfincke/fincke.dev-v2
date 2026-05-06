// src/shared/types/dates.ts
// shared date span types

// month-level date point
export interface YearMonth
{
  readonly year: number
  readonly month: number
}

// date span supporting single-month, ranged, & ongoing entries
export interface DateSpan
{
  readonly start: YearMonth
  readonly end?: YearMonth
  readonly isCurrent?: boolean
}
