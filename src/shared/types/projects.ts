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

// explicit availability state for project links/media
export const PROJECT_RESOURCE_AVAILABILITIES = [
  'available',
  'private',
  'archived',
  'not-applicable',
  'pending',
] as const

export type ProjectResourceAvailability =
  (typeof PROJECT_RESOURCE_AVAILABILITIES)[number]

export interface ProjectResourceState
{
  readonly availability: ProjectResourceAvailability
  readonly note?: string
}

export interface ProjectContentStatus
{
  readonly links: ProjectResourceState
  readonly media: ProjectResourceState
}

export interface ProjectsContent
{
  readonly featuredHeading: string
  readonly archiveCtaLabel: string
  readonly archiveBackLabel: string
  readonly archiveTitle: string
  readonly archiveDescription: string
  readonly archiveListHeading: string
  readonly archiveFooter: string
}

// featured project metadata
export interface ProjectFeature
{
  readonly tier: ProjectFeatureTier
  // globally unique ordering across all featured projects
  readonly order: number
}

// collaborator entry shape
export interface Collaborator
{
  readonly name: string
  readonly url?: string
}

// external link shape
export interface ExternalLink
{
  readonly url: string
  readonly label: string
}

// project entry shape
export interface Project
{
  readonly id: ProjectId
  readonly title: string
  readonly tagline?: string
  readonly period: DateSpan
  readonly status: ProjectStatus
  readonly madeFor: string
  readonly feature?: ProjectFeature
  readonly contentStatus: ProjectContentStatus

  readonly bulletPoints: readonly string[]
  readonly technologies: readonly TechnologyId[]
  readonly imagePath?: string
  readonly imageAlt?: string
  readonly repoUrl?: string
  readonly liveUrl?: string
  readonly additionalLinks?: readonly ExternalLink[]
  readonly collaborators?: readonly Collaborator[]
}
