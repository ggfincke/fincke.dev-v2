// src/content/home/hero.ts
// hero section content

import type { HeroContent } from '~/shared/types'
import { deepFreeze } from '~/shared/utils/deepFreeze'

// hero name data
export const HERO_CONTENT: HeroContent = deepFreeze({
  name: 'Garrett Fincke',
  tagline: 'Software Engineer · AI/LLM + Full-Stack · Pittsburgh, PA',
})
