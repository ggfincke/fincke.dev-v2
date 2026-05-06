// src/content/experience/workExperience.ts
// work experience timeline data

import type { ExperienceContent, WorkExperience } from '~/shared/types'
import { deepFreeze } from '~/shared/utils/deepFreeze'

export const EXPERIENCE_CONTENT = deepFreeze({
  heading: 'Experience',
  resumeCtaLabel: 'View Full Resume',
} satisfies ExperienceContent)

export const WORK_EXPERIENCE = deepFreeze([
  {
    id: 'westinghouse-software-developer-intern',
    title: 'Software Developer Intern, GIC Tools and Applications',
    company: 'Westinghouse Electric Company',
    period: {
      start: {
        year: 2026,
        month: 5,
      },
      isCurrent: true,
    },
    description:
      'On-premises AI tooling for nuclear engineering workflows. Building Python/FastAPI services around an internal document index and prototyping LLM-augmented retrieval with source-grounded outputs.',
    technologies: ['python', 'fastapi', 'ollama'],
  },
  {
    id: 'scale-ai-software-engineer-contract',
    title: 'Software Engineer (contract)',
    company: 'Scale AI',
    period: {
      start: {
        year: 2024,
        month: 5,
      },
      end: {
        year: 2025,
        month: 7,
      },
    },
    description:
      'Python evaluation harnesses for LLM-generated code: sandboxed Docker execution, automated linting and test orchestration to measure pass@k, plus schema-versioned data pipelines for reproducible validation.',
    technologies: ['python', 'typescript', 'data-pipelines', 'llm-evaluation'],
    link: 'https://medium.com/@ggfincke/how-pass-k-is-used-to-evaluate-llm-coding-performance-296e5c4565bc',
  },
] satisfies WorkExperience[])
