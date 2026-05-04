// scripts/screenshots.ts
// takes full-page screenshots of the site at various viewport sizes
// Usage: npm run screenshots (requires dev server). Override port via PORT env var (default 5174).

import { chromium } from 'playwright'
import { mkdirSync, statSync } from 'fs'
import { join } from 'path'
import { printDivider, printTable } from './lib/cliFormat'
import { requireRunningServer } from './lib/devServer'
import { PUBLIC_ROUTES } from './lib/siteManifest'
import { MAX_ANIMATION_DURATION_MS } from '~/shared/utils/animationConfig'

const PORT = process.env.PORT ?? '5174'
const BASE_URL = `http://localhost:${PORT}`
const OUT_DIR = join(import.meta.dirname, '..', 'screenshots')
// derived from runtime stagger config so this stays correct when delays change
const ANIMATION_WAIT = MAX_ANIMATION_DURATION_MS + 200
// concurrent browser contexts during capture; tune up if your machine has the cores
const VIEWPORT_CONCURRENCY = 4

// width/height = CSS pixels (what the browser sees for media queries)
// dpr = deviceScaleFactor (output image rendered at width*dpr x height*dpr physical pixels)
const VIEWPORTS = [
  // mobile (standard retina)
  { name: 'iPhone-SE', width: 375, height: 667, dpr: 2 },
  { name: 'iPhone-14-Pro', width: 393, height: 852, dpr: 3 },
  { name: 'iPhone-15-Pro-Max', width: 430, height: 932, dpr: 3 },
  // tablet (retina)
  { name: 'iPad-Mini', width: 768, height: 1024, dpr: 2 },
  { name: 'iPad-Air', width: 820, height: 1180, dpr: 2 },
  { name: 'iPad-Pro-12.9', width: 1024, height: 1366, dpr: 2 },
  // MacBook (Retina 2x)
  { name: 'MacBook-Air-13', width: 1440, height: 900, dpr: 2 },
  { name: 'MacBook-Air-13-M2', width: 1470, height: 956, dpr: 2 },
  { name: 'MacBook-Pro-14', width: 1512, height: 982, dpr: 2 },
  { name: 'MacBook-Air-15', width: 1680, height: 1050, dpr: 2 },
  { name: 'MacBook-Pro-16', width: 1728, height: 1117, dpr: 2 },
  // desktop
  { name: '1080p', width: 1920, height: 1080, dpr: 1 },
  { name: '1440p-QHD', width: 2560, height: 1440, dpr: 1 },
  // 4K monitors (physical 3840x2160, typical OS scaling → CSS viewport)
  { name: '4K-150pct', width: 2560, height: 1440, dpr: 1.5 },
  { name: '4K-200pct', width: 1920, height: 1080, dpr: 2 },
]

interface ShotResult
{
  viewport: string
  dims: string
  dpr: string
  route: string
  file: string
  size: string
}

function formatSize(bytes: number): string
{
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  return `${(kb / 1024).toFixed(2)} MB`
}

type Viewport = (typeof VIEWPORTS)[number]

async function captureViewport(
  browser: Awaited<ReturnType<typeof chromium.launch>>,
  vp: Viewport
): Promise<ShotResult[]>
{
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dpr,
  })

  try
  {
    const page = await context.newPage()
    const captures: ShotResult[] = []

    for (const route of PUBLIC_ROUTES)
    {
      const filename = `${vp.name}__${route.slug}.png`
      const filepath = join(OUT_DIR, filename)

      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(ANIMATION_WAIT)
      await page.screenshot({ path: filepath, fullPage: true })

      const size = statSync(filepath).size
      captures.push({
        viewport: vp.name,
        dims: `${vp.width}x${vp.height}`,
        dpr: `${vp.dpr}x`,
        route: route.slug,
        file: filename,
        size: formatSize(size),
      })

      console.log(`  ${filename} (${formatSize(size)})`)
    }

    return captures
  }
  finally
  {
    await context.close()
  }
}

// run async work over an array w/ a fixed concurrency cap
async function mapWithConcurrency<T, R>(
  items: ReadonlyArray<T>,
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]>
{
  const results: R[] = new Array(items.length)
  let cursor = 0

  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    async () =>
    {
      while (cursor < items.length)
      {
        const index = cursor++
        results[index] = await fn(items[index])
      }
    }
  )

  await Promise.all(workers)
  return results
}

async function main()
{
  await requireRunningServer(
    BASE_URL,
    'Run "npm run dev" first, then try again.'
  )

  mkdirSync(OUT_DIR, { recursive: true })

  console.log(
    `\nCapturing ${VIEWPORTS.length} viewports x ${PUBLIC_ROUTES.length} routes ` +
      `(concurrency ${VIEWPORT_CONCURRENCY})...\n`
  )

  const browser = await chromium.launch()
  try
  {
    const allResults = await mapWithConcurrency(
      VIEWPORTS,
      VIEWPORT_CONCURRENCY,
      (vp) => captureViewport(browser, vp)
    )
    const results = allResults.flat()

    printDivider(100)
    printTable(results, [
      { header: 'Viewport', width: 24, format: (r) => r.viewport },
      { header: 'CSS Pixels', width: 14, format: (r) => r.dims },
      { header: 'DPR', width: 6, format: (r) => r.dpr },
      { header: 'Route', width: 12, format: (r) => r.route },
      { header: 'File Size', width: 12, format: (r) => r.size },
      { header: 'File', format: (r) => r.file },
    ])
    console.log('='.repeat(100))
    console.log(`\n${results.length} screenshots saved to ${OUT_DIR}\n`)
  }
  finally
  {
    await browser.close()
  }
}

main()
