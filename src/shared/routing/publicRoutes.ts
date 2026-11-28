// src/shared/routing/publicRoutes.ts
// canonical public route metadata for router & script consumers

export const SITE_ORIGIN = 'https://fincke.dev'

// home <head> copy; the build writes it into index.html & the default document
// title reads it, so the template text is only a placeholder
export const HOME_HEAD = {
  title: 'Garrett Fincke | Software Engineer',
  description:
    'Software engineer and M.S. CS student at Pitt, focused on AI/LLM infrastructure, retrieval systems, and full-stack development. Experience with Python, TypeScript, FastAPI, React, and LLM evaluation.',
} as const

// every route carries its own <head> copy; the build emits `${slug}.html` from
// index.html w/ these values so link previews & crawlers see per-route meta
export const PUBLIC_ROUTES = [
  {
    slug: 'home',
    path: '/',
    childPath: '',
    head: HOME_HEAD,
  },
  {
    slug: 'projects',
    path: '/projects',
    childPath: 'projects',
    head: {
      title: 'All Projects | Garrett Fincke',
      description:
        'Archive of software projects by Garrett Fincke: AI/LLM tooling, full-stack web apps, native iOS/watchOS apps, and systems coursework.',
    },
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

// public route for a browser pathname; the router also accepts a trailing
// slash & any letter case, so both are folded before comparing
export function matchPublicRoute(pathname: string): PublicRoute | undefined
{
  const path = pathname.replace(/\/+$/, '').toLowerCase() || '/'
  return PUBLIC_ROUTES.find((route) => route.path === path)
}

// absolute canonical URL for a public route
export function getPublicRouteUrl(route: PublicRoute): string
{
  return new URL(route.path, SITE_ORIGIN).toString()
}

export type RouteHeadField = 'title' | 'description' | 'url'

export interface RouteHeadTag
{
  tag: 'meta' | 'link'
  // attribute name & value that identify the tag
  match: readonly [name: string, value: string]
  // attribute that carries the route-specific value
  attribute: 'content' | 'href'
  field: RouteHeadField
}

// * head tags w/ route-specific values, besides <title>
// the build (routeHtml) & the client (useRouteHead) both walk this list so a
// client navigation can't leave a tag the static pages would have rewritten
export const ROUTE_HEAD_TAGS: readonly RouteHeadTag[] = [
  {
    tag: 'meta',
    match: ['name', 'title'],
    attribute: 'content',
    field: 'title',
  },
  {
    tag: 'meta',
    match: ['property', 'og:title'],
    attribute: 'content',
    field: 'title',
  },
  {
    tag: 'meta',
    match: ['name', 'twitter:title'],
    attribute: 'content',
    field: 'title',
  },
  {
    tag: 'meta',
    match: ['name', 'description'],
    attribute: 'content',
    field: 'description',
  },
  {
    tag: 'meta',
    match: ['property', 'og:description'],
    attribute: 'content',
    field: 'description',
  },
  {
    tag: 'meta',
    match: ['name', 'twitter:description'],
    attribute: 'content',
    field: 'description',
  },
  { tag: 'link', match: ['rel', 'canonical'], attribute: 'href', field: 'url' },
  {
    tag: 'meta',
    match: ['property', 'og:url'],
    attribute: 'content',
    field: 'url',
  },
  {
    tag: 'meta',
    match: ['name', 'twitter:url'],
    attribute: 'content',
    field: 'url',
  },
]
