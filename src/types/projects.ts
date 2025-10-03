// src/types/projects.ts
// project & collaborator types

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
  status: 'live' | 'in-development' | 'paused' | 'complete' | 'experimental';
  madeFor: string;
  featured?: boolean;
  bulletPoints: (string | React.ReactNode)[];
  technologies: string[];
  imagePath?: string;
  imageAlt?: string;
  repoUrl?: string;
  liveUrl?: string;
  collaborators?: Collaborator[];
}
