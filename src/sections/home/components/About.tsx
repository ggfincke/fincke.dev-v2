// src/sections/home/components/About.tsx
// about section w/ bio & contact information

import { getTechnologyColor, getTechnologyTerms } from '~/content/technologies'
import { ABOUT_CONTENT, ABOUT_HIGHLIGHTS } from '~/content/home'
import { InlineLink } from '~/shared/components/ui/InlineLink'
import { ANIMATION_DELAYS } from '~/shared/utils/animationConfig'
import { buildTermPattern, highlightText } from '~/shared/utils/textHighlight'

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

const HIGHLIGHT_PATTERN = buildTermPattern(TERM_COLOR_MAP.keys())

// content is static — precompute highlighted nodes once at module load
const HIGHLIGHTED_PARAGRAPHS = ABOUT_CONTENT.paragraphs.map((text) =>
  highlightText(text, HIGHLIGHT_PATTERN, TERM_COLOR_MAP)
)

// about section w/ highlighted bio & contact info
export function About()
{
  return (
    <section
      aria-label="About"
      className="animate-slide-in-left opacity-0"
      style={{ animationDelay: ANIMATION_DELAYS.about }}
    >
      {HIGHLIGHTED_PARAGRAPHS.map((nodes, index) => (
        <p
          key={index}
          className="mt-3 text-sm leading-relaxed text-[var(--muted)]"
        >
          {nodes}
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
