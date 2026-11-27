// src/shared/analytics/track-event.ts
// sends first-party portfolio analytics events

import type {
  AnalyticsDeviceType,
  AnalyticsEvent,
} from '~/shared/analytics/events'
import {
  DIRECT_OR_UNKNOWN_SOURCE,
  normalizeAnalyticsSource,
} from '~/shared/analytics/source'
import {
  PUBLIC_ROUTES,
  SITE_ORIGIN,
  type PublicRoutePath,
} from '~/shared/routing/publicRoutes'

// capture the original landing source before the router can change the url
const landingSource =
  typeof window === 'undefined' ? undefined : getLandingSource()

function getLandingSource()
{
  const campaignSource = normalizeAnalyticsSource(
    new URLSearchParams(window.location.search).get('utm_source')
  )
  if (campaignSource)
  {
    return campaignSource
  }

  const referrer = new URL(document.referrer || SITE_ORIGIN)
  const host = referrer.hostname.replace(/\.$/, '')
  if (
    (referrer.protocol === 'https:' || referrer.protocol === 'http:') &&
    host.includes('.') &&
    host !== window.location.hostname &&
    host !== `www.${window.location.hostname}`
  )
  {
    return normalizeAnalyticsSource(host) ?? DIRECT_OR_UNKNOWN_SOURCE
  }

  return DIRECT_OR_UNKNOWN_SOURCE
}

function getDeviceType(): AnalyticsDeviceType
{
  const { userAgent, maxTouchPoints } = navigator
  const isMacintosh = /\bMacintosh\b/i.test(userAgent)

  // ipados can send a macintosh user agent in desktop mode
  if (
    /\b(iPad|Tablet|PlayBook|Kindle)\b/i.test(userAgent) ||
    (isMacintosh && maxTouchPoints > 1)
  )
  {
    return 'tablet'
  }

  if (/\b(iPhone|iPod|Windows Phone|Mobile|Mobi)\b/i.test(userAgent))
  {
    return 'mobile'
  }

  if (/\bAndroid\b/i.test(userAgent))
  {
    return 'tablet'
  }

  if (isMacintosh || /\b(Windows NT|X11|Linux|CrOS)\b/i.test(userAgent))
  {
    return 'desktop'
  }

  return 'unknown'
}

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
  if (event.type === 'page_view' && landingSource)
  {
    params.set('source', landingSource)
    params.set('device', getDeviceType())
  }
  else if (event.type === 'project_click')
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
