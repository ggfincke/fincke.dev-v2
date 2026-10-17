// scripts/og-image.ts
// renders the 1200x630 social preview card from hero content & profile photo
// Usage: bun run og-image (rerun after changing the hero name or tagline)

import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { PLAYWRIGHT_LAUNCH_ARGS } from '~/scripts/lib/browserAudit'
import { PUBLIC_DIR } from '~/scripts/lib/paths'
import { OG_IMAGE_PATH, PROFILE_PHOTO_PATH } from '~/content/assets'
import { HERO_CONTENT } from '~/content/home'

const WIDTH = 1200
const HEIGHT = 630

function escapeHtml(value: string): string
{
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

// keep each tagline segment whole so lines only break at the separators
function formatTagline(tagline: string): string
{
  return tagline
    .split(' · ')
    .map((segment) => `<span class="segment">${escapeHtml(segment)}</span>`)
    .join(' · ')
}

// colors mirror the :root tokens in src/styles/globals.css
function buildCardHtml(photoDataUri: string): string
{
  return `<!doctype html>
<html>
<head>
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background: #0f111a;
    font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
    position: relative;
    overflow: hidden;
  }
  .glow {
    position: absolute;
    width: 720px;
    height: 720px;
    right: -160px;
    top: -200px;
    background: radial-gradient(circle, rgba(128, 203, 196, 0.22), transparent 65%);
  }
  .card {
    position: relative;
    height: 100%;
    padding: 0 88px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 64px;
  }
  .domain { color: #80cbc4; font-size: 28px; font-weight: 600; letter-spacing: 0.02em; }
  h1 { color: #89ddff; font-size: 88px; font-weight: 700; line-height: 1.05; margin-top: 20px; }
  .tagline { color: #babed8; font-size: 32px; line-height: 1.4; margin-top: 24px; max-width: 640px; }
  .segment { white-space: nowrap; }
  .bar { width: 96px; height: 6px; border-radius: 3px; background: #80cbc4; margin-top: 40px; }
  img {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 6px solid #80cbc4;
    flex-shrink: 0;
  }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="card">
    <div>
      <div class="domain">fincke.dev</div>
      <h1>${escapeHtml(HERO_CONTENT.name)}</h1>
      <p class="tagline">${formatTagline(HERO_CONTENT.tagline)}</p>
      <div class="bar"></div>
    </div>
    <img src="${photoDataUri}" alt="" />
  </div>
</body>
</html>`
}

async function main(): Promise<void>
{
  const photo = readFileSync(join(PUBLIC_DIR, PROFILE_PHOTO_PATH))
  const photoDataUri = `data:image/jpeg;base64,${photo.toString('base64')}`
  const outPath = join(PUBLIC_DIR, OG_IMAGE_PATH)

  const browser = await chromium.launch({ args: [...PLAYWRIGHT_LAUNCH_ARGS] })
  try
  {
    const page = await browser.newPage({
      viewport: { width: WIDTH, height: HEIGHT },
    })
    await page.setContent(buildCardHtml(photoDataUri), { waitUntil: 'load' })
    await page.screenshot({ path: outPath, type: 'png' })
  }
  finally
  {
    await browser.close()
  }

  console.log(`Wrote ${outPath}`)
}

await main()
