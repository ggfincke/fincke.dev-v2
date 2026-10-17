// src/content/home/hero.ts
// hero section content

import type { HeroContent } from '~/shared/types'
import { deepFreeze } from '~/shared/utils/deepFreeze'

// hero name data
export const HERO_CONTENT = deepFreeze({
  name: 'Garrett Fincke',
  tagline: 'Software Engineer · M.S. CS @ Pitt · AI/LLM + Full-Stack',
} satisfies HeroContent)
