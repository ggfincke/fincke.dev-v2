// src/sections/education/components/EducationHistory.tsx
// education timeline section for the home page

import { EDUCATION, EDUCATION_CONTENT } from '~/content/education'
import { StaggeredItem } from '~/shared/components/layout/StaggeredItem'
import { ANIMATION_DELAYS } from '~/shared/utils/animationConfig'
import { EducationCard } from '~/sections/education/components/EducationCard'

export function EducationHistory()
{
  return (
    <section aria-labelledby="education-heading">
      <h2 id="education-heading" className="sr-only">
        {EDUCATION_CONTENT.heading}
      </h2>
      <div className="space-y-2">
        {EDUCATION.map((entry, index) => (
          <StaggeredItem
            key={entry.id}
            baseDelay={ANIMATION_DELAYS.education.base}
            stepDelay={ANIMATION_DELAYS.education.step}
            index={index}
          >
            <EducationCard education={entry} />
          </StaggeredItem>
        ))}
      </div>
    </section>
  )
}
