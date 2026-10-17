// src/content/assets/publicAssets.ts
// UI-facing public asset paths & image metadata

import type { EducationLogo } from '~/shared/types'
import type { ImageAssetReference } from '~/shared/types/assets'
import { deepFreeze } from '~/shared/utils/deepFreeze'

// UI-facing path; components & tests reference this directly
export const RESUME_PATH = '/documents/garrett_fincke_resume.pdf'

// social preview card referenced by index.html og:image; regenerate w/ `bun run og-image`
export const OG_IMAGE_PATH = '/assets/images/og-card.png'

// headshot used by the OG card generator & JSON-LD image
export const PROFILE_PHOTO_PATH = '/assets/images/profile.jpg'

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
