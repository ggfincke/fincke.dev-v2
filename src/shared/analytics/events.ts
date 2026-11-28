// src/shared/analytics/events.ts
// shared analytics event names & allowed dimensions

import type { ProjectId } from '~/shared/types/projects'

export const ANALYTICS_EVENT_TYPES = [
  'page_view',
  'resume_click',
  'project_click',
] as const

export const PROJECT_LINK_DESTINATIONS = ['repo', 'live', 'extra'] as const

export const ANALYTICS_DEVICE_TYPES = [
  'desktop',
  'mobile',
  'tablet',
  'unknown',
] as const

export type ProjectLinkDestination = (typeof PROJECT_LINK_DESTINATIONS)[number]
export type AnalyticsDeviceType = (typeof ANALYTICS_DEVICE_TYPES)[number]

export type AnalyticsEvent =
  | { type: 'page_view' | 'resume_click' }
  | {
      type: 'project_click'
      projectId: ProjectId
      destination: ProjectLinkDestination
    }
