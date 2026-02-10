// src/content/home/about.ts
// about section content

import type { AboutContent } from '~/shared/types';

// shared email constant
export const EMAIL = 'garrettfincke@gmail.com';

// about section copy & email
export const ABOUT_CONTENT: AboutContent = {
  heading: 'About',
  paragraphs: [
    "I'm a full-stack engineer who ships clean, maintainable systems end-to-end. I work mostly in Python and TypeScript, but I have experience across numerous languages. Most recently, I've been experimenting with Java/Go. Across the backend, I tend to lean on FastAPI/Django + Postgres with Docker, GitHub Actions, and AWS for CI/CD and ops. On the frontend, I near-exclusively use React/Next.js for web. I've also used Swift and SwiftUI/UIkit extensively for mobile development.",
    "I'm big on consistency, whether that's in code or in training. I've completed an Ironman 70.3, and outside of work I'm usually building side projects, iterating on tools I use a lot, and making small improvements where I can.",
  ],
  email: EMAIL,
};
