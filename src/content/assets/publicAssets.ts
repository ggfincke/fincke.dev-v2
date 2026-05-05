// src/content/assets/publicAssets.ts
// content-owned public asset references used by UI & repo automation

import type { EducationLogo } from '~/shared/types'
import type {
  ImageAssetReference,
  PublicAssetReference,
} from '~/shared/types/assets'
import { deepFreeze } from '~/shared/utils/deepFreeze'

// UI-facing path; components & tests reference this directly
export const RESUME_PATH = '/documents/garrett_fincke_resume.pdf'

// UI-facing image assets — path + alt only
export const SCHOOL_LOGO_ASSETS: Readonly<
  Record<EducationLogo, ImageAssetReference>
> = deepFreeze({
  pitt: {
    path: '/assets/logos/schools/pitt.png',
    alt: 'University of Pittsburgh',
  },
  'penn-state': {
    path: '/assets/logos/schools/penn-state.png',
    alt: 'The Pennsylvania State University',
  },
} satisfies Record<EducationLogo, ImageAssetReference>)

// Inventory record for the resume — consumed by automation, not by UI code.
const RESUME_INVENTORY: PublicAssetReference = {
  path: RESUME_PATH,
  category: 'runtime',
  storage: 'public',
  source: 'JobHistory resume download',
}

const SCHOOL_LOGO_INVENTORY: readonly PublicAssetReference[] = [
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
]

export const PUBLIC_RUNTIME_ASSETS: readonly PublicAssetReference[] =
  deepFreeze([
    RESUME_INVENTORY,
    ...SCHOOL_LOGO_INVENTORY,
  ] satisfies PublicAssetReference[])

export const RETAINED_PUBLIC_ASSETS: readonly PublicAssetReference[] =
  deepFreeze([
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

export const DEPLOYMENT_PUBLIC_ASSETS: readonly PublicAssetReference[] =
  deepFreeze([
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
