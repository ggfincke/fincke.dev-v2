// src/content/projects/all.ts
// project portfolio data

import type { Project } from '~/shared/types'
import { deepFreeze } from '~/shared/utils/deepFreeze'

export const projects = deepFreeze([
  {
    id: 'coral',
    title: 'Coral',
    tagline:
      'Local-first CLI/TUI coding agent powered by Ollama — full agent loop, tool system, & React Ink interface.',
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
      links: {
        availability: 'private',
        note: 'Repository is private while the agent toolkit is in active development.',
      },
      media: { availability: 'available' },
    },
    bulletPoints: [
      'Built a full agent loop w/ multi-turn reasoning, parallel tool use (read/write/bash/grep/glob/git), & research subagents, cycling tool results until task completion',
      'Hardened the loop for local models w/ a tool-call repair layer that recovers text-emitted calls, canonicalizes hallucinated tool names, & schema-validates/coerces args before execution',
      'Implemented session persistence, conversation compaction, & per-model context sizing to sustain long-running tasks within token budgets',
      'Added local semantic code search (search_code) backed by Ollama embeddings, deterministic chunking, & a SQLite vector index w/ swappable embedder/index seams',
      'Designed permission-based tool access control (always-allow / require-approval / always-deny) via a layered .coral.json config hierarchy',
      'Engineered a React Ink TUI w/ Markdown rendering, real-time token streaming, scrollable output, interactive model selection, theming, & keybindings',
      'Organized as 12k+ LOC across 75 TypeScript files w/ a node:test suite, an architecture guide, & a v2 roadmap (slash commands, LSP, MCP, plugins)',
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
  },
  {
    id: 'tierlistbuilder',
    title: 'Tier List Builder',
    tagline:
      'Local-first tier list builder grown into a community ranking platform — drag-&-drop workspace, 7-format export, template marketplace, & public profiles.',
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
      'Organized as feature modules (workspace, marketplace, social, library, embed) w/ a @tierlistbuilder/contracts package, Zustand stores, Vitest + Playwright tests, & a Convex cloud backend (auth, marketplace, sync, signed media) behind Cloudflare Workers PWA delivery',
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
      '7,000+ installs; Live MDX preview extension with dual-mode rendering and framework-aware component shims.',
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
      'Built the VS Code extension as a 5-package npm-workspace monorepo with dual-mode rendering (Safe HTML / Trusted JS), workspace-trust gating, dynamic CSP generation, and path-traversal prevention',
      'Extracted mdx-forge as a standalone MIT-licensed npm runtime toolkit (separate repo, independent release cycle) with three subpath exports: compiler (compileSafe/compileTrusted), browser (module loader, LRU registry, evaluation), and components (framework shims + registry metadata)',
      "Wired framework auto-detection for Docusaurus, Starlight, Nextra, and Next.js — the extension reads package.json and resolves imports (e.g. @theme/Tabs) through mdx-forge's component registry via a 4-script codegen pipeline that generates shim barrels and preload entries",
      'Integrated Tailwind v4 compilation, Sass transpilation, Shiki syntax highlighting (100+ languages, 24 code themes), KaTeX math, and Mermaid / Graphviz / PlantUML diagrams in the webview, with 16 preview themes and source-line hover highlighting',
      'Split .md -> lenient CommonMark vs .mdx -> strict MDX in mdx-forge, w/ MDX009 config warnings & downstream-sanitize guidance to keep the Safe-mode security boundary honest',
      'Shipped Claude Code add-ons distributed via mdx-forge: a skill teaching the toolkit API plus the mdx-forge-render MCP server that compiles MDX, captures Playwright screenshots, and returns structured diagnostics with did-you-mean suggestions',
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
      'shiki',
      'katex',
      'mermaid',
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
    id: 'opencode-to-ccusage',
    title: 'OpenCode to ccusage',
    tagline:
      'CLI tool that exports OpenCode sessions to ccusage-compatible JSONL and generates combined usage reports.',
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
      'Context-aware VS Code automation that adapts themes, panels, layouts, and editor features based on workspace state.',
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
      'Built Django REST API with JWT auth, OpenAPI docs, and PostgreSQL + pgvector for semantic search and workout library retrieval',
      'Engineered a hybrid RAG pipeline — dense (pgvector, text-embedding-3-large) + Postgres full-text fused w/ reciprocal-rank fusion — w/ source grounding, a versioned prompt registry (sha256 prompt hashes), a generation replay/diff endpoint, & provider-neutral generation behind a client factory',
      'Added an offline eval harness w/ schema-versioned corpora & deterministic constraint validation (stroke/intensity/distance/difficulty), measuring hybrid vs dense-only retrieval over 48 cases w/ JSON + markdown reports (pass rates, p50/p95 latency, token usage, run-over-run diffs)',
      'Modeled a planned-workout lifecycle bridging AI generation -> Apple Watch execution -> completed swim, w/ an adaptive UserFitnessState derived from execution history',
      'Added a weekly training-intelligence layer: deterministic plan assembly, training-load analytics, a pre-swim readiness engine, and a technique drill catalog',
      'Built swim-profile onboarding w/ learned/effective pace calibration per stroke, distance, and intensity',
      'Developed SwiftUI iOS/watchOS apps w/ HealthKit capture, Apple Watch live metrics, Swift Charts analytics, SwiftData persistence, & a source-grounded "why these sets?" view exposing retrieved chunks & constraint effects',
      'Added actor-based networking with token refresh, an offline sync queue that retries pending uploads on reconnect, and secure Keychain token storage',
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
      'Web/API-first Minecraft server management platform — Hono REST API, React dashboard, & Docker/AWS EC2 hosting w/ a Discord companion.',
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
      'Promoting 2,900+ MIPS R3000 functions across PS1 overlays to matching C w/ PSX GCC cross-compilers; 1,100+ fully byte-matched (~13% matched code bytes)',
      'Read GCC 2.7.2 internals (sched.c, emit-rtl.c) to disprove a TU-optimization hypothesis and isolate real blockers (aspsx version mismatch, stabs sizing, dead-code frame inflation)',
      'Built a custom Go build orchestrator over the splat/m2c/asm-differ/maspsx pipeline, plus Python promotion-test & register-allocation diff tooling w/ a batch scanner over hundreds of functions',
      'Enforced binary-identical correctness via 12 SHA-1 checksums — the exact binary match is the test — wired through GitHub Actions CI, w/ a Docker image for reproducible local builds',
      'Classified & fixed thousands of type bugs and pointer casts, normalized symbol names, and held single-line comment coverage across all source files',
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
      end: {
        year: 2026,
        month: 1,
      },
    },
    status: 'paused',
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
    title: 'Memory Management & Threading in C',
    tagline: 'OS simulations for paging, scheduling, and kernel extensions.',
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
      'Page replacement simulator (FIFO/LRU/optimal) with demand paging',
      'Thread scheduler with cooperative & preemptive modes, round‑robin/priority, and mutex sync',
      'Kernel extensions with new syscalls and debugging tools (100% average)',
    ],
    technologies: [
      'c',
      'systems-programming',
      'operating-systems',
      'memory-management',
      'threading',
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
