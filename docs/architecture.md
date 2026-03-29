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

All authored site content lives under `src/content/`. Components consume typed records instead of owning copy or taxonomy data locally.

### Home

- `src/content/home/hero.ts`
- `src/content/home/about.ts`
- `src/content/home/socialLinks.ts`

### Experience

- `src/content/experience/workExperience.ts`

### Projects

- `src/content/projects/all.ts`
  Authored project records
- `src/content/projects/selectors.ts`
  Derived project views:
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
  `HeroContent`, `AboutContent`, `SocialLink`
- `experience.ts`
  `WorkExperience`
- `projects.ts`
  `Project`, `ProjectFeature`, `ProjectStatus`, collaborator and external-link types
- `technology.ts`
  `TechnologyCategory` and `TechnologyDefinition`

### Important Content Rules

- Projects and work experience use stable authored `id`s
- Projects and work experience reference technologies by canonical `TechnologyId`
- Project and work-history dates use structured `DateSpan` values, not display-string parsing
- Featured project selection is authored directly on project records through `feature`, and `feature.order` is globally unique across featured entries

## Shared Presentation Contracts

### Project Surfaces

- `src/shared/components/projects/ProjectIdentity.tsx`
  Shared title/collaborator block for featured and archive variants
- `src/shared/components/projects/ProjectTechnologies.tsx`
  Shared technology rendering and related-project tooltip wiring
- `src/shared/components/projects/ProjectCollaborators.tsx`
  Shared collaborator rendering
- `src/shared/utils/projectViewModel.ts`
  Shared derived project display metadata
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
  Nested click/key handling helpers for archive interactions
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

### `src/sections/featured-projects`

- `components/FeaturedProjects.tsx`
- `components/FeaturedProjectCard.tsx`
- `components/FeaturedProjectImage.tsx`

### `src/sections/projects-archive`

- `components/ProjectsTable.tsx`
- `components/ProjectTableRow.tsx`
- `components/ProjectMobileCard.tsx`
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
- `npm run build`
- `npm run ci:check`

`ci:check` is the primary CI/release gate.

### Live and Manual Checks

- `npm run check-links`
  Live external-link validation
- `npm run content:health`
  Asset validation plus live link check
- `npm run screenshots`
  Playwright route/viewport capture against the dev server
- `npm run lighthouse`
  Lighthouse audits against the preview server

### Script Sources of Truth

- `scripts/lib/siteManifest.ts`
  Shared public route manifest for screenshots, Lighthouse, and sitemap validation
- `scripts/lib/contentInventory.ts`
  Shared inventory of external URLs and local assets
- `scripts/lib/assetValidation.ts`
  Asset categorization and validation rules
- `scripts/lib/linkPolicy.ts`
  Hard-fail, soft-fail, and skip policy for link checks

## Tests

Tests live under `tests/`.

- Node-side suites cover:
  technology registry invariants,
  project selectors,
  structured date helpers,
  content inventory,
  asset validation,
  link policy,
  content contracts,
  project view-model derivation
- `tests/ui/` uses Vitest + React Testing Library + jsdom for:
  app chrome,
  navigation contracts,
  archive interactions,
  shared project-surface behavior

## Current Directory Map

```text
src/
├── app/
├── content/
│   ├── experience/
│   ├── home/
│   ├── projects/
│   └── technologies/
├── sections/
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
- Do not reintroduce docs for deleted historical structures such as section-local content folders, title-based featured selectors, or string-parsed project dates
