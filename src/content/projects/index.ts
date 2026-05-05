// src/content/projects/index.ts
// barrel exports for project content & helpers

export { projects } from '~/content/projects/all'
export { PROJECTS_CONTENT } from '~/content/projects/copy'
export {
  getFeaturedProjects,
  getAllProjects,
  getProjectsByTechnology,
} from '~/content/projects/selectors'
