// src/sections/home/components/Hero.tsx
// hero section w/ name & tagline

import { HERO_CONTENT } from '~/content/home'
import { ANIMATION_DELAYS } from '~/shared/utils/animationConfig'

// hero section w/ name & tagline
export function Hero()
{
  return (
    <div
      className="animate-slide-in-left opacity-0"
      style={{ animationDelay: ANIMATION_DELAYS.hero }}
    >
      <h1 className="text-4xl font-bold leading-tight text-[var(--cyan)] md:text-6xl">
        {HERO_CONTENT.name}
      </h1>
      <p className="mt-1 text-base text-[var(--muted)]">
        Software Engineer · AI/LLM + Full-Stack · Pittsburgh, PA
      </p>
    </div>
  )
}
