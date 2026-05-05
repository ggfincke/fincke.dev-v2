// src/content/assets/publicAssets.ts
// content-owned public asset references used by UI & repo automation

import type { EducationLogo } from '~/shared/types'
import type {
  ImageAssetReference,
  PublicAssetReference,
} from '~/shared/types/assets'
import { deepFreeze } from '~/shared/utils/deepFreeze'

export const RESUME_ASSET: PublicAssetReference = deepFreeze({
  path: '/documents/garrett_fincke_resume.pdf',
  category: 'runtime',
  storage: 'public',
  source: 'JobHistory resume download',
} satisfies PublicAssetReference)

export const SCHOOL_LOGO_ASSETS: Readonly<
  Record<EducationLogo, ImageAssetReference>
> = deepFreeze({
  pitt: {
    path: '/assets/logos/schools/pitt.png',
    category: 'runtime',
    storage: 'public',
    source: 'EducationCard Pitt logo',
    alt: 'University of Pittsburgh',
  },
  'penn-state': {
    path: '/assets/logos/schools/penn-state.png',
    category: 'runtime',
    storage: 'public',
    source: 'EducationCard Penn State logo',
    alt: 'The Pennsylvania State University',
  },
} satisfies Record<EducationLogo, ImageAssetReference>)

export const PUBLIC_RUNTIME_ASSETS: readonly PublicAssetReference[] =
  deepFreeze([
    RESUME_ASSET,
    ...Object.values(SCHOOL_LOGO_ASSETS),
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
