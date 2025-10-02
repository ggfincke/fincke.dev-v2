// Experience types
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

// Skill types
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
