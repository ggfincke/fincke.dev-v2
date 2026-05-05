// scripts/lighthouse.ts
// runs Lighthouse audits on both routes & outputs scores + HTML reports
// Usage: npm run lighthouse (requires "npm run preview" on localhost:4173)
// Lighthouse needs a production build for accurate scores; reduced motion keeps
// delayed entrance animations from hiding all initial content from FCP detection.

import { launch } from 'chrome-launcher'
import lighthouse from 'lighthouse'
import { mkdirSync, writeFileSync } from 'node:fs'
import { printDivider, printTable } from '~/scripts/lib/cliFormat'
import { requireRunningServer } from '~/scripts/lib/devServer'
import { PUBLIC_ROUTES, type PublicRoute } from '~/scripts/lib/siteManifest'
import {
  DEFAULT_PREVIEW_PORT,
  getLocalBaseUrl,
  getRouteUrl,
  LIGHTHOUSE_CHROME_FLAGS,
  REPORTS_DIR,
} from '~/scripts/lib/browserAudit'

const BASE_URL = getLocalBaseUrl(DEFAULT_PREVIEW_PORT)

const CATEGORIES = [
  'performance',
  'accessibility',
  'best-practices',
  'seo',
] as const

const SCORE_THRESHOLDS: Record<LighthouseCategory, number> = {
  performance: 90,
  accessibility: 100,
  'best-practices': 95,
  seo: 100,
}

type LighthouseCategory = (typeof CATEGORIES)[number]

interface RouteResult
{
  route: string
  scores: Record<LighthouseCategory, string>
  status: 'pass' | 'fail'
  error?: string
}

async function main()
{
  await requireRunningServer(
    BASE_URL,
    'Run "npm run build && npm run preview" first, then try again.'
  )

  mkdirSync(REPORTS_DIR, { recursive: true })

  const chrome = await launch({
    chromeFlags: [...LIGHTHOUSE_CHROME_FLAGS],
  })

  try
  {
    const failures: string[] = []
    const results: RouteResult[] = []

    // Lighthouse shares process-level performance marks/logger state, so keep
    // route audits serial while they share one Chrome instance.
    for (const route of PUBLIC_ROUTES)
    {
      results.push(await auditRoute(route, chrome.port, failures))
    }

    printDivider(72)
    printTable(results, [
      { header: 'Route', width: 14, format: (r) => r.route },
      {
        header: 'Performance',
        width: 16,
        format: (r) => r.scores['performance'],
      },
      {
        header: 'Accessibility',
        width: 16,
        format: (r) => r.scores['accessibility'],
      },
      {
        header: 'Best Practices',
        width: 18,
        format: (r) => r.scores['best-practices'],
      },
      {
        header: 'SEO',
        width: 8,
        format: (r) => r.scores['seo'],
      },
      {
        header: 'Status',
        format: (r) => r.status + (r.error ? `  (${r.error})` : ''),
      },
    ])
    console.log('='.repeat(72))
    console.log(`\nReports saved to ${REPORTS_DIR}\n`)

    if (failures.length > 0)
    {
      console.error('Lighthouse failures:')
      for (const failure of failures)
      {
        console.error(`- ${failure}`)
      }
      process.exitCode = 1
    }
  }
  finally
  {
    await chrome.kill()
  }
}

async function auditRoute(
  route: PublicRoute,
  chromePort: number | undefined,
  failures: string[]
): Promise<RouteResult>
{
  const url = getRouteUrl(BASE_URL, route.path)
  console.log(`\nAuditing ${url}...`)

  const result = await lighthouse(url, {
    port: chromePort,
    output: 'html',
    logLevel: 'error',
    onlyCategories: [...CATEGORIES],
  })

  const emptyScores = Object.fromEntries(
    CATEGORIES.map((cat) => [cat, 'N/A'])
  ) as Record<LighthouseCategory, string>

  if (!result)
  {
    const failure = `Lighthouse returned no result for ${url}`
    failures.push(`${route.slug}: ${failure}`)
    console.error(`  ${failure}`)
    return { route: route.slug, scores: emptyScores, status: 'fail' }
  }

  const reportPath = `${REPORTS_DIR}/lighthouse-${route.slug}.html`
  writeFileSync(reportPath, result.report as string)
  console.log(`  Report saved: ${reportPath}`)

  const runtimeError = result.lhr.runtimeError
  const routeFailures: string[] = []
  if (runtimeError?.code)
  {
    routeFailures.push(`${runtimeError.code}: ${runtimeError.message}`)
  }

  const scores = {} as Record<LighthouseCategory, string>
  for (const cat of CATEGORIES)
  {
    const category = result.lhr.categories[cat]
    const score =
      typeof category?.score === 'number'
        ? Math.round(category.score * 100)
        : null

    scores[cat] = score === null ? 'N/A' : String(score)

    if (score === null)
    {
      routeFailures.push(`${cat} score was unavailable`)
      continue
    }

    if (score < SCORE_THRESHOLDS[cat])
    {
      routeFailures.push(`${cat} score ${score} < ${SCORE_THRESHOLDS[cat]}`)
    }
  }

  failures.push(...routeFailures.map((failure) => `${route.slug}: ${failure}`))

  return {
    route: route.slug,
    scores,
    status: routeFailures.length > 0 ? 'fail' : 'pass',
    error: routeFailures.length > 0 ? runtimeError?.code : undefined,
  }
}

main()
