// src/content/assets/publicAssets.ts
// UI-facing public asset paths & image metadata

import type { EducationLogo } from '~/shared/types'
import type { ImageAssetReference } from '~/shared/types/assets'
import { deepFreeze } from '~/shared/utils/deepFreeze'

// UI-facing path; components & tests reference this directly
export const RESUME_PATH = '/documents/garrett_fincke_resume.pdf'

// UI-facing image assets — path + alt only
export const SCHOOL_LOGO_ASSETS = deepFreeze({
  pitt: {
    path: '/assets/logos/schools/pitt.png',
    alt: 'University of Pittsburgh',
  },
  'penn-state': {
    path: '/assets/logos/schools/penn-state.png',
    alt: 'The Pennsylvania State University',
  },
} satisfies Record<EducationLogo, ImageAssetReference>)
