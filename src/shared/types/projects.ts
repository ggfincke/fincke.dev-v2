// src/shared/types/projects.ts
// project & collaborator types

import type { TechnologyId } from '~/content/technologies'
import type { DateSpan } from '~/shared/types/dates'

// known project entry ids
export const PROJECT_IDS = [
  'tierlistbuilder',
  'mdx-preview-for-vs-code',
  'opencode-to-ccusage',
  'reactive-workbench',
  'swimmate-v2',
  'portfolio-website-v2',
  'minecart',
  'hopper',
  'loom',
  'trackbasket',
  'portfolio-website-v1',
  'instock',
  'deep-learning-architecture-comparison-and-analysis-for-cifar-10',
  'computer-architecture-projects',
  'tcghub',
  'traditional-machine-learning-methods-exploration-for-mnist',
  'covid-19-case-surveillance-analysis',
  'betterbettor',
  'swimmate',
  'optimus',
  'ios-application-development-projects',
  'memory-management-and-threading-in-c',
  'usbap',
  'mips-processor',
  'jbod-storage-system-with-caching-and-network-communication',
] as const

export type ProjectId = (typeof PROJECT_IDS)[number]

// project lifecycle status union type
export type ProjectStatus =
  | 'live'
  | 'in-development'
  | 'paused'
  | 'complete'
  | 'experimental'
  | 'planned'

// featured project presentation tier
export type ProjectFeatureTier = 'default' | 'wide'

// featured project metadata
export interface ProjectFeature
{
  tier: ProjectFeatureTier
  // globally unique ordering across all featured projects
  order: number
}

// collaborator entry shape
export interface Collaborator
{
  name: string
  url?: string
}

// external link shape
export interface ExternalLink
{
  url: string
  label: string
}

// project entry shape
export interface Project
{
  id: ProjectId
  title: string
  tagline?: string
  period: DateSpan
  status: ProjectStatus
  madeFor: string
  feature?: ProjectFeature

  bulletPoints: string[]
  technologies: TechnologyId[]
  imagePath?: string
  imageAlt?: string
  repoUrl?: string
  liveUrl?: string
  additionalLinks?: ExternalLink[]
  collaborators?: Collaborator[]
}
