// src/types/projects.ts
// project & collaborator types

import type { ReactNode } from 'react';

export type ProjectStatus =
  | 'live'
  | 'in-development'
  | 'paused'
  | 'complete'
  | 'experimental'
  | 'planned';

export interface Collaborator
{
  name: string;
  url?: string;
}

export interface Project
{
  title: string;
  tagline?: string;
  dateRange: string;
  status: ProjectStatus;
  madeFor: string;
  featured?: boolean;
  bulletPoints: (string | ReactNode)[];
  technologies: string[];
  imagePath?: string;
  imageAlt?: string;
  repoUrl?: string;
  liveUrl?: string;
  collaborators?: Collaborator[];
}
