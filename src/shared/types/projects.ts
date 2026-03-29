// src/shared/types/projects.ts
// project & collaborator types

import type { TechnologyId } from '~/content/technologies'

import type { DateSpan } from './dates'

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
  id: string
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
