// scripts/check-links.ts
// Validates all external URLs and local asset paths from content data.
// Usage: npm run check-links

import { existsSync } from 'fs';
import { join } from 'path';
import { projects } from '../src/content/projects/all';
import { SOCIAL_LINKS } from '../src/content/home/socialLinks';
import { WORK_EXPERIENCE } from '../src/content/experience/workExperience';

const ROOT = join(import.meta.dirname, '..');
const PUBLIC = join(ROOT, 'public');
const TIMEOUT = 10_000;
const BATCH_SIZE = 5;

interface LinkEntry {
  url: string;
  source: string;
}

interface LinkResult extends LinkEntry {
  status: 'ok' | 'fail' | 'skip';
  detail: string;
}

function collectExternalUrls(): LinkEntry[] {
  const urls: LinkEntry[] = [];

  for (const p of projects) {
    if (p.repoUrl) urls.push({ url: p.repoUrl, source: `project: ${p.title}` });
    if (p.liveUrl && !p.liveUrl.startsWith('/'))
      urls.push({ url: p.liveUrl, source: `project liveUrl: ${p.title}` });
    if (p.additionalLinks) {
      for (const link of p.additionalLinks) {
        urls.push({ url: link.url, source: `project link: ${p.title} (${link.label})` });
      }
    }
  }

  for (const s of SOCIAL_LINKS) {
    urls.push({ url: s.url, source: `social: ${s.label}` });
  }

  for (const w of WORK_EXPERIENCE) {
    if (w.link) urls.push({ url: w.link, source: `experience: ${w.company}` });
  }

  return urls;
}

function collectLocalPaths(): LinkEntry[] {
  const paths: LinkEntry[] = [];

  for (const p of projects) {
    if (p.imagePath) paths.push({ url: p.imagePath, source: `project image: ${p.title}` });
    if (p.liveUrl?.startsWith('/'))
      paths.push({ url: p.liveUrl, source: `project liveUrl: ${p.title}` });
  }

  // hardcoded asset refs in components
  paths.push({ url: '/documents/resume-selected.pdf', source: 'JobHistory.tsx' });

  return paths;
}

async function checkUrl(url: string): Promise<{ ok: boolean; detail: string }> {
  // skip non-http URLs
  if (url.startsWith('mailto:') || url.startsWith('tel:')) {
    return { ok: true, detail: 'skipped (mailto/tel)' };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'fincke.dev-link-checker/1.0' },
    });
    clearTimeout(timer);

    if (res.ok) return { ok: true, detail: `${res.status}` };

    // some servers reject HEAD, retry with GET
    if (res.status === 405 || res.status === 403) {
      const getRes = await fetch(url, {
        method: 'GET',
        signal: AbortSignal.timeout(TIMEOUT),
        redirect: 'follow',
        headers: { 'User-Agent': 'fincke.dev-link-checker/1.0' },
      });
      if (getRes.ok) return { ok: true, detail: `${getRes.status} (GET fallback)` };
      return { ok: false, detail: `${getRes.status}` };
    }

    return { ok: false, detail: `${res.status}` };
  } catch (err) {
    clearTimeout(timer);
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('abort')) return { ok: false, detail: 'timeout' };
    return { ok: false, detail: msg };
  }
}

async function checkInBatches(
  entries: LinkEntry[],
  fn: (entry: LinkEntry) => Promise<LinkResult>
): Promise<LinkResult[]> {
  const results: LinkResult[] = [];
  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);
  }
  return results;
}

async function main() {
  const externalUrls = collectExternalUrls();
  const localPaths = collectLocalPaths();

  console.log(
    `\nChecking ${externalUrls.length} external URLs + ${localPaths.length} local paths...\n`
  );

  // check local paths (sync)
  const localResults: LinkResult[] = localPaths.map((entry) => {
    const diskPath = join(PUBLIC, ...entry.url.split('/').filter(Boolean));
    const exists = existsSync(diskPath);
    return {
      ...entry,
      status: exists ? 'ok' : 'fail',
      detail: exists ? 'exists' : 'FILE NOT FOUND',
    };
  });

  // check external URLs (async, batched)
  const externalResults = await checkInBatches(externalUrls, async (entry) => {
    if (entry.url.startsWith('mailto:') || entry.url.startsWith('tel:')) {
      console.log(`  SKIP  ${entry.url}`);
      return { ...entry, status: 'skip' as const, detail: 'mailto/tel' };
    }

    const { ok, detail } = await checkUrl(entry.url);
    const status = ok ? 'ok' : 'fail';
    const icon = ok ? '  OK  ' : '  FAIL';
    console.log(`${icon}  ${entry.url}  (${detail})`);
    return { ...entry, status, detail };
  });

  const allResults = [...localResults, ...externalResults];
  const ok = allResults.filter((r) => r.status === 'ok');
  const failed = allResults.filter((r) => r.status === 'fail');
  const skipped = allResults.filter((r) => r.status === 'skip');

  // summary
  console.log('\n' + '='.repeat(90));

  if (failed.length > 0) {
    console.log(`\nFailed (${failed.length}):`);
    for (const f of failed) {
      console.log(`  !!  ${f.url}  [${f.detail}]  (${f.source})`);
    }
  }

  console.log(
    `\nSummary: ${ok.length} ok, ${failed.length} failed, ${skipped.length} skipped\n`
  );

  if (failed.length > 0) process.exit(1);
}

main();
