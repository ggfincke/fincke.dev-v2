// src/content/experience/workExperience.ts
// work experience timeline data

import type { WorkExperience } from '~/shared/types'

export const WORK_EXPERIENCE: WorkExperience[] = [
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
        month: 8,
      },
    },
    description:
      'Developing secure, on-premises AI tooling for nuclear engineering workflows; building Python/FastAPI services around an internal engineering document index, and prototyping LLM-augmented retrieval emphasizing source grounding and human-in-the-loop review.',
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
      'Built internal tooling to evaluate LLM-generated code, automating compilation, execution, linting, and test orchestration to measure pass@k and correctness. Designed training/eval data pipelines with schema versioning and validation, and instrumented dashboards to track error rates and test failure modes.',
    technologies: ['python', 'typescript', 'data-pipelines', 'llm-evaluation'],
    link: 'https://medium.com/@ggfincke/how-pass-k-is-used-to-evaluate-llm-coding-performance-296e5c4565bc',
  },
]
