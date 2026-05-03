// src/sections/home/components/About.tsx
// about section w/ bio & contact information

import type { ReactNode } from 'react'

import { getTechnologyColor, getTechnologyTerms } from '~/content/technologies'
import { ABOUT_CONTENT, ABOUT_HIGHLIGHTS } from '~/content/home'
import { InlineLink } from '~/shared/components/ui/InlineLink'
import { ANIMATION_DELAYS } from '~/shared/utils/animationConfig'

// term -> CSS color value, sourced from technology category for tech IDs
const TERM_COLOR_MAP = new Map<string, string>([
  ...ABOUT_HIGHLIGHTS.technologyIds.flatMap((technologyId) =>
  {
    const color = getTechnologyColor(technologyId)
    return getTechnologyTerms(technologyId).map(
      (term) => [term, color] as [string, string]
    )
  }),
  ...ABOUT_HIGHLIGHTS.phrases.flatMap((phrase) =>
    phrase.words.map((word) => [word, phrase.color] as [string, string])
  ),
])

// longest term first so regex matches multi-word phrases before their substrings
const HIGHLIGHT_PATTERN = new RegExp(
  `(${[...TERM_COLOR_MAP.keys()]
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length)
    .join('|')})`,
  'g'
)

function highlightText(text: string): ReactNode[]
{
  const parts = text.split(HIGHLIGHT_PATTERN)
  return parts.map((part, i) =>
  {
    const color = TERM_COLOR_MAP.get(part)
    if (color)
    {
      return (
        <span key={i} style={{ color }}>
          {part}
        </span>
      )
    }
    return part
  })
}

// about section w/ highlighted bio & contact info
export function About()
{
  return (
    <section
      aria-label="About"
      className="animate-slide-in-left opacity-0"
      style={{ animationDelay: ANIMATION_DELAYS.about }}
    >
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
  )
}
