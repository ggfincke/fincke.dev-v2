// src/content/experience/workExperience.ts
// work experience timeline data

import type { WorkExperience } from '~/shared/types';

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    title: 'Software Engineer (contract)',
    company: 'Scale AI',
    dateRange: 'May 2024 — Jul 2025',
    description:
      'Built internal tooling to evaluate LLM-generated code, automating compilation, execution, linting, and test orchestration to measure pass@k and correctness. Designed training/eval data pipelines with schema versioning and validation, and instrumented dashboards to track error rates and test failure modes.',
    technologies: ['Python', 'TypeScript', 'Data Pipelines', 'LLM Evaluation'],
    link: 'https://medium.com/@ggfincke/how-pass-k-is-used-to-evaluate-llm-coding-performance-296e5c4565bc',
  },
  {
    title: 'CMPSC 475 Learning Assistant (iOS / Applications Programming)',
    company: 'Pennsylvania State University',
    dateRange: 'Aug 2024 — Dec 2024',
    description:
      'Mentored students in iOS/mobile application development using Swift and SwiftUI. Collaborated with faculty to tailor instruction based on student progress.',
    technologies: ['Swift', 'SwiftUI', 'iOS'],
    visibility: 'wide',
  },
  // NOT INCLUDED BC OF SPACE CONSTRAINTS :)
  // {
  //   title: 'CMPSC 475 Learning Assistant (iOS / Applications Programming)',
  //   company: 'Pennsylvania State University',
  //   dateRange: 'Aug 2024 — Dec 2024',
  //   description:
  //     'Mentored students in iOS/mobile application development using Swift and SwiftUI. Collaborated with faculty to tailor instruction based on student progress and technical challenges.',
  //   technologies: ['Swift', 'SwiftUI', 'iOS'],
  // },
  // {
  //   title: 'Owner / Operator',
  //   company: 'Pink Ocean Collectibles',
  //   dateRange: 'Apr 2020 — Present',
  //   description:
  //     'Build and operate multi-channel storefront with 2000+ sales, $75k+ lifetime profit, and 100% positive feedback.',
  //   technologies: [],
  // },
];
