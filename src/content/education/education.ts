// src/content/education/education.ts
// education timeline data

import type { Education, EducationContent } from '~/shared/types'
import { deepFreeze } from '~/shared/utils/deepFreeze'

export const EDUCATION_CONTENT = deepFreeze({
  heading: 'Education',
} satisfies EducationContent)

export const EDUCATION = deepFreeze([
  {
    id: 'university-of-pittsburgh-mscs',
    school: 'University of Pittsburgh',
    degree: 'M.S. in Computer Science',
    location: 'Pittsburgh, PA',
    period: {
      start: {
        year: 2026,
        month: 8,
      },
      end: {
        year: 2028,
        month: 5,
      },
    },
    isExpected: true,
    honors: 'SCI Scholarship for Excellence',
    url: 'https://www.pitt.edu',
    logo: 'pitt',
  },
  {
    id: 'pennsylvania-state-university-bscs',
    school: 'The Pennsylvania State University',
    degree: 'B.S. in Computer Science',
    location: 'University Park, PA',
    period: {
      start: {
        year: 2021,
        month: 8,
      },
      end: {
        year: 2024,
        month: 12,
      },
    },
    url: 'https://www.psu.edu',
    logo: 'penn-state',
  },
] satisfies Education[])
