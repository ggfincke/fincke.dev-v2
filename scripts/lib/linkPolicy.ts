// scripts/lib/linkPolicy.ts
// policy for link-check expectations & exit behavior

export type LinkExpectation = 'fail' | 'warn' | 'skip'

export interface LinkPolicy
{
  expectation: LinkExpectation
  reason: string
}

export interface LinkCheckOutcome
{
  status: 'ok' | 'fail' | 'warn' | 'skip'
}

// hostnames that 405/403 on HEAD; skip straight to GET
const HOST_REQUIRES_GET = (hostname: string): boolean =>
  hostname === 'medium.com' ||
  hostname.endsWith('.medium.com') ||
  hostname === 'linkedin.com' ||
  hostname.endsWith('.linkedin.com') ||
  hostname === 'twitter.com' ||
  hostname === 'x.com' ||
  hostname.endsWith('.x.com')

// HTTP statuses where HEAD/GET semantics genuinely differ (server may allow GET
// but not HEAD, or return a false 404 for HEAD). Other non-2xx statuses are not
// worth a second request.
const GET_RETRY_STATUSES = new Set([403, 404, 405, 501])

function isAntiBotHost(hostname: string): boolean
{
  return (
    hostname === 'medium.com' ||
    hostname.endsWith('.medium.com') ||
    hostname === 'linkedin.com' ||
    hostname.endsWith('.linkedin.com')
  )
}

export function getLinkPolicy(url: string): LinkPolicy
{
  if (url.startsWith('mailto:') || url.startsWith('tel:'))
  {
    return {
      expectation: 'skip',
      reason: 'non-http scheme',
    }
  }

  const hostname = new URL(url).hostname.toLowerCase()

  if (isAntiBotHost(hostname))
  {
    return {
      expectation: 'warn',
      reason: 'anti-bot host',
    }
  }

  return { expectation: 'fail', reason: 'default policy' }
}

// hosts where HEAD is unreliable; client should issue GET only
export function preferGetForHost(url: string): boolean
{
  try
  {
    return HOST_REQUIRES_GET(new URL(url).hostname.toLowerCase())
  }
  catch
  {
    return false
  }
}

export function shouldRetryWithGet(status: number): boolean
{
  return GET_RETRY_STATUSES.has(status)
}

export function shouldFailLinkCheck(
  results: ReadonlyArray<LinkCheckOutcome>
): boolean
{
  return results.some((result) => result.status === 'fail')
}

// expose hostname for callers that want per-host concurrency keying
export function getHostKey(url: string): string
{
  try
  {
    return new URL(url).hostname.toLowerCase()
  }
  catch
  {
    return url
  }
}
