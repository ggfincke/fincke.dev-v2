// src/content/index.ts
// central barrel for static site content

export * as homeContent from './home';
export * as experienceContent from './experience';
export * as projectContent from './projects';
export * as skillContent from './skills';

// convenient re-exports for common imports
export {
  HERO_CONTENT,
  ABOUT_CONTENT,
  SOCIAL_LINKS,
} from './home';
export { WORK_EXPERIENCE } from './experience';
export {
  projects,
  getAllProjects,
  getFeaturedProjects,
  getProjectsBySkill,
  FEATURED_PROJECT_TITLES,
  WIDE_FEATURED_PROJECT_TITLES,
  skillMappings,
} from './projects';
export { skills, getSkillCategories, getSkillsByCategory } from './skills';
