// src/shared/types/experience.ts
// work experience types

import type { TechnologyId } from '~/content/technologies'
import type { DateSpan } from '~/shared/types/dates'

// known work experience entry ids
export const WORK_EXPERIENCE_IDS = [
  'westinghouse-software-developer-intern',
  'scale-ai-software-engineer-contract',
] as const

export type WorkExperienceId = (typeof WORK_EXPERIENCE_IDS)[number]

// experience section copy & content-owned controls
export interface ExperienceContent
{
  readonly heading: string
  readonly resumeCtaLabel: string
}

// work experience entry shape
export interface WorkExperience
{
  readonly id: WorkExperienceId
  readonly title: string
  readonly company: string
  readonly period: DateSpan
  readonly description: string
  readonly technologies?: readonly TechnologyId[]
  readonly link?: string
}
