// scripts/check-links.ts
// validates external URLs from content, metadata, & deployment files
// Usage: npm run check-links

import type { ExternalUrlReference } from '~/scripts/lib/contentInventory'

import { mapWithConcurrency } from '~/scripts/lib/async'
import { formatSources, printDivider } from '~/scripts/lib/cliFormat'
import { getContentInventory } from '~/scripts/lib/contentInventory'
import {
  getHostKey,
  getLinkPolicy,
  preferGetForHost,
  shouldFailLinkCheck,
  shouldRetryWithGet,
} from '~/scripts/lib/linkPolicy'

const TIMEOUT = 10_000
const PER_HOST_CONCURRENCY = 2
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
  'AppleWebKit/537.36 (KHTML, like Gecko) ' +
  'Chrome/136.0.0.0 Safari/537.36'

interface LinkResult extends ExternalUrlReference
{
  status: 'ok' | 'fail' | 'warn' | 'skip'
  detail: string
}

async function requestUrl(
  url: string,
  method: 'HEAD' | 'GET'
): Promise<Response>
{
  return fetch(url, {
    method,
    signal: AbortSignal.timeout(TIMEOUT),
    redirect: 'follow',
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  })
}

async function checkUrl(url: string): Promise<{ ok: boolean; detail: string }>
{
  try
  {
    const startsWithGet = preferGetForHost(url)
    if (!startsWithGet)
    {
      const headResponse = await requestUrl(url, 'HEAD')
      if (headResponse.ok)
      {
        return { ok: true, detail: `${headResponse.status}` }
      }
      if (!shouldRetryWithGet(headResponse.status))
      {
        return { ok: false, detail: `${headResponse.status}` }
      }
    }

    const getResponse = await requestUrl(url, 'GET')
    const note = startsWithGet ? '' : ' (GET fallback)'
    if (getResponse.ok)
    {
      return { ok: true, detail: `${getResponse.status}${note}` }
    }
    return { ok: false, detail: `${getResponse.status}${note}` }
  }
  catch (error)
  {
    const detail = error instanceof Error ? error.message : String(error)
    return {
      ok: false,
      detail: detail.includes('aborted') ? 'timeout' : detail,
    }
  }
}

async function checkByHost(
  entries: ReadonlyArray<ExternalUrlReference>
): Promise<LinkResult[]>
{
  // bucket by hostname so each host gets its own bounded worker pool
  const buckets = new Map<string, ExternalUrlReference[]>()
  for (const entry of entries)
  {
    const host = getHostKey(entry.url)
    let bucket = buckets.get(host)
    if (!bucket)
    {
      bucket = []
      buckets.set(host, bucket)
    }
    bucket.push(entry)
  }

  // process each host bucket w/ limited concurrency, in parallel across hosts
  const hostResults = await Promise.all(
    Array.from(buckets.values(), (bucket) =>
      mapWithConcurrency(bucket, PER_HOST_CONCURRENCY, checkEntry)
    )
  )
  return hostResults.flat()
}

async function checkEntry(entry: ExternalUrlReference): Promise<LinkResult>
{
  const policy = getLinkPolicy(entry.url)

  if (policy.expectation === 'skip')
  {
    console.log(`  SKIP  ${entry.url}  (${policy.reason})`)
    return {
      ...entry,
      status: 'skip',
      detail: policy.reason,
    }
  }

  const { ok, detail } = await checkUrl(entry.url)

  if (ok)
  {
    console.log(`  OK    ${entry.url}  (${detail})`)
    return {
      ...entry,
      status: 'ok',
      detail,
    }
  }

  const status = policy.expectation === 'warn' ? 'warn' : 'fail'
  const prefix = status === 'warn' ? '  WARN' : '  FAIL'

  console.log(`${prefix}  ${entry.url}  (${detail}; ${policy.reason})`)

  return {
    ...entry,
    status,
    detail,
  }
}

async function main()
{
  const inventory = getContentInventory()

  console.log(`\nChecking ${inventory.externalUrls.length} external URLs...\n`)

  const results = await checkByHost(inventory.externalUrls)
  const ok = results.filter((result) => result.status === 'ok')
  const failed = results.filter((result) => result.status === 'fail')
  const warned = results.filter((result) => result.status === 'warn')
  const skipped = results.filter((result) => result.status === 'skip')

  printDivider(96)

  if (failed.length > 0)
  {
    console.log(`\nFailed (${failed.length}):`)
    for (const result of failed)
    {
      console.log(
        `  !!  ${result.url}  [${result.detail}]  (${formatSources(result.sources)})`
      )
    }
  }

  if (warned.length > 0)
  {
    console.log(`\nWarnings (${warned.length}):`)
    for (const result of warned)
    {
      console.log(
        `  ??  ${result.url}  [${result.detail}]  (${formatSources(result.sources)})`
      )
    }
  }

  console.log(
    `\nSummary: ${ok.length} ok, ${failed.length} failed, ` +
      `${warned.length} warned, ${skipped.length} skipped\n`
  )

  if (shouldFailLinkCheck(results))
  {
    process.exit(1)
  }
}

main()
