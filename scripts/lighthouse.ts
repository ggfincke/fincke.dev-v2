// scripts/lighthouse.ts
// runs Lighthouse audits on both routes & outputs scores + HTML reports
// Usage: npm run lighthouse (requires "npm run preview" on localhost:4173)
// Lighthouse needs a production build for accurate scores — dev server HMR/sourcemaps skew results

import { launch } from 'chrome-launcher'
import lighthouse from 'lighthouse'
import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { printDivider, printTable } from './lib/cliFormat'
import { requireRunningServer } from './lib/devServer'
import { PUBLIC_ROUTES } from './lib/siteManifest'

const BASE_URL = 'http://localhost:4173'
const REPORTS_DIR = join(import.meta.dirname, '..', 'reports')

const CATEGORIES = [
  'performance',
  'accessibility',
  'best-practices',
  'seo',
] as const

interface RouteResult
{
  route: string
  scores: Record<string, string>
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
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
  })

  try
  {
    const results: RouteResult[] = []

    for (const route of PUBLIC_ROUTES)
    {
      const url = `${BASE_URL}${route.path}`
      console.log(`\nAuditing ${url}...`)

      const result = await lighthouse(url, {
        port: chrome.port,
        output: 'html',
        logLevel: 'error',
        onlyCategories: [...CATEGORIES],
      })

      if (!result)
      {
        console.error(`  Lighthouse returned no result for ${url}`)
        continue
      }

      const reportPath = join(REPORTS_DIR, `lighthouse-${route.slug}.html`)
      writeFileSync(reportPath, result.report as string)
      console.log(`  Report saved: ${reportPath}`)

      // check for runtime errors (e.g. NO_FCP from opacity-0 animations)
      const runtimeError = result.lhr.runtimeError
      if (runtimeError?.code)
      {
        console.log(`  Warning: ${runtimeError.code} — ${runtimeError.message}`)
      }

      const scores: Record<string, string> = {}
      for (const cat of CATEGORIES)
      {
        const category = result.lhr.categories[cat]
        scores[cat] =
          category?.score !== null
            ? String(Math.round(category!.score * 100))
            : 'N/A'
      }
      results.push({ route: route.slug, scores, error: runtimeError?.code })
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
        format: (r) => r.scores['seo'] + (r.error ? `  (${r.error})` : ''),
      },
    ])
    console.log('='.repeat(72))
    console.log(`\nReports saved to ${REPORTS_DIR}\n`)
  }
  finally
  {
    await chrome.kill()
  }
}

main()
