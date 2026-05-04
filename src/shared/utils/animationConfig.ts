// src/shared/utils/animationConfig.ts
// centralized animation delay configuration for home page sections

// per-section animation delay values
export const ANIMATION_DELAYS = {
  hero: '0.1s',
  about: '0.3s',
  socialLinks: '0.7s',
  education: { base: 0.5, step: 0.05 },
  jobHistory: { base: 0.4, step: 0.1 },
  featuredProjects: { base: 0.6, step: 0.1 },
  projectsArchive: {
    mobile: { base: 0.05, step: 0.03 },
    desktop: { base: 0.05, step: 0.025 },
  },
} as const

// individual fade/slide keyframe durations declared in globals.css
const ANIMATION_KEYFRAME_DURATION_S = 0.6

// upper bound: longest stagger start + keyframe duration. tools that wait for
// animations to finish (e.g. screenshot capture) should use this to derive
// their wait window instead of hard-coding a number.
export const MAX_ANIMATION_DURATION_MS = (() =>
{
  const ramps = [
    ANIMATION_DELAYS.education,
    ANIMATION_DELAYS.jobHistory,
    ANIMATION_DELAYS.featuredProjects,
    ANIMATION_DELAYS.projectsArchive.mobile,
    ANIMATION_DELAYS.projectsArchive.desktop,
  ]
  // assume up to 30 staggered items per ramp; in practice we have ≤ 24 projects
  const STAGGER_BUDGET = 30
  const longestStaggerStart = Math.max(
    ...ramps.map((r) => r.base + r.step * STAGGER_BUDGET)
  )
  return Math.ceil((longestStaggerStart + ANIMATION_KEYFRAME_DURATION_S) * 1000)
})()

// shared motion utility classes
export const MOTION_CLASSES = {
  emphasizedOut: 'ease-emphasized-out',
  emphasizedColors:
    'transition-colors duration-300 ease-emphasized-out motion-reduce:transition-none',
  emphasizedFilter:
    'transition-[filter] duration-300 ease-emphasized-out motion-reduce:transition-none',
  emphasizedGridRows:
    'transition-[grid-template-rows] duration-300 ease-emphasized-out motion-reduce:transition-none',
  emphasizedTransformShadow:
    'transition-[box-shadow,transform] duration-300 ease-emphasized-out motion-reduce:transition-none',
} as const

// compute staggered animation delay for list items
export const staggerDelay = (
  base: number,
  step: number,
  index: number
): string => `${(base + index * step).toFixed(2)}s`

// build the inline `style` object that consumers always wrap staggerDelay in
export function getStaggerStyle(
  base: number,
  step: number,
  index: number
): { animationDelay: string }
{
  return { animationDelay: staggerDelay(base, step, index) }
}
