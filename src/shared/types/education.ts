// src/shared/types/education.ts
// education entry types

import type { DateSpan } from '~/shared/types/dates'

// known education entry ids
export const EDUCATION_IDS = [
  'university-of-pittsburgh-mscs',
  'pennsylvania-state-university-bscs',
] as const

export type EducationId = (typeof EDUCATION_IDS)[number]

// known logo identifiers (registry keys for school logos)
export type EducationLogo = 'pitt' | 'penn-state'

// education section copy
export interface EducationContent
{
  readonly heading: string
}

// education entry shape
export interface Education
{
  readonly id: EducationId
  readonly school: string
  readonly degree: string
  readonly location: string
  readonly period: DateSpan
  readonly isExpected?: boolean
  readonly honors?: string
  readonly url?: string
  readonly logo?: EducationLogo
}
