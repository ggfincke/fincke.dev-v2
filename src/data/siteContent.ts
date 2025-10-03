// src/data/siteContent.ts
// static content for hero, about, & navigation

import type {
  HeroContent,
  AboutContent,
  WorkExperience,
  SocialLink,
} from '~/types';

export const HERO_CONTENT: HeroContent = {
  name: 'Garrett Fincke',
  tagline:
    'Full-stack developer specializing in clean code, scalable systems, and modern web/mobile architecture',
};

export const ABOUT_CONTENT: AboutContent = {
  heading: 'About',
  paragraphs: [
    "I'm a full-stack engineer who ships clean, maintainable systems end-to-end. I work mostly in Python and TypeScript, but I have experience across numerous languages. Most recently, I've been experimenting with Java/Go. Across the backend, I tend to lean on FastAPI/Django + Postgres with Docker, GitHub Actions, and AWS for CI/CD and ops. On the frontend, I near-exclusively use React/Next.js for web. I've also used Swift and SwiftUI/UIkit extensively for mobile development.",
    "I'm early in my career but deep in AI. Most recently, I finished up over a year of contract work at Scale AI, where I built evaluation tooling for LLM coding tasks, including data pipelines, pass@k metrics, harnesses, and test orchestration. I have also been building production-ready projects: Hopper (cross-platform inventory management for e-commerce), TrackBasket (price tracking with LLM-assisted matching/search), Minecart (a Discord bot that manages local/AWS Minecraft servers), and SwimMate (native iOS/watchOS swim tracking). I optimize for clean design, code, and docs.",
    "Outside of code, I swim, run, and journal. My workout consistency is the same I bring to my engineering approach–boring and effective. I completed an Ironman 70.3 in 2024 and I'm eyeing a full marathon and open-water races. When there's time, I produce music and play video games; when there's budget, I adore travel.",
  ],
  email: 'garrettfincke@gmail.com',
};

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    title: 'Software Engineering Contractor',
    company: 'Scale AI',
    dateRange: 'May 2024 — Jul 2025',
    description:
      'Built internal tooling to evaluate LLM-generated code, automating compilation, execution, linting, and test orchestration to measure pass@k and correctness. Designed training/eval data pipelines with schema versioning and validation, and instrumented dashboards to track error rates and test failure modes.',
    technologies: ['Python', 'TypeScript', 'Data Pipelines', 'LLM Evaluation'],
    link: 'https://medium.com/@ggfincke/how-pass-k-is-used-to-evaluate-llm-coding-performance-296e5c4565bc',
  },
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

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Email',
    url: 'mailto:garrettfincke@gmail.com',
    icon: 'email',
  },
  {
    label: 'Phone',
    url: 'tel:7247777186',
    icon: 'phone',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/ggfincke',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/garrett-fincke/',
    icon: 'linkedin',
  },
  {
    label: 'Medium',
    url: 'https://medium.com/@ggfincke',
    icon: 'medium',
  },
  {
    label: 'Instagram',
    url: 'https://instagram.com/ggfincke',
    icon: 'instagram',
  },
  {
    label: 'Twitter',
    url: 'https://twitter.com/finckedev',
    icon: 'twitter',
  },
  {
    label: 'YouTube',
    url: 'https://youtube.com/@tterrag456',
    icon: 'youtube',
  },
];
