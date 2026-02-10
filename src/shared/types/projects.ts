// src/shared/types/projects.ts
// project & collaborator types

import type { ReactNode } from 'react';

// project lifecycle status union type
export type ProjectStatus =
  | 'live'
  | 'in-development'
  | 'paused'
  | 'complete'
  | 'experimental'
  | 'planned';

// collaborator entry shape
export interface Collaborator {
  name: string;
  url?: string;
}

// external link shape
export interface ExternalLink {
  url: string;
  label: string;
}

// project entry shape
export interface Project {
  title: string;
  tagline?: string;
  dateRange: string;
  status: ProjectStatus;
  madeFor: string;

  bulletPoints: (string | ReactNode)[];
  technologies: string[];
  imagePath?: string;
  imageAlt?: string;
  repoUrl?: string;
  liveUrl?: string;
  additionalLinks?: ExternalLink[];
  collaborators?: Collaborator[];
}
