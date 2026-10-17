// scripts/lib/siteManifest.ts
// shared site metadata for script consumers

import {
  PUBLIC_ROUTES,
  SITE_ORIGIN,
  type PublicRoute,
} from '~/shared/routing/publicRoutes'

export { PUBLIC_ROUTES, SITE_ORIGIN, type PublicRoute }

export const SITEMAP_URL = new URL('/sitemap.xml', SITE_ORIGIN).toString()

export function getPublicRouteUrls(origin = SITE_ORIGIN): string[]
{
  return PUBLIC_ROUTES.map(({ path }) => new URL(path, origin).toString())
}
