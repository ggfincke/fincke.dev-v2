// src/shared/analytics/events.ts
// shared analytics event names & allowed project link destinations

import type { ProjectId } from '~/shared/types/projects'

export const ANALYTICS_EVENT_TYPES = [
  'page_view',
  'resume_click',
  'project_click',
] as const

export const PROJECT_LINK_DESTINATIONS = ['repo', 'live', 'extra'] as const

export type ProjectLinkDestination = (typeof PROJECT_LINK_DESTINATIONS)[number]

export type AnalyticsEvent =
  | { type: 'page_view' | 'resume_click' }
  | {
      type: 'project_click'
      projectId: ProjectId
      destination: ProjectLinkDestination
    }
