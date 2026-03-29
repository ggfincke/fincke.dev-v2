// scripts/lib/siteManifest.ts
// shared site metadata for script consumers

export interface PublicRoute
{
  path: string
  slug: string
}

export const SITE_ORIGIN = 'https://fincke.dev'

export const PUBLIC_ROUTES = [
  {
    path: '/',
    slug: 'home',
  },
  {
    path: '/projects',
    slug: 'projects',
  },
] as const satisfies ReadonlyArray<PublicRoute>

export const SITEMAP_URL = new URL('/sitemap.xml', SITE_ORIGIN).toString()

export function getPublicRouteUrls(origin = SITE_ORIGIN): string[]
{
  return PUBLIC_ROUTES.map(({ path }) => new URL(path, origin).toString())
}
