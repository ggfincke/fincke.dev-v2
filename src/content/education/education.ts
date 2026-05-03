// src/content/education/education.ts
// education timeline data

import type { Education } from '~/shared/types'

export const EDUCATION: Education[] = [
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
  },
]
