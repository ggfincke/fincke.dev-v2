// src/data/structured/skills.tsx
// comprehensive skills database w/ categorization & display logic
import type { Skill, SkillCategory } from '~/types/experience';

// comprehensive skills data (matching resume)
export const skills: Skill[] = [
  // Languages
  { name: 'Python', category: 'languages' },
  { name: 'Swift', category: 'languages' },
  { name: 'C', category: 'languages' },
  { name: 'JavaScript', category: 'languages', displayName: 'JavaScript (ES6+)' },
  { name: 'TypeScript', category: 'languages' },
  { name: 'Java', category: 'languages' },
  { name: 'SQL', category: 'languages' },
  { name: 'Solidity', category: 'languages' },
  { name: 'Verilog', category: 'languages' },

  // Frontend
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'HTML5', category: 'frontend' },
  { name: 'CSS3', category: 'frontend' },
  { name: 'SwiftUI', category: 'frontend' },
  { name: 'UIKit', category: 'frontend' },

  // Backend & APIs
  { name: 'Node.js', category: 'backend' },
  { name: 'Django', category: 'backend' },
  { name: 'FastAPI', category: 'backend' },
  { name: 'Celery', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Spring Boot', category: 'backend' },

  // Databases & Caches
  { name: 'PostgreSQL', category: 'database' },
  { name: 'SQLite', category: 'database' },
  { name: 'Supabase', category: 'database' },
  { name: 'Firebase', category: 'database' },
  { name: 'Redis', category: 'database' },

  // Mobile (iOS & watchOS)
  { name: 'iOS', category: 'mobile' },
  { name: 'watchOS', category: 'mobile' },
  { name: 'HealthKit', category: 'mobile' },
  { name: 'WatchKit', category: 'mobile' },
  { name: 'WatchConnectivity', category: 'mobile' },
  { name: 'MapKit', category: 'mobile' },
  { name: 'Core Data', category: 'mobile' },
  { name: 'Swift Charts', category: 'mobile' },

  // AI/ML & Data
  { name: 'PyTorch', category: 'ai-ml' },
  { name: 'TensorFlow', category: 'ai-ml' },
  { name: 'Keras', category: 'ai-ml' },
  { name: 'scikit-learn', category: 'ai-ml' },
  { name: 'HuggingFace', category: 'ai-ml', displayName: 'Hugging Face Transformers' },
  { name: 'OpenAI', category: 'ai-ml', displayName: 'OpenAI API' },
  { name: 'Anthropic Claude', category: 'ai-ml', displayName: 'Anthropic Claude API' },
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

  // DevOps & CI/CD
  { name: 'GitHub Actions', category: 'tools', displayName: 'CI/CD (GitHub Actions)' },
  { name: 'Docker', category: 'tools' },
  { name: 'Microservices', category: 'tools' },

  // Web3 & Blockchain
  { name: 'Web3.js', category: 'specialized' },
  { name: 'MetaMask', category: 'specialized' },
  { name: 'blockchain development', category: 'specialized' },

  // Systems & Architecture
  { name: 'Operating Systems', category: 'specialized' },
  { name: 'Computer Architecture', category: 'specialized' },
  { name: 'Storage Systems', category: 'specialized' },
  { name: 'Memory Management', category: 'specialized' },
  { name: 'Threading', category: 'specialized' },
  { name: 'Systems Programming', category: 'specialized' },
  { name: 'Networking', category: 'specialized' },
  { name: 'Caching', category: 'specialized' },

  // Hardware & EDA
  { name: 'FPGA', category: 'specialized' },
  { name: 'Xilinx Vivado', category: 'specialized' },
  { name: 'Digital Design', category: 'specialized' },

  // Tools & Design
  { name: 'VS Code', category: 'tools' },
  { name: 'Xcode', category: 'tools' },
  { name: 'Figma', category: 'tools' },
  { name: 'LaTeX', category: 'tools' },
  { name: 'Git', category: 'tools' },

  // Specialized
  { name: 'Selenium', category: 'specialized', displayName: 'Web scraping (Selenium, BeautifulSoup)' },
  { name: 'BeautifulSoup', category: 'specialized' },
  { name: 'Typer', category: 'specialized', displayName: 'CLI development (Typer)' },
  { name: 'Discord.py', category: 'specialized', displayName: 'bots (Discord.py)' },
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

// generate skill categories for about section
export const getSkillCategories = () => 
{
  const languageSkills = skills
    .filter(skill => ['Python', 'Swift', 'C', 'JavaScript', 'TypeScript', 'Java', 'SQL', 'Solidity'].includes(skill.name))
    .map(skill => skill.displayName || skill.name);
  const frontendSkills = skills
    .filter(skill => ['React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'].includes(skill.name))
    .map(skill => skill.displayName || skill.name);
  const backendSkills = skills
    .filter(skill => ['Node.js', 'Django', 'FastAPI', 'Celery', 'REST APIs', 'Spring Boot'].includes(skill.name))
    .map(skill => skill.displayName || skill.name);
  const databaseSkills = skills
    .filter(skill => ['PostgreSQL', 'SQLite', 'Supabase', 'Firebase', 'Redis'].includes(skill.name))
    .map(skill => skill.displayName || skill.name);
  const mobileSkills = skills
    .filter(skill => ['SwiftUI', 'UIKit', 'iOS', 'watchOS', 'HealthKit', 'WatchKit', 'WatchConnectivity', 'MapKit', 'Core Data', 'Swift Charts'].includes(skill.name))
    .map(skill => skill.displayName || skill.name);
  const aiMlSkills = skills
    .filter(skill => ['PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'HuggingFace', 'OpenAI', 'Anthropic Claude', 'Ollama', 'pandas', 'NumPy', 'matplotlib', 'seaborn', 'Jupyter'].includes(skill.name))
    .map(skill => skill.displayName || skill.name);
  const toolSkills = skills
    .filter(skill => ['GitHub Actions', 'Docker', 'VS Code', 'Xcode', 'Figma', 'LaTeX', 'Git'].includes(skill.name))
    .map(skill => skill.displayName || skill.name);
  
  return {
    languages: languageSkills,
    frontEnd: frontendSkills,
    backEnd: backendSkills,
    databases: databaseSkills,
    mobile: mobileSkills,
    aiMl: aiMlSkills,
    tools: toolSkills
  };
};

// get skills by category helper
export const getSkillsByCategory = (category: SkillCategory): string[] => 
{
  return skills
    .filter(skill => skill.category === category)
    .map(skill => skill.displayName || skill.name);
};
