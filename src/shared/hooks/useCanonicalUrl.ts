// src/shared/hooks/useCanonicalUrl.ts
// keeps the canonical link in sync w/ the current public route

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { PUBLIC_ROUTES, SITE_ORIGIN } from '~/shared/routing/publicRoutes'

// client navigation reuses the first page's <head>; point canonical at the
// current route the same way the build does for direct visits
export function useCanonicalUrl(): void
{
  const { pathname } = useLocation()

  useEffect(() =>
  {
    const route = PUBLIC_ROUTES.find(({ path }) => path === pathname)
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    )
    if (route && canonical)
    {
      canonical.href = new URL(route.path, SITE_ORIGIN).toString()
    }
  }, [pathname])
}
