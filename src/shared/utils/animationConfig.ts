// src/shared/utils/animationConfig.ts
// centralized animation delay configuration for home page sections

// per-section animation delay values
export const ANIMATION_DELAYS = {
  hero: '0.1s',
  about: '0.3s',
  socialLinks: '0.5s',
  jobHistory: { base: 0.4, step: 0.1 },
  featuredProjects: { base: 0.6, step: 0.1 },
} as const;

// compute staggered animation delay for list items
export const staggerDelay = (
  base: number,
  step: number,
  index: number
): string => `${(base + index * step).toFixed(2)}s`;
