// src/types/experience.ts
// experience & skill types

export interface Experience
{
  id: string;
  date: string;
  title: string;
  company: string;
  companyUrl: string;
  technologies: string[];
  companyLogos: React.ReactNode;
  content: React.ReactNode;
}

export type SkillCategory =
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'mobile'
  | 'ai-ml'
  | 'tools'
  | 'specialized';

export interface Skill
{
  name: string;
  category: SkillCategory;
  displayName?: string;
}
