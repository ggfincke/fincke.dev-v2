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
- Content-owned public asset metadata shared by UI components and repo automation.
- Shared project presentation layer used by both featured cards and the full archive.
- Semantic archive interactions: mobile project cards use explicit expansion buttons, and technology previews are tooltip-only focus targets.
- Focused verification pipeline: linting, typechecking, Vitest, asset validation, axe accessibility checks, screenshot smoke capture, Lighthouse, and live content-health checks.

## Tech Stack

- Framework: Vite 7 + React 19
- Language: TypeScript 5.8 in strict mode
- Routing: React Router 7
- Styling: Tailwind CSS 4 + `src/styles/globals.css`
- Testing: Vitest for focused node-side content and utility checks
- Automation: Playwright screenshots, axe accessibility audits, Lighthouse, custom content-health scripts

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
│   ├── content/                 # Authored copy, assets, experience, projects, technologies
│   ├── sections/                # Route/section-specific UI
│   ├── shared/                  # Shared components, types, hooks, utilities
│   └── styles/                  # Global CSS tokens and Tailwind layers
├── tests/                       # Focused Vitest content and utility checks
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

Canonical maintained references live in `docs/`. The `dev-docs/` directory is
ignored local working space for audits, templates, and implementation planning
notes, so do not depend on it for repository source-of-truth documentation.

## Scripts

### Deterministic Checks

- `npm run format:check` - Prettier validation without rewriting files
- `npm run lint` - ESLint across app, scripts, and tests
- `npm run typecheck` - TypeScript project references for app, scripts, and tests
- `npm test` - Vitest in single-run mode
- `npm run validate-assets` - Runtime/deployment/retained asset validation
- `npm run bundle` - Vite production bundle only
- `npm run build` - TypeScript validation + Vite production bundle
- `npm run ci:check` - Main CI gate: format check, lint, typecheck, tests, asset validation, and bundle
- `npm run browser:check` - Browser route gate: axe accessibility, Lighthouse, and smoke screenshots against a running preview server

### Live / Manual Checks

- `npm run check-links` - Live external-link verification with host-aware soft/hard failure policy
- `npm run content:health` - Asset validation + live link check
- `npm run audit:accessibility` - Axe accessibility audit for every public route
  Requires `npm run build && npm run preview` on `http://localhost:4173`
- `npm run screenshots` - Playwright screenshot sweep
  Requires `npm run dev` on `http://localhost:5173`
- `npm run screenshots:smoke` - CI-friendly route smoke screenshots
  Requires a dev or preview server; CI runs it against `http://localhost:4173`
- `npm run lighthouse` - Lighthouse audits for public routes
  Requires `npm run build && npm run preview` on `http://localhost:4173`

## Updating Content

The source of truth for authored site content lives under `src/content/`:

- Home copy: `src/content/home/hero.ts`, `src/content/home/about.ts`, `src/content/home/socialLinks.ts`
- Public asset metadata: `src/content/assets/publicAssets.ts`
- Work history: `src/content/experience/workExperience.ts`
- Education: `src/content/education/education.ts`
- Projects: `src/content/projects/all.ts`, `src/content/projects/copy.ts`
- Project selectors: `src/content/projects/selectors.ts`
- Canonical technologies and aliases: `src/content/technologies/registry.ts`

The shared content contracts live under `src/shared/types/`:

- Home types: `src/shared/types/home.ts`
- Public assets: `src/shared/types/assets.ts`
- Education: `src/shared/types/education.ts`
- Work experience: `src/shared/types/experience.ts`
- Projects: `src/shared/types/projects.ts`
- Structured dates: `src/shared/types/dates.ts`
- Technology definitions: `src/shared/types/technology.ts`

Project, work, and education IDs are contract-tested against their authored arrays. Authored content records and asset metadata are deeply frozen at module load, so edit the source files instead of mutating imported content. Project records must explicitly describe link and media availability through `contentStatus`; use an unavailable state with a note for private, archived, pending, or intentionally text-only entries. If you are adding or renaming technologies, update the registry first and then reference canonical technology IDs from projects or work experience.

## Runtime Structure

- `/` renders the root layout route plus the `HomePage`
- `/projects` lazy-loads `ProjectsArchivePage`
- Public route paths and slugs live in `src/shared/routing/publicRoutes.ts` so the router and script manifest cannot drift silently
- `App.tsx` owns the shared outer shell and `SkipLink`
- `PageShell` owns the main landmark/container contract used by the route pages
- Error and 404 feedback pages use shared feedback primitives instead of the normal page shell

## Automation Notes

- CI and release workflows both run `npm run ci:check`
- CI also runs a browser verification job after `ci:check`; it builds the app, serves Vite preview, then runs `npm run browser:check`
- A separate scheduled/manual GitHub Actions workflow runs `npm run content:health`
- The full screenshot sweep remains manual review; CI only captures the lightweight smoke screenshot matrix
- Release tags must be reachable from `main`
- Stable release tags open a pull request that promotes the exact tagged commit to `prod`

## Deployment

`main` is the integration branch. `prod` is the production branch and should be the Cloudflare production deployment source. Stable `v*` tags open a pull request to promote the tagged commit to `prod`; prerelease tags create GitHub prereleases without moving production. Generate a static bundle with `npm run build` and deploy the `dist/` output to the static host of your choice.

## Contributing

This is a personal portfolio repo and is not accepting feature PRs. Feel free to fork the structure for your own site.

## License

MIT. See [LICENSE](LICENSE).
