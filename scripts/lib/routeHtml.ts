// scripts/lib/routeHtml.ts
// rewrites the built index.html <head> for a public route

// relative on purpose: vite.config.ts loads this file w/o the `~` alias
import {
  ROUTE_HEAD_TAGS,
  type RouteHeadField,
} from '../../src/shared/routing/publicRoutes.ts'

export type RouteHead = Record<RouteHeadField, string>

interface HeadReplacement
{
  pattern: RegExp
  field: RouteHeadField
}

function escapeRegExp(value: string): string
{
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// each pattern must match the index.html template exactly once; anything else
// throws so a template edit can't silently ship a route page w/ stale meta
const HEAD_REPLACEMENTS: readonly HeadReplacement[] = [
  { pattern: /(<title>)[^<]*(<\/title>)/g, field: 'title' },
  ...ROUTE_HEAD_TAGS.map(({ tag, match, attribute, field }) => ({
    pattern: new RegExp(
      `(<${tag}\\s+${match[0]}="${escapeRegExp(match[1])}"\\s+${attribute}=")[^"]*(")`,
      'g'
    ),
    field,
  })),
]

function escapeAttribute(value: string): string
{
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

// blank out comment bodies at the same length, so a commented-out tag can't
// match while every offset still lines up w/ the original document
function maskComments(html: string): string
{
  return html.replace(/<!--[\s\S]*?-->/g, (comment) =>
    ' '.repeat(comment.length)
  )
}

function replaceLiveTag(html: string, pattern: RegExp, value: string): string
{
  const matches = [...maskComments(html).matchAll(pattern)]
  const [match] = matches
  if (matches.length !== 1 || !match)
  {
    throw new Error(
      `index.html must have exactly one live tag matching ${pattern} (found ${matches.length})`
    )
  }

  const [whole, open, close] = match
  return (
    html.slice(0, match.index) +
    `${open}${escapeAttribute(value)}${close}` +
    html.slice(match.index + whole.length)
  )
}

export function applyRouteHead(html: string, head: RouteHead): string
{
  return HEAD_REPLACEMENTS.reduce(
    (current, { pattern, field }) =>
      replaceLiveTag(current, pattern, head[field]),
    html
  )
}
