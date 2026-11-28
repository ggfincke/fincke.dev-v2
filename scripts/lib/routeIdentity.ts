// scripts/lib/routeIdentity.ts
// proves a browser check landed on the route it meant to inspect

import type { Page, Response } from 'playwright'

import { HERO_CONTENT } from '~/content/home'
import { PROJECTS_CONTENT } from '~/content/projects'
import type { PublicRoute, PublicRouteSlug } from '~/scripts/lib/siteManifest'

// the h1 each route renders, read from the same content the pages use; keyed
// by slug so a new route can't be added w/o one
const ROUTE_HEADINGS: Readonly<Record<PublicRouteSlug, string>> = {
  home: HERO_CONTENT.name,
  projects: PROJECTS_CONTENT.archiveTitle,
}

const HEADING_TIMEOUT_MS = 10_000

// a redirect or misroute shows up as a different final path
export function getFinalUrlFailure(
  route: PublicRoute,
  finalUrl: string
): string | undefined
{
  const { pathname } = new URL(finalUrl)
  return pathname === route.path
    ? undefined
    : `expected to end on ${route.path} but ended on ${pathname}`
}

// status, final path & the route's own h1; main-landmark text alone can't
// tell the archive from a home page served in its place
export async function getRouteIdentityFailures(
  page: Page,
  response: Response | null,
  route: PublicRoute
): Promise<string[]>
{
  const failures: string[] = []
  const status = response?.status()
  if (status !== 200)
  {
    failures.push(`expected HTTP 200 but got ${status ?? 'no response'}`)
  }

  const urlFailure = getFinalUrlFailure(route, page.url())
  if (urlFailure)
  {
    failures.push(urlFailure)
  }

  const expected = ROUTE_HEADINGS[route.slug]
  await page
    .locator('h1', { hasText: expected })
    .first()
    .waitFor({ state: 'attached', timeout: HEADING_TIMEOUT_MS })
    .catch(() => undefined)
  const headings = (await page.locator('h1').allTextContents()).map((text) =>
    text.replace(/\s+/g, ' ').trim()
  )
  if (headings.length !== 1 || headings[0] !== expected)
  {
    failures.push(
      `expected one h1 "${expected}" but found ${JSON.stringify(headings)}`
    )
  }

  return failures
}
