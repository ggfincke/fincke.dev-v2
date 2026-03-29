// src/content/technologies/index.ts
// barrel exports for the canonical technology registry

export {
  getTechnology,
  getTechnologyBackgroundColor,
  getTechnologyColor,
  getTechnologyIds,
  getTechnologyTerms,
  resolveTechnologyId,
  TECHNOLOGY_REGISTRY,
} from './registry'

export type { TechnologyId } from './registry'
