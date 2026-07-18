// src/content/projects/all.ts
// project portfolio data

import type { Project } from '~/shared/types'
import { deepFreeze } from '~/shared/utils/deepFreeze'

export const projects = deepFreeze([
  {
    id: 'cartographer',
    title: 'Cartographer',
    tagline:
      'Local-first visual codebase explorer for architecture, dependencies, blast radius, and agent-driven coding.',
    period: {
      start: {
        year: 2026,
        month: 7,
      },
      isCurrent: true,
    },
    status: 'in-development',
    madeFor: 'Personal',
    contentStatus: {
      links: {
        availability: 'private',
        note: 'Repository is private while the standalone explorer is in active development.',
      },
      media: {
        availability: 'pending',
        note: 'A stable atlas screenshot will be added after the active interface work settles.',
      },
    },
    bulletPoints: [
      'Built TypeScript/JavaScript import-graph analysis with semantic Systems and Blocks, symbol extraction, file descriptions, co-change history, structural and public-API diffs, and symbol-aware blast-radius analysis',
      'Delivered CLI, MCP, Markdown report, watch, SQLite snapshot-history, GitHub Action, and project-registry surfaces for architecture discovery and pull-request drift analysis',
      'Engineered a React atlas with Architecture, Explore, Trace, Impact, Boundary, Changes, and Risk workspaces, URL-backed navigation, boundary contracts, inspector evidence, and scoped insights',
      'Scaled large-repository analysis with coarse indexed atlases, virtualized exploration, module-worker model and layout builds, bounded graph budgets, and LRU caches',
    ],
    technologies: [
      'typescript',
      'react',
      'vite',
      'node-js',
      'dependency-cruiser',
      'zustand',
      'mcp',
      'sqlite',
      'vitest',
    ],
  },
  {
    id: 'agentic-scratch',
    title: 'Agentic Scratch',
    tagline:
      'IR-first workbench for AI coding agents to create, test, inspect, debug, and improve Scratch projects.',
    period: {
      start: {
        year: 2026,
        month: 6,
      },
      isCurrent: true,
    },
    status: 'experimental',
    madeFor: 'Personal',
    contentStatus: {
      links: {
        availability: 'private',
        note: 'Experimental workbench is currently maintained in a local-only repository.',
      },
      media: {
        availability: 'not-applicable',
        note: 'The agent and test workbench is represented by its technical project details.',
      },
    },
    bulletPoints: [
      'Built typed Scratch IR plus deterministic .sb3 import and export, lossless round trips, project builders, resource handling, and referential-integrity validation',
      'Added advisory static analysis for graph smells, dead code, empty branches, ownership errors, procedure-call arguments, resource limits, and archive path-traversal guards',
      'Engineered a deterministic scenario driver with VM state assertions, frame-exact Playwright visual assertions, screenshots, failure video, offline network policy, and provenance reports',
      'Implemented lockstep model-based testing with Whisker-compatible model JSON and IR-level mutation testing for operator swaps, constant changes, statement deletion, and boolean negation',
    ],
    technologies: ['typescript', 'scratch', 'node-js', 'playwright', 'esbuild'],
  },
  {
    id: 'personal-ai-coding-skills',
    title: 'Personal AI Coding Skills',
    tagline:
      'Portable skill library and workflow toolkit for repeatable AI-assisted software engineering across coding agents.',
    period: {
      start: {
        year: 2026,
        month: 5,
      },
      isCurrent: true,
    },
    status: 'live',
    madeFor: 'Personal',
    contentStatus: {
      links: { availability: 'available' },
      media: {
        availability: 'not-applicable',
        note: 'The public skill packages are best represented by their source and documentation.',
      },
    },
    bulletPoints: [
      'Authored 20+ reusable skills spanning architecture, consolidation, simplification, security remediation, testing, Git history, frontend engineering, documentation freshness, and accessibility review',
      'Built strict validation, synchronization, project-only installation, generated always-on instruction blocks, and pre-commit and CI checks for portable skill packages',
      'Maintained reusable templates, interoperability guidance, project workflows, and regression checks for sync behavior, comment-style enforcement, and generated instruction stability',
    ],
    technologies: [
      'python',
      'markdown',
      'agent-skills',
      'codex',
      'claude-code',
      'github-actions',
      'pytest',
    ],
    repoUrl: 'https://github.com/ggfincke/ggfincke-skills',
  },
  {
    id: 'coral',
    title: 'Coral',
    tagline:
      'Local-first CLI/TUI coding agent powered by Ollama with semantic retrieval, code intelligence, and a rich terminal interface (v0.12.0).',
    period: {
      start: {
        year: 2026,
        month: 4,
      },
      isCurrent: true,
    },
    status: 'in-development',
    madeFor: 'Personal',
    feature: {
      tier: 'default',
      order: 2,
    },
    contentStatus: {
      links: { availability: 'available' },
      media: { availability: 'available' },
    },
    bulletPoints: [
      'Built a full agent loop w/ multi-turn reasoning, parallel tool use (read/write/bash/grep/glob/git), & research subagents, cycling tool results until task completion',
      'Hardened the loop for local models w/ a tool-call repair layer that recovers text-emitted calls, canonicalizes hallucinated tool names, & schema-validates/coerces args before execution',
      'Implemented session persistence, conversation compaction, & per-model context sizing to sustain long-running tasks within token budgets',
      'Added local semantic code search (search_code) backed by Ollama embeddings, deterministic chunking, & a SQLite vector index w/ swappable embedder/index seams',
      'Designed permission-based tool access control (always-allow / require-approval / always-deny) via a layered .coral.json config hierarchy',
      'Engineered a React Ink TUI w/ Markdown rendering, real-time token streaming, scrollable output, command completion, @-file mentions, command palette, undo/redo, interactive model selection, theming, & keybindings',
      'Added read-only TypeScript/JavaScript code intelligence through a bundled language server with definitions, references, hover/type data, and diagnostics; backstopped behavior with node:test',
    ],
    technologies: [
      'typescript',
      'ollama',
      'react-ink',
      'cli',
      'sqlite',
      'commander',
      'node-js',
      'eslint',
      'prettier',
    ],
    imagePath: '/assets/projects/images/coral.png',
    imageAlt: 'Coral TUI screenshot',
    repoUrl: 'https://github.com/ggfincke/coral',
  },
  {
    id: 'tierlistbuilder',
    title: 'Tier List Builder',
    tagline:
      'Closed-alpha tier-list platform with local-first editing, cloud sync, a public template marketplace, share/embed routes, and 7-format export.',
    period: {
      start: {
        year: 2026,
        month: 3,
      },
      isCurrent: true,
    },
    status: 'live',
    madeFor: 'Personal',
    contentStatus: {
      links: { availability: 'available' },
      media: { availability: 'available' },
    },
    bulletPoints: [
      'Built snapshot-based drag-and-drop on @dnd-kit w/ bulk multi-drag, fan-out FLIP animation, and a 3-state keyboard controller (idle, browse, dragging) for full keyboard interaction',
      'Shipped multi-board workspace w/ autosave, labeled undo/redo, content-addressed IndexedDB image blobs, grid virtualization for large boards, and storage-quota-aware resilience',
      'Implemented 7-format export pipeline (PNG/JPEG/WebP/PDF/JSON/ZIP/clipboard) via off-screen render host, w/ hash-fragment & short-link share codecs plus a read-only embed route',
      'Launched a community marketplace: template gallery, ranking detail & compare pages, multi-criterion consensus views (distribution bars & scatter), and publish/remix flows',
      'Added public profiles (/u/:handle), a tier-list showcase editor, account settings, and email+password auth gating cloud-only actions',
      'Built inline annotation editor, per-board aspect-ratio picker w/ auto-crop & shadow trim, image editor (crop/rotate/zoom), and token-driven theming (12 themes + 12 text styles)',
      'Organized as feature modules w/ a @tierlistbuilder/contracts package, Zustand stores, 113 Vitest files, 5 Playwright specs, & a Convex cloud backend (auth, marketplace, sync, signed media) behind Cloudflare Workers PWA delivery',
    ],
    technologies: [
      'react',
      'typescript',
      'vite',
      'tailwind-css',
      'zustand',
      'dnd-kit',
      'react-router',
      'html-to-image',
      'jspdf',
      'react-easy-crop',
      'convex',
      'cloudflare-workers',
      'pwa',
      'playwright',
    ],
    imagePath: '/assets/projects/images/tierlistbuilder.png',
    imageAlt: 'Tier List Builder app screenshot',
    repoUrl: 'https://github.com/ggfincke/tierlistbuilder',
    liveUrl: 'https://tierlistbuilder.app',
  },
  {
    id: 'mdx-preview-for-vs-code',
    title: 'MDX Preview for VS Code',
    tagline:
      'Published VS Code/Open VSX extension with 10,000+ installs, dual-mode rendering, and framework-aware component shims (v1.6.1).',
    period: {
      start: {
        year: 2026,
        month: 1,
      },
      isCurrent: true,
    },
    status: 'live',
    madeFor: 'Personal',
    feature: {
      tier: 'wide',
      order: 3,
    },
    contentStatus: {
      links: { availability: 'available' },
      media: { availability: 'available' },
    },
    bulletPoints: [
      'Architected the root extension plus 5 workspace packages with esbuild for the Node.js extension host, Vite 8 for the React 19 webview, and reusable mdx-forge compiler and runtime packages',
      'Implemented workspace-trust-gated Safe and Trusted modes: DOMPurify-sanitized static HTML with strict CSP or full React 19 component evaluation with project-level configuration',
      'Built a 4-strategy module resolver (framework shim -> TypeScript paths -> enhanced-resolve -> file probe), dual MDX pipelines, and Shiki, KaTeX, Mermaid, PlantUML, and Graphviz integrations',
      'Designed a component registry for Docusaurus, Starlight, Nextra, Next.js, and generic MDX with 35+ React shims, build-time codegen, 16 preview themes, 24 code themes, and 17 examples',
      'Shipped 20 commands and 32 settings spanning preview control, security, theming, debugging, framework selection, source-line sync, cache management, and HTML export',
    ],
    technologies: [
      'typescript',
      'react',
      'mdx',
      'vite',
      'vs-code-extension-api',
      'esbuild',
      'vitest',
      'comlink',
      'tailwind-css',
      'dompurify',
      'shiki',
      'katex',
      'mermaid',
      'plantuml',
      'graphviz',
    ],
    imagePath: '/assets/projects/images/vsc-mdx.png',
    imageAlt: 'MDX Preview for VS Code extension screenshot',
    repoUrl: 'https://github.com/ggfincke/vsc-mdx-preview',
    liveUrl:
      'https://marketplace.visualstudio.com/items?itemName=ggfincke.vsc-mdx-preview',
    additionalLinks: [
      {
        url: 'https://open-vsx.org/extension/ggfincke/vsc-mdx-preview',
        label: 'Open VSX',
      },
      {
        url: 'https://github.com/ggfincke/mdx-forge',
        label: 'mdx-forge',
      },
      {
        url: 'https://www.npmjs.com/package/mdx-forge',
        label: 'mdx-forge on npm',
      },
    ],
  },
  {
    id: 'mdx-forge',
    title: 'mdx-forge',
    tagline:
      'Standalone MDX runtime toolkit for safe and trusted compilation, diagnostics, browser evaluation, and framework shims.',
    period: {
      start: {
        year: 2026,
        month: 2,
      },
      isCurrent: true,
    },
    status: 'live',
    madeFor: 'Personal',
    contentStatus: {
      links: { availability: 'available' },
      media: {
        availability: 'not-applicable',
        note: 'The runtime toolkit is represented by its public package and source documentation.',
      },
    },
    bulletPoints: [
      'Designed compiler, diagnostics, browser, and components domains with 19 public exports, ESM-only distribution, framework CSS subpaths, and reusable internal compiler and runtime utilities',
      'Built safe and trusted MDX pipelines with lenient CommonMark versus strict MDX detection plus Shiki, KaTeX, GitHub alert, tabs, callouts, Mermaid, PlantUML, and Graphviz integrations',
      'Shipped a host-agnostic diagnostics API with framework-aware component analysis, stable MDXF codes, original-document source ranges, and no-eval frontmatter parsing',
      'Implemented a browser runtime with semaphore-limited loading, module registry and cache abstractions, dependency tracking, LRU caching, style injection, and cascade cleanup',
      'Published framework shims and registry data for Docusaurus, Starlight, Nextra, Next.js, and generic MDX consumers with cross-package Vitest coverage',
    ],
    technologies: [
      'typescript',
      'react',
      'mdx',
      'unified',
      'shiki',
      'katex',
      'mermaid',
      'plantuml',
      'graphviz',
      'vitest',
    ],
    repoUrl: 'https://github.com/ggfincke/mdx-forge',
    additionalLinks: [
      {
        url: 'https://www.npmjs.com/package/mdx-forge',
        label: 'npm',
      },
    ],
  },
  {
    id: 'repo-explainer',
    title: 'Repo Explainer',
    tagline:
      'Cloudflare-native demo that turns public GitHub repositories into grounded, citation-backed chat sessions.',
    period: {
      start: {
        year: 2026,
        month: 3,
      },
    },
    status: 'complete',
    madeFor: 'Personal',
    contentStatus: {
      links: { availability: 'available' },
      media: {
        availability: 'not-applicable',
        note: 'The completed demo is represented by its source and technical project details.',
      },
    },
    bulletPoints: [
      'Built a React UI, Worker API, and Workflow ingestion pipeline that validates repository URLs, resolves branches and commits, filters trees, downloads zipballs, chunks source, and generates overviews',
      'Modeled sessions, files, chunks, messages, and full-text retrieval in D1 with lexical search, explicit file matching, path boosting, and file plus line-range citations',
      'Implemented a per-session Durable Object coordinator that serializes chat updates, tracks focus and referenced files, maintains rolling memory summaries, and supports failed-index retry and reset flows',
      'Added recent sessions, workflow progress, repository metrics, overview panels, and cited chat responses with shared Zod schemas and typed contracts across API and web packages',
    ],
    technologies: [
      'typescript',
      'react',
      'vite',
      'cloudflare-workers',
      'cloudflare-workflows',
      'durable-objects',
      'd1',
      'workers-ai',
      'zod',
      'vitest',
    ],
    repoUrl: 'https://github.com/ggfincke/cloudflare_repo_explainer',
  },
  {
    id: 'opencode-to-ccusage',
    title: 'OpenCode to ccusage',
    tagline:
      'CLI that exports OpenCode sessions to ccusage-compatible JSONL and unified reports; largely superseded after the upstream January 2026 fix.',
    period: {
      start: {
        year: 2025,
        month: 12,
      },
      end: {
        year: 2026,
        month: 1,
      },
    },
    status: 'complete',
    madeFor: 'Personal',
    contentStatus: {
      links: { availability: 'available' },
      media: {
        availability: 'not-applicable',
        note: 'CLI utility currently represented with text-only project details.',
      },
    },
    bulletPoints: [
      'Converted OpenCode session data into ccusage JSONL with per-project or per-directory grouping',
      'Built report workflow that merges OpenCode and Claude Code usage data for unified metrics',
      'Added export controls (since date, dry run, custom output dir, overwrite) and verbose progress logging',
      'Exposed clear CLI commands (report, export, advanced) with pass-through flags to ccusage',
    ],
    technologies: ['typescript', 'node-js', 'cli'],
    repoUrl: 'https://github.com/ggfincke/opencode-to-ccusage',
  },
  {
    id: 'reactive-workbench',
    title: 'Reactive Workbench',
    tagline:
      'Context-aware VS Code automation that adapts themes, panels, layouts, profiles, and editor features based on workspace state (v1.0.2).',
    period: {
      start: {
        year: 2025,
        month: 11,
      },
      end: {
        year: 2025,
        month: 12,
      },
    },
    status: 'paused',
    madeFor: 'Personal',
    contentStatus: {
      links: {
        availability: 'pending',
        note: 'Paused extension work is not published to a public repository or marketplace yet.',
      },
      media: {
        availability: 'pending',
        note: 'Screenshots will be captured when the extension work resumes.',
      },
    },
    bulletPoints: [
      'Evolved from reactive-themes (a public, theme-only predecessor) into a generalized automation engine w/ a registry-pattern architecture',
      'Built rule engine with first-match-wins evaluation, overlap detection, and mode bundles for predictable, reusable automation',
      'Implemented 14 action types (themes, panels, layout, notifications, tasks/commands, profiles) and 17+ condition types (file patterns, language, debug/test state, Git branch, time of day, diagnostics)',
      'Added diagnostics tooling to lint and test rules, explain the active rule, and surface overlap warnings with analytics/history',
      'Ensured safe, reversible changes by applying all actions through VS Code APIs with optional safe mode',
      'Covered the rule pipeline w/ 54 unit & integration test suites (full-pipeline, multi-action, overlap, composite conditions)',
    ],
    technologies: ['typescript', 'node-js', 'vs-code-extension-api'],
  },
  {
    id: 'reactive-themes',
    title: 'Reactive Themes',
    tagline:
      'Pre-release precursor to Reactive Workbench for automatic theme switching from declarative editor-context rules.',
    period: {
      start: {
        year: 2025,
        month: 11,
      },
      end: {
        year: 2025,
        month: 11,
      },
    },
    status: 'complete',
    madeFor: 'Personal',
    contentStatus: {
      links: { availability: 'available' },
      media: {
        availability: 'not-applicable',
        note: 'The extension precursor is represented by its public source and rule-engine details.',
      },
    },
    bulletPoints: [
      'Built first-match-wins theme automation around language IDs, glob patterns, workspace names, debug and test state, timers, and diff and merge views',
      'Shipped 10 commands for toggle and reload, rule creation and management, duplicate cleanup, lint and test flows, and explain and copy-current-theme diagnostics',
      'Implemented debounced switching with original-theme restore, overlap and unreachable-rule diagnostics, and targeted rule, trigger, lint, and extension-lifecycle tests',
    ],
    technologies: [
      'typescript',
      'node-js',
      'vs-code-extension-api',
      'eslint',
      'prettier',
    ],
    repoUrl: 'https://github.com/ggfincke/reactive-themes',
  },
  {
    id: 'swimmate-v2',
    title: 'SwimMate v2',
    tagline:
      'Full-stack swimming platform with native iOS/watchOS apps, HealthKit sync, and AI-powered workout generation.',
    period: {
      start: {
        year: 2025,
        month: 10,
      },
      isCurrent: true,
    },
    status: 'in-development',
    madeFor: 'Personal',
    feature: {
      tier: 'default',
      order: 1,
    },
    contentStatus: {
      links: {
        availability: 'private',
        note: 'Mobile and backend repositories remain private while the platform is in development.',
      },
      media: { availability: 'available' },
    },
    bulletPoints: [
      'Built a Django 5.2/DRF 3.16 API with rotating JWT auth, OpenAPI docs, request-ID tracing, tier-aware AI throttling, and Docker Compose deployment on PostgreSQL 16 + pgvector',
      'Engineered a hybrid RAG pipeline — dense (pgvector, text-embedding-3-large) + Postgres full-text fused w/ reciprocal-rank fusion — w/ source grounding, a versioned prompt registry (sha256 prompt hashes), a generation replay/diff endpoint, & provider-neutral generation behind a client factory',
      'Added an offline eval harness w/ schema-versioned corpora & deterministic constraint validation (stroke/intensity/distance/difficulty), measuring hybrid vs dense-only retrieval over 48 cases w/ JSON + markdown reports (pass rates, p50/p95 latency, token usage, run-over-run diffs)',
      'Modeled a planned-workout lifecycle bridging AI generation -> Apple Watch execution -> completed swim, w/ an adaptive UserFitnessState derived from execution history',
      'Added a weekly training-intelligence layer: deterministic plan assembly, training-load analytics, a pre-swim readiness engine, and a technique drill catalog',
      'Built swim-profile onboarding w/ learned/effective pace calibration per stroke, distance, and intensity',
      'Developed SwiftUI iOS/watchOS apps w/ HealthKit capture, Apple Watch live metrics, Swift Charts analytics, SwiftData persistence, & a source-grounded "why these sets?" view exposing retrieved chunks & constraint effects',
      'Added actor-based networking with automatic token refresh, Keychain JWT storage, background HealthKit deduplication sync, and a cursor-paginated swim-set library',
    ],
    technologies: [
      'swift',
      'swiftui',
      'watchos',
      'healthkit',
      'watchconnectivity',
      'swift-charts',
      'swiftdata',
      'django',
      'django-rest-framework',
      'postgresql',
      'pgvector',
      'openai',
      'llm-evaluation',
      'jwt',
      'python',
      'openapi',
      'docker-compose',
    ],
    imagePath: '/assets/projects/images/swimmatev2.png',
    imageAlt: 'SwimMate v2 full-stack platform screenshot',
  },
  {
    id: 'portfolio-website-v2',
    title: 'Portfolio Website v2',
    tagline:
      "The site you're on: minimalist, section‑based, and content‑driven.",
    period: {
      start: {
        year: 2025,
        month: 10,
      },
      isCurrent: true,
    },
    status: 'live',
    madeFor: 'Personal',
    contentStatus: {
      links: { availability: 'available' },
      media: { availability: 'available' },
    },
    bulletPoints: [
      'Complete redesign with Vite 7 + React 19 + TypeScript + Tailwind CSS 4.0 for pure client‑side architecture',
      'Section‑based organization: each feature isolated with its own components, content, and utilities for maximum modularity',
      'Content‑driven development: strict separation of data from presentation; content lives in dedicated files, components focus on rendering',
      'Material Theme Ocean HC color system with semantic technology categorization (140+ techs across 6 categories)',
      'Staggered slide‑in animations with full prefers‑reduced‑motion accessibility support',
      'Type‑safe routing with React Router 7 and centralized type definitions with barrel exports',
      'Verification pipeline on a Bun toolchain: Vitest unit tests, axe a11y audits, Lighthouse, Playwright screenshot smoke tests, & content-health/link checks',
    ],
    technologies: [
      'react',
      'typescript',
      'vite',
      'bun',
      'tailwind-css',
      'react-router',
      'vitest',
      'playwright',
      'eslint',
      'prettier',
    ],
    imagePath: '/assets/projects/images/portfoliov2.png',
    imageAlt: 'Portfolio website v2 screenshot',
    repoUrl: 'https://github.com/ggfincke/fincke.dev-v2',
    liveUrl: 'https://fincke.dev',
  },
  {
    id: 'minecart',
    title: 'Minecart',
    tagline:
      'Web/API-first Minecraft server management platform across local Docker and AWS EC2 with multi-tenant controls and a Discord companion (v0.14.0).',
    period: {
      start: {
        year: 2025,
        month: 9,
      },
      isCurrent: true,
    },
    status: 'in-development',
    madeFor: 'Personal',
    contentStatus: {
      links: {
        availability: 'private',
        note: 'Discord bot deployment and server-management code are not published publicly.',
      },
      media: { availability: 'available' },
    },
    bulletPoints: [
      'Built a Hono REST API (20+ routes) w/ Zod-validated contracts, OpenAPI/Scalar docs, DI middleware, rate limiting, API keys, and webhooks as the primary management surface',
      'Added a React/Vite/Tailwind web dashboard w/ Discord OAuth session auth (HttpOnly cookies, CSRF), server lists, a provider catalog, and provisioning flows',
      'Streamed real-time provisioning progress over SSE (GET /v1/jobs/:id/stream) w/ a repository-backed event hub & heartbeats; PATCH/DELETE server CRUD w/ active-job guards and soft-delete',
      'Implemented a provider abstraction for local Docker and AWS EC2 w/ runtime switching, health checks, and live status via RCON and mcstatus.io',
      'Automated idle shutdown, scheduled start/stop windows, crash recovery, and backups with retention',
      'Added Modrinth-backed content management (mod search/install, resource-pack SHA verification, Paper version switching) & blue/green + staging disposable test worlds',
      'Shipped multi-tenant controls: multi-server registration, role-based permissions (view/operate/admin/owner), channel bindings, usage metering/quotas, and audit logs',
      'Kept a lightweight Discord companion (status, start/stop, player count, chat bridge) as advanced workflows moved web/API-first',
    ],
    technologies: [
      'typescript',
      'node-js',
      'hono',
      'zod',
      'prisma',
      'postgresql',
      'react',
      'vite',
      'tailwind-css',
      'docker',
      'docker-compose',
      'rcon',
      'aws',
      'ec2',
      'ssm',
      'cloudwatch',
      's3',
      'discord-js',
    ],
    imagePath: '/assets/projects/images/minecart.png',
    imageAlt: 'Minecart Discord bot screenshot',
  },
  {
    id: 'hopper',
    title: 'Hopper',
    tagline:
      'Hybrid microservices inventory system for multi‑marketplace ecommerce.',
    period: {
      start: {
        year: 2025,
        month: 9,
      },
      end: {
        year: 2025,
        month: 11,
      },
    },
    status: 'paused',
    madeFor: 'Personal',
    contentStatus: {
      links: { availability: 'available' },
      media: {
        availability: 'not-applicable',
        note: 'Backend and marketplace-integration project has no stable public UI capture.',
      },
    },
    bulletPoints: [
      'Orchestrates products, listings, orders, and fees across marketplaces with Java/Spring Boot core and a Go connector service',
      'JWT auth with access/refresh tokens, role‑based authorization (ADMIN/USER/API CLIENT), secure rotation, and Spring Security guards',
      'AES‑GCM‑256 credential encryption with PBKDF2 key derivation and versioned encryption metadata for rotation',
      'Normalized PostgreSQL schema (13 Flyway migrations), foreign keys, composite uniques, and performance indexes',
      'Order state machine (pending→confirmed→paid→processing→shipped→delivered) with business rules and stock management',
      'Spring Batch order-import job (reader/processor/writer) pulling external orders via MarketplaceClient abstraction',
      'OpenAPI 3.1 spec for the Go connector (idempotency, error taxonomy) and Bruno/CI collections for contract tests',
      'Added a React 19 / TypeScript dashboard (Vite 7, Tailwind 4) w/ auth pages (login/register/refresh) wired to the live API, routing guards & theme persistence, plus a Docker Compose dev stack (API, PostgreSQL 15, Go connector, Vite)',
    ],
    technologies: [
      'java',
      'spring-boot',
      'spring-data-jpa',
      'postgresql',
      'flyway',
      'h2',
      'spring-security',
      'spring-batch',
      'actuator',
      'gradle',
      'docker',
      'docker-compose',
      'go',
      'react',
      'typescript',
      'vite',
      'tailwind-css',
      'react-router',
    ],
    repoUrl: 'https://github.com/ggfincke/hopper',
  },
  {
    id: 'ff7-decomp',
    title: 'FF7 Decompilation',
    tagline:
      'Matching decompilation of Final Fantasy VII (PS1) to byte-identical C — MIPS function promotion w/ binary-exact CI.',
    period: {
      start: {
        year: 2025,
        month: 9,
      },
      isCurrent: true,
    },
    status: 'experimental',
    madeFor: 'Personal',
    contentStatus: {
      links: {
        availability: 'private',
        note: 'Personal fork of the ff7-decomp project; the working tree is kept private.',
      },
      media: {
        availability: 'not-applicable',
        note: 'Decompilation research has no UI; progress is represented as text.',
      },
    },
    bulletPoints: [
      'Promoted 2,295 of 2,939 MIPS R3000 functions across 12 PS1 overlays to unconditional matching C (78.1%), with 644 guarded functions remaining and every promotion verified against the original binary',
      'Read GCC 2.7.2 internals (sched.c, emit-rtl.c) to disprove a translation-unit optimization hypothesis and isolate real blockers (aspsx version mismatch, stabs sizing, dead-code frame inflation, cross-overlay cascades)',
      'Built a custom Go build orchestrator over the splat/m2c/asm-differ/maspsx pipeline, plus Python promotion-test & register-allocation diff tooling w/ a batch scanner over hundreds of functions',
      'Enforced binary-identical correctness via 12 SHA-1 checksums — the exact binary match is the test — wired through GitHub Actions CI, w/ a Docker image for reproducible local builds',
      'Classified and fixed thousands of type bugs and raw pointer casts, performed 5,000+ symbol renames, and held single-line comment coverage across all 18 source files',
    ],
    technologies: [
      'c',
      'mips-assembly',
      'go',
      'python',
      'docker',
      'ninja',
      'github-actions',
      'reverse-engineering',
    ],
  },
  {
    id: 'loom',
    title: 'Loom',
    tagline:
      'AI-powered resume tailoring CLI with structured edits, diff review, and versioned workflows.',
    period: {
      start: {
        year: 2025,
        month: 8,
      },
      end: {
        year: 2025,
        month: 12,
      },
    },
    status: 'complete',
    madeFor: 'Personal',
    contentStatus: {
      links: { availability: 'available' },
      media: { availability: 'available' },
    },
    bulletPoints: [
      'Built Typer command suite (sectionize, tailor, generate, apply) w/ configurable defaults & a themed help UI (29 selectable color themes)',
      'Implemented a deterministic structured-JSON edit pipeline (replace/insert/delete/modify/prompt ops) w/ interactive diff resolution, risk/on-error policies, & format-preserving DOCX/LaTeX/Typst handling',
      'Built a provider-neutral AI layer routing 6 backends (OpenAI, Anthropic, Gemini, Mistral, Ollama, LM Studio) via factory/registry — one OpenAI-compatible client shared by Mistral & LM Studio — w/ TTL+LRU response caching',
      'Added snapshot version management w/ content hashing & stored diff patches for restore, comparison & reproducible iteration',
      'Shipped ATS compatibility checks, bulk job processing w/ fit-scoring & keyword-coverage matrices, --watch auto-rerun, and exports to txt/pdf/html',
    ],
    technologies: [
      'python',
      'typer',
      'rich',
      'openai',
      'anthropic',
      'gemini',
      'mistral',
      'ollama',
      'lm-studio',
      'docx',
      'latex',
      'typst',
      'json',
      'cli',
    ],
    imagePath: '/assets/projects/images/loom.png',
    imageAlt: 'Loom app screenshot',
    repoUrl: 'https://github.com/ggfincke/loom',
  },
  {
    id: 'conduit',
    title: 'Conduit',
    tagline:
      'Cross-platform music hub bridging Spotify & Apple Music — per-platform auth w/ ISRC-based track matching.',
    period: {
      start: {
        year: 2025,
        month: 5,
      },
      isCurrent: true,
    },
    status: 'in-development',
    madeFor: 'Personal',
    contentStatus: {
      links: {
        availability: 'private',
        note: 'Repository is private while the playlist-transfer MVP is unfinished.',
      },
      media: {
        availability: 'pending',
        note: 'UI screenshots will be captured when development resumes.',
      },
    },
    bulletPoints: [
      'Implemented Spotify OAuth 2.0 + PKCE & Apple Music MusicKit (developer-JWT) auth w/ per-user token storage & refresh backed by a Convex real-time database',
      'Designed a cross-platform track-matching schema using ISRC identifiers to correlate the same song across streaming catalogs',
      'Built a feature-based Next.js 16 app w/ separate authed/public route groups and middleware-enforced session validation',
      'Architected a platform-registry pattern so new streaming integrations plug in through a shared interface',
      'Shipped a full auth system (sign-up, sign-in, OAuth callback, server-validated sessions) atop a feature-sliced shared UI library',
    ],
    technologies: [
      'next-js',
      'react',
      'typescript',
      'convex',
      'supabase',
      'tailwind-css',
      'jwt',
    ],
  },
  {
    id: 'trackbasket',
    title: 'TrackBasket',
    tagline:
      'AI‑assisted price tracking across a 30k+ product catalog from multiple retailers.',
    period: {
      start: {
        year: 2025,
        month: 5,
      },
      end: {
        year: 2025,
        month: 7,
      },
    },
    status: 'complete',
    madeFor: 'Bolt Hackathon',
    contentStatus: {
      links: { availability: 'available' },
      media: { availability: 'available' },
    },
    bulletPoints: [
      'Chat‑to‑basket turns natural language into structured baskets using Supabase and OpenAI',
      'Advanced crawling w/ CV-based CAPTCHA solving (EasyOCR/OpenCV) & stealth automation (undetected-chromedriver, playwright-stealth), normalization, and real‑time updates',
      'Backend: 3 Supabase Edge Functions (chat-to-basket, ai-alternatives, notifications), pg_trgm trigram search, UPC matching, and event‑driven email alerts',
      'AI‑powered matching with intelligent alternatives and cross‑retailer price correlation via UPC',
      'Granular alerts for price drops, availability changes, and product updates; collaborative basket management',
      'Responsive UI with price history charts and recommendations',
    ],
    technologies: [
      'typescript',
      'python',
      'supabase',
      'next-js',
      'react',
      'openai',
      'postgresql',
      'opencv',
      'easyocr',
    ],
    imagePath: '/assets/projects/images/trackbasket.png',
    imageAlt: 'TrackBasket app screenshot',
    repoUrl: 'https://github.com/ggfincke/BoltHackathon',
  },
  {
    id: 'portfolio-website-v1',
    title: 'Portfolio Website v1',
    tagline:
      'Previous Next.js portfolio site, now retired and superseded by v2.',
    period: {
      start: {
        year: 2025,
        month: 3,
      },
      end: {
        year: 2025,
        month: 9,
      },
    },
    status: 'complete',
    madeFor: 'Personal',
    contentStatus: {
      links: { availability: 'available' },
      media: { availability: 'available' },
    },
    bulletPoints: [
      'Next.js + TypeScript + Tailwind; responsive UI with subtle motion',
      'Custom component system, accessibility and performance‑first design',
      'Build-time theme system: 6 color themes via a CSS-var generator (themes/config.ts -> themes.css) w/ next-themes selector',
      'CI/CD with Vercel deploys, Lighthouse CI checks, and automated prereleases/tags',
      "Retired in favor of v2's simpler, client-side architecture",
    ],
    technologies: [
      'next-js',
      'react',
      'typescript',
      'tailwind-css',
      'github-actions',
      'ci-cd',
      'figma',
    ],
    imagePath: '/assets/projects/images/portfolio.png',
    imageAlt: 'Portfolio website v1 screenshot',
    repoUrl: 'https://github.com/ggfincke/fincke.dev',
  },
  {
    id: 'beacon',
    title: 'Beacon',
    tagline:
      'Early multi-retailer product tracking platform centered on Django APIs, baskets, listings, and background scraping.',
    period: {
      start: {
        year: 2025,
        month: 4,
      },
      end: {
        year: 2025,
        month: 5,
      },
    },
    status: 'complete',
    madeFor: 'Personal',
    contentStatus: {
      links: {
        availability: 'private',
        note: 'The archived precursor repository is private.',
      },
      media: {
        availability: 'archived',
        note: 'No stable screenshot was retained for this early product-tracking platform.',
      },
    },
    bulletPoints: [
      'Modeled users, products, retailers, listings, baskets, and scraping services with app-level APIs, serializers and views, Django admin integration, and an ER-documented schema',
      'Built a Dockerized backend stack with PostgreSQL, Redis, Celery, environment-based settings, and dedicated test and local configurations for asynchronous price and availability work',
      'Added retailer, listing, basket, and product endpoints plus crawler infrastructure, database-management services, and end-to-end scraping checks that informed InStock and TrackBasket',
    ],
    technologies: [
      'python',
      'django',
      'redis',
      'celery',
      'docker-compose',
      'web-scraping',
    ],
  },
  {
    id: 'instock',
    title: 'InStock',
    tagline:
      'Multi‑retailer stock & price tracker w/ Discord alerts; precursor to TrackBasket.',
    period: {
      start: {
        year: 2024,
        month: 12,
      },
      end: {
        year: 2025,
        month: 4,
      },
    },
    status: 'complete',
    madeFor: 'Personal',
    contentStatus: {
      links: {
        availability: 'archived',
        note: 'Precursor project is retained as portfolio history without a public repository or live deployment.',
      },
      media: {
        availability: 'archived',
        note: 'No stable screenshot was retained for the archived precursor project.',
      },
    },
    bulletPoints: [
      'Restock & price-drop detection across Amazon, Walmart, Target & Best Buy',
      'Django + PostgreSQL core w/ Redis/Celery workers & Selenium + undetected-chromedriver scraping, plus an EasyOCR+OpenCV captcha solver',
      'JWT-authed DRF REST API (~16 endpoints) w/ a Discord.py bot as primary client; notifs via Redis pub/sub',
    ],
    technologies: [
      'python',
      'django',
      'django-rest-framework',
      'postgresql',
      'selenium',
      'redis',
      'celery',
      'docker',
      'discord-py',
      'opencv',
      'easyocr',
    ],
  },
  {
    id: 'deep-learning-architecture-comparison-and-analysis-for-cifar-10',
    title: 'Deep Learning Architecture Comparison & Analysis for CIFAR-10',
    tagline: 'DenseNet121 vs CNN/ResNet50/RFM on CIFAR‑10.',
    period: {
      start: {
        year: 2024,
        month: 11,
      },
      end: {
        year: 2024,
        month: 12,
      },
    },
    status: 'complete',
    madeFor: 'Penn State',
    contentStatus: {
      links: { availability: 'available' },
      media: { availability: 'available' },
    },
    bulletPoints: [
      'DenseNet121 topped at 74% test accuracy vs CNN 69%, RFM 51.6%, ResNet50 47%',
      'Documented optimization challenges, loss/accuracy curves, and future work; full metric suite and confusion matrices',
    ],
    technologies: [
      'python',
      'tensorflow',
      'keras',
      'numpy',
      'pandas',
      'matplotlib',
      'seaborn',
      'scikit-learn',
      'deep-learning',
      'cnn',
      'resnet',
      'densenet',
      'latex',
      'random-fourier-features',
    ],
    imagePath: '/assets/projects/images/452final.png',
    imageAlt: 'MATH 452 Final Report screenshot',
    repoUrl: 'https://github.com/ggfincke/MATH452_projects',
    liveUrl: '/assets/projects/documents/MATH_452_-_Final_Report.pdf',
    collaborators: [
      {
        name: 'Jacob Goulet',
      },
      {
        name: 'Tyler Rossi',
      },
      {
        name: 'Diego Bueno',
      },
      {
        name: 'Javier Pozo Miranda',
      },
      {
        name: 'Duong Bao',
      },
    ],
  },
  {
    id: 'computer-architecture-projects',
    title: 'Computer Architecture Projects',
    tagline:
      'Cache/memory exploration and branch‑prediction analysis on SimpleScalar.',
    period: {
      start: {
        year: 2024,
        month: 9,
      },
      end: {
        year: 2024,
        month: 12,
      },
    },
    status: 'complete',
    madeFor: 'Penn State',
    contentStatus: {
      links: {
        availability: 'not-applicable',
        note: 'Course project collection is summarized without publishing separate artifacts.',
      },
      media: {
        availability: 'not-applicable',
        note: 'Architecture experiments are represented by text rather than a UI screenshot.',
      },
    },
    bulletPoints: [
      'Framework to explore multi‑dimensional cache/memory configs with automated validation and evaluation across benchmarks',
      'Branch predictors: static, 1‑bit/2‑bit, bimodal, gshare, and hybrid with chooser; accuracy and misprediction analysis',
      'Detailed reports with quantitative trade‑offs and recommendations',
    ],
    technologies: [
      'c-cpp',
      'simplescalar',
      'python',
      'cache-hierarchies',
      'branch-prediction',
      'performance-analysis',
    ],
  },
  {
    id: 'tcghub',
    title: 'TCGhub',
    tagline: 'TCGplayer‑style marketplace clone with hand‑rolled SQL.',
    period: {
      start: {
        year: 2024,
        month: 9,
      },
      end: {
        year: 2024,
        month: 12,
      },
    },
    status: 'complete',
    madeFor: 'Penn State',
    contentStatus: {
      links: { availability: 'available' },
      media: { availability: 'available' },
    },
    bulletPoints: [
      'React + Express marketplace over a custom SQLite schema (14 tables, FKs, composite keys, indexes) in BCNF',
      'Express REST API (30+ routes) w/ bcrypt auth, cart -> checkout transaction flow & Chart.js price-history tracking',
      'Hand‑written SQL w/ rarity/expansion filtering & search, responsive Tailwind UI (scored >100%)',
    ],
    technologies: ['react', 'node-js', 'sql', 'sqlite', 'tailwind-css'],
    imagePath: '/assets/projects/images/tcghub2.png',
    imageAlt: 'TCGhub app screenshot',
    repoUrl: 'https://github.com/ggfincke/TCGhub',
    collaborators: [
      {
        name: 'Yash Tumuluri',
      },
    ],
  },
  {
    id: 'traditional-machine-learning-methods-exploration-for-mnist',
    title: 'Traditional Machine Learning Methods Exploration for MNIST',
    tagline: 'Classical ML baselines for MNIST with KNN/LR/SVM.',
    period: {
      start: {
        year: 2024,
        month: 9,
      },
      end: {
        year: 2024,
        month: 10,
      },
    },
    status: 'complete',
    madeFor: 'Penn State',
    contentStatus: {
      links: { availability: 'available' },
      media: { availability: 'available' },
    },
    bulletPoints: [
      'KNN 94.4%, Logistic Regression 91.1%, SVM (RBF) 95.3% on a 10k‑image subset; precision/recall/F1 with confusion matrices',
      'Preprocessing: normalization to [0,1], 784‑D flattening, stratified train/test; K‑Means + PCA for unsupervised analysis (100% grade)',
    ],
    technologies: [
      'python',
      'scikit-learn',
      'numpy',
      'pandas',
      'matplotlib',
      'seaborn',
      'machine-learning',
      'latex',
    ],
    imagePath: '/assets/projects/images/452midterm.png',
    imageAlt: 'MATH 452 Midterm Report screenshot',
    repoUrl: 'https://github.com/ggfincke/MATH452_projects',
    liveUrl: '/assets/projects/documents/MATH_452_Midterm_Report.pdf',
  },
  {
    id: 'covid-19-case-surveillance-analysis',
    title: 'COVID-19 Case Surveillance Analysis',
    tagline: 'Large‑scale public health data exploration in Python.',
    period: {
      start: {
        year: 2024,
        month: 5,
      },
      end: {
        year: 2024,
        month: 8,
      },
    },
    status: 'complete',
    madeFor: 'Penn State',
    contentStatus: {
      links: {
        availability: 'not-applicable',
        note: 'Course data-analysis submission is summarized without public artifacts.',
      },
      media: {
        availability: 'not-applicable',
        note: 'Analysis work is represented by project details rather than retained screenshots.',
      },
    },
    bulletPoints: [
      'End‑to‑end data science with pandas/NumPy/sklearn; multiple ML models (linear/logistic regression, SVM, KNN, trees)',
      'Final surveillance analysis project with comprehensive preprocessing, visualization, and 100% score',
    ],
    technologies: [
      'python',
      'machine-learning',
      'pandas',
      'numpy',
      'scikit-learn',
      'matplotlib',
      'seaborn',
      'jupyter',
    ],
    collaborators: [
      {
        name: 'Edwin Clatus',
      },
      {
        name: 'Sahit Botta',
      },
    ],
  },
  {
    id: 'betterbettor',
    title: 'BetterBettor',
    tagline: 'Decentralized sports betting dApp on Ethereum.',
    period: {
      start: {
        year: 2024,
        month: 3,
      },
      end: {
        year: 2024,
        month: 5,
      },
    },
    status: 'complete',
    madeFor: 'Penn State',
    contentStatus: {
      links: {
        availability: 'not-applicable',
        note: 'Course dApp submission is summarized without a maintained public deployment.',
      },
      media: {
        availability: 'archived',
        note: 'No reliable screenshot was retained for the completed course project.',
      },
    },
    bulletPoints: [
      'Solidity smart contracts with automated payouts and odds; MetaMask wallet integration',
      'Modern Next.js/React front‑end with real‑time betting UX',
    ],
    technologies: [
      'solidity',
      'next-js',
      'ethereum',
      'web3-js',
      'metamask',
      'react',
    ],
  },
  {
    id: 'swimmate',
    title: 'SwimMate',
    tagline: 'Native iOS/watchOS swimming workout tracker.',
    period: {
      start: {
        year: 2024,
        month: 2,
      },
      end: {
        year: 2024,
        month: 6,
      },
    },
    status: 'complete',
    madeFor: 'Penn State',
    contentStatus: {
      links: { availability: 'available' },
      media: { availability: 'available' },
    },
    bulletPoints: [
      'Comprehensive swimming app to track, plan, and save workouts with history and progress visualization',
      'HealthKit + SwiftUI for workout entry & lap timing, w/ post-workout stats (pace, SWOLF, distance, calories) & Swift Charts analytics',
      'Apple Watch companion: live metrics (distance, laps, calories, elapsed time) w/ Water Lock; receives swim sets from iOS via WatchConnectivity',
      'Goal‑based workouts (distance, time, calories) with real‑time feedback; pool & open‑water with GPS',
      'Achieved 100% on original submission for CMPSC 475',
    ],
    technologies: [
      'swift',
      'swiftui',
      'healthkit',
      'watchkit',
      'watchos',
      'swift-charts',
      'watchconnectivity',
    ],
    imagePath: '/assets/projects/images/swimmate.png',
    imageAlt: 'SwimMate app screenshot',
    repoUrl: 'https://github.com/ggfincke/SwimMate-v1',
  },
  {
    id: 'optimus',
    title: 'OPTIMUS',
    tagline: 'Fine‑tuned Discord chatbot based on Microsoft GODEL‑v1.1.',
    period: {
      start: {
        year: 2024,
        month: 2,
      },
      end: {
        year: 2024,
        month: 4,
      },
    },
    status: 'complete',
    madeFor: 'Personal',
    contentStatus: {
      links: {
        availability: 'archived',
        note: 'Experimental bot code and deployment are no longer published publicly.',
      },
      media: {
        availability: 'archived',
        note: 'No stable screenshot was retained for the archived Discord bot.',
      },
    },
    bulletPoints: [
      'Local inference with a custom‑trained seq2seq model (HuggingFace Transformers)',
      'Rich Discord interactions, emote reactions, user triggers, and mode controls',
    ],
    technologies: [
      'python',
      'transformers',
      'pytorch',
      'discord-py',
      'huggingface',
      'apscheduler',
    ],
  },
  {
    id: 'ios-application-development-projects',
    title: 'iOS Application Development Projects',
    tagline:
      'Five Swift/SwiftUI projects spanning maps, puzzles, and data‑driven apps.',
    period: {
      start: {
        year: 2024,
        month: 1,
      },
      end: {
        year: 2024,
        month: 3,
      },
    },
    status: 'complete',
    madeFor: 'Penn State',
    contentStatus: {
      links: {
        availability: 'not-applicable',
        note: 'Course project collection is summarized without publishing individual app repositories.',
      },
      media: {
        availability: 'not-applicable',
        note: 'Multiple app exercises are represented by text instead of one canonical screenshot.',
      },
    },
    bulletPoints: [
      'LionSpell word game, Pentominoes with drag/3D rotation, and campus map apps (SwiftUI Map + UIKit MKMapView)',
      'Pokédex with type filtering and persistence; 98% average across projects',
    ],
    technologies: [
      'swift',
      'swiftui',
      'uikit',
      'mapkit',
      'core-data',
      'json',
      'custom-shapes',
      'gesture-handling',
      'mvc-mvvm',
      'xcode',
    ],
    collaborators: [
      {
        name: 'Ashley Amendola',
      },
    ],
  },
  {
    id: 'memory-management-and-threading-in-c',
    title: 'Operating Systems Projects',
    tagline:
      'Systems projects spanning a custom allocator, x86-64 virtual memory, and concurrent channels in C.',
    period: {
      start: {
        year: 2023,
        month: 9,
      },
      end: {
        year: 2023,
        month: 12,
      },
    },
    status: 'complete',
    madeFor: 'Penn State',
    contentStatus: {
      links: { availability: 'available' },
      media: {
        availability: 'not-applicable',
        note: 'Systems programming coursework has no meaningful visual media asset.',
      },
    },
    bulletPoints: [
      'Implemented malloc/free/realloc with 61 segregated free lists, boundary-tag coalescing, best-fit search across size classes, and 16-byte alignment',
      'Built an x86-64 four-level page-table hierarchy with kernel identity mapping, user program and stack mappings, permission bits, and a syscall entry path',
      'Implemented thread-safe bounded channels with semaphore-based space tracking, mutex protection, blocking and non-blocking operations, and select-style multiplexing',
      'Achieved a 100% assignment average with trace-based and stress-test verification',
    ],
    technologies: [
      'c',
      'systems-programming',
      'operating-systems',
      'x86-64',
      'dynamic-memory-allocation',
      'virtual-memory',
      'memory-management',
      'threading',
      'semaphores',
    ],
    repoUrl: 'https://github.com/ggfincke/CMPSC473_projects',
    collaborators: [
      {
        name: 'Avanish Grampurohit',
      },
    ],
  },
  {
    id: 'usbap',
    title: 'USBAP',
    tagline: 'Prototype scraper for DraftKings & FanDuel MLB game lines.',
    period: {
      start: {
        year: 2023,
        month: 5,
      },
      end: {
        year: 2023,
        month: 7,
      },
    },
    status: 'experimental',
    madeFor: 'Personal',
    contentStatus: {
      links: {
        availability: 'archived',
        note: 'Experimental scraper code is not currently published.',
      },
      media: {
        availability: 'not-applicable',
        note: 'Data scraper project has no stable UI or media artifact.',
      },
    },
    bulletPoints: [
      'Scrapes DraftKings & FanDuel MLB game lines (moneyline/runline/total) via requests + BeautifulSoup, printing parsed odds to console',
      'Early prototype (3 commits); SQL storage & cross-book comparison left as TODOs, never built',
    ],
    technologies: ['python', 'web-scraping', 'beautifulsoup'],
    collaborators: [
      {
        name: 'Yugal Kithany',
      },
      {
        name: 'Kyle Lynch',
      },
    ],
  },
  {
    id: 'mips-processor',
    title: 'MIPS Processor',
    tagline: 'Single‑cycle 32‑bit MIPS in Verilog with modular design.',
    period: {
      start: {
        year: 2023,
        month: 3,
      },
      end: {
        year: 2023,
        month: 5,
      },
    },
    status: 'complete',
    madeFor: 'Penn State',
    contentStatus: {
      links: { availability: 'available' },
      media: {
        availability: 'not-applicable',
        note: 'Hardware design coursework has no canonical runtime screenshot.',
      },
    },
    bulletPoints: [
      'Full instruction set (arith/logic/memory/branch/jump) with Harvard organization',
      'Modular ALU, control, register file, and memory; comprehensive test coverage (100%)',
    ],
    technologies: ['verilog', 'fpga', 'digital-design', 'xilinx-vivado'],
    repoUrl: 'https://github.com/ggfincke/CMPEN331_final_project',
    collaborators: [
      {
        name: 'Avanish Grampurohit',
      },
    ],
  },
  {
    id: 'jbod-storage-system-with-caching-and-network-communication',
    title: 'JBOD Storage System with Caching & Network Communication',
    tagline: 'Block‑level JBOD with LFU cache and TCP client/server.',
    period: {
      start: {
        year: 2022,
        month: 9,
      },
      end: {
        year: 2022,
        month: 12,
      },
    },
    status: 'complete',
    madeFor: 'Penn State',
    contentStatus: {
      links: { availability: 'available' },
      media: {
        availability: 'not-applicable',
        note: 'Storage-system coursework has no meaningful visual media asset.',
      },
    },
    bulletPoints: [
      'Complete JBOD storage across multiple disks with LFU caching',
      'TCP/IP client‑server architecture and robust protocol handling',
      'Full testing and integration verification (100% scores)',
    ],
    technologies: [
      'c',
      'systems-programming',
      'storage-systems',
      'networking',
      'caching',
    ],
    repoUrl: 'https://github.com/ggfincke/CMPSC311_projects',
  },
] satisfies Project[])
