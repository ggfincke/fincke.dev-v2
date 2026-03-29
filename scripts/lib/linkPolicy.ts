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

function isMediumHost(hostname: string): boolean
{
  return hostname === 'medium.com' || hostname.endsWith('.medium.com')
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

  if (isMediumHost(hostname))
  {
    return {
      expectation: 'warn',
      reason: 'anti-bot host',
    }
  }

  return {
    expectation: 'fail',
    reason: 'hard-fail host',
  }
}

export function shouldRetryWithGet(status: number): boolean
{
  return status < 200 || status >= 300
}

export function shouldFailLinkCheck(
  results: ReadonlyArray<LinkCheckOutcome>
): boolean
{
  return results.some((result) => result.status === 'fail')
}
