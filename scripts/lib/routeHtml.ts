// scripts/lib/routeHtml.ts
// rewrites the built index.html <head> for a non-home public route

export interface RouteHead
{
  title: string
  description: string
  url: string
}

// each pattern must match the index.html template; a miss throws so a
// template edit can't silently ship a route page w/ the home page's meta
const HEAD_REPLACEMENTS: ReadonlyArray<{
  pattern: RegExp
  value: (head: RouteHead) => string
}> = [
  { pattern: /(<title>)[^<]*(<\/title>)/, value: (head) => head.title },
  {
    pattern: /(<meta\s+name="title"\s+content=")[^"]*(")/,
    value: (head) => head.title,
  },
  {
    pattern: /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
    value: (head) => head.title,
  },
  {
    pattern: /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
    value: (head) => head.title,
  },
  {
    pattern: /(<meta\s+name="description"\s+content=")[^"]*(")/,
    value: (head) => head.description,
  },
  {
    pattern: /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
    value: (head) => head.description,
  },
  {
    pattern: /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
    value: (head) => head.description,
  },
  {
    pattern: /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
    value: (head) => head.url,
  },
  {
    pattern: /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
    value: (head) => head.url,
  },
  {
    pattern: /(<meta\s+name="twitter:url"\s+content=")[^"]*(")/,
    value: (head) => head.url,
  },
]

function escapeAttribute(value: string): string
{
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

export function applyRouteHead(html: string, head: RouteHead): string
{
  return HEAD_REPLACEMENTS.reduce((current, { pattern, value }) =>
  {
    if (!pattern.test(current))
    {
      throw new Error(`index.html is missing the tag matched by ${pattern}`)
    }
    return current.replace(
      pattern,
      (_, open: string, close: string) =>
        `${open}${escapeAttribute(value(head))}${close}`
    )
  }, html)
}
