# fincke.dev

[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React Router](https://img.shields.io/badge/React_Router-7.9.3-CA4245?style=flat-square&logo=react-router)](https://reactrouter.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Website](https://img.shields.io/badge/Website-Live_on_fincke.dev-14B8A6?style=flat-square)](https://fincke.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A lean rebuild of my pesonal portfolio built with Vite 7, React 19, and Tailwind CSS 4. Features a clean, minimalist UI with responsive layout, smooth animations, data-driven content architecture, and an interactive projects archive with expandable details and version tracking.

## Live Site

Visit https://fincke.dev

## Highlights

- Home route: hero, about, and social CTA content paired with a curated job history and featured projects grid.
- Projects archive: client-side route with responsive table/card layouts, expandable details, and per-project technology/status badges.
- Typed content pipeline: project, experience, and skill data live in structured TypeScript modules; utility helpers expose filtered views.
- Design system: shared UI components (badges, tooltips, project links, icons) ensure consistent styling across sections.
- Tailwind CSS 4: single-file design tokens and utility layers in `src/styles/globals.css` drive the color system and motion.

## Tech Stack

- Framework: Vite 7 + React 19 with `@tailwindcss/vite`
- Language: TypeScript 5.8 in strict mode
- Routing: React Router 7 (`/` home, `/projects` archive)
- Styling: Tailwind CSS 4 utilities with custom CSS variables
- Linting/formatting: ESLint 9 (flat config) + Prettier 3
- Icons: `simple-icons` for branded social links

## Project Structure

```
fincke.dev-v2/
├── public/
│   ├── assets/                   # Images, logos, screenshots
│   └── documents/                # PDFs (résumé, reports, etc.)
├── src/
│   ├── app/                      # App shell, router, and entry point
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── router/
│   │       └── index.tsx
│   ├── content/                  # Global content (skills)
│   ├── sections/                 # Feature domains grouped by route/section
│   │   ├── home/
│   │   │   ├── components/       # Hero, About, SocialLinks, decorative UI
│   │   │   └── content/          # Hero/About copy and social metadata
│   │   ├── experience/           # Experience timeline components/content
│   │   ├── featured-projects/    # Featured project cards for the home view
│   │   └── projects-archive/     # `/projects` route (data, hooks, table/cards)
│   ├── shared/                   # Reusable types, utilities, and UI primitives
│   │   ├── components/           # UI/layout/feedback subcomponents
│   │   ├── types/                # Project/content/experience type definitions
│   │   └── utils/                # Helpers (status config, collaborators, etc.)
│   └── styles/                   # Global Tailwind layer & design tokens
├── dev-docs/                     # Working notes and architecture plans
├── eslint.config.js              # ESLint flat config
├── vite.config.ts                # Vite config with `~` alias → `src`
├── tsconfig*.json                # TypeScript project references
└── package.json
```

## Local Development

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:5173 (Vite HMR enabled).

### Scripts

- `dev`: Vite dev server
- `build`: TypeScript project build + Vite production bundle
- `lint`: ESLint via flat config
- `preview`: Preview production build locally

## Updating Content

- Projects & archive data: `src/sections/projects-archive/content/projects.tsx`
- Project filters/helpers: `src/sections/projects-archive/content/projectFilters.ts`
- Skill → technology mappings: `src/sections/projects-archive/content/skillMappings.ts`
- Experience timeline: `src/sections/experience/content/experienceTimeline.ts`
- Home copy/social links: `src/sections/home/content/`
- Skill catalog: `src/content/skills.ts`
- Shared status labels/colors: `src/shared/utils/statusConfig.ts`

Each module exports strongly-typed objects, so TypeScript will flag incomplete or inconsistent data.

## Styling & Theming

Tailwind CSS 4 runs in JIT mode with tokens declared in `src/styles/globals.css`. The file defines the color palette, typography, and key motion primitives that power hero effects, glow/wave decorations, and project cards. Component classes lean on CSS variables for consistent light/dark ratios.

## Deployment

Generate a static build with `npm run build`. Deploy the resulting `dist/` directory to Vercel (current target), Netlify, GitHub Pages, or any static host.

## Contributing

This is a personal portfolio and not accepting external features/PRs. Feel free to fork or reference the structure; if you ship a derivative design, a link back to https://fincke.dev is appreciated.

## License

MIT — see [LICENSE](LICENSE)

## Contact

Questions or feedback? Say hi via the links on https://fincke.dev or open an issue.
