// src/shared/types/education.ts
// education entry types

import type { DateSpan } from './dates'

// education entry shape
export interface Education
{
  id: string
  school: string
  degree: string
  location: string
  period: DateSpan
  isExpected?: boolean
  honors?: string
}
