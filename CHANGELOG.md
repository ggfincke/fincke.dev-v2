# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Release workflow now opens a protected-branch promotion pull request for stable `prod` releases instead of pushing directly to `prod`

## [2.8.0] - 2026-05-05

### Added

- `deepFreeze` helper and explicit `readonly` content contracts; authored content (education, experience, home, projects, technologies) is now deep-frozen and adopts `satisfies`
- Canonical public route manifest (`src/shared/routing/publicRoutes.ts`) shared by the router and scripts, with child paths derived from a single source
- Public asset inventory at the content boundary: `publicAssets.ts` (UI-facing paths) split from `publicAssetInventory.ts` (script metadata)
- Axe accessibility audit script (`scripts/accessibility.ts`) with shared `browserAudit` lib, `async` helper, and route-aware audit helpers running in parallel
- Browser-verification CI job and hardened release tag promotion to prod
- `getTechnologyDisplay` registry helper used by `SkillPill`
- Cached project view models per project record; `imagePath` exposed on the view model
- `ExpandToggle` adopted on mobile project cards with semantic `<article>` shell and dedicated expand button
- `~/scripts` path alias and centralized repo-root paths for scripts

### Changed

- Sections wired to the new content modules and asset metadata
- Project archive titles promoted to `h3` in archive rows
- `SkillPill` restored to button semantics for tooltip access; tech overflow and brand icons drop fake button roles
- ESLint scoped per target with stricter CI enforcement and `jsx-a11y` configured for `tsx` tests
- Node `tsconfig` no longer pulls in the DOM lib; Vitest `tsx` pattern broadened
- Lighthouse error reporting tightened; unused mapper index dropped
- Vitest scope trimmed to focused node-only suites for portfolio scope
- Screenshots, link-checker, and lighthouse scripts refactored around the shared route manifest and browser-audit primitives
- Documentation refreshed to cover content contracts, browser checks, and the dev-docs working-space boundary

### Fixed

- Screenshots script waits for staggered rows to attach and drains finite Web Animations across frames before capturing, so lazy route chunks and the `useMediaQuery` mobile/desktop branch swap can no longer leave desktop projects screenshots empty at certain viewport widths

### Removed

- `NestedInteractionBoundary` component (no longer needed after archive card refactor)
- UI-rendering test suites (`appChrome`, `navigationContracts`, `projectCollaborators`, `projectSurfaces`, `projectsArchiveInteractions`, `aboutHighlighting`, `matchMedia`, `render`) in favor of node-only contract tests

## [2.7.1] - 2026-05-04

### Fixed

- Slimmed vertical inset on card hover backdrops so the effect doesn't look disproportionately thick around short rows like education cards

## [2.7.0] - 2026-05-03

### Added

- Education section on home page with `EducationCard`, `EducationHistory`, and `SchoolLogo` components, typed education content, and Penn State / Pitt logo assets
- Tier List Builder project entry and image asset
- Sortable desktop table column headers on the projects archive (`SortableHeader` component, `projectSort` utility)
- `NestedInteractionBoundary` for safer nested interactive elements
- Click-to-reveal phone contact in social links
- Local brand icon set: `BrandIcon`, `EmailIcon`, `PhoneIcon`, `InstagramIcon`, `LinkedInIcon`, `MediumIcon`, `XIcon`, `YouTubeIcon` (plus refreshed `GitHubIcon`)
- Shared CLI formatting helpers (`scripts/lib/cliFormat.ts`) and dev-server health checks (`scripts/lib/devServer.ts`) for content tooling
- Per-host concurrency in the link checker
- `textHighlight` utility with regression tests; new `dateSpan` and `textHighlight` test coverage
- Path-alias barrel exports for school logos and job history assets

### Changed

- Refreshed home page bio, highlights, and resume assets
- Updated MDX Preview project details and promoted Tier List Builder into the archive
- Updated Westinghouse experience to reflect current role
- New public resume path (`garrett_fincke_resume.pdf`) and refreshed `resume-master.pdf`
- Stronger type safety for education content and project ID constants
- Standardized barrel exports with path aliases across content and shared modules
- Simplified card layouts (`FeaturedProjectCard`, `JobCard`, `ProjectMobileCard`)
- More resilient GitHub release badge caching in `VersionBadge`
- Cached project technology lookups in selectors
- Reusable project link rendering via expanded `ProjectLinks`
- Stronger asset inventory validation and dev-server checks for browser scripts
- Added `npmjs.com` to anti-bot hosts in link policy
- Reverted screenshots dev-server port to `5173`

### Removed

- `resume-selected.pdf` (replaced by `garrett_fincke_resume.pdf`)

## [2.6.0] - 2026-03-29

### Added

- Centralized technology registry replacing the old skills index and skill-to-project mappings
- Vitest infrastructure with jsdom environment and comprehensive test suite (content contracts, selectors, view models, date formatting, link policy, asset validation, technology registry, UI rendering)
- New shared components: `PageShell`, `SkipLink`, `ActionLink`, `ExternalLink`, `IconLink`, `FullScreenMessagePage`, `ProjectIdentity`, `ProjectTechnologies`, `ProjectCollaborators`, `ProjectExpansionPanel`
- Shared utilities: `dateSpan`, `linkProps`, `projectViewModel`, `interaction`, `animationConfig`
- Content-health CI workflow for automated content validation
- Script libraries: `assetValidation`, `contentInventory`, `linkPolicy`, `siteManifest`
- Architecture and screenshots documentation (`docs/`)
- Split shared types into focused modules: `dates`, `home`, `technology`

### Changed

- Hero subtitle simplified to "Software Engineer · Pittsburgh, PA" with muted styling
- About section heading removed; uses `aria-label` instead of `aria-labelledby`
- Restructured all section components to use technology registry, shared project components, and new utilities
- Replaced `techColors` and `renderCollaborators` with new utility modules
- Migrated project entries to use technology registry references
- Simplified `App.tsx` with new `HomePage` module and updated router configuration
- Refactored `SkillPill`, `ProjectLinks`, `InteractiveCard`, and archive components
- Consolidated content barrel exports and updated selectors
- Streamlined CI and release workflows
- Refactored validation and link-checking scripts with shared script utilities

### Removed

- `techColors.ts`, `renderCollaborators.tsx`, `skillMappings.ts`, `skills/index.ts`
- `FeaturedProjectHeader`, `FeaturedProjectTechnologies`, `JobTechnologies` components
- `projectSort.ts` utility
- `featured.ts` selector (consolidated into `selectors.ts`)
- `content/index.ts` barrel (replaced by direct imports)

## [2.5.0] - 2026-03-29

### Added

- GitHub Actions CI/CD: lint/build on push, tag-based release workflow
- Projects archive: clickable rows, staggered animations, expand/collapse transitions
- Mobile cards: inline status circles, tech pills, and project links
- Shared `@ggfincke/eslint-config` and `@ggfincke/prettier-config` packages
- Error boundaries, 404 page, lazy-loaded routes, skip-nav links
- SEO: structured data, canonical link, `robots.txt`, `sitemap.xml`
- A11y: keyboard-accessible tooltips, ARIA attributes, `jsx-a11y` plugin
- Vendor chunk splitting and `loading="lazy"` on images
- Dev scripts: screenshots, link checker, asset validator, Lighthouse
- `ExternalLink` type and `additionalLinks` on projects
- New projects: MDX Preview, OpenCode to ccusage, Reactive Workbench, SwimMate v2

### Changed

- Migrated codebase to Allman brace style and removed semicolons
- Consolidated UI: shared icons, `TechPills`, CSS vars, simplified component APIs
- Refactored content barrel exports, routing, and utility patterns
- Polished projects archive table layout, hover effects, and expand styling
- Promoted MDX Preview to featured, expanded tech color system to 6 categories
- Ultra-wide breakpoint bumped to 2560px, tighter responsive spacing
- Updated resume PDFs and project descriptions

### Removed

- `.prettierrc` (replaced by shared config)
- `tslib`, `--comments` CSS var, `useTableResponsive` hook

## [2.4.11] - 2026-03-29

### Added

- GitHub Actions CI workflow for lint, format check, typecheck, and build
- Release workflow for tag-based GitHub Releases with changelog extraction

## [2.4.10] - 2026-03-29

### Added

- Staggered slide-in animations and expand/collapse keyframes on projects archive
- Full-row click and keyboard support on desktop table rows and mobile cards
- Status circles, tech pills, and project links on mobile cards

### Changed

- Highlight regex sorts patterns longest-first to fix partial keyword matches
- Tighter table padding, accent hover effects, and row expand styling
- Updated `resume-selected.pdf`

## [2.4.9] - 2026-03-28

### Added

- `@ggfincke/eslint-config` and `@ggfincke/prettier-config` shared packages
- `format:check` and `lint:fix` npm scripts

### Changed

- Migrated codebase to Allman brace style and removed semicolons
- Refactored all components, content, types, and utilities for new code style

### Removed

- `.prettierrc` (replaced by shared config)

## [2.4.8] - 2026-02-26

### Changed

- Updated `resume-master.pdf` and `resume-selected.pdf`

## [2.4.7] - 2026-02-09

### Added

- Error boundaries, 404 page, and lazy-loaded `/projects` route
- Skip-to-content links, ARIA attributes, and keyboard-accessible tooltips
- SEO essentials: structured data, canonical link, `robots.txt`, `sitemap.xml`
- Vendor chunk splitting and `loading="lazy"` on featured images
- Shared `TechPills` component and consolidated icon barrel

### Changed

- UI consolidation: extracted CSS vars, simplified component APIs
- Content cleanup: normalized dates, deduplicated skills, updated statuses

## [2.4.6] - 2026-02-09

### Added

- Error boundary (`ErrorFallback`) and 404 page (`NotFoundPage`) for unmatched routes
- Lazy-loaded `/projects` route for smaller initial bundle
- Skip-to-content links on both pages for keyboard navigation
- `eslint-plugin-jsx-a11y` with recommended rules
- Vendor chunk splitting (react, react-dom, react-router-dom)
- SEO: JSON-LD structured data, canonical link, `robots.txt`, `sitemap.xml`, theme-color meta
- Keyboard-accessible skill tooltips with `role="tooltip"`, `aria-describedby`, and focus/blur handlers
- `aria-hidden` on decorative SVG icons, `aria-expanded` on expand toggles
- CSS custom properties for tech category background colors
- `loading="lazy"` on featured project images

### Changed

- Consolidated `ArrowIcon` into `src/shared/components/ui/icons/` barrel
- Simplified `VersionBadge` with `AbortController` and direct `sessionStorage` caching
- Replaced `useTableResponsive` hook with inline `useMediaQuery` call
- Rewrote `extractLatestMonth` sort utility for clarity (segment-based parsing)
- Inlined default class strings in `InlineLink` and extracted `BASE_CLASSES` in `InteractiveCard`
- Normalized date ranges to en-dashes, deduplicated CNN skill entry, recategorized Web Scraping
- Extracted shared `EMAIL` constant, removed unused `tagline` from `HeroContent`
- Featured project selector now preserves declared title order
- Replaced `--comments` CSS variable references with `--muted`
- Removed unused `slideInRight` animation, added `animate-fadeIn` to reduced-motion rule
- Fixed `staggerDelay` floating-point precision with `toFixed(2)`
- Twitter meta tags corrected from `property` to `name`
- Phone link updated to E.164 format (`tel:+1...`)

### Removed

- `tslib` dependency (unused)
- `--comments` CSS variable
- `useTableResponsive` hook (replaced by `useMediaQuery`)
- `role="status"` from `StatusBadge` (incorrect usage)

## [2.4.5] - 2026-02-08

### Added

- Dev scripts: `screenshots` (Playwright), `check-links` (crawl + validate), `validate-assets` (image audit), `lighthouse` (performance report)
- npm script entries for all dev scripts plus `analyze` (vite-bundle-visualizer)
- Dev dependencies: playwright, lighthouse, chrome-launcher, tsx, vite-bundle-visualizer, tslib
- `.gitignore` entries for `screenshots/` and `reports/` output directories

## [2.4.4] - 2026-02-08

### Changed

- Flattened `JobHistory` and `FeaturedProjects` from `<section>`/`<ol>` wrappers into fragment children for tighter layout control
- Bumped ultra-wide breakpoint from 1920px to 2560px (with min-height 1400px guard for JobHistory)
- Constrained `<main>` max-width to 1400px at 2560px+ viewports
- Tightened right-column spacing at 1728px+ breakpoint
- Featured project image restyled: larger container, `object-contain` fit, brightness hover instead of transform
- Tech pills prevent wrapping on `lg+` with `shrink-0` overflow badge

## [2.4.3] - 2026-02-08

### Added

- New skill mappings and tech colors for esbuild, Vitest, and Comlink

### Changed

- Rewrote MDX Preview project description, technologies, and bullet points to reflect current feature set
- Promoted MDX Preview to featured projects list (replaces TrackBasket)
- Added VS Code Marketplace and Open VSX links to MDX Preview via `additionalLinks`
- Updated MDX Preview screenshots (`vsc-mdx.png`, `vsc-mdx-ex.gif`)

## [2.4.2] - 2026-02-08

### Added

- `ExternalLink` type and `additionalLinks` field on `Project` for arbitrary external links beyond repo/live
- `ProjectLinks` component renders additional link buttons (button variant) and icon links (icon variant)
- VS Code Marketplace label detection in `getLiveLabel` for marketplace URLs

### Changed

- `ProjectExpandedDetails` and `ProjectTableRow` now pass `additionalLinks` to `ProjectLinks`

## [2.4.1] - 2026-01-04

### Added

- New projects: `MDX Preview for VS Code`, `OpenCode to ccusage`, `Reactive Workbench`, and `SwimMate v2` (full-stack with Django + PostgreSQL + pgvector + iOS/watchOS)
- Project images: `swimmatev2.png`, `vsc-mdx.png`, `vsc-mdx-ex.gif`
- Resume LaTeX source (`master.tex`)

### Changed

- Featured projects now showcase SwimMate v2
- Expanded tech color system from 4 to 6 categories (language, framework, infra, data, tooling, platform)
- Updated resume PDF and project descriptions

## [2.4.0] - 2025-12-17

### Added

- `Reactive Themes` VS Code extension project entry plus new skill mappings for the extension stack (VS Code API, minimatch, Mocha)
- `useMediaQuery` hook powering ultra-wide layouts so 4K users see an extra featured project card and expanded job history

### Changed

- Consolidated site content into `src/content/*` with barrel exports for home, experience, projects, and skills; updated selectors and imports to use the shared content hub
- Refined About section copy and refreshed both resume PDFs to reflect the latest personal details
- Updated featured project imagery with hover depth/glow and normalized project/technology labeling (TrackBasket tagline, TypeScript pill)

## [2.3.0] - 2025-10-07

### Added

- Portfolio Website v2 project entry with full details and screenshot
- New technologies to color mapping: Vite, React Router, ESLint, Prettier

### Changed

- Portfolio Website v1 project renamed and marked as complete/retired
- FeaturedProjectTechnologies "+X more" text now uses `inline-flex` for better alignment
- Updated Portfolio v1 status from "live" to "complete" with retirement note

## [2.2.0] - 2025-10-07

### Added

- Staggered slide-in animations for page sections and list items
- Respect for `prefers-reduced-motion` accessibility setting

### Changed

- Hero, About, and SocialLinks animate from left on page load
- JobHistory and FeaturedProjects sections animate from right with staggered item reveals
- Updated collaborator text to include "with" prefix in ProjectTableRow

## [2.1.0] - 2025-10-05

### Added

- Semantic color system based on Material Theme Ocean HC palette (cyan, green, blue, purple, yellow, red)
- Technology pill color categorization by type (languages, frameworks, backend, AI/data)
- Keyword syntax highlighting in About section
- `techColors.ts` utility mapping 100+ technologies to semantic categories

### Changed

- Hero and headings now use cyan accent
- Tagline split into white and yellow segments
- Links styled with red accent and smooth hover transitions
- Job titles highlighted in yellow, company names in white
- Technology pills use category-based colors with semi-transparent backgrounds
- Experience section refactored to use `SkillPill` component throughout

## [2.0.0] - 2025-10-04

### Changed

- **Complete website redesign**: Rebuilt fincke.dev with a focus on minimalism and simplicity
- **Framework overhaul**: Built with Vite 7, React 19, and React Router 7 for pure client-side architecture
- **Styling**: Single, unified color scheme using Tailwind CSS 4 design tokens
- **Architecture**: Streamlined sections-based component organization with minimal dependencies

> New repository representing a major shift toward simplicity and client-side minimal architecture.
