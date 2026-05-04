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

// work experience entry shape
export interface WorkExperience
{
  id: WorkExperienceId
  title: string
  company: string
  period: DateSpan
  description: string
  technologies?: TechnologyId[]
  link?: string
}
