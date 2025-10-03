// src/types/experience.ts
// skill types

export type SkillCategory =
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'mobile'
  | 'ai-ml'
  | 'tools'
  | 'specialized';

export interface Skill {
  name: string;
  category: SkillCategory;
  displayName?: string;
}
