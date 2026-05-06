// scripts/lib/paths.ts
// repo root anchor for script-side path joins

import { join } from 'node:path'

export const REPO_ROOT = join(import.meta.dirname, '..', '..')
export const PUBLIC_DIR = join(REPO_ROOT, 'public')
