// src/sections/home/components/About.tsx
// about section w/ bio & contact information

import type { ReactNode } from 'react';

import { ABOUT_CONTENT } from '~/content/home';
import { InlineLink } from '~/shared/components/ui/InlineLink';
import { ANIMATION_DELAYS } from '~/shared/utils/animationConfig';

// highlight rule mapping words to CSS classes
interface HighlightRule {
  words: string[];
  className: string;
}

const HIGHLIGHT_RULES: HighlightRule[] = [
  { words: ['Scale AI'], className: 'text-[var(--purple)]' },
  {
    words: ['Python', 'TypeScript', 'Java', 'Go', 'Swift', 'JavaScript'],
    className: 'text-[var(--green)]',
  },
  {
    words: ['React', 'Next.js', 'FastAPI', 'Django', 'SwiftUI', 'UIkit'],
    className: 'text-[var(--blue)]',
  },
];

// build a single regex from all highlight rules
const HIGHLIGHT_PATTERN = new RegExp(
  `(${HIGHLIGHT_RULES.flatMap(rule =>
    rule.words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  ).join('|')})`,
  'g'
);

// map each keyword to its color class
const KEYWORD_CLASS_MAP = new Map<string, string>(
  HIGHLIGHT_RULES.flatMap(rule =>
    rule.words.map(word => [word, rule.className] as const)
  )
);

// highlight specific keywords w/ color
function highlightText(text: string): ReactNode[] {
  const parts = text.split(HIGHLIGHT_PATTERN);
  return parts.map((part, i) => {
    const className = KEYWORD_CLASS_MAP.get(part);
    if (className) {
      return (
        <span key={i} className={className}>
          {part}
        </span>
      );
    }
    return part;
  });
}

// about section w/ highlighted bio & contact info
export function About() {
  return (
    <section
      aria-labelledby="about-heading"
      className="animate-slide-in-left opacity-0"
      style={{ animationDelay: ANIMATION_DELAYS.about }}
    >
      <h2
        id="about-heading"
        className="text-base font-semibold tracking-wide text-[var(--cyan)]"
      >
        {ABOUT_CONTENT.heading}
      </h2>
      {ABOUT_CONTENT.paragraphs.map((text, index) => (
        <p
          key={index}
          className="mt-3 text-sm leading-relaxed text-[var(--muted)]"
        >
          {highlightText(text)}
        </p>
      ))}
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
