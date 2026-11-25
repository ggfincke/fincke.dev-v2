// functions/api/analytics.ts
// records portfolio page views & clicks in analytics engine

import {
  ANALYTICS_EVENT_TYPES,
  PROJECT_LINK_DESTINATIONS,
} from '../../src/shared/analytics/events'
import {
  PUBLIC_ROUTES,
  SITE_ORIGIN,
} from '../../src/shared/routing/publicRoutes'
import { PROJECT_IDS } from '../../src/shared/types/projects'

type AnalyticsContext = {
  request: Request & {
    cf?: {
      country?: string | null
      regionCode?: string | null
      city?: string | null
    }
  }
  env: {
    PAGE_VIEWS?: {
      writeDataPoint(point: { blobs: string[] }): void
    }
  }
}

export function onRequestPost({ request, env }: AnalyticsContext): Response
{
  const url = new URL(request.url)
  if (
    url.origin !== SITE_ORIGIN ||
    request.headers.get('Origin') !== SITE_ORIGIN
  )
  {
    return new Response(null, { status: 403 })
  }

  const path = url.searchParams.get('path')
  const event = url.searchParams.get('event')
  if (
    !path ||
    !PUBLIC_ROUTES.some((route) => route.path === path) ||
    !event ||
    !ANALYTICS_EVENT_TYPES.some((type) => type === event)
  )
  {
    return new Response(null, { status: 400 })
  }

  const project = url.searchParams.get('project')
  const destination = url.searchParams.get('destination')
  if (event === 'project_click')
  {
    if (
      !PROJECT_IDS.some((id) => id === project) ||
      !PROJECT_LINK_DESTINATIONS.some((kind) => kind === destination)
    )
    {
      return new Response(null, { status: 400 })
    }
  }
  else if (project !== null || destination !== null)
  {
    return new Response(null, { status: 400 })
  }

  if (!env.PAGE_VIEWS)
  {
    return new Response(null, { status: 503 })
  }

  const geo = event === 'page_view' ? request.cf : undefined
  env.PAGE_VIEWS.writeDataPoint({
    blobs: [
      path,
      geo?.country ?? '',
      geo?.regionCode ?? '',
      geo?.city ?? '',
      event,
      project ?? '',
      destination ?? '',
    ],
  })

  return new Response(null, { status: 204 })
}
