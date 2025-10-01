
// src/data/structured/projects.tsx
// comprehensive project portfolio data w/ detailed descriptions
import type { Project } from '~/types/projects';

import { skillMappings } from './skillMappings';

// project portfolio data
export const projects: Project[] = [
  {
    title: "Minecart",
    dateRange: "Present",
    status: "live",
    madeFor: "Personal",
    featured: true,
    bulletPoints: [
      "Discord bot that manages Minecraft servers across local Docker and AWS EC2 with performance monitoring and admin tooling",
      "Provider abstraction with comprehensive slash commands for server, player, and admin management",
      "Performance monitoring with CPU/RAM/TPS metrics, health checks, and automated backups",
      "ESM TypeScript with modular architecture and robust error handling"
    ],
    technologies: ["TypeScript", "Node.js", "Docker", "Docker Compose", "RCON", "AWS", "EC2", "SSM", "CloudWatch", "Discord.js"],
    imagePath: "/assets/projects/images/minecart.png",
    imageAlt: "Minecart Discord bot screenshot"
    // repoUrl: "https://github.com/ggfincke/minecart"
  },
  {
    title: "Hopper",
    dateRange: "Sep 2025 – Present",
    status: "in-development",
    madeFor: "Personal",
    featured: true,
    bulletPoints: [
      "Cross-platform inventory management for ecommerce sellers; centralizes products, listings, orders, and fees across marketplaces",
      "Normalized PostgreSQL schema with Flyway migrations and JPA entities with repository pattern",
      "REST API with full CRUD operations, JWT authentication, and multi-environment database setup",
      "Production-ready features including order state machine, stock management, and platform credential storage"
    ],
    technologies: ["Java", "Spring Boot", "Spring Data JPA", "PostgreSQL", "Flyway", "H2", "Spring Security", "Spring Batch", "Actuator", "Gradle"],
    // imagePath: "/assets/projects/images/hopper.png",
    imageAlt: "Hopper inventory management system screenshot",
    repoUrl: "https://github.com/ggfincke/hopper"
  },
  {
    title: "Loom",
    dateRange: "Aug 2025 – Present",
    status: "live",
    madeFor: "Personal",
    featured: true,
    bulletPoints: [
      "AI résumé tailoring CLI with OpenAI, Anthropic Claude, or local Ollama, built with clean architecture and modular design",
      "Typer-based commands: tailor, sectionize, generate, apply — plus config & enhanced help",
      "Precise JSON edit ops on line-numbered text (replace_line, replace_range, insert_after, delete_range)",
      "Preserves DOCX/LaTeX structure; review edits or apply them automatically with robust error handling"
    ],
    technologies: ["Python", "Typer", "OpenAI", "Anthropic Claude", "Ollama", "DOCX", "LaTeX", "JSON", "CLI"],
    imagePath: "/assets/projects/images/loom.png",
    imageAlt: "Loom app screenshot",
    repoUrl: "https://github.com/ggfincke/loom"
  },
  {
    title: "TrackBasket",
    dateRange: "May 2025 - Present",
    status: "live",
    madeFor: "Bolt Hackathon",
    featured: true,
    bulletPoints: [
      "Deployed a price tracking platform monitoring 30k+ products across 4 major retailers including Amazon, Target, Walmart, and more",
      "Features a chat-to-basket feature using OpenAI API that converts natural language into structured baskets using data from Supabase",
      "Implemented advanced web crawling system with CAPTCHA solving, anti-bot countermeasures, and data normalization",
      "Created backend infrastructure including Edge Functions, PostgreSQL fuzzy search, UPC matching, real-time notifications, and more",
      "Built AI-powered product matching with intelligent alternatives and comprehensive UPC lookup for cross-retailer price correlation",
      "Engineered sophisticated notification system with granular preferences for price drops, availability changes, and product updates",
      "Developed responsive basket management with collaborative sharing, real-time price history charts, and smart recommendations"
    ],
    imagePath: "/assets/projects/images/trackbasket.png",
    imageAlt: "TrackBasket app screenshot",
    technologies: ["Typescript", "Python", "Supabase", "Next.js", "React", "OpenAI", "PostgreSQL", "Docker", "Swift"],
    repoUrl: "https://github.com/ggfincke/BoltHackathon",
    liveUrl: "https://bolt-hackathon-five.vercel.app"
  },
  {
    title: "SwimMate",
    dateRange: "Feb 2024 - Jun 2024, May 2025 - Present",
    status: "in-development",
    madeFor: "Penn State",
    featured: true,
    bulletPoints: [
      <>Final Project for <a href="https://bulletins.psu.edu/university-course-descriptions/undergraduate/cmpsc/#:~:text=CMPSC%20475%3A%20Applications%20Programming" target="_blank" rel="noopener noreferrer" className="hover:underline">CMPSC 475: Applications Programming</a> </>,
      "Developed a native iOS/watchOS app for swimmers to track, find, and save workouts, view history, and follow progress over time",
      "Built custom components using HealthKit and SwiftUI for workout entry, lap timing, and charting performance trends",
      "Connected iOS app to Apple Watch to track workout data and other metrics, as well as sending premade workouts to the watch for user to follow",
      "Offers goal-based workouts for distance, time, or calories with real-time progress tracking",
      "Displays rich real-time metrics on Apple Watch including pace, heart rate, laps, SWOLF, and calories",
      "Supports both pool and open-water swims with GPS distance tracking",
      "Visualizes performance trends using interactive Swift Charts",
      "Achieved a grade of 100% on this submission"
    ],
    imagePath: "/assets/projects/images/swimmate.png",
    imageAlt: "SwimMate app screenshot",
    technologies: ["Swift", "SwiftUI", "HealthKit", "WatchKit", "watchOS", "Swift Charts", "WatchConnectivity"],
    repoUrl: "https://github.com/ggfincke/SwimMate"
  },
  {
    title: "Portfolio Website",
    dateRange: "Mar 2025 - Present",
    status: "live",
    madeFor: "Personal",
    featured: true,
    bulletPoints: [
      "Built a personal portfolio website (you're looking at it!) with Next.js, React, TypeScript",
      "Implemented modern, responsive design with animations and transitions using Tailwind CSS",
      "Created a custom component system for UI consistency",
      "Designed with accessibility and performance in mind",
      "Configured continuous deployment with Vercel",
      "Learned Figma to design, prototype, and iterate on the website & logo (see top left of sidebar!)",
      "Automated CI/CD and release workflow with automated prereleases/tags, Lighthouse CI checks, and consistent tooling"
    ],
    imagePath: "/assets/projects/images/portfolio.png",
    imageAlt: "Portfolio website screenshot",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GitHub Actions",
      "CI/CD",
      "Figma"
    ],
    repoUrl: "https://github.com/ggfincke/fincke.dev",
    liveUrl: "https://fincke.dev"
  },
  {
    title: "InStock",
    dateRange: "Dec 2024 - Mar 2025",
    status: "paused",
    madeFor: "Personal",
    bulletPoints: [
      "Designed a high-performance price & stock tracking system for monitoring product pricing & availability across various major retailers",
      "Optimized for speed, frequency, and accuracy of detecting restocks and price changes on high-velocity products",
      "Created a custom database schema using Django's ORM & PostgreSQL for efficient data storage & retrieval",
      "Engineered a microservices architecture in Django with Redis and Celery for predictable and scalable performance",
      "Built RESTful API endpoints for data retrieval & user management to a React frontend & Swift mobile app, and integrated Discord bot functionality via Discord.py",
      "This project laid the groundwork for what would eventually evolve into TrackBasket, expanding into a full-featured price-tracking platform"
    ],
    technologies: ["Python", "Django", "PostgreSQL", "Selenium", "Redis", "Celery", "React", "Swift", "Discord.py"],
    repoUrl: "https://github.com/ggfincke/instock"
  },
  {
    title: "Computer Architecture Projects",
    dateRange: "Sep 2024 – Dec 2024",
    status: "complete",
    madeFor: "Penn State",
    bulletPoints: [
      <>Two comprehensive projects for <a href="https://bulletins.psu.edu/university-course-descriptions/undergraduate/cmpen/#:~:text=CMPEN%20431%3A%20Introduction%20to%20Computer%20Architecture" target="_blank" rel="noopener noreferrer" className="hover:underline">CMPEN 431: Computer Architecture</a></>,
      "Built heuristic-driven framework on SimpleScalar to explore multi-dimensional cache/memory configurations across benchmarks; automated validation, configuration generation, and evaluation to identify high-performance and energy-efficient designs",
      "Implemented and compared branch predictors — static, one-bit, two-bit saturating, bimodal, gshare, and hybrid with chooser — including update logic and measurement of prediction accuracy/misprediction rates on traces",
      "Produced detailed reports outlining configuration trade-offs, predictor performance, and recommendations grounded in quantitative analysis"
    ],
    technologies: ["C/C++", "SimpleScalar", "Python", "Cache Hierarchies", "Branch Prediction", "Performance Analysis"],
    repoUrl: "https://github.com/ggfincke/CMPEN431_projects"
  },
  {
    title: "BetterBettor",
    dateRange: "Mar 2024 - May 2024",
    status: "complete",
    madeFor: "Penn State",
    bulletPoints: [
      <>Final Project for <a href="https://bulletins.psu.edu/university-course-descriptions/undergraduate/cmpsc/#:~:text=CMPSC%20263%3A%20Blockchain%20and%20Cryptocurrency" target="_blank" rel="noopener noreferrer" className="hover:underline">CMPSC 263: Blockchain and Modern Web Development</a></>,
      "Built a decentralized sports betting platform using Ethereum smart contracts for transparent, trustless wagering",
      "Developed modern React/Next.js frontend with Web3 integration for seamless blockchain interaction",
      "Implemented comprehensive betting system with customizable odds, automated payouts, and user wallet integration via MetaMask",
      "Created responsive design supporting multiple sports categories with real-time betting interface"
    ],
    technologies: ["Solidity", "Next.js", "Ethereum", "Web3.js", "MetaMask", "React"],
    repoUrl: "https://github.com/ggfincke/betterbettor"
  },
  {
    title: "Memory Management & Threading in C",
    collaborators: [
      { name: "Avanish Grampurohit" }
    ],
    dateRange: "Sep 2023 - Dec 2023",
    status: "complete",
    madeFor: "Penn State",
    bulletPoints: [
      <>Three comprehensive projects for <a href="https://bulletins.psu.edu/university-course-descriptions/undergraduate/cmpsc/#:~:text=CMPSC%20473%3A%20Operating%20Systems" target="_blank" rel="noopener noreferrer" className="hover:underline">CMPSC 473: Operating Systems</a></>,
      "Developed a memory management simulator implementing FIFO, LRU, and optimal page replacement algorithms with demand paging",
      "Built a custom thread scheduler with cooperative and preemptive scheduling, round-robin and priority-based algorithms, and mutex synchronization",
      "Extended minimalist OS kernel with new system calls, process management features, and kernel-level debugging tools for enhanced functionality",
      "Achieved grade of 100% average on all assignments with comprehensive testing, validation, and thorough documentation"
    ],
    technologies: ["C", "Systems Programming", "Operating Systems", "Memory Management", "Threading"],
    repoUrl: "https://github.com/ggfincke/CMPSC473_projects"
  },
  {
    title: "JBOD Storage System with Caching & Network Communication",
    dateRange: "Sep 2022 - Dec 2022",
    status: "complete",
    madeFor: "Penn State",
    bulletPoints: [
      <>Five comprehensive labs for <a href="https://bulletins.psu.edu/university-course-descriptions/undergraduate/cmpsc/#:~:text=CMPSC%20311%3A%20Introduction%20to%20Systems%20Programming" target="_blank" rel="noopener noreferrer" className="hover:underline">CMPSC 311: Introduction to Systems Programming</a></>,
      "Implemented a complete JBOD (Just a Bunch of Disks) storage system with block-level operations across multiple disks",
      "Built high-performance caching layer using LFU (Least Frequently Used) replacement policy with dynamic cache management",
      "Developed distributed storage system with TCP/IP client-server architecture and robust network communication protocols",
      "Achieved grade of 100% on all assignments with comprehensive testing, validation, and thorough system integration verification"
    ],
    technologies: ["C", "Systems Programming", "Storage Systems", "Networking", "Caching"],
    repoUrl: "https://github.com/ggfincke/CMPSC311_projects"
  },
  {
    title: "COVID-19 Case Surveillance Analysis",
    collaborators: [
      { name: "Edwin Clatus" },
      { name: "Sahit Botta" }
    ],
    dateRange: "May 2024 - Aug 2024",
    status: "complete",
    madeFor: "Penn State",
    bulletPoints: [
      <>Comprehensive coursework for <a href="https://bulletins.psu.edu/university-course-descriptions/undergraduate/stat/#:~:text=STAT%20319%3A%20Applied%20Statistics" target="_blank" rel="noopener noreferrer" className="hover:underline">STAT 319: Applied Statistics</a></>,
      "Completed end-to-end data science projects using Python ecosystem including pandas, NumPy, matplotlib, seaborn, and scikit-learn",
      "Implemented machine learning models including linear regression, logistic regression, SVM, KNN, and decision trees",
      "Collaborated on COVID-19 case surveillance analysis for final projectusing large-scale public health data with comprehensive preprocessing and visualization, achieving a grade of 100%",
      "Mastered statistical analysis, model validation, hyperparameter tuning, and cross-validation techniques"
    ],
    technologies: ["Python", "Machine Learning", "pandas", "NumPy", "scikit-learn", "matplotlib", "seaborn", "Jupyter"],
    repoUrl: "https://github.com/ggfincke/STAT319"
  },
  {
    title: "TCGhub",
    collaborators: [
      { name: "Yash Tumuluri" }
    ],
    dateRange: "Sep 2024 - Dec 2024",
    status: "complete",
    madeFor: "Penn State",
    featured: true,
    bulletPoints: [
      <>Final Project for <a href="https://bulletins.psu.edu/university-course-descriptions/undergraduate/cmpsc/#:~:text=CMPSC%20431W%3A%20Database%20Management%20Systems" target="_blank" rel="noopener noreferrer" className="hover:underline">CMPSC 431W: Database Management Systems</a></>,
      <>Developed a React-based trading card marketplace clone with live data integration (essentially a replica of <a href="https://www.tcgplayer.com" target="_blank" rel="noopener noreferrer" className="hover:underline">tcgplayer.com</a>)</>,
      "Customized a complex database schema in BCNF and hand-wrote all SQL queries to the local SQLite database",
      "Implemented filtering and search functionality for card sets and rarities",
      "Styled with modern CSS to create clean, responsive UI with intuitive user experience and professional appearance",
      "Achieved grade of over 100% on this project, demonstrating mastery of database design and full-stack development"
    ],
    imagePath: "/assets/projects/images/tcghub2.png",
    imageAlt: "TCGhub app screenshot",
    technologies: ["React", "SQL", "Python", "SQLite", "Node.js"],
    repoUrl: "https://github.com/ggfincke/TCGhub"
  },
  {
    title: "OPTIMUS",
    dateRange: "Feb 2024 - Apr 2024",
    status: "complete",
    madeFor: "Personal",
    bulletPoints: [
      <p key="godel-description">Built a fine-tuned Discord chatbot using <a href="https://www.microsoft.com/en-us/research/project/godel/" target="_blank" rel="noopener noreferrer" className="hover:underline">Microsoft&apos;s GODEL-v1.1 model</a> for contextual conversation generation</p>,
      "Integrated HuggingFace Transformers to run local inference with a custom-trained seq2seq model",
      "Created rich Discord interactions including emote reactions, user-specific triggers, and dynamic status updates",
      "Designed 'Free Rein' and 'Puppeteer Mode' to control bot behavior based on real-time message context"
    ],
    technologies: ["Python", "Transformers", "Discord.py", "HuggingFace", "APScheduler"],
    repoUrl: "https://github.com/ggfincke/OPTIMUS"
  },
  {
    title: "MIPS Processor",
    collaborators: [
      { name: "Avanish Grampurohit" }
    ],
    dateRange: "Mar 2023 - May 2023",
    status: "complete",
    madeFor: "Penn State",
    bulletPoints: [
      <>Final Project for <a href="https://bulletins.psu.edu/university-course-descriptions/undergraduate/cmpen/#:~:text=CMPEN%20331%3A%20Computer%20Organization%20and%20Design" target="_blank" rel="noopener noreferrer" className="hover:underline">CMPEN 331: Computer Organization and Design</a></>,
      "Implemented a complete single-cycle MIPS processor in Verilog HDL with 32-bit architecture and Harvard memory organization",
      "Built comprehensive instruction set support including arithmetic, logical, memory, branch, and jump instructions",
      "Designed modular architecture with separate components for ALU, control unit, register file, and memory systems for optimal performance",
      "Achieved grade of 100% with thorough testing and validation of all processor components and comprehensive instruction type coverage"
    ],
    technologies: ["Verilog", "FPGA", "Digital Design", "Xilinx Vivado"],
    repoUrl: "https://github.com/ggfincke/CMPEN331_final_project"
  },
  {
    title: "Traditional Machine Learning Methods Exploration for MNIST",
    dateRange: "Sep 2024 - Oct 2024",
    status: "complete",
    madeFor: "Penn State",
    bulletPoints: [
      <>Midterm report for <a href="https://bulletins.psu.edu/university-course-descriptions/undergraduate/math/#:~:text=MATH%20452%3A%20Mathematical%20Foundations%20of%20Machine%20Learning" target="_blank" rel="noopener noreferrer" className="hover:underline">MATH 452: Mathematical Foundations of Machine Learning</a></>,
      "Implemented and compared KNN (94.4% accuracy), Logistic Regression (91.1%), and SVM with RBF kernel (95.3%) for classifying handwritten digits on a 10k-image subset of the MNIST dataset",
      "Applied rigorous preprocessing pipeline: random sampling, normalization to [0,1], flattening to 784-D vectors, and stratified 80/20 train–test split, followed by confusion matrix analysis",
      "Performed hyperparameter tuning (k=3 for KNN; C=1, RBF kernel for SVM) using grid search cross-validation; evaluated models with precision, recall, and F1-score",
      "Executed unsupervised learning using K-Means (k=10) with PCA dimensionality reduction for visualization; examined elbow method and silhouette scores to assess cluster quality",
      "Discussed computational constraints (high-dimensional SVM training) and proposed CNNs as future work to approach state-of-the-art accuracy",
      "Achieved grade of 100% on report and implementation, showcasing excellence in traditional machine learning methods and statistical analysis"
    ],
    imagePath: "/assets/projects/images/452midterm.png",
    imageAlt: "MATH 452 Midterm Report screenshot",
    technologies: ["Python", "scikit-learn", "NumPy", "pandas", "matplotlib", "seaborn", "Machine Learning", "LaTeX"],
    repoUrl: "https://github.com/ggfincke/MATH452_projects",
    liveUrl: "/assets/projects/documents/MATH_452_Midterm_Report.pdf"
  },
  {
    title: "Deep Learning Architecture Comparison & Analysis for CIFAR-10",
    collaborators: [
      { name: "Jacob Goulet" },
      { name: "Tyler Rossi" },
      { name: "Diego Bueno" },
      { name: "Javier Pozo Miranda" },
      { name: "Duong Bao" }
    ],
    dateRange: "Nov 2024 – Dec 2024",
    status: "complete",
    madeFor: "Penn State",
    bulletPoints: [
      <>Final report for <a href="https://bulletins.psu.edu/university-course-descriptions/undergraduate/math/#:~:text=MATH%20452%3A%20Mathematical%20Foundations%20of%20Machine%20Learning" target="_blank" rel="noopener noreferrer" className="hover:underline">MATH 452: Mathematical Foundations of Machine Learning</a></>,
      "Benchmarked four approaches on the CIFAR-10 dataset (60k images): baseline CNN, ResNet50, DenseNet121, and a Random Feature Model (RFM) with 5,000 Random Fourier Features",
      "DenseNet121 achieved the top test accuracy at 74%, outperforming the baseline CNN (69%), RFM (51.6%), and ResNet50 (47%)",
      "Engineered a ResNet-inspired CNN with residual blocks, data augmentation, dropout, and L2 regularization; documented optimization challenges and remedies",
      "Built a lightweight RFM pipeline (StandardScaler ➜ RBFSampler ➜ LogisticRegression) and logged training/validation loss at 10 checkpoints to compare computational efficiency",
      "Generated confusion matrices, full metric suite (accuracy, precision, recall, F1, log-loss), and detailed loss/accuracy curves; proposed future work including hybrid CNN-RFM ensemble, advanced ResNet scheduling, and larger datasets",
      "Achieved grade of 100% on this comprehensive report and implementation, demonstrating mastery of deep learning architectures and analysis"
    ],
    imagePath: "/assets/projects/images/452final.png",
    imageAlt: "MATH 452 Final Report screenshot",
    technologies: ["Python", "TensorFlow", "Keras", "NumPy", "pandas", "matplotlib", "seaborn", "scikit-learn", "Deep Learning", "CNN", "ResNet", "DenseNet", "LaTeX", "Random Fourier Features"],
    repoUrl: "https://github.com/ggfincke/MATH452_projects",
    liveUrl: "/assets/projects/documents/MATH_452_-_Final_Report.pdf"
  },
  {
    title: "USBAP",
    collaborators: [
      { name: "Yugal Kithany" },
      { name: "Kyle Lynch" }
    ],
    dateRange: "May 2023 - Jun 2023",
    status: "experimental",
    madeFor: "Personal",
    bulletPoints: [
      "Developed web scraping tools for extracting sports betting data from major platforms including DraftKings and FanDuel",
      "Built automated data collection system using Python with BeautifulSoup for parsing complex HTML structures",
      "Implemented data extraction for multiple betting markets including moneylines, spreads, and totals across various sports",
      "Created foundation for sports betting analytics and arbitrage opportunity detection"
    ],
    technologies: ["Python", "Web Scraping", "Data Analysis", "BeautifulSoup"],
    repoUrl: "https://github.com/ggfincke/USBAP"
  },
  {
    title: "iOS Application Development Projects",
    collaborators: [
      { name: "Ashley Amendola" }
    ],
    dateRange: "Jan 2024 - Mar 2024",
    status: "complete",
    madeFor: "Penn State",
    bulletPoints: [
      <>Five comprehensive projects for <a href="https://bulletins.psu.edu/university-course-descriptions/undergraduate/cmpsc/#:~:text=CMPSC%20475%3A%20Applications%20Programming" target="_blank" rel="noopener noreferrer" className="hover:underline">CMPSC 475: Applications Programming</a></>,
      "Built LionSpell word puzzle game with custom polygon shapes, multi-language preferences, hints system, and New York Times-style UI design",
      "Developed Pentominoes puzzle game implementing drag gestures, 3D rotation animations, JSON data parsing, and automated solve/reset functionality",
      "Created Campus mapping applications using both SwiftUI Map and UIKit MKMapView with user location tracking, route planning, turn-by-turn directions, and annotation clustering",
      "Designed Pokédex catalog app featuring card-based UI, type filtering, capture/release persistence, evolutionary chains, and comprehensive data management",
      "Achieved grade of 98% average across all projects, demonstrating mastery of iOS development patterns, gesture handling, and advanced SwiftUI/UIKit integration"
    ],
    technologies: ["Swift", "SwiftUI", "UIKit", "MapKit", "Core Data", "JSON", "Custom Shapes", "Gesture Handling", "MVC/MVVM", "Xcode"]
    // repoUrl: "https://github.com/ggfincke/CMPSC475_projects",
  }
];

// get featured projects only
export const getFeaturedProjects = (): Project[] => 
{
  return projects.filter(project => project.featured);
};

// get all projects
export const getAllProjects = (): Project[] => 
{
  return projects;
};

// get projects by skill/technology
export const getProjectsBySkill = (skillName: string): Project[] =>
{
  // normalize skill name for comparison
  const normalizedSkill = skillName.toLowerCase();
  
  // get exact matches for this skill using imported mappings
  const skillSearchTerms = skillMappings[normalizedSkill] || [normalizedSkill];
  
  return projects.filter(project =>
  {
    // check if any of the project's technologies exactly match our search terms
    return project.technologies.some(tech =>
    {
      const normalizedTech = tech.toLowerCase();
      // Only exact matches, no substring matching
      return skillSearchTerms.includes(normalizedTech);
    });
  });
};
