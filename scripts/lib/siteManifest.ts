// scripts/lib/siteManifest.ts
// shared site metadata for script consumers

import { PUBLIC_ROUTES, type PublicRoute } from '~/shared/routing/publicRoutes'

export { PUBLIC_ROUTES, type PublicRoute }

export const SITE_ORIGIN = 'https://fincke.dev'

export const SITEMAP_URL = new URL('/sitemap.xml', SITE_ORIGIN).toString()

export function getPublicRouteUrls(origin = SITE_ORIGIN): string[]
{
  return PUBLIC_ROUTES.map(({ path }) => new URL(path, origin).toString())
}
