// scripts/validate-assets.ts
// Validates that all referenced assets exist and finds orphaned files in public/.
// Usage: npm run validate-assets

import { existsSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { projects } from '../src/content/projects/all';

const ROOT = join(import.meta.dirname, '..');
const PUBLIC = join(ROOT, 'public');

// hardcoded asset refs found in components/HTML (not in content data)
// note: thumbnail.ico is in project root, processed by Vite from index.html — not in public/
const HARDCODED_REFS = [
  '/documents/resume-selected.pdf',
  '/documents/resume-master.pdf',
  '/assets/images/profile.jpg',
  '/assets/logos/brand/fincke-logo.svg',
];

function collectReferencedPaths(): Map<string, string> {
  const paths = new Map<string, string>();

  for (const p of projects) {
    if (p.imagePath) paths.set(p.imagePath, `project: ${p.title}`);
    if (p.liveUrl?.startsWith('/')) paths.set(p.liveUrl, `project liveUrl: ${p.title}`);
  }

  for (const ref of HARDCODED_REFS) {
    paths.set(ref, 'hardcoded');
  }

  return paths;
}

function getAllPublicFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllPublicFiles(fullPath));
    } else {
      results.push('/' + relative(PUBLIC, fullPath).replace(/\\/g, '/'));
    }
  }
  return results;
}

function main() {
  const referenced = collectReferencedPaths();
  const allPublicFiles = new Set(getAllPublicFiles(PUBLIC));

  const found: { path: string; source: string }[] = [];
  const missing: { path: string; source: string }[] = [];

  for (const [refPath, source] of referenced) {
    const diskPath = join(PUBLIC, ...refPath.split('/').filter(Boolean));
    if (existsSync(diskPath)) {
      found.push({ path: refPath, source });
    } else {
      missing.push({ path: refPath, source });
    }
  }

  const orphaned = [...allPublicFiles].filter(f => !referenced.has(f));

  // print results
  console.log(`\nReferenced & Found (${found.length}):`);
  console.log('-'.repeat(80));
  for (const f of found) {
    console.log(`  OK  ${f.path}  (${f.source})`);
  }

  if (missing.length > 0) {
    console.log(`\nReferenced & MISSING (${missing.length}):`);
    console.log('-'.repeat(80));
    for (const m of missing) {
      console.log(`  !!  ${m.path}  (${m.source})`);
    }
  } else {
    console.log('\nNo missing assets.');
  }

  if (orphaned.length > 0) {
    console.log(`\nOrphaned / Unreferenced (${orphaned.length}):`);
    console.log('-'.repeat(80));
    for (const o of orphaned) {
      const size = statSync(join(PUBLIC, ...o.split('/').filter(Boolean))).size;
      const kb = (size / 1024).toFixed(1);
      console.log(`  ??  ${o}  (${kb} KB)`);
    }
  } else {
    console.log('\nNo orphaned assets.');
  }

  console.log(
    `\nSummary: ${found.length} found, ${missing.length} missing, ${orphaned.length} orphaned\n`
  );

  if (missing.length > 0) process.exit(1);
}

main();
