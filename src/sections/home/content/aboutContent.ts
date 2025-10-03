// src/sections/home/content/aboutContent.ts
// about section content

import type { AboutContent } from '~/shared/types';

export const ABOUT_CONTENT: AboutContent = {
  heading: 'About',
  paragraphs: [
    "I'm a full-stack engineer who ships clean, maintainable systems end-to-end. I work mostly in Python and TypeScript, but I have experience across numerous languages. Most recently, I've been experimenting with Java/Go. Across the backend, I tend to lean on FastAPI/Django + Postgres with Docker, GitHub Actions, and AWS for CI/CD and ops. On the frontend, I near-exclusively use React/Next.js for web. I've also used Swift and SwiftUI/UIkit extensively for mobile development.",
    "I'm early in my career but deep in AI. Most recently, I finished up over a year of contract work at Scale AI, where I built evaluation tooling for LLM coding tasks, including data pipelines, pass@k metrics, harnesses, and test orchestration. I have also been building production-ready projects: Hopper (cross-platform inventory management for e-commerce), TrackBasket (price tracking with LLM-assisted matching/search), Minecart (a Discord bot that manages local/AWS Minecraft servers), and SwimMate (native iOS/watchOS swim tracking). I optimize for clean design, code, and docs.",
    "Outside of code, I swim, run, and journal. My workout consistency is the same I bring to my engineering approach–boring and effective. I completed an Ironman 70.3 in 2024 and I'm eyeing a full marathon and open-water races. When there's time, I produce music and play video games; when there's budget, I adore travel.",
  ],
  email: 'garrettfincke@gmail.com',
};
