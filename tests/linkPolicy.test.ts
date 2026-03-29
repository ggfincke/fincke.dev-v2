// tests/linkPolicy.test.ts
// coverage for content-health link policy behavior

import { describe, expect, it } from 'vitest'

import {
  getLinkPolicy,
  shouldFailLinkCheck,
  shouldRetryWithGet,
} from '../scripts/lib/linkPolicy'

describe('link policy', () =>
{
  it('skips non-http schemes', () =>
  {
    expect(getLinkPolicy('mailto:test@example.com')).toMatchObject({
      expectation: 'skip',
    })
    expect(getLinkPolicy('tel:+15555551212')).toMatchObject({
      expectation: 'skip',
    })
  })

  it('soft-fails anti-bot hosts and hard-fails public urls', () =>
  {
    expect(getLinkPolicy('https://medium.com/@ggfincke')).toMatchObject({
      expectation: 'warn',
      reason: 'anti-bot host',
    })
    expect(
      getLinkPolicy('https://github.com/ggfincke/fincke.dev-v2')
    ).toMatchObject({
      expectation: 'fail',
      reason: 'hard-fail host',
    })
  })

  it('retries non-success head responses with get', () =>
  {
    expect(shouldRetryWithGet(200)).toBe(false)
    expect(shouldRetryWithGet(301)).toBe(true)
    expect(shouldRetryWithGet(404)).toBe(true)
  })

  it('fails the script only when a hard failure exists', () =>
  {
    expect(
      shouldFailLinkCheck([
        { status: 'ok' },
        { status: 'warn' },
        { status: 'skip' },
      ])
    ).toBe(false)
    expect(shouldFailLinkCheck([{ status: 'warn' }, { status: 'fail' }])).toBe(
      true
    )
  })
})
