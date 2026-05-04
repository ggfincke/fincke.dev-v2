// src/shared/types/education.ts
// education entry types

import type { DateSpan } from '~/shared/types/dates'

// known education entry ids — narrow union derived from EDUCATION content
export type EducationId =
  | 'university-of-pittsburgh-mscs'
  | 'pennsylvania-state-university-bscs'

// known logo identifiers (registry keys for school logos)
export type EducationLogo = 'pitt' | 'penn-state'

// education entry shape
export interface Education
{
  id: EducationId
  school: string
  degree: string
  location: string
  period: DateSpan
  isExpected?: boolean
  honors?: string
  url?: string
  logo?: EducationLogo
}
