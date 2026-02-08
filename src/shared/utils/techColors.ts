// src/shared/utils/techColors.ts
// color mapping for technology pills based on Material Theme Ocean HC

export type TechCategory =
  | 'language'
  | 'framework'
  | 'infra'
  | 'data'
  | 'tooling'
  | 'platform';

interface TechColorMap {
  [key: string]: TechCategory;
}

const TECH_COLOR_MAP: TechColorMap = {
  // Languages
  Python: 'language',
  TypeScript: 'language',
  JavaScript: 'language',
  Swift: 'language',
  Java: 'language',
  Go: 'language',
  C: 'language',
  'C/C++': 'language',
  Solidity: 'language',
  Verilog: 'language',
  SQL: 'language',

  // Frameworks & runtime libraries
  React: 'framework',
  'Next.js': 'framework',
  'Tailwind CSS': 'framework',
  Django: 'framework',
  'Django REST Framework': 'framework',
  'React Router': 'framework',

  'Spring Boot': 'framework',
  'Spring Data JPA': 'framework',
  Actuator: 'framework',

  SwiftUI: 'framework',
  UIKit: 'framework',
  MapKit: 'framework',
  'Core Data': 'framework',
  'Swift Charts': 'framework',
  WatchConnectivity: 'framework',
  HealthKit: 'framework',
  WatchKit: 'framework',

  Comlink: 'framework',
  'Discord.js': 'framework',
  'Discord.py': 'framework',

  'Web3.js': 'framework',

  'Custom Shapes': 'framework',
  'Gesture Handling': 'framework',
  'MVC/MVVM': 'framework',

  // Tooling (dev/build/test/docs/render/IDE)
  Vite: 'tooling',
  esbuild: 'tooling',
  Vitest: 'tooling',
  'VS Code Extension API': 'tooling',
  CLI: 'tooling',
  minimatch: 'tooling',
  ESLint: 'tooling',
  Prettier: 'tooling',
  Mocha: 'tooling',
  Selenium: 'tooling',
  Gradle: 'tooling',
  Flyway: 'tooling',
  'GitHub Actions': 'tooling',
  'CI/CD': 'tooling',
  Figma: 'tooling',
  Xcode: 'tooling',

  MDX: 'tooling',
  Shiki: 'tooling',
  KaTeX: 'tooling',
  Mermaid: 'tooling',

  Typer: 'tooling',
  Rich: 'tooling',

  DOCX: 'tooling',
  LaTeX: 'tooling',
  Typst: 'tooling',
  JSON: 'tooling',
  'Technical Writing': 'tooling',

  MetaMask: 'tooling',
  'Xilinx Vivado': 'tooling',

  // Infra (cloud/db/containers/server-side components)
  Docker: 'infra',
  'Docker Compose': 'infra',

  AWS: 'infra',
  EC2: 'infra',
  SSM: 'infra',
  CloudWatch: 'infra',
  S3: 'infra',
  Supabase: 'infra',

  PostgreSQL: 'infra',
  pgvector: 'infra',
  SQLite: 'infra',
  Redis: 'infra',
  H2: 'infra',

  Celery: 'infra',
  APScheduler: 'infra',
  'Spring Batch': 'infra',
  'Spring Security': 'infra',
  JWT: 'infra',
  RCON: 'infra',

  // Platform (OS/runtime/platforms + systems fundamentals + hardware platforms)
  iOS: 'platform',
  watchOS: 'platform',
  'Node.js': 'platform',

  Ethereum: 'platform',

  FPGA: 'platform',

  'Systems Programming': 'platform',
  'Operating Systems': 'platform',
  'Memory Management': 'platform',
  Threading: 'platform',
  'Storage Systems': 'platform',
  Networking: 'platform',
  Caching: 'platform',
  'Cache Hierarchies': 'platform',
  'Branch Prediction': 'platform',
  'Digital Design': 'platform',
  SimpleScalar: 'platform',
  'Performance Analysis': 'platform',

  // Data / AI / ML
  'Machine Learning': 'data',
  'Deep Learning': 'data',
  'LLM Evaluation': 'data',
  'Data Pipelines': 'data',
  'Data Analysis': 'data',
  'Web Scraping': 'data',

  OpenAI: 'data',
  Anthropic: 'data',
  'Anthropic Claude': 'data',
  Gemini: 'data',
  Mistral: 'data',
  Codex: 'data',
  HumanEval: 'data',

  'LM Studio': 'data',
  Ollama: 'data',

  NumPy: 'data',
  pandas: 'data',
  matplotlib: 'data',
  seaborn: 'data',
  'scikit-learn': 'data',
  TensorFlow: 'data',
  Keras: 'data',
  Jupyter: 'data',
  Transformers: 'data',
  HuggingFace: 'data',
  BeautifulSoup: 'data',

  CNN: 'data',
  ResNet: 'data',
  DenseNet: 'data',
  'Random Fourier Features': 'data',
  'Statistical Methods': 'data',
};

function normalizeTech(tech: string): string {
  return tech.trim().toLowerCase();
}

const NORMALIZED_TECH_MAP: TechColorMap = Object.fromEntries(
  Object.entries(TECH_COLOR_MAP).map(([key, value]) => [
    normalizeTech(key),
    value,
  ])
);

const CATEGORY_COLOR_VAR: Record<TechCategory, string> = {
  language: 'var(--green)',
  framework: 'var(--blue)',
  infra: 'var(--purple)',
  data: 'var(--yellow)',
  tooling: 'var(--orange)',
  platform: 'var(--cyan)',
};

const CATEGORY_BG: Record<TechCategory, string> = {
  language: 'rgba(195, 232, 141, 0.15)',
  framework: 'rgba(130, 170, 255, 0.15)',
  infra: 'rgba(199, 146, 234, 0.15)',
  data: 'rgba(255, 203, 107, 0.15)',
  tooling: 'rgba(247, 140, 108, 0.15)',
  platform: 'rgba(137, 221, 255, 0.15)',
};

export function getTechColor(tech: string): string {
  const category = NORMALIZED_TECH_MAP[normalizeTech(tech)];
  if (!category) return 'var(--muted)';
  return CATEGORY_COLOR_VAR[category] ?? 'var(--muted)';
}

export function getTechBgColor(tech: string): string {
  const category = NORMALIZED_TECH_MAP[normalizeTech(tech)];
  if (!category) return 'var(--card)';
  return CATEGORY_BG[category] ?? 'var(--card)';
}
