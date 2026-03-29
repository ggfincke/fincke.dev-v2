// src/content/technologies/registry.ts
// canonical technology registry for runtime content

import type {
  TechnologyCategory,
  TechnologyDefinition,
} from '~/shared/types/technology'

const TECHNOLOGIES = [
  { id: 'actuator', label: 'Actuator', category: 'framework' },
  {
    id: 'anthropic',
    label: 'Anthropic',
    category: 'data',
    aliases: ['Anthropic Claude', 'Anthropic Claude API'],
  },
  { id: 'apscheduler', label: 'APScheduler', category: 'infra' },
  { id: 'aws', label: 'AWS', category: 'infra' },
  { id: 'beautifulsoup', label: 'BeautifulSoup', category: 'data' },
  {
    id: 'branch-prediction',
    label: 'Branch Prediction',
    category: 'platform',
  },
  { id: 'c', label: 'C', category: 'language' },
  { id: 'c-cpp', label: 'C/C++', category: 'language' },
  {
    id: 'cache-hierarchies',
    label: 'Cache Hierarchies',
    category: 'platform',
  },
  { id: 'caching', label: 'Caching', category: 'platform' },
  { id: 'celery', label: 'Celery', category: 'infra' },
  {
    id: 'ci-cd',
    label: 'CI/CD',
    category: 'tooling',
    aliases: ['Continuous Integration', 'Continuous Delivery'],
  },
  { id: 'cli', label: 'CLI', category: 'tooling' },
  { id: 'cloudwatch', label: 'CloudWatch', category: 'infra' },
  { id: 'cnn', label: 'CNN', category: 'data' },
  { id: 'comlink', label: 'Comlink', category: 'framework' },
  { id: 'core-data', label: 'Core Data', category: 'framework' },
  {
    id: 'custom-shapes',
    label: 'Custom Shapes',
    category: 'framework',
  },
  { id: 'data-analysis', label: 'Data Analysis', category: 'data' },
  { id: 'data-pipelines', label: 'Data Pipelines', category: 'data' },
  { id: 'deep-learning', label: 'Deep Learning', category: 'data' },
  { id: 'densenet', label: 'DenseNet', category: 'data' },
  {
    id: 'digital-design',
    label: 'Digital Design',
    category: 'platform',
  },
  { id: 'discord-js', label: 'Discord.js', category: 'framework' },
  { id: 'discord-py', label: 'Discord.py', category: 'framework' },
  { id: 'django', label: 'Django', category: 'framework' },
  {
    id: 'django-rest-framework',
    label: 'Django REST Framework',
    category: 'framework',
  },
  { id: 'docker', label: 'Docker', category: 'infra' },
  {
    id: 'docker-compose',
    label: 'Docker Compose',
    category: 'infra',
  },
  { id: 'docx', label: 'DOCX', category: 'tooling' },
  { id: 'ec2', label: 'EC2', category: 'infra' },
  { id: 'esbuild', label: 'esbuild', category: 'tooling' },
  { id: 'eslint', label: 'ESLint', category: 'tooling' },
  { id: 'ethereum', label: 'Ethereum', category: 'platform' },
  { id: 'fastapi', label: 'FastAPI', category: 'framework' },
  { id: 'figma', label: 'Figma', category: 'tooling' },
  { id: 'flyway', label: 'Flyway', category: 'tooling' },
  { id: 'fpga', label: 'FPGA', category: 'platform' },
  { id: 'gemini', label: 'Gemini', category: 'data' },
  {
    id: 'gesture-handling',
    label: 'Gesture Handling',
    category: 'framework',
  },
  {
    id: 'github-actions',
    label: 'GitHub Actions',
    category: 'tooling',
    aliases: ['CI/CD (GitHub Actions)'],
  },
  { id: 'go', label: 'Go', category: 'language' },
  { id: 'gradle', label: 'Gradle', category: 'tooling' },
  { id: 'h2', label: 'H2', category: 'infra' },
  { id: 'healthkit', label: 'HealthKit', category: 'framework' },
  {
    id: 'huggingface',
    label: 'HuggingFace',
    category: 'data',
    aliases: ['Hugging Face'],
  },
  { id: 'ios', label: 'iOS', category: 'platform' },
  { id: 'java', label: 'Java', category: 'language' },
  { id: 'json', label: 'JSON', category: 'tooling' },
  { id: 'jupyter', label: 'Jupyter', category: 'data' },
  { id: 'jwt', label: 'JWT', category: 'infra' },
  { id: 'katex', label: 'KaTeX', category: 'tooling' },
  { id: 'keras', label: 'Keras', category: 'data' },
  { id: 'latex', label: 'LaTeX', category: 'tooling' },
  { id: 'llm-evaluation', label: 'LLM Evaluation', category: 'data' },
  { id: 'lm-studio', label: 'LM Studio', category: 'data' },
  { id: 'machine-learning', label: 'Machine Learning', category: 'data' },
  { id: 'mapkit', label: 'MapKit', category: 'framework' },
  { id: 'matplotlib', label: 'matplotlib', category: 'data' },
  { id: 'mdx', label: 'MDX', category: 'tooling' },
  {
    id: 'memory-management',
    label: 'Memory Management',
    category: 'platform',
  },
  { id: 'mermaid', label: 'Mermaid', category: 'tooling' },
  { id: 'metamask', label: 'MetaMask', category: 'tooling' },
  { id: 'mistral', label: 'Mistral', category: 'data' },
  { id: 'mvc-mvvm', label: 'MVC/MVVM', category: 'framework' },
  { id: 'networking', label: 'Networking', category: 'platform' },
  { id: 'next-js', label: 'Next.js', category: 'framework' },
  { id: 'node-js', label: 'Node.js', category: 'platform' },
  { id: 'numpy', label: 'NumPy', category: 'data' },
  { id: 'ollama', label: 'Ollama', category: 'data' },
  { id: 'openai', label: 'OpenAI', category: 'data' },
  {
    id: 'operating-systems',
    label: 'Operating Systems',
    category: 'platform',
  },
  { id: 'pandas', label: 'pandas', category: 'data' },
  {
    id: 'performance-analysis',
    label: 'Performance Analysis',
    category: 'platform',
  },
  { id: 'pgvector', label: 'pgvector', category: 'infra' },
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    category: 'infra',
    aliases: ['Postgres'],
  },
  { id: 'prettier', label: 'Prettier', category: 'tooling' },
  { id: 'python', label: 'Python', category: 'language' },
  {
    id: 'random-fourier-features',
    label: 'Random Fourier Features',
    category: 'data',
  },
  { id: 'rcon', label: 'RCON', category: 'infra' },
  { id: 'react', label: 'React', category: 'framework' },
  { id: 'react-router', label: 'React Router', category: 'framework' },
  { id: 'redis', label: 'Redis', category: 'infra' },
  { id: 'resnet', label: 'ResNet', category: 'data' },
  { id: 'rich', label: 'Rich', category: 'tooling' },
  { id: 's3', label: 'S3', category: 'infra' },
  {
    id: 'scikit-learn',
    label: 'scikit-learn',
    category: 'data',
  },
  { id: 'seaborn', label: 'seaborn', category: 'data' },
  { id: 'selenium', label: 'Selenium', category: 'tooling' },
  { id: 'shiki', label: 'Shiki', category: 'tooling' },
  { id: 'simplescalar', label: 'SimpleScalar', category: 'platform' },
  { id: 'solidity', label: 'Solidity', category: 'language' },
  { id: 'spring-batch', label: 'Spring Batch', category: 'infra' },
  { id: 'spring-boot', label: 'Spring Boot', category: 'framework' },
  {
    id: 'spring-data-jpa',
    label: 'Spring Data JPA',
    category: 'framework',
  },
  {
    id: 'spring-security',
    label: 'Spring Security',
    category: 'infra',
  },
  { id: 'sql', label: 'SQL', category: 'language' },
  { id: 'sqlite', label: 'SQLite', category: 'infra' },
  { id: 'ssm', label: 'SSM', category: 'infra' },
  {
    id: 'storage-systems',
    label: 'Storage Systems',
    category: 'platform',
  },
  { id: 'supabase', label: 'Supabase', category: 'infra' },
  { id: 'swift', label: 'Swift', category: 'language' },
  {
    id: 'swift-charts',
    label: 'Swift Charts',
    category: 'framework',
  },
  { id: 'swiftui', label: 'SwiftUI', category: 'framework' },
  {
    id: 'systems-programming',
    label: 'Systems Programming',
    category: 'platform',
  },
  {
    id: 'tailwind-css',
    label: 'Tailwind CSS',
    category: 'framework',
  },
  { id: 'tensorflow', label: 'TensorFlow', category: 'data' },
  { id: 'threading', label: 'Threading', category: 'platform' },
  {
    id: 'transformers',
    label: 'Transformers',
    category: 'data',
    aliases: ['Hugging Face Transformers'],
  },
  { id: 'typer', label: 'Typer', category: 'tooling' },
  { id: 'typescript', label: 'TypeScript', category: 'language' },
  { id: 'typst', label: 'Typst', category: 'tooling' },
  {
    id: 'uikit',
    label: 'UIKit',
    category: 'framework',
  },
  { id: 'verilog', label: 'Verilog', category: 'language' },
  { id: 'vite', label: 'Vite', category: 'tooling' },
  { id: 'vitest', label: 'Vitest', category: 'tooling' },
  {
    id: 'vs-code-extension-api',
    label: 'VS Code Extension API',
    category: 'tooling',
  },
  {
    id: 'watchconnectivity',
    label: 'WatchConnectivity',
    category: 'framework',
  },
  { id: 'watchkit', label: 'WatchKit', category: 'framework' },
  { id: 'watchos', label: 'watchOS', category: 'platform' },
  { id: 'web-scraping', label: 'Web Scraping', category: 'data' },
  { id: 'web3-js', label: 'Web3.js', category: 'framework' },
  { id: 'xcode', label: 'Xcode', category: 'tooling' },
  {
    id: 'xilinx-vivado',
    label: 'Xilinx Vivado',
    category: 'tooling',
  },
] as const satisfies readonly TechnologyDefinition<string>[]

export type TechnologyId = (typeof TECHNOLOGIES)[number]['id']

export const TECHNOLOGY_REGISTRY = Object.freeze(
  Object.fromEntries(
    TECHNOLOGIES.map((technology) => [technology.id, technology])
  ) as Record<TechnologyId, TechnologyDefinition<TechnologyId>>
)

const CATEGORY_COLOR_VAR: Record<TechnologyCategory, string> = {
  language: 'var(--green)',
  framework: 'var(--blue)',
  infra: 'var(--purple)',
  data: 'var(--yellow)',
  tooling: 'var(--orange)',
  platform: 'var(--cyan)',
}

const CATEGORY_BG_VAR: Record<TechnologyCategory, string> = {
  language: 'var(--tech-bg-language)',
  framework: 'var(--tech-bg-framework)',
  infra: 'var(--tech-bg-infra)',
  data: 'var(--tech-bg-data)',
  tooling: 'var(--tech-bg-tooling)',
  platform: 'var(--tech-bg-platform)',
}

function normalizeTechnologyLabel(value: string): string
{
  return value.trim().toLowerCase()
}

const TECHNOLOGY_ID_BY_TERM = Object.freeze(
  TECHNOLOGIES.reduce<Record<string, TechnologyId>>((map, technology) =>
  {
    map[normalizeTechnologyLabel(technology.label)] = technology.id

    const aliases = 'aliases' in technology ? technology.aliases : undefined

    for (const alias of aliases ?? [])
    {
      map[normalizeTechnologyLabel(alias)] = technology.id
    }

    return map
  }, {})
)

export function getTechnology(technologyId: TechnologyId)
{
  return TECHNOLOGY_REGISTRY[technologyId]
}

export function getTechnologyIds(): TechnologyId[]
{
  return TECHNOLOGIES.map((technology) => technology.id)
}

export function getTechnologyTerms(technologyId: TechnologyId): string[]
{
  const technology = getTechnology(technologyId)
  const aliases = 'aliases' in technology ? technology.aliases : undefined

  return [technology.label, ...(aliases ?? [])]
}

export function resolveTechnologyId(value: string): TechnologyId | undefined
{
  return TECHNOLOGY_ID_BY_TERM[normalizeTechnologyLabel(value)]
}

export function getTechnologyColor(technologyId: TechnologyId): string
{
  return CATEGORY_COLOR_VAR[getTechnology(technologyId).category]
}

export function getTechnologyBackgroundColor(
  technologyId: TechnologyId
): string
{
  return CATEGORY_BG_VAR[getTechnology(technologyId).category]
}
