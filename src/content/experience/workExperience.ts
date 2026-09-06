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
      end: {
        year: 2026,
        month: 12,
      },
    },
    description:
      'Built a Python/FastAPI service for Oracle-backed Document Index data, exposing 15 OpenAPI operations across SharePoint, revision, and Excel workflows. Added deterministic retrieval and access controls across 60,000 CI memberships.',
    technologies: ['python', 'fastapi', 'oracle', 'openapi', 'databricks'],
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
      'Python/Docker evaluation harnesses for LLM-generated code with pass@k scoring and failure analysis. Built schema-versioned Pydantic/JSON Schema pipelines with deterministic sampling, plus dashboards for evaluation failure triage.',
    technologies: [
      'python',
      'docker',
      'pydantic',
      'json-schema',
      'llm-evaluation',
    ],
    link: 'https://medium.com/@ggfincke/how-pass-k-is-used-to-evaluate-llm-coding-performance-296e5c4565bc',
  },
] satisfies WorkExperience[])
