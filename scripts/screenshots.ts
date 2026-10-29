// scripts/screenshots.ts
// full-page screenshots at various viewports inside a fake chrome frame; --smoke = CI route subset
// Usage: bun run screenshots [--smoke] (port: dev 5173 / smoke 4173; override w/ BASE_URL or PORT)

import { chromium } from 'playwright'
import { mkdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { mapWithConcurrency } from '~/scripts/lib/async'
import {
  DEFAULT_DEV_PORT,
  DEFAULT_PREVIEW_PORT,
  getLocalBaseUrl,
  getRouteUrl,
  PLAYWRIGHT_LAUNCH_ARGS,
  SCREENSHOTS_DIR,
} from '~/scripts/lib/browserAudit'
import {
  buildBrowserFrameHtml,
  getBrowserFrameHeight,
  type BrowserFrameKind,
} from '~/scripts/lib/browserFrame'
import { printDivider, printTable } from '~/scripts/lib/cliFormat'
import { requireRunningServer } from '~/scripts/lib/devServer'
import { PUBLIC_ROUTES } from '~/scripts/lib/siteManifest'
import { MAX_ANIMATION_DURATION_MS } from '~/shared/utils/animationConfig'

const SCREENSHOT_MODE = process.argv.includes('--smoke') ? 'smoke' : 'full'
const DEFAULT_SCREENSHOT_PORT =
  SCREENSHOT_MODE === 'smoke' ? DEFAULT_PREVIEW_PORT : DEFAULT_DEV_PORT
const BASE_URL = getLocalBaseUrl(DEFAULT_SCREENSHOT_PORT)
const OUT_DIR = join(
  SCREENSHOTS_DIR,
  SCREENSHOT_MODE === 'smoke' ? 'smoke' : ''
)
// derived from runtime stagger config so this stays correct when delays change
const ANIMATION_WAIT = MAX_ANIMATION_DURATION_MS + 200
// concurrent browser contexts during capture; tune up if your machine has the cores
const VIEWPORT_CONCURRENCY = 4

interface Viewport
{
  name: string
  width: number
  height: number
  dpr: number
  frame: BrowserFrameKind
}

// width/height = CSS pixels of the whole screen; the page gets height minus the frame
// dpr = deviceScaleFactor (output image rendered at width*dpr x height*dpr physical pixels)
// frame = browser/OS chrome drawn above the page
const FULL_VIEWPORTS: readonly Viewport[] = [
  // mobile (standard retina)
  { name: 'iPhone-SE', width: 375, height: 667, dpr: 2, frame: 'phone' },
  { name: 'iPhone-14-Pro', width: 393, height: 852, dpr: 3, frame: 'phone' },
  {
    name: 'iPhone-15-Pro-Max',
    width: 430,
    height: 932,
    dpr: 3,
    frame: 'phone',
  },
  // tablet (retina)
  { name: 'iPad-Mini', width: 768, height: 1024, dpr: 2, frame: 'tablet' },
  { name: 'iPad-Air', width: 820, height: 1180, dpr: 2, frame: 'tablet' },
  { name: 'iPad-Pro-12.9', width: 1024, height: 1366, dpr: 2, frame: 'tablet' },
  // tablet landscape (two-column home layout)
  {
    name: 'iPad-Mini-landscape',
    width: 1024,
    height: 768,
    dpr: 2,
    frame: 'tablet',
  },
  {
    name: 'iPad-Air-landscape',
    width: 1180,
    height: 820,
    dpr: 2,
    frame: 'tablet',
  },
  {
    name: 'iPad-Pro-12.9-landscape',
    width: 1366,
    height: 1024,
    dpr: 2,
    frame: 'tablet',
  },
  // MacBook (Retina 2x)
  { name: 'MacBook-Air-13', width: 1440, height: 900, dpr: 2, frame: 'macos' },
  {
    name: 'MacBook-Air-13-M2',
    width: 1470,
    height: 956,
    dpr: 2,
    frame: 'macos',
  },
  { name: 'MacBook-Pro-14', width: 1512, height: 982, dpr: 2, frame: 'macos' },
  { name: 'MacBook-Air-15', width: 1680, height: 1050, dpr: 2, frame: 'macos' },
  { name: 'MacBook-Pro-16', width: 1728, height: 1117, dpr: 2, frame: 'macos' },
  // windows laptops (most common css sizes)
  {
    name: 'Laptop-1366x768',
    width: 1366,
    height: 768,
    dpr: 1,
    frame: 'desktop',
  },
  {
    name: 'Laptop-1536x864',
    width: 1536,
    height: 864,
    dpr: 1.25,
    frame: 'desktop',
  },
  // desktop
  { name: '1080p', width: 1920, height: 1080, dpr: 1, frame: 'desktop' },
  { name: '1440p-QHD', width: 2560, height: 1440, dpr: 1, frame: 'desktop' },
  // 4K monitors (physical 3840x2160, typical OS scaling → CSS viewport)
  { name: '4K-150pct', width: 2560, height: 1440, dpr: 1.5, frame: 'desktop' },
  { name: '4K-200pct', width: 1920, height: 1080, dpr: 2, frame: 'desktop' },
]

const SMOKE_VIEWPORTS: readonly Viewport[] = [
  { name: 'iPhone-14-Pro', width: 393, height: 852, dpr: 3, frame: 'phone' },
  { name: 'MacBook-Air-13', width: 1440, height: 900, dpr: 2, frame: 'macos' },
]

const VIEWPORTS = SCREENSHOT_MODE === 'smoke' ? SMOKE_VIEWPORTS : FULL_VIEWPORTS

interface ShotResult
{
  viewport: string
  dims: string
  pageArea: string
  scrolls: boolean
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

async function captureViewport(
  browser: Awaited<ReturnType<typeof chromium.launch>>,
  vp: Viewport
): Promise<ShotResult[]>
{
  // page only gets what's left under the browser chrome, so vh math (e.g. the
  // home wave) lands where it would in a real window
  const pageHeight = vp.height - getBrowserFrameHeight(vp.frame)
  const context = await browser.newContext({
    viewport: { width: vp.width, height: pageHeight },
    deviceScaleFactor: vp.dpr,
    reducedMotion: SCREENSHOT_MODE === 'smoke' ? 'reduce' : 'no-preference',
  })

  try
  {
    const page = await context.newPage()
    const framePage = await context.newPage()
    const captures: ShotResult[] = []

    for (const route of PUBLIC_ROUTES)
    {
      const filename = `${vp.name}__${route.slug}.png`
      const filepath = join(OUT_DIR, filename)

      await page.goto(getRouteUrl(BASE_URL, route.path), {
        waitUntil: 'networkidle',
      })
      await page.locator('main').waitFor({ state: 'visible', timeout: 10_000 })
      const mainText = (await page.locator('main').innerText()).trim()

      if (!mainText)
      {
        throw new Error(`Route ${route.path} rendered an empty main landmark`)
      }

      // wait for the staggered fade-in to settle. networkidle resolves before
      // lazy route chunks mount, & `useMediaQuery` can briefly toggle the
      // mobile/desktop branch — both push real animation start past any fixed
      // timer. instead, wait for at least one row, then drain every finite
      // animation, polling across frames so late mounts get caught too.
      // reduced-motion mode finishes immediately since CSS pins opacity to 1.
      await page
        .locator('.animate-slide-in-up')
        .first()
        .waitFor({ state: 'attached', timeout: 5_000 })
      await page.evaluate(`new Promise((resolve) => {
        const cap = ${ANIMATION_WAIT * 2}
        const start = performance.now()
        const settled = () => {
          const els = document.querySelectorAll('.animate-slide-in-up')
          if (els.length === 0) return false
          for (const el of els) {
            if (parseFloat(getComputedStyle(el).opacity) < 0.99) return false
          }
          return true
        }
        const drain = async () => {
          const anims = document.getAnimations().filter((a) => {
            const t = a.effect && a.effect.getComputedTiming()
            return t && Number.isFinite(t.iterations)
              && Number.isFinite(t.duration)
          })
          await Promise.all(
            anims.map((a) => a.finished.catch(() => undefined))
          )
        }
        const tick = async () => {
          if (performance.now() - start > cap) return resolve()
          await drain()
          // give one frame for late mounts to register a fresh animation
          await new Promise((r) => requestAnimationFrame(() => r()))
          if (settled() && document.getAnimations().length === 0) {
            resolve()
          } else {
            tick()
          }
        }
        tick()
      })`)

      // full-page captures never scroll, so lazy images below the fold would
      // stay blank; force them eager & wait for every decode
      await page.evaluate(`Promise.all(
        Array.from(document.images, (img) => {
          img.loading = 'eager'
          return img.decode().catch(() => undefined)
        })
      )`)

      // the two-column home page must fit the window w/o scrolling
      const scrolls = await page.evaluate<boolean>(
        'document.documentElement.scrollHeight > window.innerHeight'
      )
      const pageShot = await page.screenshot({ fullPage: true })
      const faviconUrl = await page.evaluate<string | null>(
        `document.querySelector('link[rel~="icon"]')?.href ?? null`
      )

      await framePage.setContent(
        buildBrowserFrameHtml({
          kind: vp.frame,
          width: vp.width,
          title: await page.title(),
          url: page.url(),
          faviconUrl,
          screenshotDataUri: `data:image/png;base64,${pageShot.toString('base64')}`,
        }),
        { waitUntil: 'load' }
      )
      await framePage.screenshot({ path: filepath, fullPage: true })

      const size = statSync(filepath).size
      captures.push({
        viewport: vp.name,
        dims: `${vp.width}x${vp.height}`,
        pageArea: `${vp.width}x${pageHeight}`,
        scrolls,
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

async function main()
{
  await requireRunningServer(
    BASE_URL,
    'Run a Vite dev or preview server first.'
  )

  mkdirSync(OUT_DIR, { recursive: true })

  console.log(
    `\nCapturing ${SCREENSHOT_MODE} screenshots: ` +
      `${VIEWPORTS.length} viewports x ${PUBLIC_ROUTES.length} routes ` +
      `(concurrency ${VIEWPORT_CONCURRENCY})...\n`
  )

  const browser = await chromium.launch({ args: [...PLAYWRIGHT_LAUNCH_ARGS] })
  try
  {
    const allResults = await mapWithConcurrency(
      VIEWPORTS,
      VIEWPORT_CONCURRENCY,
      (vp) => captureViewport(browser, vp)
    )
    const results = allResults.flat()

    printDivider(123)
    printTable(results, [
      { header: 'Viewport', width: 24, format: (r) => r.viewport },
      { header: 'CSS Pixels', width: 14, format: (r) => r.dims },
      { header: 'Page Area', width: 14, format: (r) => r.pageArea },
      { header: 'Scrolls', width: 9, format: (r) => (r.scrolls ? 'yes' : '') },
      { header: 'DPR', width: 6, format: (r) => r.dpr },
      { header: 'Route', width: 12, format: (r) => r.route },
      { header: 'File Size', width: 12, format: (r) => r.size },
      { header: 'File', format: (r) => r.file },
    ])
    console.log('='.repeat(123))
    console.log(`\n${results.length} screenshots saved to ${OUT_DIR}\n`)
  }
  finally
  {
    await browser.close()
  }
}

main()
