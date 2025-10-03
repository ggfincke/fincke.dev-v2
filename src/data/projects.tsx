// src/data/projects.tsx
// project portfolio data w/ filtering utilities

import type { Project } from '~/types';

import { skillMappings } from './skillMappings';

export const projects: Project[] = [
  {
    title: 'Minecart',
    tagline:
      'Discord bot that boots, monitors, and admins Minecraft servers across Docker & AWS.',
    dateRange: 'Present',
    status: 'live',
    madeFor: 'Personal',
    featured: true,
    bulletPoints: [
      'Manages Minecraft servers across local Docker Compose and AWS EC2 from Discord with safe, idempotent start/stop/restart flows',
      'Provider abstraction via IServerProvider with LocalServerProvider (Docker + RCON) and AwsServiceProvider (EC2 + SSM)',
      'Performance monitoring: CPU/RAM/TPS (Docker + SSM/CloudWatch), health summaries, auto-refreshing embeds, short-term history, and alert thresholds (webhook pending)',
      'Configuration management: edit server.properties, RAM allocation modes with auto-calculation; EC2 type inspect/change with drift detection',
      'Backups & logs: world save + tar.gz backups locally; remote backups and log retrieval via Systems Manager (no SSH)',
      'Robust error handling and busy-locking; clear Discord replies with status and failure modes',
      'ESM TypeScript with modular command routing and documented provider interfaces',
    ],
    technologies: [
      'TypeScript',
      'Node.js',
      'Docker',
      'Docker Compose',
      'RCON',
      'AWS',
      'EC2',
      'SSM',
      'CloudWatch',
      'Discord.js',
    ],
    imagePath: '/assets/projects/images/minecart.png',
    imageAlt: 'Minecart Discord bot screenshot',
  },
  {
    title: 'Hopper',
    tagline:
      'Hybrid microservices inventory system for multi‑marketplace ecommerce.',
    dateRange: 'Sep 2025 – Present',
    status: 'in-development',
    madeFor: 'Personal',
    featured: true,
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
      'Java',
      'Spring Boot',
      'Spring Data JPA',
      'PostgreSQL',
      'Flyway',
      'H2',
      'Spring Security',
      'Spring Batch',
      'Actuator',
      'Gradle',
      'Go',
    ],
    // imagePath: "/assets/projects/images/hopper.png",
    imageAlt: 'Hopper inventory management system screenshot',
    repoUrl: 'https://github.com/ggfincke/hopper',
  },
  {
    title: 'Loom',
    tagline: 'AI résumé‑tailoring CLI that preserves DOCX/LaTeX formatting.',
    dateRange: 'Aug 2025 – Present',
    status: 'live',
    madeFor: 'Personal',
    featured: true,
    bulletPoints: [
      'Typer‑based CLI: tailor, sectionize, generate, apply — plus config and enhanced help/theme tooling',
      'Multi‑provider AI (OpenAI, Anthropic Claude, local Ollama) with clean architecture and pluggable clients',
      'Structured JSON edit ops on line‑numbered text (replace_line, replace_range, insert_after, delete_range)',
      'Format‑preserving pipeline for DOCX and LaTeX with deterministic error handling and review/apply flows',
    ],
    technologies: [
      'Python',
      'Typer',
      'OpenAI',
      'Anthropic Claude',
      'Ollama',
      'DOCX',
      'LaTeX',
      'JSON',
      'CLI',
    ],
    imagePath: '/assets/projects/images/loom.png',
    imageAlt: 'Loom app screenshot',
    repoUrl: 'https://github.com/ggfincke/loom',
  },
  {
    title: 'TrackBasket',
    tagline:
      'AI‑assisted price tracking for 30k+ products across major retailers.',
    dateRange: 'May 2025 - Present',
    status: 'live',
    madeFor: 'Bolt Hackathon',
    featured: true,
    bulletPoints: [
      'Chat‑to‑basket turns natural language into structured baskets using Supabase and OpenAI',
      'Advanced crawling with CAPTCHA handling, anti‑bot countermeasures, normalization, and real‑time updates',
      'Backend: Edge Functions, PostgreSQL fuzzy search, UPC matching, and event‑driven notifications',
      'AI‑powered matching with intelligent alternatives and cross‑retailer price correlation via UPC',
      'Granular alerts for price drops, availability changes, and product updates; collaborative basket management',
      'Responsive UI with price history charts and recommendations',
    ],
    imagePath: '/assets/projects/images/trackbasket.png',
    imageAlt: 'TrackBasket app screenshot',
    technologies: [
      'Typescript',
      'Python',
      'Supabase',
      'Next.js',
      'React',
      'OpenAI',
      'PostgreSQL',
      'Docker',
      'Swift',
    ],
    repoUrl: 'https://github.com/ggfincke/BoltHackathon',
    liveUrl: 'https://bolt-hackathon-five.vercel.app',
  },
  {
    title: 'SwimMate',
    tagline:
      'Native iOS/watchOS swim tracker with Apple Watch metrics and Swift Charts.',
    dateRange: 'Feb 2024 - Jun 2024, May 2025 - Present',
    status: 'in-development',
    madeFor: 'Penn State',
    featured: true,
    bulletPoints: [
      'Comprehensive swimming app to track, plan, and save workouts with history and progress visualization',
      'HealthKit + SwiftUI components for workout entry, lap timing, and analytics with Swift Charts',
      'Apple Watch companion: real‑time metrics (pace, heart rate, laps, SWOLF, calories) and workout handoff',
      'Goal‑based workouts (distance, time, calories) with real‑time feedback; pool & open‑water with GPS',
      'Achieved 100% on original submission for CMPSC 475',
    ],
    imagePath: '/assets/projects/images/swimmate.png',
    imageAlt: 'SwimMate app screenshot',
    technologies: [
      'Swift',
      'SwiftUI',
      'HealthKit',
      'WatchKit',
      'watchOS',
      'Swift Charts',
      'WatchConnectivity',
    ],
    repoUrl: 'https://github.com/ggfincke/SwimMate',
  },
  {
    title: 'Portfolio Website',
    tagline: "The site you're on: fast, accessible, and CI‑driven.",
    dateRange: 'Mar 2025 - Present',
    status: 'live',
    madeFor: 'Personal',
    featured: true,
    bulletPoints: [
      'Next.js + TypeScript + Tailwind; responsive UI with subtle motion',
      'Custom component system, accessibility and performance‑first design',
      'CI/CD with Vercel deploys, Lighthouse CI checks, and automated prereleases/tags',
    ],
    imagePath: '/assets/projects/images/portfolio.png',
    imageAlt: 'Portfolio website screenshot',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'GitHub Actions',
      'CI/CD',
      'Figma',
    ],
    repoUrl: 'https://github.com/ggfincke/fincke.dev',
    liveUrl: 'https://fincke.dev',
  },
  {
    title: 'InStock',
    tagline: 'High‑frequency stock & price tracker; precursor to TrackBasket.',
    dateRange: 'Dec 2024 - Mar 2025',
    status: 'paused',
    madeFor: 'Personal',
    bulletPoints: [
      'Optimized detection for restocks and price changes on high‑velocity products',
      'Django + PostgreSQL core with Redis/Celery microservices and Selenium scraping',
      'REST API for React/Swift clients; Discord notifications via Discord.py',
    ],
    technologies: [
      'Python',
      'Django',
      'PostgreSQL',
      'Selenium',
      'Redis',
      'Celery',
      'React',
      'Swift',
      'Discord.py',
    ],
    repoUrl: 'https://github.com/ggfincke/instock',
  },
  {
    title: 'Computer Architecture Projects',
    tagline:
      'Cache/memory exploration and branch‑prediction analysis on SimpleScalar.',
    dateRange: 'Sep 2024 – Dec 2024',
    status: 'complete',
    madeFor: 'Penn State',
    bulletPoints: [
      'Framework to explore multi‑dimensional cache/memory configs with automated validation and evaluation across benchmarks',
      'Branch predictors: static, 1‑bit/2‑bit, bimodal, gshare, and hybrid with chooser; accuracy and misprediction analysis',
      'Detailed reports with quantitative trade‑offs and recommendations',
    ],
    technologies: [
      'C/C++',
      'SimpleScalar',
      'Python',
      'Cache Hierarchies',
      'Branch Prediction',
      'Performance Analysis',
    ],
    repoUrl: 'https://github.com/ggfincke/CMPEN431_projects',
  },
  {
    title: 'BetterBettor',
    tagline: 'Decentralized sports betting dApp on Ethereum.',
    dateRange: 'Mar 2024 - May 2024',
    status: 'complete',
    madeFor: 'Penn State',
    bulletPoints: [
      'Solidity smart contracts with automated payouts and odds; MetaMask wallet integration',
      'Modern Next.js/React front‑end with real‑time betting UX',
    ],
    technologies: [
      'Solidity',
      'Next.js',
      'Ethereum',
      'Web3.js',
      'MetaMask',
      'React',
    ],
    repoUrl: 'https://github.com/ggfincke/betterbettor',
  },
  {
    title: 'Memory Management & Threading in C',
    tagline: 'OS simulations for paging, scheduling, and kernel extensions.',
    collaborators: [{ name: 'Avanish Grampurohit' }],
    dateRange: 'Sep 2023 - Dec 2023',
    status: 'complete',
    madeFor: 'Penn State',
    bulletPoints: [
      'Page replacement simulator (FIFO/LRU/optimal) with demand paging',
      'Thread scheduler with cooperative & preemptive modes, round‑robin/priority, and mutex sync',
      'Kernel extensions with new syscalls and debugging tools (100% average)',
    ],
    technologies: [
      'C',
      'Systems Programming',
      'Operating Systems',
      'Memory Management',
      'Threading',
    ],
    repoUrl: 'https://github.com/ggfincke/CMPSC473_projects',
  },
  {
    title: 'JBOD Storage System with Caching & Network Communication',
    tagline: 'Block‑level JBOD with LFU cache and TCP client/server.',
    dateRange: 'Sep 2022 - Dec 2022',
    status: 'complete',
    madeFor: 'Penn State',
    bulletPoints: [
      'Complete JBOD storage across multiple disks with LFU caching',
      'TCP/IP client‑server architecture and robust protocol handling',
      'Full testing and integration verification (100% scores)',
    ],
    technologies: [
      'C',
      'Systems Programming',
      'Storage Systems',
      'Networking',
      'Caching',
    ],
    repoUrl: 'https://github.com/ggfincke/CMPSC311_projects',
  },
  {
    title: 'COVID-19 Case Surveillance Analysis',
    tagline: 'Large‑scale public health data exploration in Python.',
    collaborators: [{ name: 'Edwin Clatus' }, { name: 'Sahit Botta' }],
    dateRange: 'May 2024 - Aug 2024',
    status: 'complete',
    madeFor: 'Penn State',
    bulletPoints: [
      'End‑to‑end data science with pandas/NumPy/sklearn; multiple ML models (linear/logistic regression, SVM, KNN, trees)',
      'Final surveillance analysis project with comprehensive preprocessing, visualization, and 100% score',
    ],
    technologies: [
      'Python',
      'Machine Learning',
      'pandas',
      'NumPy',
      'scikit-learn',
      'matplotlib',
      'seaborn',
      'Jupyter',
    ],
    repoUrl: 'https://github.com/ggfincke/STAT319',
  },
  {
    title: 'TCGhub',
    tagline: 'TCGplayer‑style marketplace clone with hand‑rolled SQL.',
    collaborators: [{ name: 'Yash Tumuluri' }],
    dateRange: 'Sep 2024 - Dec 2024',
    status: 'complete',
    madeFor: 'Penn State',
    featured: true,
    bulletPoints: [
      'React marketplace with live data integration and custom SQLite schema in BCNF',
      'Hand‑written SQL queries, filtering/search for sets & rarities, responsive UI (scored >100%)',
    ],
    imagePath: '/assets/projects/images/tcghub2.png',
    imageAlt: 'TCGhub app screenshot',
    technologies: ['React', 'SQL', 'Python', 'SQLite', 'Node.js'],
    repoUrl: 'https://github.com/ggfincke/TCGhub',
  },
  {
    title: 'OPTIMUS',
    tagline: 'Fine‑tuned Discord chatbot based on Microsoft GODEL‑v1.1.',
    dateRange: 'Feb 2024 - Apr 2024',
    status: 'complete',
    madeFor: 'Personal',
    bulletPoints: [
      'Local inference with a custom‑trained seq2seq model (HuggingFace Transformers)',
      'Rich Discord interactions, emote reactions, user triggers, and mode controls',
    ],
    technologies: [
      'Python',
      'Transformers',
      'Discord.py',
      'HuggingFace',
      'APScheduler',
    ],
    repoUrl: 'https://github.com/ggfincke/OPTIMUS',
  },
  {
    title: 'MIPS Processor',
    tagline: 'Single‑cycle 32‑bit MIPS in Verilog with modular design.',
    collaborators: [{ name: 'Avanish Grampurohit' }],
    dateRange: 'Mar 2023 - May 2023',
    status: 'complete',
    madeFor: 'Penn State',
    bulletPoints: [
      'Full instruction set (arith/logic/memory/branch/jump) with Harvard organization',
      'Modular ALU, control, register file, and memory; comprehensive test coverage (100%)',
    ],
    technologies: ['Verilog', 'FPGA', 'Digital Design', 'Xilinx Vivado'],
    repoUrl: 'https://github.com/ggfincke/CMPEN331_final_project',
  },
  {
    title: 'Traditional Machine Learning Methods Exploration for MNIST',
    tagline: 'Classical ML baselines for MNIST with KNN/LR/SVM.',
    dateRange: 'Sep 2024 - Oct 2024',
    status: 'complete',
    madeFor: 'Penn State',
    bulletPoints: [
      'KNN 94.4%, Logistic Regression 91.1%, SVM (RBF) 95.3% on a 10k‑image subset; precision/recall/F1 with confusion matrices',
      'Preprocessing: normalization to [0,1], 784‑D flattening, stratified train/test; K‑Means + PCA for unsupervised analysis (100% grade)',
    ],
    imagePath: '/assets/projects/images/452midterm.png',
    imageAlt: 'MATH 452 Midterm Report screenshot',
    technologies: [
      'Python',
      'scikit-learn',
      'NumPy',
      'pandas',
      'matplotlib',
      'seaborn',
      'Machine Learning',
      'LaTeX',
    ],
    repoUrl: 'https://github.com/ggfincke/MATH452_projects',
    liveUrl: '/assets/projects/documents/MATH_452_Midterm_Report.pdf',
  },
  {
    title: 'Deep Learning Architecture Comparison & Analysis for CIFAR-10',
    tagline: 'DenseNet121 vs CNN/ResNet50/RFM on CIFAR‑10.',
    collaborators: [
      { name: 'Jacob Goulet' },
      { name: 'Tyler Rossi' },
      { name: 'Diego Bueno' },
      { name: 'Javier Pozo Miranda' },
      { name: 'Duong Bao' },
    ],
    dateRange: 'Nov 2024 – Dec 2024',
    status: 'complete',
    madeFor: 'Penn State',
    bulletPoints: [
      'DenseNet121 topped at 74% test accuracy vs CNN 69%, RFM 51.6%, ResNet50 47%',
      'Documented optimization challenges, loss/accuracy curves, and future work; full metric suite and confusion matrices',
    ],
    imagePath: '/assets/projects/images/452final.png',
    imageAlt: 'MATH 452 Final Report screenshot',
    technologies: [
      'Python',
      'TensorFlow',
      'Keras',
      'NumPy',
      'pandas',
      'matplotlib',
      'seaborn',
      'scikit-learn',
      'Deep Learning',
      'CNN',
      'ResNet',
      'DenseNet',
      'LaTeX',
      'Random Fourier Features',
    ],
    repoUrl: 'https://github.com/ggfincke/MATH452_projects',
    liveUrl: '/assets/projects/documents/MATH_452_-_Final_Report.pdf',
  },
  {
    title: 'USBAP',
    tagline: 'Sports‑betting data scraper for analysis and arbitrage research.',
    collaborators: [{ name: 'Yugal Kithany' }, { name: 'Kyle Lynch' }],
    dateRange: 'May 2023 - Jun 2023',
    status: 'experimental',
    madeFor: 'Personal',
    bulletPoints: [
      'Scrapes DraftKings/FanDuel markets (moneyline/spreads/totals) and normalizes for downstream analytics',
      'Foundational tooling for betting analytics and opportunity detection',
    ],
    technologies: ['Python', 'Web Scraping', 'Data Analysis', 'BeautifulSoup'],
    repoUrl: 'https://github.com/ggfincke/USBAP',
  },
  {
    title: 'iOS Application Development Projects',
    tagline:
      'Five Swift/SwiftUI projects spanning maps, puzzles, and data‑driven apps.',
    collaborators: [{ name: 'Ashley Amendola' }],
    dateRange: 'Jan 2024 - Mar 2024',
    status: 'complete',
    madeFor: 'Penn State',
    bulletPoints: [
      'LionSpell word game, Pentominoes with drag/3D rotation, and campus map apps (SwiftUI Map + UIKit MKMapView)',
      'Pokédex with type filtering and persistence; 98% average across projects',
    ],
    technologies: [
      'Swift',
      'SwiftUI',
      'UIKit',
      'MapKit',
      'Core Data',
      'JSON',
      'Custom Shapes',
      'Gesture Handling',
      'MVC/MVVM',
      'Xcode',
    ],
  },
];

// get featured projects only
// prettier-ignore
export const getFeaturedProjects = (): Project[] =>
{
  return projects.filter(project => project.featured);
};

// get all projects
// prettier-ignore
export const getAllProjects = (): Project[] =>
{
  return projects;
};

// * get projects filtered by skill/technology
// prettier-ignore
export const getProjectsBySkill = (skillName: string): Project[] =>
{
  // normalize skill name for comparison
  const normalizedSkill = skillName.toLowerCase();

  // get exact matches for this skill using imported mappings
  const skillSearchTerms = skillMappings[normalizedSkill] || [normalizedSkill];

  return projects.filter(project =>
  {
    // check if any project technologies match search terms
    return project.technologies.some((tech: string) =>
    {
      const normalizedTech = tech.toLowerCase();
      return skillSearchTerms.includes(normalizedTech);
    });
  });
};
