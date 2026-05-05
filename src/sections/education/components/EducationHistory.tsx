// src/sections/education/components/EducationHistory.tsx
// education timeline section for the home page

import { EDUCATION, EDUCATION_CONTENT } from '~/content/education'
import {
  ANIMATION_DELAYS,
  getStaggerStyle,
} from '~/shared/utils/animationConfig'
import { EducationCard } from '~/sections/education/components/EducationCard'

// education section w/ school cards
export function EducationHistory()
{
  return (
    <section aria-labelledby="education-heading">
      <h2 id="education-heading" className="sr-only">
        {EDUCATION_CONTENT.heading}
      </h2>
      <div className="space-y-2">
        {EDUCATION.map((entry, index) => (
          <div
            key={entry.id}
            className="animate-slide-in-up opacity-0"
            style={getStaggerStyle(
              ANIMATION_DELAYS.education.base,
              ANIMATION_DELAYS.education.step,
              index
            )}
          >
            <EducationCard education={entry} />
          </div>
        ))}
      </div>
    </section>
  )
}
