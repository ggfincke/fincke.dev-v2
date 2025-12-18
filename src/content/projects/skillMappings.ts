// src/content/projects/skillMappings.ts
// skill-to-technology mappings w/ bidirectional semantic search

export const skillMappings: Record<string, string[]> = {
  // languages
  python: ['python'],
  swift: ['swift'],
  c: ['c'],
  javascript: ['javascript', 'typescript'],
  'javascript (es6+)': ['javascript', 'typescript'],
  typescript: ['typescript', 'javascript'],
  java: ['java'],
  sql: ['sql', 'sqlite', 'postgresql'],
  solidity: ['solidity'],
  verilog: ['verilog'],

  // frontend frameworks
  react: ['react', 'next.js'],
  'next.js': ['next.js', 'react'],
  'tailwind css': ['tailwind css'],
  html5: ['html', 'html5'],
  css3: ['css', 'css3'],
  swiftui: ['swiftui'],
  uikit: ['uikit'],

  // backend frameworks
  'node.js': ['node.js'],
  django: ['django'],
  fastapi: ['fastapi'],
  celery: ['celery'],
  'rest apis': ['rest apis'],
  'spring boot': ['spring boot'],

  // databases
  postgresql: ['postgresql'],
  sqlite: ['sqlite'],
  supabase: ['supabase'],
  firebase: ['firebase'],
  redis: ['redis'],

  // mobile platforms
  ios: ['ios', 'swiftui', 'uikit'],
  watchos: ['watchos'],
  healthkit: ['healthkit'],
  watchkit: ['watchkit'],
  watchconnectivity: ['watchconnectivity'],
  mapkit: ['mapkit'],
  'core data': ['core data'],
  'swift charts': ['swift charts'],

  // AI/ML libraries
  pytorch: ['pytorch'],
  tensorflow: ['tensorflow', 'keras'],
  keras: ['keras', 'tensorflow'],
  'scikit-learn': ['scikit-learn'],
  huggingface: ['huggingface', 'transformers'],
  'hugging face transformers': ['huggingface', 'transformers'],
  openai: ['openai'],
  'openai api': ['openai'],
  'anthropic claude': ['anthropic claude'],
  'anthropic claude api': ['anthropic claude'],
  ollama: ['ollama'],
  pandas: ['pandas'],
  numpy: ['numpy'],
  matplotlib: ['matplotlib'],
  seaborn: ['seaborn'],
  jupyter: ['jupyter'],
  'deep learning': ['deep learning', 'tensorflow', 'keras', 'pytorch', 'cnn'],
  cnns: ['cnn', 'deep learning'],
  resnet: ['resnet'],
  densenet: ['densenet'],
  'random fourier features': ['random fourier features'],
  'machine learning': ['machine learning', 'scikit-learn', 'deep learning'],

  // devops & tools
  'github actions': ['github actions'],
  'ci/cd (github actions)': ['github actions', 'ci/cd'],
  docker: ['docker'],
  microservices: ['microservices'],
  'vs code': ['vs code'],
  xcode: ['xcode'],
  figma: ['figma'],
  latex: ['latex'],
  git: ['git'],
  'git hooks': ['git hooks'],
  'lighthouse ci': ['lighthouse ci'],

  // web3 & blockchain
  'web3.js': ['web3.js'],
  metamask: ['metamask'],
  'blockchain development': ['solidity', 'ethereum', 'web3.js'],
  ethereum: ['ethereum', 'solidity', 'web3.js'],

  // systems & architecture
  'operating systems': ['operating systems'],
  'computer architecture': ['computer architecture'],
  'storage systems': ['storage systems'],
  'memory management': ['memory management'],
  threading: ['threading'],
  'systems programming': ['systems programming'],
  networking: ['networking'],
  caching: ['caching'],

  // hardware
  fpga: ['fpga'],
  'xilinx vivado': ['xilinx vivado'],
  'digital design': ['digital design'],

  // specialized
  selenium: ['selenium'],
  'web scraping (selenium, beautifulsoup)': [
    'selenium',
    'beautifulsoup',
    'web scraping',
  ],
  beautifulsoup: ['beautifulsoup'],
  typer: ['typer'],
  'cli development (typer)': ['typer', 'cli'],
  'discord.py': ['discord.py'],
  'bots (discord.py)': ['discord.py'],
  'captcha solving': ['captcha solving'],
  'data analysis': ['data analysis', 'pandas', 'numpy'],
  cli: ['cli'],
  json: ['json'],
  docx: ['docx'],
  apscheduler: ['apscheduler'],
  'custom shapes': ['custom shapes'],
  'gesture handling': ['gesture handling'],
  'mvc/mvvm': ['mvc/mvvm'],
  transformers: ['transformers', 'huggingface'],
  'web scraping': ['selenium', 'beautifulsoup', 'web scraping'],
};
