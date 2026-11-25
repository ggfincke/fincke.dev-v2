// src/shared/analytics/track-event.ts
// sends first-party portfolio analytics events

import type { AnalyticsEvent } from '~/shared/analytics/events'
import {
  PUBLIC_ROUTES,
  SITE_ORIGIN,
  type PublicRoutePath,
} from '~/shared/routing/publicRoutes'

export function getAnalyticsPagePath(
  pathname: string
): PublicRoutePath | undefined
{
  const path = pathname.replace(/\/+$/, '').toLowerCase() || '/'
  return PUBLIC_ROUTES.find((route) => route.path === path)?.path
}

export function trackAnalyticsEvent(
  event: AnalyticsEvent,
  pagePath = getAnalyticsPagePath(window.location.pathname)
)
{
  if (
    !import.meta.env.PROD ||
    window.location.origin !== SITE_ORIGIN ||
    !pagePath
  )
  {
    return
  }

  const params = new URLSearchParams({ path: pagePath, event: event.type })
  if (event.type === 'project_click')
  {
    params.set('project', event.projectId)
    params.set('destination', event.destination)
  }

  void fetch(`/api/analytics?${params}`, {
    method: 'POST',
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    keepalive: true,
  }).catch(() => undefined)
}
