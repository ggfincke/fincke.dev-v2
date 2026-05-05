# Architecture

Current maintainer reference for the consolidated `fincke.dev-v2` codebase. This document is intentionally narrow: it tracks the source-of-truth modules, shared runtime contracts, and verification entrypoints that actively exist in the repo.

## Stack Snapshot

Current `package.json` versions:

| Technology       | Version |
| ---------------- | ------- |
| React            | 19.1.1  |
| React DOM        | 19.1.1  |
| React Router DOM | 7.9.3   |
| TypeScript       | ~5.8.3  |
| Vite             | ^7.1.7  |
| Tailwind CSS     | ^4.0.0  |
| Vitest           | ^4.1.2  |
| Playwright       | ^1.58.2 |
| Lighthouse       | ^12.8.2 |

## Runtime Shape

### Routes

- `/`
  Renders the root layout route plus `HomePage`
- `/projects`
  Lazy-loads `ProjectsArchivePage`
- `*`
  Renders `NotFoundPage`
- `src/shared/routing/publicRoutes.ts`
  Canonical public route paths and slugs consumed by the React router and script manifest helpers

### Shared App Chrome

- `src/app/App.tsx`
  Root layout route that renders the outer app frame, one `SkipLink`, and an `Outlet`
- `src/shared/components/layout/PageShell.tsx`
  Shared route-level `main` landmark and max-width container
- `src/shared/components/layout/SkipLink.tsx`
  Shared skip-to-content contract for routed pages
- `src/shared/components/feedback/FullScreenMessagePage.tsx`
  Shared full-screen shell used by `ErrorFallback` and `NotFoundPage`

### Route Pages

- `src/sections/home/pages/HomePage.tsx`
  Home page composition: hero/about/social content on the left, work history and featured projects on the right, plus decorative effects
- `src/sections/projects-archive/pages/ProjectsArchivePage.tsx`
  Archive page shell with back link, heading, responsive projects table/cards, and archive footer

## Content Sources of Truth

All authored site content lives under `src/content/`. Components consume typed records instead of owning copy, taxonomy data, or public asset paths locally.

### Assets

- `src/content/assets/publicAssets.ts`
  Content-owned public asset metadata for runtime, retained, and deployment files. Components and scripts import asset paths from this boundary, not from section component folders.

### Home

- `src/content/home/hero.ts`
- `src/content/home/about.ts`
- `src/content/home/socialLinks.ts`

### Experience

- `src/content/experience/workExperience.ts`

### Education

- `src/content/education/education.ts`

### Projects

- `src/content/projects/copy.ts`
  Featured-project CTA and archive page copy
- `src/content/projects/all.ts`
  Authored project records, exposed as deeply frozen readonly data. Each project owns explicit `contentStatus.links` and `contentStatus.media` metadata so private, archived, pending, and intentionally text-only entries do not look like unfinished content.
- `src/content/projects/selectors.ts`
  Derived readonly project views:
  `getAllProjects()`, `getFeaturedProjects()`, `getProjectsByTechnology()`

### Technologies

- `src/content/technologies/registry.ts`
  Canonical technology registry
- Owns:
  canonical `TechnologyId`s,
  display labels,
  aliases,
  categories,
  technology color/background resolution

## Shared Data Contracts

Typed contracts live under `src/shared/types/`.

- `dates.ts`
  `YearMonth` and `DateSpan` for month-precision periods
- `home.ts`
  `HeroContent`, `AboutContent`, `SocialLink`, `SocialLinksContent`
- `assets.ts`
  Public asset metadata contracts
- `education.ts`
  `EDUCATION_IDS`, `Education`, `EducationId`, `EducationLogo`
- `experience.ts`
  `WORK_EXPERIENCE_IDS`, `WorkExperience`, `WorkExperienceId`
- `projects.ts`
  `PROJECT_IDS`, `Project`, `ProjectFeature`, `ProjectStatus`, collaborator and external-link types
- `technology.ts`
  `TechnologyCategory` and `TechnologyDefinition`

### Important Content Rules

- Projects, work experience, and education use stable authored `id`s
- Projects and work experience reference technologies by canonical `TechnologyId`
- Project, work-history, and education dates use structured `DateSpan` values, not display-string parsing
- Project link/media availability must be explicit through `contentStatus`; `available` must have corresponding URLs/media, and unavailable states must include a reason
- Featured project selection is authored directly on project records through `feature`, and `feature.order` is globally unique across featured entries
- Authored project, work, education, home copy, and asset metadata records are deeply frozen; selectors expose readonly project lists to prevent accidental mutation of canonical content order

## Shared Presentation Contracts

### Project Surfaces

- `src/shared/components/projects/ProjectIdentity.tsx`
  Shared title/collaborator block for featured and archive variants
- `src/shared/components/projects/ProjectTechnologies.tsx`
  Shared technology rendering and related-project tooltip wiring. Technology
  pills with related-project previews are tooltip-only text/focus triggers; they
  should not expose button semantics unless a real press action is added.
- `src/shared/components/projects/ProjectCollaborators.tsx`
  Shared collaborator rendering
- `src/shared/utils/projectViewModel.ts`
  Shared derived project display metadata, including link/media presence from explicit project `contentStatus`
- `src/shared/components/layout/ProjectLinks.tsx`
  Shared project link presentation

### Navigation and Link Primitives

- `src/shared/components/ui/ActionLink.tsx`
  CTA/back-link primitive for internal or external navigation
- `src/shared/components/ui/ExternalLink.tsx`
  Shared external-anchor behavior
- `src/shared/components/ui/IconLink.tsx`
  Accessible icon-only link primitive
- `src/shared/components/ui/InlineLink.tsx`
  Prose-link primitive

### Interaction and Styling Utilities

- `src/shared/utils/dateSpan.ts`
  Date formatting and comparison for structured periods
- `src/shared/utils/projectLinks.ts`
  Shared link-label logic for project actions
- `src/shared/utils/interaction.ts`
  Nested click/key handling helpers for desktop archive row interactions
- `src/shared/utils/breakpoints.ts`
  Shared breakpoint tokens
- `src/shared/utils/animationConfig.ts`
  Shared animation timing and archive stagger values

## Feature Modules

### `src/sections/home`

- `components/Hero.tsx`
- `components/About.tsx`
- `components/SocialLinks.tsx`
- `components/GlowEffect.tsx`
- `components/DecorativeWave.tsx`
- `pages/HomePage.tsx`

### `src/sections/experience`

- `components/JobHistory.tsx`
- `components/JobCard.tsx`
- `components/JobCompanyHeader.tsx`

### `src/sections/education`

- `components/EducationHistory.tsx`
- `components/EducationCard.tsx`
- `components/SchoolLogo.tsx`

### `src/sections/featured-projects`

- `components/FeaturedProjects.tsx`
- `components/FeaturedProjectCard.tsx`
- `components/FeaturedProjectImage.tsx`

### `src/sections/projects-archive`

- `components/ProjectsTable.tsx`
- `components/ProjectTableRow.tsx`
- `components/ProjectMobileCard.tsx`
  Semantic mobile archive summary card. The card is an `article`; expansion is
  owned by the header button, and project links/technology tooltip triggers sit
  outside that button.
- `components/ProjectExpandedDetails.tsx`
- `components/ProjectExpansionPanel.tsx`
- `components/ExpandToggle.tsx`
- `hooks/useExpandableRows.ts`
- `pages/ProjectsArchivePage.tsx`

## Automation and Verification

### Deterministic Checks

- `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run validate-assets`
- `npm run bundle`
- `npm run build`
- `npm run ci:check`
- `npm run browser:check`

`ci:check` is the primary CI/release gate. It runs each expensive concern once: formatting, linting, type checking, tests, asset validation, and production bundling.

`browser:check` is the browser route gate. CI runs it in a dedicated job after
`ci:check` against a Vite preview server, so axe, Lighthouse, and smoke
screenshots exercise production-built route output without slowing the main
deterministic check job.

### Live and Manual Checks

- `npm run check-links`
  Live external-link validation
- `npm run content:health`
  Asset validation plus live link check
- `npm run audit:accessibility`
  Axe accessibility audit against every public route
- `npm run screenshots`
  Full Playwright route/viewport capture against the dev server
- `npm run screenshots:smoke`
  Lightweight Playwright route/viewport capture for CI browser smoke coverage
- `npm run lighthouse`
  Reduced-motion Lighthouse audits against the preview server

### Script Sources of Truth

- `src/shared/routing/publicRoutes.ts`
  Canonical public route manifest consumed by both the router and scripts
- `src/content/assets/publicAssets.ts`
  Content-owned runtime/retained/deployment asset metadata consumed by UI and scripts
- `scripts/lib/siteManifest.ts`
  Site origin and public route URL helpers for screenshots, Lighthouse, and sitemap validation
- `scripts/lib/browserAudit.ts`
  Shared local browser-audit origins, output directories, and launch flags
- `scripts/lib/contentInventory.ts`
  Shared inventory of external URLs and local assets
- `scripts/lib/assetValidation.ts`
  Asset categorization and validation rules
- `scripts/lib/linkPolicy.ts`
  Hard-fail, soft-fail, and skip policy for link checks
- `scripts/lib/async.ts`
  Shared bounded-concurrency helper for script workloads that must preserve
  input ordering
- `scripts/lib/devServer.ts`
  Shared polling probe for browser scripts that need a local dev or preview
  server before they can run

### Documentation Sources of Truth

- `docs/architecture.md`
  Canonical architecture, ownership, and verification reference
- `docs/screenshots.md`
  Canonical Playwright screenshot workflow
- `dev-docs/`
  Ignored local working space for audits, templates, and implementation
  planning notes

Do not depend on `dev-docs/` for repository source-of-truth documentation.
Internal audits may reference public docs, but the maintained copy belongs in
`docs/`.

### Release Branching

- `main`
  Integration branch for ordinary development and pull requests
- `prod`
  Production branch for Cloudflare deployment
- `v*` tags
  Release intent; the release workflow validates the tag commit and opens `prod` promotion pull requests for stable tags

Release tags must point at commits already reachable from `main`. For stable tags, the release workflow refuses to open a `prod` promotion pull request unless the existing `prod` branch is an ancestor of the tagged commit, so production advances only by fast-forwardable pull requests. Prerelease tags create GitHub prereleases without moving `prod`.

## Tests

Tests live under `tests/` and intentionally stay small for a portfolio site.
The Vitest suite runs in Node and covers only high-signal contracts:

- authored content IDs, featured ordering, date ranges, and explicit project link/media availability
- canonical technology registry coverage and aliases
- project selectors and view-model derivation
- structured date and static-prose highlighting helpers
- asset validation and external-link policy helpers

## Current Directory Map

```text
src/
├── app/
├── content/
│   ├── assets/
│   ├── education/
│   ├── experience/
│   ├── home/
│   ├── projects/
│   └── technologies/
├── sections/
│   ├── education/
│   ├── experience/
│   ├── featured-projects/
│   ├── home/
│   └── projects-archive/
├── shared/
│   ├── components/
│   │   ├── feedback/
│   │   ├── layout/
│   │   ├── projects/
│   │   └── ui/
│   ├── hooks/
│   ├── types/
│   └── utils/
└── styles/
```

## Maintenance Notes

- Treat `src/content/**/*` and `scripts/lib/*` as the primary source of truth for content and operational metadata
- Prefer updating this document only when architectural ownership or shared contracts change
- Keep canonical maintainer docs in `docs/`; treat `dev-docs/` as ignored local working space only
- Do not reintroduce docs for deleted historical structures such as section-local content folders, title-based featured selectors, or string-parsed project dates
