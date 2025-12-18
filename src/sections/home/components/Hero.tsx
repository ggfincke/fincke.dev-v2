// src/sections/home/components/Hero.tsx
// hero section w/ name & tagline

import { HERO_CONTENT } from '~/content/home';

// hero component
export function Hero() {
  return (
    <div
      className="animate-slide-in-left opacity-0"
      style={{ animationDelay: '0.1s' }}
    >
      <h1 className="text-4xl font-bold leading-tight text-[var(--cyan)] md:text-6xl">
        {HERO_CONTENT.name}
      </h1>
      <p className="mt-4 text-lg">
        <span className="text-[var(--white)]">Software engineer</span>
        <span className="text-[var(--muted)]"> — </span>
        <span className="text-[var(--yellow)]">
          AI tooling & scalable full-stack systems
        </span>
      </p>
    </div>
  );
}
