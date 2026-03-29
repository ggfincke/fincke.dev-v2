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
}

// status-to-display mapping for all project statuses
export const statusConfig: Record<ProjectStatus, StatusConfig> = {
  'in-development': {
    icon: '🛠',
    label: 'In Development',
    colorVar: '--status-in-development',
    bgColorVar: '--status-in-development-bg',
  },
  complete: {
    icon: '✅',
    label: 'Complete',
    colorVar: '--status-complete',
    bgColorVar: '--status-complete-bg',
  },
  paused: {
    icon: '⏸',
    label: 'Paused',
    colorVar: '--status-paused',
    bgColorVar: '--status-paused-bg',
  },
  experimental: {
    icon: '🧪',
    label: 'Experimenting',
    colorVar: '--status-experimental',
    bgColorVar: '--status-experimental-bg',
  },
  planned: {
    icon: '🕓',
    label: 'Planned',
    colorVar: '--status-planned',
    bgColorVar: '--status-planned-bg',
  },
  live: {
    icon: '🚀',
    label: 'Live',
    colorVar: '--status-live',
    bgColorVar: '--status-live-bg',
  },
}
