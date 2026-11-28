// src/shared/hooks/useRouteHead.ts
// keeps route-specific <head> tags in sync w/ the current public route

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import {
  ROUTE_HEAD_TAGS,
  getPublicRouteUrl,
  matchPublicRoute,
} from '~/shared/routing/publicRoutes'

// client navigation reuses the first page's <head>; rewrite the same tags the
// build rewrites for direct visits. usePageTitle owns document.title
export function useRouteHead(): void
{
  const { pathname } = useLocation()

  useEffect(() =>
  {
    const route = matchPublicRoute(pathname)
    if (!route)
    {
      return
    }

    const values = { ...route.head, url: getPublicRouteUrl(route) }
    for (const { tag, match, attribute, field } of ROUTE_HEAD_TAGS)
    {
      document
        .querySelector(`${tag}[${match[0]}="${match[1]}"]`)
        ?.setAttribute(attribute, values[field])
    }
  }, [pathname])
}
