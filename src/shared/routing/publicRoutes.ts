// src/shared/routing/publicRoutes.ts
// canonical public route metadata for router & script consumers

export const PUBLIC_ROUTES = [
  {
    slug: 'home',
    path: '/',
    childPath: '',
  },
  {
    slug: 'projects',
    path: '/projects',
    childPath: 'projects',
  },
] as const

export type PublicRoute = (typeof PUBLIC_ROUTES)[number]
export type PublicRouteSlug = PublicRoute['slug']
export type PublicRoutePath = PublicRoute['path']

export const PUBLIC_ROUTE_PATHS = Object.freeze(
  Object.fromEntries(PUBLIC_ROUTES.map(({ slug, path }) => [slug, path]))
) as {
  readonly [Route in PublicRoute as Route['slug']]: Route['path']
}

export const PUBLIC_ROUTE_CHILD_PATHS = Object.freeze(
  Object.fromEntries(
    PUBLIC_ROUTES.map(({ slug, childPath }) => [slug, childPath])
  )
) as {
  readonly [Route in PublicRoute as Route['slug']]: Route['childPath']
}
