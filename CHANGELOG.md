# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
