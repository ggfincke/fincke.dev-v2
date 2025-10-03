# fincke.dev

[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React Router](https://img.shields.io/badge/React_Router-7.9.3-CA4245?style=flat-square&logo=react-router)](https://reactrouter.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Website](https://img.shields.io/badge/Website-Work_in_progress-F59E0B?style=flat-square)](https://fincke.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A lean rebuild of my pesonal portfolio built with Vite 7, React 19, and Tailwind CSS 4. Features a clean, minimalist UI with responsive layout, smooth animations, data-driven content architecture, and an interactive projects archive with expandable details and version tracking.

## Live Site

Visit https://fincke.dev

## Features

- Responsive layout: sticky navigation with dropdown resume variants
- Modern UI: smooth transitions, decorative glow/wave effects, hero section
- Interactive projects archive: card/table layout switching, expandable detail rows
- Skill tooltips: hover over skill pills to see related projects
- Version tracking: automated GitHub release badges via REST API
- Performance: Vite dev server with HMR, ESBuild-powered builds
- Type-safe: strict TypeScript with enforced structure across all data
- Data-driven: centralized content in `src/data/` for easy updates

## Tech Stack

- Framework: Vite 7.1.7 + React 19.1.1
- Routing: React Router 7.9.3 (client-side navigation)
- Language: TypeScript 5.8 (strict mode)
- Styling: Tailwind CSS 4.0 + custom CSS variables
- Tooling: ESLint 9 (flat config), Prettier 3
- Build: ESBuild-powered Vite dev server with HMR
- Data: GitHub REST API for version badges

## Project Structure

```
fincke.dev-v2/
├── public/
│   ├── assets/                      # Images, logos, icons, project docs
│   └── documents/                   # Resume PDFs
├── src/
│   ├── components/
│   │   ├── display/                 # StatusBadge, StatusCircle, VersionBadge
│   │   │                            # SkillPill, SkillTooltip, ProjectLinks
│   │   │                            # Collaborators
│   │   ├── projects/                # ProjectsTable (responsive layout)
│   │   ├── Navigation.tsx           # Sticky nav with resume dropdown
│   │   ├── Hero.tsx                 # Landing hero section
│   │   ├── About.tsx                # About section
│   │   ├── GlowEffect.tsx           # Decorative glow component
│   │   └── DecorativeWave.tsx       # Decorative wave component
│   ├── data/
│   │   ├── siteContent.ts           # Hero/about copy
│   │   ├── projects.tsx             # Project data & helpers
│   │   ├── skills.ts                # Skill definitions
│   │   └── skillMappings.ts         # Project-skill relationships
│   ├── hooks/
│   │   ├── useTableResponsive.ts    # Layout switching logic
│   │   └── useExpandableRows.ts     # Row expansion state
│   ├── pages/
│   │   └── ProjectsPage.tsx         # Projects archive page
│   ├── types/                       # TypeScript type definitions
│   │   ├── content.ts
│   │   ├── navigation.ts
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   └── index.ts
│   ├── utils/                       # Shared utilities
│   │   ├── statusConfig.ts
│   │   ├── renderCollaborators.tsx
│   │   ├── classNames.ts
│   │   └── pathUtils.ts
│   ├── App.tsx                      # Landing page composition
│   ├── main.tsx                     # React Router setup
│   └── index.css                    # Global styles + CSS variables
├── eslint.config.js
├── postcss.config.mjs
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── LICENSE
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
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:5173

### Scripts

- `dev`: Vite dev server with HMR
- `build`: TypeScript check + production build
- `lint`: ESLint (flat config)
- `preview`: Preview production build

## Content Management

- Projects: [src/data/projects.tsx](src/data/projects.tsx) (helpers: `getFeaturedProjects`, `getProjectsBySkill`)
- Skills: [src/data/skills.ts](src/data/skills.ts)
- Skill mappings: [src/data/skillMappings.ts](src/data/skillMappings.ts)
- Site copy: [src/data/siteContent.ts](src/data/siteContent.ts) (hero, about)

## Custom Hooks

- `useTableResponsive`: responsive layout switching and helpers
- `useExpandableRows`: expandable row state management

## Deployment

Hosted on Vercel (or any static host). Generate production build with `npm run build`. The resulting static assets in `dist/` can be hosted on Vercel, Netlify, GitHub Pages, etc. with no server-side requirements.

## Using This Template

If you fork this for your own portfolio:

1. Update data in [src/data/](src/data/)
2. Replace assets in [public/assets/](public/assets/) and resume PDF
3. Adjust CSS variables in [src/index.css](src/index.css)
4. Modify TypeScript types in [src/types/](src/types/) as needed

## Contributing

- Personal portfolio: I'm not accepting direct contributions or feature requests.
- Fork-friendly: please feel free to fork and adapt it for your own site.
- Attribution: if you reuse significant design/code, include a link back to https://fincke.dev.

## Credit & License

- Attribution appreciated if you reuse the design: link back to https://fincke.dev
- Licensed under MIT — see [LICENSE](LICENSE)

## Contact

Questions or suggestions? Reach out via the links on https://fincke.dev or open an issue.
