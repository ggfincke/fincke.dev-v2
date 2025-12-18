// src/content/projects/index.ts
// barrel exports for project content and helpers

export { projects } from './all';
export {
  getFeaturedProjects,
  getAllProjects,
  getProjectsBySkill,
} from './selectors';
export {
  FEATURED_PROJECT_TITLES,
  WIDE_FEATURED_PROJECT_TITLES,
} from './featured';
export { skillMappings } from './skillMappings';
