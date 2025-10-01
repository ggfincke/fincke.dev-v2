// src/data/structured/skillMappings.tsx
// skill-to-technology mappings for project filtering

// skill mappings for project filtering
export const skillMappings: Record<string, string[]> = {
  // Languages
  'python': ['python'],
  'swift': ['swift'],
  'c': ['c'],
  'javascript': ['javascript', 'typescript'],
  'javascript (es6+)': ['javascript', 'typescript'],
  'typescript': ['typescript', 'javascript'],
  'java': ['java'],
  'sql': ['sql', 'sqlite', 'postgresql'],
  'solidity': ['solidity'],
  'verilog': ['verilog'],
  
  // Frontend frameworks
  'react': ['react', 'next.js'],
  'next.js': ['next.js', 'react'],
  'tailwind css': ['tailwind css'],
  'html5': ['html', 'html5'],
  'css3': ['css', 'css3'],
  'swiftui': ['swiftui'],
  'uikit': ['uikit'],
  
  // Backend frameworks
  'node.js': ['node.js'],
  'django': ['django'],
  'fastapi': ['fastapi'],
  'celery': ['celery'],
  'rest apis': ['rest apis'],
  'spring boot': ['spring boot'],
  
  // Databases
  'postgresql': ['postgresql'],
  'sqlite': ['sqlite'],
  'supabase': ['supabase'],
  'firebase': ['firebase'],
  'redis': ['redis'],
  
  // Mobile platforms
  'ios': ['ios', 'swiftui', 'uikit'],
  'watchos': ['watchos'],
  'healthkit': ['healthkit'],
  'watchkit': ['watchkit'],
  'watchconnectivity': ['watchconnectivity'],
  'mapkit': ['mapkit'],
  'core data': ['core data'],
  'swift charts': ['swift charts'],
  
  // AI/ML libraries
  'pytorch': ['pytorch'],
  'tensorflow': ['tensorflow', 'keras'],
  'keras': ['keras', 'tensorflow'],
  'scikit-learn': ['scikit-learn'],
  'huggingface': ['huggingface', 'transformers'],
  'hugging face transformers': ['huggingface', 'transformers'],
  'openai': ['openai'],
  'openai api': ['openai'],
  'anthropic claude': ['anthropic claude'],
  'anthropic claude api': ['anthropic claude'],
  'ollama': ['ollama'],
  'pandas': ['pandas'],
  'numpy': ['numpy'],
  'matplotlib': ['matplotlib'],
  'seaborn': ['seaborn'],
  'jupyter': ['jupyter'],
  'deep learning': ['deep learning', 'tensorflow', 'keras', 'pytorch', 'cnn'],
  'cnns': ['cnn', 'deep learning'],
  'resnet': ['resnet'],
  'densenet': ['densenet'],
  'random fourier features': ['random fourier features'],
  'machine learning': ['machine learning', 'scikit-learn', 'deep learning'],
  
  // DevOps & Tools
  'github actions': ['github actions'],
  'ci/cd (github actions)': ['github actions', 'ci/cd'],
  'docker': ['docker'],
  'microservices': ['microservices'],
  'vs code': ['vs code'],
  'xcode': ['xcode'],
  'figma': ['figma'],
  'latex': ['latex'],
  'git': ['git'],
  'git hooks': ['git hooks'],
  'lighthouse ci': ['lighthouse ci'],
  
  // Web3 & Blockchain
  'web3.js': ['web3.js'],
  'metamask': ['metamask'],
  'blockchain development': ['solidity', 'ethereum', 'web3.js'],
  'ethereum': ['ethereum', 'solidity', 'web3.js'],
  
  // Systems & Architecture
  'operating systems': ['operating systems'],
  'computer architecture': ['computer architecture'],
  'storage systems': ['storage systems'],
  'memory management': ['memory management'],
  'threading': ['threading'],
  'systems programming': ['systems programming'],
  'networking': ['networking'],
  'caching': ['caching'],
  
  // Hardware
  'fpga': ['fpga'],
  'xilinx vivado': ['xilinx vivado'],
  'digital design': ['digital design'],
  
  // Specialized
  'selenium': ['selenium'],
  'web scraping (selenium, beautifulsoup)': ['selenium', 'beautifulsoup', 'web scraping'],
  'beautifulsoup': ['beautifulsoup'],
  'typer': ['typer'],
  'cli development (typer)': ['typer', 'cli'],
  'discord.py': ['discord.py'],
  'bots (discord.py)': ['discord.py'],
  'captcha solving': ['captcha solving'],
  'data analysis': ['data analysis', 'pandas', 'numpy'],
  'cli': ['cli'],
  'json': ['json'],
  'docx': ['docx'],
  'apscheduler': ['apscheduler'],
  'custom shapes': ['custom shapes'],
  'gesture handling': ['gesture handling'],
  'mvc/mvvm': ['mvc/mvvm'],
  'transformers': ['transformers', 'huggingface'],
  'web scraping': ['selenium', 'beautifulsoup', 'web scraping']
};