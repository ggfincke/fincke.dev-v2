// src/content/experience/workExperience.ts
// work experience timeline data

import type { WorkExperience } from '~/shared/types'

export const WORK_EXPERIENCE: WorkExperience[] = [
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
  {
    id: 'pennsylvania-state-university-cmpsc-475-learning-assistant-ios-applications-programming',
    title: 'CMPSC 475 Learning Assistant (iOS / Applications Programming)',
    company: 'Pennsylvania State University',
    period: {
      start: {
        year: 2024,
        month: 8,
      },
      end: {
        year: 2024,
        month: 12,
      },
    },
    description:
      'Mentored students in iOS/mobile application development using Swift and SwiftUI. Collaborated with faculty to tailor instruction based on student progress.',
    technologies: ['swift', 'swiftui', 'ios'],
    showOnUltraWide: true,
  },
]
