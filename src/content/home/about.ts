// src/content/home/about.ts
// about section content

import type { TechnologyId } from '~/content/technologies'
import type { AboutContent } from '~/shared/types'
import { deepFreeze } from '~/shared/utils/deepFreeze'

// shared email constant
export const EMAIL = 'garrettfincke@gmail.com'

// freeform phrase highlight (concept terms not in the technology registry)
export interface AboutPhraseHighlight
{
  readonly color: string
  readonly words: readonly string[]
}

// About prose highlight config — tech IDs inherit color from registry category
export interface AboutHighlightConfig
{
  readonly technologyIds: readonly TechnologyId[]
  readonly phrases: readonly AboutPhraseHighlight[]
}

export const ABOUT_HIGHLIGHTS: AboutHighlightConfig = deepFreeze({
  technologyIds: [
    'python',
    'typescript',
    'swift',
    'react',
    'next-js',
    'fastapi',
    'django',
    'node-js',
    'swiftui',
    'uikit',
    'ios',
    'watchos',
    'postgresql',
    'docker',
    'aws',
    'github-actions',
  ],
  phrases: [
    {
      color: 'var(--red)',
      words: ['Scale AI'],
    },
    {
      color: 'var(--yellow)',
      words: ['AI infrastructure', 'retrieval systems', 'LLM-generated code'],
    },
  ],
})

// about section copy & email
export const ABOUT_CONTENT: AboutContent = deepFreeze({
  heading: 'About',
  paragraphs: [
    "I'm a full-stack engineer focused on AI infrastructure and retrieval systems. Most recently I spent a year at Scale AI building Python evaluation harnesses for LLM-generated code. I work mostly in Python and TypeScript: FastAPI/Django/Node.js + Postgres on the backend, React/Next.js on the web, and SwiftUI/UIKit for native iOS/watchOS, with Docker, GitHub Actions, and AWS for CI/CD and ops.",
    "I'm big on consistency, whether that's in code or in training. I've completed an Ironman 70.3 and am working toward the full. Outside of work I'm usually shipping side projects, iterating on tools I use a lot, and making small improvements where I can.",
  ],
  email: EMAIL,
  contact: {
    prefix: 'Would love to collaborate or chat! Reach me at ',
    suffix: '.',
  },
})
