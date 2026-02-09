// src/shared/types/experience.ts
// skill types

// skill category union type
export type SkillCategory =
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'mobile'
  | 'ai-ml'
  | 'tools'
  | 'specialized';

// individual skill entry shape
export interface Skill {
  name: string;
  category: SkillCategory;
  displayName?: string;
}
