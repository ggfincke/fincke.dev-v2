// tests/ui/routeManifestContracts.test.tsx
// route tree & public manifest drift coverage

import type { RouteObject } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { appRoutes } from '~/app/router'
import { PUBLIC_ROUTES } from '~/shared/routing/publicRoutes'
import { PUBLIC_ROUTES as SCRIPT_PUBLIC_ROUTES } from '../../scripts/lib/siteManifest'

function joinRoutePath(parentPath: string, childPath: string | undefined)
{
  if (!childPath)
  {
    return parentPath || '/'
  }

  if (childPath.startsWith('/'))
  {
    return childPath
  }

  const normalizedParent =
    parentPath === '/' ? '' : parentPath.replace(/\/$/, '')

  return `${normalizedParent}/${childPath}`
}

function collectPublicLeafPaths(
  routes: readonly RouteObject[],
  parentPath = ''
): string[]
{
  const publicPaths: string[] = []

  for (const route of routes)
  {
    if (route.path === '*')
    {
      continue
    }

    if (route.index)
    {
      publicPaths.push(parentPath || '/')
      continue
    }

    const routePath = joinRoutePath(parentPath, route.path)

    if (route.children)
    {
      publicPaths.push(...collectPublicLeafPaths(route.children, routePath))
      continue
    }

    publicPaths.push(routePath)
  }

  return publicPaths
}

describe('route manifest contracts', () =>
{
  it('keeps public app routes aligned with the shared manifest', () =>
  {
    expect(collectPublicLeafPaths(appRoutes)).toEqual(
      PUBLIC_ROUTES.map((route) => route.path)
    )
  })

  it('exposes the shared public routes to script consumers', () =>
  {
    expect(SCRIPT_PUBLIC_ROUTES).toBe(PUBLIC_ROUTES)
  })
})
