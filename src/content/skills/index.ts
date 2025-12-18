// src/content/skills/index.ts
// comprehensive skills data w/ category mappings

import type { Skill, SkillCategory } from '~/shared/types';

export const skills: Skill[] = [
  // languages
  { name: 'Python', category: 'languages' },
  { name: 'Swift', category: 'languages' },
  { name: 'C', category: 'languages' },
  {
    name: 'JavaScript',
    category: 'languages',
    displayName: 'JavaScript (ES6+)',
  },
  { name: 'TypeScript', category: 'languages' },
  { name: 'Java', category: 'languages' },
  { name: 'SQL', category: 'languages' },
  { name: 'Solidity', category: 'languages' },
  { name: 'Verilog', category: 'languages' },

  // frontend
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'HTML5', category: 'frontend' },
  { name: 'CSS3', category: 'frontend' },
  { name: 'SwiftUI', category: 'frontend' },
  { name: 'UIKit', category: 'frontend' },

  // backend & APIs
  { name: 'Node.js', category: 'backend' },
  { name: 'Django', category: 'backend' },
  { name: 'FastAPI', category: 'backend' },
  { name: 'Celery', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Spring Boot', category: 'backend' },

  // databases & caches
  { name: 'PostgreSQL', category: 'database' },
  { name: 'SQLite', category: 'database' },
  { name: 'Supabase', category: 'database' },
  { name: 'Firebase', category: 'database' },
  { name: 'Redis', category: 'database' },

  // mobile (iOS & watchOS)
  { name: 'iOS', category: 'mobile' },
  { name: 'watchOS', category: 'mobile' },
  { name: 'HealthKit', category: 'mobile' },
  { name: 'WatchKit', category: 'mobile' },
  { name: 'WatchConnectivity', category: 'mobile' },
  { name: 'MapKit', category: 'mobile' },
  { name: 'Core Data', category: 'mobile' },
  { name: 'Swift Charts', category: 'mobile' },

  // AI/ML & data
  { name: 'PyTorch', category: 'ai-ml' },
  { name: 'TensorFlow', category: 'ai-ml' },
  { name: 'Keras', category: 'ai-ml' },
  { name: 'scikit-learn', category: 'ai-ml' },
  {
    name: 'HuggingFace',
    category: 'ai-ml',
    displayName: 'Hugging Face Transformers',
  },
  { name: 'OpenAI', category: 'ai-ml', displayName: 'OpenAI API' },
  {
    name: 'Anthropic Claude',
    category: 'ai-ml',
    displayName: 'Anthropic Claude API',
  },
  { name: 'Ollama', category: 'ai-ml' },
  { name: 'pandas', category: 'ai-ml' },
  { name: 'NumPy', category: 'ai-ml' },
  { name: 'matplotlib', category: 'ai-ml' },
  { name: 'seaborn', category: 'ai-ml' },
  { name: 'Jupyter', category: 'ai-ml' },
  { name: 'Deep Learning', category: 'ai-ml' },
  { name: 'CNNs', category: 'ai-ml' },
  { name: 'ResNet', category: 'ai-ml' },
  { name: 'DenseNet', category: 'ai-ml' },
  { name: 'Random Fourier Features', category: 'ai-ml' },

  // devops & CI/CD
  {
    name: 'GitHub Actions',
    category: 'tools',
    displayName: 'CI/CD (GitHub Actions)',
  },
  { name: 'Docker', category: 'tools' },
  { name: 'Microservices', category: 'tools' },

  // web3 & blockchain
  { name: 'Web3.js', category: 'specialized' },
  { name: 'MetaMask', category: 'specialized' },
  { name: 'blockchain development', category: 'specialized' },

  // systems & architecture
  { name: 'Operating Systems', category: 'specialized' },
  { name: 'Computer Architecture', category: 'specialized' },
  { name: 'Storage Systems', category: 'specialized' },
  { name: 'Memory Management', category: 'specialized' },
  { name: 'Threading', category: 'specialized' },
  { name: 'Systems Programming', category: 'specialized' },
  { name: 'Networking', category: 'specialized' },
  { name: 'Caching', category: 'specialized' },

  // hardware & EDA
  { name: 'FPGA', category: 'specialized' },
  { name: 'Xilinx Vivado', category: 'specialized' },
  { name: 'Digital Design', category: 'specialized' },

  // tools & design
  { name: 'VS Code', category: 'tools' },
  { name: 'Xcode', category: 'tools' },
  { name: 'Figma', category: 'tools' },
  { name: 'LaTeX', category: 'tools' },
  { name: 'Git', category: 'tools' },

  // specialized
  {
    name: 'Selenium',
    category: 'specialized',
    displayName: 'Web scraping (Selenium, BeautifulSoup)',
  },
  { name: 'BeautifulSoup', category: 'specialized' },
  {
    name: 'Typer',
    category: 'specialized',
    displayName: 'CLI development (Typer)',
  },
  {
    name: 'Discord.py',
    category: 'specialized',
    displayName: 'bots (Discord.py)',
  },
  { name: 'CAPTCHA solving', category: 'specialized' },
  { name: 'Data Analysis', category: 'specialized' },
  { name: 'CLI', category: 'specialized' },
  { name: 'JSON', category: 'specialized' },
  { name: 'DOCX', category: 'specialized' },
  { name: 'APScheduler', category: 'specialized' },
  { name: 'Custom Shapes', category: 'specialized' },
  { name: 'Gesture Handling', category: 'specialized' },
  { name: 'MVC/MVVM', category: 'specialized' },
];

// * generate skill categories for about section
export const getSkillCategories = (): Record<SkillCategory, string[]> => {
  const categories: Record<SkillCategory, string[]> = {
    languages: [],
    frontend: [],
    backend: [],
    database: [],
    mobile: [],
    'ai-ml': [],
    tools: [],
    specialized: [],
  };

  skills.forEach(skill => {
    const displayName = skill.displayName || skill.name;
    if (categories[skill.category]) {
      categories[skill.category].push(displayName);
    }
  });

  return categories;
};

// get skills by category
export const getSkillsByCategory = (category: SkillCategory): string[] => {
  return skills
    .filter(skill => skill.category === category)
    .map(skill => skill.displayName || skill.name);
};
