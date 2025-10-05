// src/shared/utils/techColors.ts
// color mapping for technology pills based on Material Theme Ocean HC

export type TechCategory = 'language' | 'framework' | 'backend' | 'ai';

interface TechColorMap {
  [key: string]: TechCategory;
}

// mapping of technologies to their semantic categories
const TECH_COLOR_MAP: TechColorMap = {
  // ========================================
  // LANGUAGES (green) - Programming Languages
  // ========================================
  Python: 'language',
  TypeScript: 'language',
  JavaScript: 'language',
  Swift: 'language',
  Java: 'language',
  Go: 'language',
  Typescript: 'language',
  C: 'language',
  'C/C++': 'language',
  Solidity: 'language',
  Verilog: 'language',
  SQL: 'language',

  // ========================================
  // FRAMEWORKS/LIBRARIES (blue) - UI, Data, APIs
  // ========================================
  // Web Frameworks
  React: 'framework',
  'Next.js': 'framework',
  'Tailwind CSS': 'framework',
  Django: 'framework',

  // Python Libraries
  Typer: 'framework',
  pandas: 'framework',
  matplotlib: 'framework',
  seaborn: 'framework',
  Transformers: 'framework',
  HuggingFace: 'framework',
  BeautifulSoup: 'framework',
  APScheduler: 'framework',

  // Java/Spring
  'Spring Boot': 'framework',
  'Spring Data JPA': 'framework',

  // iOS/Apple
  SwiftUI: 'framework',
  UIKit: 'framework',
  MapKit: 'framework',
  'Core Data': 'framework',
  'Swift Charts': 'framework',
  WatchConnectivity: 'framework',
  iOS: 'framework',

  // Discord/Chat
  'Discord.js': 'framework',
  'Discord.py': 'framework',

  // Blockchain/Web3
  'Web3.js': 'framework',
  MetaMask: 'framework',

  // AI/ML Libraries
  Ollama: 'framework',

  // ========================================
  // BACKEND/INFRASTRUCTURE (purple) - DevOps, DBs, Tools
  // ========================================
  // Containers & Orchestration
  Docker: 'backend',
  'Docker Compose': 'backend',

  // Cloud Providers
  AWS: 'backend',
  EC2: 'backend',
  SSM: 'backend',
  CloudWatch: 'backend',
  Supabase: 'backend',

  // Databases
  PostgreSQL: 'backend',
  SQLite: 'backend',
  Redis: 'backend',
  H2: 'backend',

  // Database Tools
  Flyway: 'backend',

  // CI/CD & DevOps
  'GitHub Actions': 'backend',
  'CI/CD': 'backend',

  // Testing & Automation
  Selenium: 'backend',
  Celery: 'backend',

  // Java/Spring Infrastructure
  'Spring Security': 'backend',
  'Spring Batch': 'backend',
  Actuator: 'backend',
  Gradle: 'backend',

  // Protocols & APIs
  RCON: 'backend',

  // Development Tools
  CLI: 'backend',
  Figma: 'backend',
  Xcode: 'backend',

  // Hardware/FPGA
  FPGA: 'backend',
  'Xilinx Vivado': 'backend',

  // Apple Platforms
  HealthKit: 'backend',
  WatchKit: 'backend',
  watchOS: 'backend',

  // Blockchain
  Ethereum: 'backend',

  // Runtime Environments
  'Node.js': 'backend',

  // ========================================
  // AI/DATA/ACADEMIC (yellow) - ML, Data Science, Research
  // ========================================
  // AI/ML Services
  'LLM Evaluation': 'ai',
  'Data Pipelines': 'ai',
  'Anthropic Claude': 'ai',
  OpenAI: 'ai',
  'Machine Learning': 'ai',
  'Deep Learning': 'ai',

  // Data Science Libraries
  NumPy: 'ai',
  'scikit-learn': 'ai',
  TensorFlow: 'ai',
  Keras: 'ai',
  Jupyter: 'ai',

  // ML Models & Architectures
  CNN: 'ai',
  ResNet: 'ai',
  DenseNet: 'ai',
  'Random Fourier Features': 'ai',

  // Research & Documentation
  'Technical Writing': 'ai',
  Codex: 'ai',
  HumanEval: 'ai',
  'Statistical Methods': 'ai',

  // Data Formats & Processing
  DOCX: 'ai',
  LaTeX: 'ai',
  JSON: 'ai',

  // Analysis & Methodologies
  'Web Scraping': 'ai',
  'Data Analysis': 'ai',
  'Performance Analysis': 'ai',

  // Academic Concepts
  'Systems Programming': 'ai',
  'Operating Systems': 'ai',
  'Memory Management': 'ai',
  Threading: 'ai',
  'Storage Systems': 'ai',
  Networking: 'ai',
  Caching: 'ai',
  'Cache Hierarchies': 'ai',
  'Branch Prediction': 'ai',
  'Digital Design': 'ai',
  SimpleScalar: 'ai',
  'Custom Shapes': 'ai',
  'Gesture Handling': 'ai',
  'MVC/MVVM': 'ai',
};

// get CSS variable for a given tech category
export function getTechColor(tech: string): string {
  const category = TECH_COLOR_MAP[tech];

  switch (category) {
    case 'language':
      return 'var(--green)';
    case 'framework':
      return 'var(--blue)';
    case 'backend':
      return 'var(--purple)';
    case 'ai':
      return 'var(--yellow)';
    default:
      return 'var(--muted)'; // fallback for unmapped technologies
  }
}

// get background color (with opacity) for a given tech category
export function getTechBgColor(tech: string): string {
  const category = TECH_COLOR_MAP[tech];

  switch (category) {
    case 'language':
      return 'rgba(195, 232, 141, 0.15)';
    case 'framework':
      return 'rgba(130, 170, 255, 0.15)';
    case 'backend':
      return 'rgba(199, 146, 234, 0.15)';
    case 'ai':
      return 'rgba(255, 203, 107, 0.15)';
    default:
      return 'var(--card)'; // fallback
  }
}
