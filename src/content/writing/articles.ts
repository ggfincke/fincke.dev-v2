// src/content/writing/articles.ts
// published article list

import type { Article, WritingContent } from '~/shared/types'
import { deepFreeze } from '~/shared/utils/deepFreeze'

export const WRITING_CONTENT = deepFreeze({
  heading: 'Writing',
} satisfies WritingContent)

// newest first
export const ARTICLES = deepFreeze([
  {
    id: 'google-hiring-experience-fall-2025',
    title: 'My Google Hiring Experience (Fall 2025)',
    url: 'https://medium.com/@ggfincke/my-google-hiring-experience-fall-2025-8e99c8a1d815',
    publisher: 'Medium',
    published: {
      year: 2026,
      month: 1,
    },
  },
  {
    id: 'pass-at-k-llm-coding-evaluation',
    title: 'How pass@k is used to evaluate LLM coding performance',
    url: 'https://medium.com/@ggfincke/how-pass-k-is-used-to-evaluate-llm-coding-performance-296e5c4565bc',
    publisher: 'Medium',
    published: {
      year: 2025,
      month: 9,
    },
  },
] satisfies Article[])
