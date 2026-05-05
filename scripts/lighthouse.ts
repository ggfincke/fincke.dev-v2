// scripts/lighthouse.ts
// runs Lighthouse audits on both routes & outputs scores + HTML reports
// Usage: npm run lighthouse (requires "npm run preview" on localhost:4173)
// Lighthouse needs a production build for accurate scores; reduced motion keeps
// delayed entrance animations from hiding all initial content from FCP detection.

import { launch } from 'chrome-launcher'
import lighthouse from 'lighthouse'
import { mkdirSync, writeFileSync } from 'node:fs'
import { mapWithConcurrency } from './lib/async'
import { printDivider, printTable } from './lib/cliFormat'
import { requireRunningServer } from './lib/devServer'
import { PUBLIC_ROUTES, type PublicRoute } from './lib/siteManifest'
import {
  DEFAULT_PREVIEW_PORT,
  getLocalBaseUrl,
  getRouteUrl,
  LIGHTHOUSE_CHROME_FLAGS,
  REPORTS_DIR,
} from './lib/browserAudit'

const ROUTE_CONCURRENCY = 2

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
    const results = await mapWithConcurrency(
      PUBLIC_ROUTES,
      ROUTE_CONCURRENCY,
      async (route) => auditRoute(route, chrome.port, failures)
    )

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

main()
