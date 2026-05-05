// scripts/accessibility.ts
// axe accessibility audit for each public route against a running local server

import { AxeBuilder } from '@axe-core/playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright'
import {
  DEFAULT_PREVIEW_PORT,
  getLocalBaseUrl,
  getRouteUrl,
  PLAYWRIGHT_LAUNCH_ARGS,
  REPORTS_DIR,
} from './lib/browserAudit'
import { printDivider, printTable } from './lib/cliFormat'
import { requireRunningServer } from './lib/devServer'
import { PUBLIC_ROUTES } from './lib/siteManifest'

const BASE_URL = getLocalBaseUrl(DEFAULT_PREVIEW_PORT)

const BLOCKING_IMPACTS = new Set(['critical', 'serious'])

interface RouteAccessibilityResult
{
  route: string
  violations: number
  blocking: number
  warnings: number
  report: string
}

async function main()
{
  await requireRunningServer(
    BASE_URL,
    'Run "npm run build && npm run preview" first, then try again.'
  )

  mkdirSync(REPORTS_DIR, { recursive: true })

  const browser = await chromium.launch({ args: [...PLAYWRIGHT_LAUNCH_ARGS] })

  try
  {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()
    const results: RouteAccessibilityResult[] = []
    const blockingMessages: string[] = []

    for (const route of PUBLIC_ROUTES)
    {
      const url = getRouteUrl(BASE_URL, route.path)
      console.log(`\nAuditing accessibility for ${url}...`)

      await page.goto(url, { waitUntil: 'networkidle' })
      await page.locator('main').waitFor({ state: 'visible', timeout: 10_000 })

      const axeResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

      const reportFilename = `accessibility-${route.slug}.json`
      const reportPath = `${REPORTS_DIR}/${reportFilename}`
      writeFileSync(reportPath, JSON.stringify(axeResults, null, 2))

      const blockingViolations = axeResults.violations.filter((violation) =>
        isBlockingImpact(violation.impact)
      )

      for (const violation of blockingViolations)
      {
        blockingMessages.push(
          [
            `${route.slug}: ${violation.id} (${violation.impact})`,
            violation.help,
            `Nodes: ${formatTargets(
              violation.nodes.map((node) => formatTarget(node.target))
            )}`,
          ].join(' - ')
        )
      }

      results.push({
        route: route.slug,
        violations: axeResults.violations.length,
        blocking: blockingViolations.length,
        warnings: axeResults.violations.length - blockingViolations.length,
        report: reportFilename,
      })

      console.log(`  Report saved: ${reportPath}`)
    }

    await context.close()

    printDivider(88)
    printTable(results, [
      { header: 'Route', width: 14, format: (r) => r.route },
      { header: 'Violations', width: 12, format: (r) => String(r.violations) },
      { header: 'Blocking', width: 10, format: (r) => String(r.blocking) },
      { header: 'Warnings', width: 10, format: (r) => String(r.warnings) },
      { header: 'Report', format: (r) => r.report },
    ])
    console.log('='.repeat(88))
    console.log(`\nAccessibility reports saved to ${REPORTS_DIR}\n`)

    if (blockingMessages.length > 0)
    {
      console.error('Blocking accessibility violations:')
      for (const message of blockingMessages)
      {
        console.error(`- ${message}`)
      }
      process.exitCode = 1
    }
  }
  finally
  {
    await browser.close()
  }
}

function formatTargets(targets: readonly string[]): string
{
  const shownTargets = targets.slice(0, 3)
  const suffix = targets.length > shownTargets.length ? ' ...' : ''

  return `${shownTargets.join('; ')}${suffix}`
}

function formatTarget(target: unknown): string
{
  if (!Array.isArray(target))
  {
    return String(target)
  }

  return target
    .map((part) => (typeof part === 'string' ? part : JSON.stringify(part)))
    .join(' ')
}

function isBlockingImpact(impact: string | null | undefined): boolean
{
  return typeof impact === 'string' && BLOCKING_IMPACTS.has(impact)
}

main()
