// src/components/Hero.tsx
// hero section w/ name & tagline

import { HERO_CONTENT } from '../data/siteContent';

// hero component
export function Hero()
{
  return (
    <div>
      <h1 className="text-4xl font-bold leading-tight text-[var(--color-text-light)] md:text-6xl">
        {HERO_CONTENT.name}
      </h1>
      <p className="mt-4 text-lg text-[var(--color-text)]">
        {HERO_CONTENT.tagline}
      </p>
    </div>
  );
}
