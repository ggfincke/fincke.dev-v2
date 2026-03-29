// src/shared/types/experience.ts
// work experience types

import type { TechnologyId } from '~/content/technologies'

import type { DateSpan } from './dates'

// work experience entry shape
export interface WorkExperience
{
  id: string
  title: string
  company: string
  period: DateSpan
  description: string
  technologies?: TechnologyId[]
  link?: string
  showOnUltraWide?: boolean
}
