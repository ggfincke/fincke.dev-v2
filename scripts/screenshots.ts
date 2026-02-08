// scripts/screenshots.ts
// Takes full-page screenshots of the site at various viewport sizes.
// Usage: npm run screenshots (requires dev server running on localhost:5173)

import { chromium } from 'playwright';
import { existsSync, mkdirSync, statSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'http://localhost:5173';
const OUT_DIR = join(import.meta.dirname, '..', 'screenshots');
const ANIMATION_WAIT = 800; // longest CSS animation is 600ms + buffer

// width/height = CSS pixels (what the browser sees for media queries)
// dpr = deviceScaleFactor (output image rendered at width*dpr x height*dpr physical pixels)
const VIEWPORTS = [
  // Mobile (standard retina)
  { name: 'iPhone-SE', width: 375, height: 667, dpr: 2 },
  { name: 'iPhone-14-Pro', width: 393, height: 852, dpr: 3 },
  { name: 'iPhone-15-Pro-Max', width: 430, height: 932, dpr: 3 },
  // Tablet (retina)
  { name: 'iPad-Mini', width: 768, height: 1024, dpr: 2 },
  { name: 'iPad-Air', width: 820, height: 1180, dpr: 2 },
  { name: 'iPad-Pro-12.9', width: 1024, height: 1366, dpr: 2 },
  // MacBook (Retina 2x)
  { name: 'MacBook-Air-13', width: 1440, height: 900, dpr: 2 },
  { name: 'MacBook-Air-13-M2', width: 1470, height: 956, dpr: 2 },
  { name: 'MacBook-Pro-14', width: 1512, height: 982, dpr: 2 },
  { name: 'MacBook-Air-15', width: 1680, height: 1050, dpr: 2 },
  { name: 'MacBook-Pro-16', width: 1728, height: 1117, dpr: 2 },
  // Desktop
  { name: '1080p', width: 1920, height: 1080, dpr: 1 },
  { name: '1440p-QHD', width: 2560, height: 1440, dpr: 1 },
  // 4K monitors (physical 3840x2160, typical OS scaling → CSS viewport)
  { name: '4K-150pct', width: 2560, height: 1440, dpr: 1.5 },
  { name: '4K-200pct', width: 1920, height: 1080, dpr: 2 },
];

const ROUTES = [
  { path: '/', slug: 'home' },
  { path: '/projects', slug: 'projects' },
];

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

async function checkServer(): Promise<boolean> {
  try {
    const res = await fetch(BASE_URL);
    return res.ok;
  } catch {
    return false;
  }
}

async function main() {
  const serverUp = await checkServer();
  if (!serverUp) {
    console.error(
      `\nDev server not reachable at ${BASE_URL}\nRun "npm run dev" first, then try again.\n`
    );
    process.exit(1);
  }

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  console.log(
    `\nCapturing ${VIEWPORTS.length} viewports x ${ROUTES.length} routes...\n`
  );

  const browser = await chromium.launch();
  const results: {
    viewport: string;
    dims: string;
    dpr: string;
    route: string;
    file: string;
    size: string;
  }[] = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.dpr,
    });
    const page = await context.newPage();

    for (const route of ROUTES) {
      const filename = `${vp.name}__${route.slug}.png`;
      const filepath = join(OUT_DIR, filename);

      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(ANIMATION_WAIT);
      await page.screenshot({ path: filepath, fullPage: true });

      const size = statSync(filepath).size;
      results.push({
        viewport: vp.name,
        dims: `${vp.width}x${vp.height}`,
        dpr: `${vp.dpr}x`,
        route: route.slug,
        file: filename,
        size: formatSize(size),
      });

      console.log(`  ${filename} (${formatSize(size)})`);
    }

    await context.close();
  }

  // summary table
  console.log('\n' + '='.repeat(100));
  console.log(
    'Viewport'.padEnd(24) +
      'CSS Pixels'.padEnd(14) +
      'DPR'.padEnd(6) +
      'Route'.padEnd(12) +
      'File Size'.padEnd(12) +
      'File'
  );
  console.log('-'.repeat(100));
  for (const r of results) {
    console.log(
      r.viewport.padEnd(24) +
        r.dims.padEnd(14) +
        r.dpr.padEnd(6) +
        r.route.padEnd(12) +
        r.size.padEnd(12) +
        r.file
    );
  }
  console.log('='.repeat(100));
  console.log(`\n${results.length} screenshots saved to ${OUT_DIR}\n`);

  await browser.close();
}

main();
