// src/shared/routing/publicRoutes.ts
// canonical public route metadata for router & script consumers

export const PUBLIC_ROUTE_PATHS = {
  home: '/',
  projects: '/projects',
} as const

export type PublicRouteSlug = keyof typeof PUBLIC_ROUTE_PATHS
export type PublicRoutePath =
  (typeof PUBLIC_ROUTE_PATHS)[keyof typeof PUBLIC_ROUTE_PATHS]

export interface PublicRoute
{
  path: PublicRoutePath
  slug: PublicRouteSlug
}

export const PUBLIC_ROUTES = [
  {
    path: PUBLIC_ROUTE_PATHS.home,
    slug: 'home',
  },
  {
    path: PUBLIC_ROUTE_PATHS.projects,
    slug: 'projects',
  },
] as const satisfies readonly PublicRoute[]

export function getPublicRouteChildPath(path: PublicRoutePath): string
{
  if (path === PUBLIC_ROUTE_PATHS.home)
  {
    return ''
  }

  return path.replace(/^\//, '')
}
