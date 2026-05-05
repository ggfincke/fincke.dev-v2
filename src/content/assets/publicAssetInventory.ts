// src/content/assets/publicAssetInventory.ts
// public asset inventory consumed by repository automation

import { RESUME_PATH, SCHOOL_LOGO_ASSETS } from '~/content/assets/publicAssets'
import type { PublicAssetReference } from '~/shared/types/assets'
import { deepFreeze } from '~/shared/utils/deepFreeze'

const RESUME_INVENTORY: PublicAssetReference = {
  path: RESUME_PATH,
  category: 'runtime',
  storage: 'public',
  source: 'JobHistory resume download',
}

const SCHOOL_LOGO_INVENTORY = [
  {
    path: SCHOOL_LOGO_ASSETS.pitt.path,
    category: 'runtime',
    storage: 'public',
    source: 'EducationCard Pitt logo',
  },
  {
    path: SCHOOL_LOGO_ASSETS['penn-state'].path,
    category: 'runtime',
    storage: 'public',
    source: 'EducationCard Penn State logo',
  },
] satisfies PublicAssetReference[]

export const PUBLIC_RUNTIME_ASSETS = deepFreeze([
  RESUME_INVENTORY,
  ...SCHOOL_LOGO_INVENTORY,
] satisfies PublicAssetReference[])

export const RETAINED_PUBLIC_ASSETS = deepFreeze([
  {
    path: '/documents/resume-master.pdf',
    category: 'retained',
    storage: 'public',
    source: 'retained manual resume source',
  },
  {
    path: '/assets/logos/brand/fincke-logo.svg',
    category: 'retained',
    storage: 'public',
    source: 'retained brand asset',
  },
] satisfies PublicAssetReference[])

export const DEPLOYMENT_PUBLIC_ASSETS = deepFreeze([
  {
    path: '/robots.txt',
    category: 'deployment',
    storage: 'public',
    source: 'deployment robots.txt',
  },
  {
    path: '/sitemap.xml',
    category: 'deployment',
    storage: 'public',
    source: 'deployment sitemap.xml',
  },
] satisfies PublicAssetReference[])
