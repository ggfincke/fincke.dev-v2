# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
