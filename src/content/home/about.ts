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

export const ABOUT_HIGHLIGHTS = deepFreeze({
  technologyIds: [
    'python',
    'typescript',
    'fastapi',
    'swiftui',
    'ios',
    'watchos',
  ],
  phrases: [
    {
      color: 'var(--accent)',
      words: ['Westinghouse', 'Pitt'],
    },
    {
      color: 'var(--red)',
      words: ['Scale AI'],
    },
    {
      color: 'var(--yellow)',
      words: ['AI infrastructure', 'retrieval systems', 'LLM-generated code'],
    },
  ],
} satisfies AboutHighlightConfig)

// about section copy & email
export const ABOUT_CONTENT = deepFreeze({
  heading: 'About',
  paragraphs: [
    "I'm a software engineer and M.S. CS student at Pitt, focused on AI infrastructure and retrieval systems. I'm currently interning at Westinghouse, building Python/FastAPI services over legacy document systems, after a year at Scale AI building evaluation harnesses for LLM-generated code. Most of my work is in Python and TypeScript, with SwiftUI when a project calls for iOS or watchOS.",
    "I'm big on consistency, whether that's in code or in training. I've completed an Ironman 70.3 and am working toward the full. Outside of work I'm usually shipping side projects, iterating on tools I use a lot, and making small improvements where I can.",
  ],
  email: EMAIL,
  contact: {
    prefix: 'Would love to collaborate or chat! Reach me at ',
    suffix: '.',
  },
} satisfies AboutContent)
