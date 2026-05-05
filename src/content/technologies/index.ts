// src/content/technologies/index.ts
// barrel exports for the canonical technology registry

export {
  getTechnology,
  getTechnologyBackgroundColor,
  getTechnologyColor,
  getTechnologyDisplay,
  getTechnologyIds,
  getTechnologyTerms,
  resolveTechnologyId,
  TECHNOLOGY_REGISTRY,
} from '~/content/technologies/registry'

export type {
  TechnologyDisplay,
  TechnologyId,
} from '~/content/technologies/registry'
