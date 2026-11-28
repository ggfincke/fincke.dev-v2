// scripts/thumbnails.ts
// renders the small WebP thumbnails that featured home cards load
// Usage: bun run thumbnails (rerun after changing a featured project's image)

import { chromium, type Page } from 'playwright'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { PLAYWRIGHT_LAUNCH_ARGS } from '~/scripts/lib/browserAudit'
import { PUBLIC_DIR } from '~/scripts/lib/paths'
import { projects } from '~/content/projects'

// widest a card image is drawn (phone, full-width card) times a 2x screen
const MAX_WIDTH = 800
const QUALITY = 0.84

const MIME_TYPES: Readonly<Record<string, string>> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
}

// scale the source down to MAX_WIDTH on a canvas & return WebP bytes
async function renderThumbnail(
  page: Page,
  sourcePath: string
): Promise<Buffer>
{
  const mimeType = MIME_TYPES[extname(sourcePath).toLowerCase()]
  if (!mimeType)
  {
    throw new Error(`${sourcePath}: unsupported source image type`)
  }

  const source = readFileSync(join(PUBLIC_DIR, sourcePath)).toString('base64')
  await page.setContent(
    `<img src="data:${mimeType};base64,${source}" alt="" />`,
    { waitUntil: 'load' }
  )

  const dataUrl = await page.evaluate<string | null>(`(async () => {
    const img = document.images[0]
    try { await img.decode() } catch { return null }
    const scale = Math.min(1, ${MAX_WIDTH} / img.naturalWidth)
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(img.naturalWidth * scale)
    canvas.height = Math.round(img.naturalHeight * scale)
    const context = canvas.getContext('2d')
    context.imageSmoothingQuality = 'high'
    context.drawImage(img, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/webp', ${QUALITY})
  })()`)

  if (!dataUrl?.startsWith('data:image/webp;base64,'))
  {
    throw new Error(`${sourcePath}: source image did not decode`)
  }

  return Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64')
}

async function main(): Promise<void>
{
  const browser = await chromium.launch({ args: [...PLAYWRIGHT_LAUNCH_ARGS] })
  try
  {
    const page = await browser.newPage()
    for (const project of projects)
    {
      const thumbnailPath = project.feature?.thumbnailPath
      if (!thumbnailPath || !project.imagePath)
      {
        continue
      }

      const thumbnail = await renderThumbnail(page, project.imagePath)
      const outPath = join(PUBLIC_DIR, thumbnailPath)
      mkdirSync(dirname(outPath), { recursive: true })
      writeFileSync(outPath, thumbnail)
      console.log(`Wrote ${outPath} (${thumbnail.byteLength} bytes)`)
    }
  }
  finally
  {
    await browser.close()
  }
}

await main()
