// scripts/lighthouse.ts
// runs Lighthouse audits on both routes & outputs scores + HTML reports
// Usage: npm run lighthouse (requires "npm run preview" on localhost:4173)
// Lighthouse needs a production build for accurate scores — dev server HMR/sourcemaps skew results

import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'http://localhost:4173';
const REPORTS_DIR = join(import.meta.dirname, '..', 'reports');

const ROUTES = [
  { path: '/', slug: 'home' },
  { path: '/projects', slug: 'projects' },
];

const CATEGORIES = [
  'performance',
  'accessibility',
  'best-practices',
  'seo',
] as const;

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
      `\nPreview server not reachable at ${BASE_URL}` +
        `\nRun "npm run build && npm run preview" first, then try again.\n`
    );
    process.exit(1);
  }

  if (!existsSync(REPORTS_DIR)) mkdirSync(REPORTS_DIR, { recursive: true });

  const chrome = await launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
  });
  const results: {
    route: string;
    scores: Record<string, string>;
    error?: string;
  }[] = [];

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route.path}`;
    console.log(`\nAuditing ${url}...`);

    const result = await lighthouse(url, {
      port: chrome.port,
      output: 'html',
      logLevel: 'error',
      onlyCategories: [...CATEGORIES],
    });

    if (!result) {
      console.error(`  Lighthouse returned no result for ${url}`);
      continue;
    }

    const reportPath = join(REPORTS_DIR, `lighthouse-${route.slug}.html`);
    writeFileSync(reportPath, result.report as string);
    console.log(`  Report saved: ${reportPath}`);

    // check for runtime errors (e.g. NO_FCP from opacity-0 animations)
    const runtimeError = result.lhr.runtimeError;
    if (runtimeError?.code) {
      console.log(`  Warning: ${runtimeError.code} — ${runtimeError.message}`);
    }

    const scores: Record<string, string> = {};
    for (const cat of CATEGORIES) {
      const category = result.lhr.categories[cat];
      scores[cat] =
        category?.score !== null
          ? String(Math.round(category!.score * 100))
          : 'N/A';
    }
    results.push({ route: route.slug, scores, error: runtimeError?.code });
  }

  await chrome.kill();

  // summary table
  console.log('\n' + '='.repeat(72));
  console.log(
    'Route'.padEnd(14) +
      'Performance'.padEnd(16) +
      'Accessibility'.padEnd(16) +
      'Best Practices'.padEnd(18) +
      'SEO'
  );
  console.log('-'.repeat(72));
  for (const r of results) {
    const note = r.error ? `  (${r.error})` : '';
    console.log(
      r.route.padEnd(14) +
        r.scores['performance'].padEnd(16) +
        r.scores['accessibility'].padEnd(16) +
        r.scores['best-practices'].padEnd(18) +
        r.scores['seo'] +
        note
    );
  }
  console.log('='.repeat(72));
  console.log(`\nReports saved to ${REPORTS_DIR}\n`);
}

main();
