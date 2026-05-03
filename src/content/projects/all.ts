// src/content/projects/all.ts
// project portfolio data

import type { Project } from '~/shared/types'

export const projects: Project[] = [
  {
    id: 'tierlistbuilder',
    title: 'Tier List Builder',
    tagline:
      'Local-first browser tier list builder w/ snapshot-based drag preview, multi-board workspace, & 7-format export pipeline.',
    period: {
      start: {
        year: 2026,
        month: 3,
      },
      isCurrent: true,
    },
    status: 'live',
    madeFor: 'Personal',
    bulletPoints: [
      'Built snapshot-based drag-and-drop on @dnd-kit w/ bulk multi-drag, fan-out FLIP animation, and a 3-state keyboard controller (browse, pickup, drag) for full keyboard interaction',
      'Shipped multi-board workspace with autosave, labeled undo/redo with toast feedback, content-addressed IndexedDB image blobs, and storage-quota-aware resilience',
      'Implemented 7-format export pipeline (PNG/JPEG/WebP/PDF/JSON/ZIP/clipboard) via off-screen render host, pako-compressed hash-fragment share links, and a read-only embed route',
      'Added inline annotation editor, per-board aspect-ratio picker with auto-crop & shadow trim, image editor (crop/rotate/zoom), and token-driven theming (8 themes + 5 text styles) with a full color-wheel picker',
      'Organized as a 3-layer (app/features/shared) architecture with a @tierlistbuilder/contracts workspace package, Zustand stores, Vitest + Playwright tests, and Cloudflare Workers PWA delivery',
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
      '3,500+ installs; Live MDX preview extension with dual-mode rendering and framework-aware component shims.',
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
      tier: 'default',
      order: 1,
    },
    bulletPoints: [
      'Built the VS Code extension as a 5-package npm-workspace monorepo with dual-mode rendering (Safe HTML / Trusted JS), workspace-trust gating, dynamic CSP generation, and path-traversal prevention',
      'Extracted mdx-forge as a standalone MIT-licensed npm runtime toolkit (separate repo, independent release cycle) with three subpath exports: compiler (compileSafe/compileTrusted), browser (module loader, LRU registry, evaluation), and components (framework shims + registry metadata)',
      "Wired framework auto-detection for Docusaurus, Starlight, Nextra, and Next.js — the extension reads package.json and resolves imports (e.g. @theme/Tabs) through mdx-forge's component registry via a 4-script codegen pipeline that generates shim barrels and preload entries",
      'Integrated Tailwind v4 compilation, Sass transpilation, Shiki syntax highlighting, KaTeX math, and Mermaid / Graphviz / PlantUML diagrams in the webview, with 15+ preview themes and source-line hover highlighting',
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
    },
    status: 'complete',
    madeFor: 'Personal',
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
      isCurrent: true,
    },
    status: 'paused',
    madeFor: 'Personal',
    bulletPoints: [
      'Built rule engine with first-match-wins evaluation, overlap detection, and mode bundles for predictable, reusable automation',
      'Implemented 15+ action types (themes, panels, layout, notifications, tasks/commands, profiles) and 17+ condition types (file patterns, language, debug/test state, Git branch, time of day, diagnostics)',
      'Added diagnostics tooling to lint and test rules, explain the active rule, and surface overlap warnings with analytics/history',
      'Ensured safe, reversible changes by applying all actions through VS Code APIs with optional safe mode',
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
      order: 2,
    },
    bulletPoints: [
      'Built Django REST API with JWT auth, OpenAPI docs, and PostgreSQL + pgvector for semantic search and workout library retrieval',
      'Implemented RAG-based workout generation using embeddings and LLM calls to personalize plans and surface curated sets',
      'Developed SwiftUI iOS/watchOS apps with HealthKit workout capture, Apple Watch live metrics, and Swift Charts analytics',
      'Added actor-based networking with token refresh, background sync, and offline-first workout tracking with secure Keychain storage',
      'Created structured workout builder and paginated swim set library with iOS-to-watch sync via WatchConnectivity',
    ],
    technologies: [
      'swift',
      'swiftui',
      'watchos',
      'healthkit',
      'watchconnectivity',
      'swift-charts',
      'django',
      'django-rest-framework',
      'postgresql',
      'pgvector',
      'openai',
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
    bulletPoints: [
      'Complete redesign with Vite 7 + React 19 + TypeScript + Tailwind CSS 4.0 for pure client‑side architecture',
      'Section‑based organization: each feature isolated with its own components, content, and utilities for maximum modularity',
      'Content‑driven development: strict separation of data from presentation; content lives in dedicated files, components focus on rendering',
      'Material Theme Ocean HC color system with semantic technology categorization (100+ techs mapped)',
      'Staggered slide‑in animations with full prefers‑reduced‑motion accessibility support',
      'Type‑safe routing with React Router 7 and centralized type definitions with barrel exports',
    ],
    technologies: [
      'react',
      'typescript',
      'vite',
      'tailwind-css',
      'react-router',
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
      'Discord bot for managing Minecraft servers across local Docker and AWS EC2 with multi-tenant support.',
    period: {
      start: {
        year: 2025,
        month: 9,
      },
      isCurrent: true,
    },
    status: 'live',
    madeFor: 'Personal',
    feature: {
      tier: 'wide',
      order: 3,
    },
    bulletPoints: [
      'Built interactive Discord dashboards (buttons, modals, select menus) for status, start/stop/restart, logs, backups, and configuration',
      'Implemented provider abstraction for local Docker and AWS EC2 with runtime switching, health checks, and live status via RCON and mcstatus.io',
      'Added scheduling and automation for idle shutdown, scheduled start/stop windows, crash recovery, and automated backups with retention',
      'Shipped multi-tenant controls: multi-server registration, role-based permissions (view/operate/admin/owner), channel bindings, and guild defaults',
      'Delivered world and content management (multiple worlds, staging worlds, blue-green cutovers, Modrinth mods, resource packs, version switching)',
      'Added monitoring and governance: performance metrics, audit logs, maintenance mode, usage metering/quotas, and optional S3 storage',
    ],
    technologies: [
      'typescript',
      'node-js',
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
      isCurrent: true,
    },
    status: 'paused',
    madeFor: 'Personal',
    bulletPoints: [
      'Orchestrates products, listings, orders, and fees across marketplaces with Java/Spring Boot core and a Go connector service',
      'JWT auth with access/refresh tokens, role‑based authorization (ADMIN/USER/API CLIENT), secure rotation, and Spring Security guards',
      'AES‑GCM‑256 credential encryption with PBKDF2 key derivation and versioned encryption metadata for rotation',
      'Normalized PostgreSQL schema (13 Flyway migrations), foreign keys, composite uniques, and performance indexes',
      'Order state machine (pending→confirmed→paid→processing→shipped→delivered) with business rules and stock management',
      'Spring Batch background jobs for order import & synchronization via MarketplaceClient abstraction',
      'OpenAPI 3.1 spec for the Go connector (idempotency, error taxonomy) and Bruno/CI collections for contract tests',
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
      'go',
    ],
    repoUrl: 'https://github.com/ggfincke/hopper',
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
    bulletPoints: [
      'Built Typer-based command suite (sectionize, tailor, generate, apply) with configurable defaults and themed help UI',
      'Implemented structured JSON edit pipeline with interactive diff resolution, risk/on-error policies, and format-preserving DOCX/LaTeX/Typst handling',
      'Integrated multi-provider AI (OpenAI, Anthropic, Gemini, Mistral, Ollama, LM Studio) with model selection and response caching',
      'Added snapshot-based version management with restore and comparison tooling for safe iteration',
      'Shipped ATS compatibility checks, bulk job processing with comparison matrices, and exports to txt/pdf/html',
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
    id: 'trackbasket',
    title: 'TrackBasket',
    tagline: 'AI‑assisted price tracking for 30k+ products across retailers.',
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
    bulletPoints: [
      'Chat‑to‑basket turns natural language into structured baskets using Supabase and OpenAI',
      'Advanced crawling with CAPTCHA handling, anti‑bot countermeasures, normalization, and real‑time updates',
      'Backend: Edge Functions, PostgreSQL fuzzy search, UPC matching, and event‑driven notifications',
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
      'docker',
      'swift',
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
    bulletPoints: [
      'Next.js + TypeScript + Tailwind; responsive UI with subtle motion',
      'Custom component system, accessibility and performance‑first design',
      'CI/CD with Vercel deploys, Lighthouse CI checks, and automated prereleases/tags',
      "Retired in favor of v2's simpler, client-side architecture",
    ],
    technologies: [
      'next-js',
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
    tagline: 'High‑frequency stock & price tracker; precursor to TrackBasket.',
    period: {
      start: {
        year: 2024,
        month: 12,
      },
      end: {
        year: 2025,
        month: 3,
      },
    },
    status: 'complete',
    madeFor: 'Personal',
    bulletPoints: [
      'Optimized detection for restocks and price changes on high‑velocity products',
      'Django + PostgreSQL core with Redis/Celery microservices and Selenium scraping',
      'REST API for React/Swift clients; Discord notifications via Discord.py',
    ],
    technologies: [
      'python',
      'django',
      'postgresql',
      'selenium',
      'redis',
      'celery',
      'react',
      'swift',
      'discord-py',
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
    bulletPoints: [
      'React marketplace with live data integration and custom SQLite schema in BCNF',
      'Hand‑written SQL queries, filtering/search for sets & rarities, responsive UI (scored >100%)',
    ],
    technologies: ['react', 'sql', 'python', 'sqlite', 'node-js'],
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
    bulletPoints: [
      'Comprehensive swimming app to track, plan, and save workouts with history and progress visualization',
      'HealthKit + SwiftUI components for workout entry, lap timing, and analytics with Swift Charts',
      'Apple Watch companion: real‑time metrics (pace, heart rate, laps, SWOLF, calories) and workout handoff',
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
    bulletPoints: [
      'Local inference with a custom‑trained seq2seq model (HuggingFace Transformers)',
      'Rich Discord interactions, emote reactions, user triggers, and mode controls',
    ],
    technologies: [
      'python',
      'transformers',
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
    tagline: 'Sports‑betting data scraper for analysis and arbitrage research.',
    period: {
      start: {
        year: 2023,
        month: 5,
      },
      end: {
        year: 2023,
        month: 6,
      },
    },
    status: 'experimental',
    madeFor: 'Personal',
    bulletPoints: [
      'Scrapes DraftKings/FanDuel markets (moneyline/spreads/totals) and normalizes for downstream analytics',
      'Foundational tooling for betting analytics and opportunity detection',
    ],
    technologies: ['python', 'web-scraping', 'data-analysis', 'beautifulsoup'],
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
]
