# fincke.dev

[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React Router](https://img.shields.io/badge/React_Router-7.9.3-CA4245?style=flat-square&logo=react-router)](https://reactrouter.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Website](https://img.shields.io/badge/Website-Live_on_fincke.dev-14B8A6?style=flat-square)](https://fincke.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Personal portfolio site built with Vite 7, React 19, TypeScript, and Tailwind CSS 4. The app has two public routes: a home page that combines intro content, work history, and featured projects, and a lazy-loaded `/projects` archive with responsive table/card layouts and expandable details.

## Live Site

Visit https://fincke.dev

## Highlights

- Nested React Router app shell with shared skip-link and page-shell primitives.
- Structured content model for home copy, work history, projects, and canonical technologies.
- Shared project presentation layer used by both featured cards and the full archive.
- Focused verification pipeline: linting, typechecking, Vitest, asset validation, screenshots, Lighthouse, and live content-health checks.

## Tech Stack

- Framework: Vite 7 + React 19
- Language: TypeScript 5.8 in strict mode
- Routing: React Router 7
- Styling: Tailwind CSS 4 + `src/styles/globals.css`
- Testing: Vitest, React Testing Library, jsdom
- Automation: Playwright screenshots, Lighthouse, custom content-health scripts

## Project Structure

```text
fincke.dev-v2/
├── docs/                        # Tracked maintainer references
├── public/
│   ├── assets/                  # Runtime images
│   ├── documents/               # Resume PDFs and retained docs
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/                     # Repo automation and content-health tooling
├── src/
│   ├── app/                     # Root layout route, router, entrypoint
│   ├── content/                 # Authored home, experience, projects, technologies
│   ├── sections/                # Route/section-specific UI
│   ├── shared/                  # Shared components, types, hooks, utilities
│   └── styles/                  # Global CSS tokens and Tailwind layers
├── tests/                       # Vitest suites (node + jsdom)
├── vite.config.ts
├── tsconfig*.json
└── package.json
```

## Local Development

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Maintainer Docs

- `docs/architecture.md` - Current-state architecture, content ownership, and verification contracts
- `docs/screenshots.md` - Supported Playwright screenshot workflow and review expectations

## Scripts

### Deterministic Checks

- `npm run format:check` - Prettier + ESLint validation without rewriting files
- `npm run lint` - ESLint across app, scripts, and tests
- `npm run typecheck` - TypeScript project references for app, scripts, and tests
- `npm test` - Vitest in single-run mode
- `npm run validate-assets` - Runtime/deployment/retained asset validation
- `npm run build` - TypeScript build + Vite production bundle
- `npm run ci:check` - Main CI gate: format check, lint, typecheck, tests, asset validation, and build

### Live / Manual Checks

- `npm run check-links` - Live external-link verification with host-aware soft/hard failure policy
- `npm run content:health` - Asset validation + live link check
- `npm run screenshots` - Playwright screenshot sweep
  Requires `npm run dev` on `http://localhost:5173`
- `npm run lighthouse` - Lighthouse audits for public routes
  Requires `npm run build && npm run preview` on `http://localhost:4173`

## Updating Content

The source of truth for authored site content lives under `src/content/`:

- Home copy: `src/content/home/hero.ts`, `src/content/home/about.ts`, `src/content/home/socialLinks.ts`
- Work history: `src/content/experience/workExperience.ts`
- Projects: `src/content/projects/all.ts`
- Project selectors: `src/content/projects/selectors.ts`
- Canonical technologies and aliases: `src/content/technologies/registry.ts`

The shared content contracts live under `src/shared/types/`:

- Home types: `src/shared/types/home.ts`
- Work experience: `src/shared/types/experience.ts`
- Projects: `src/shared/types/projects.ts`
- Structured dates: `src/shared/types/dates.ts`
- Technology definitions: `src/shared/types/technology.ts`

If you are adding or renaming technologies, update the registry first and then reference canonical technology IDs from projects or work experience.

## Runtime Structure

- `/` renders the root layout route plus the `HomePage`
- `/projects` lazy-loads `ProjectsArchivePage`
- `App.tsx` owns the shared outer shell and `SkipLink`
- `PageShell` owns the main landmark/container contract used by the route pages
- Error and 404 feedback pages use shared feedback primitives instead of the normal page shell

## Automation Notes

- CI and release workflows both run `npm run ci:check`
- A separate scheduled/manual GitHub Actions workflow runs `npm run content:health`
- Screenshot and Lighthouse runs are manual review tools and are not part of the main CI gate

## Deployment

Generate a static bundle with `npm run build` and deploy the `dist/` output to the static host of your choice.

## Contributing

This is a personal portfolio repo and is not accepting feature PRs. Feel free to fork the structure for your own site.

## License

MIT. See [LICENSE](LICENSE).
