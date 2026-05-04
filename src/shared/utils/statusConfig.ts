// src/shared/utils/statusConfig.ts
// shared status configuration for badges & indicators

import type { ProjectStatus } from '~/shared/types'

// status display configuration shape
interface StatusConfig
{
  icon: string
  label: string
  colorVar: string
  bgColorVar: string
  // sort rank: lower = "more active" (bubbles to the top of an ascending sort)
  rank: number
}

// status-to-display mapping for all project statuses
export const statusConfig: Record<ProjectStatus, StatusConfig> = {
  'in-development': {
    icon: '🛠',
    label: 'In Development',
    colorVar: '--status-in-development',
    bgColorVar: '--status-in-development-bg',
    rank: 1,
  },
  complete: {
    icon: '✅',
    label: 'Complete',
    colorVar: '--status-complete',
    bgColorVar: '--status-complete-bg',
    rank: 5,
  },
  paused: {
    icon: '⏸',
    label: 'Paused',
    colorVar: '--status-paused',
    bgColorVar: '--status-paused-bg',
    rank: 3,
  },
  experimental: {
    icon: '🧪',
    label: 'Experimenting',
    colorVar: '--status-experimental',
    bgColorVar: '--status-experimental-bg',
    rank: 2,
  },
  planned: {
    icon: '🕓',
    label: 'Planned',
    colorVar: '--status-planned',
    bgColorVar: '--status-planned-bg',
    rank: 4,
  },
  live: {
    icon: '🚀',
    label: 'Live',
    colorVar: '--status-live',
    bgColorVar: '--status-live-bg',
    rank: 0,
  },
}
