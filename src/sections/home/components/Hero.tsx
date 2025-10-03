// src/sections/home/components/Hero.tsx
// hero section w/ name & tagline

import { HERO_CONTENT } from '../content/heroContent';

// hero component
export function Hero() {
  return (
    <div>
      <h1 className="text-4xl font-bold leading-tight text-[var(--fg)] md:text-6xl">
        {HERO_CONTENT.name}
      </h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{HERO_CONTENT.tagline}</p>
    </div>
  );
}
