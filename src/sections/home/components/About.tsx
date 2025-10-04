// src/sections/home/components/About.tsx
// about section w/ bio & contact information

import { InlineLink } from '~/shared/components/ui/InlineLink';
import { ABOUT_CONTENT } from '../content/aboutContent';

// about component
export function About() {
  return (
    <section aria-labelledby="about-heading">
      <h2
        id="about-heading"
        className="text-base font-semibold tracking-wide text-[var(--fg)]"
      >
        {ABOUT_CONTENT.heading}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
        {ABOUT_CONTENT.paragraphs[0]}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
        Would love to collaborate or chat! Reach me at{' '}
        <InlineLink href={`mailto:${ABOUT_CONTENT.email}`}>
          {ABOUT_CONTENT.email}
        </InlineLink>
        .
      </p>
    </section>
  );
}
