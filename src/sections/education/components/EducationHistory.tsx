// src/sections/education/components/EducationHistory.tsx
// education timeline section for the home page

import { EDUCATION } from '~/content/education'
import { ANIMATION_DELAYS, staggerDelay } from '~/shared/utils/animationConfig'
import { EducationCard } from './EducationCard'

// education section w/ school cards
export function EducationHistory()
{
  return (
    <section aria-label="Education" className="space-y-2">
      {EDUCATION.map((entry, index) => (
        <div
          key={entry.id}
          className="animate-slide-in-up opacity-0"
          style={{
            animationDelay: staggerDelay(
              ANIMATION_DELAYS.education.base,
              ANIMATION_DELAYS.education.step,
              index
            ),
          }}
        >
          <EducationCard education={entry} />
        </div>
      ))}
    </section>
  )
}
