// src/sections/experience/components/JobHistory.tsx
// brief job history w/ link to full resume

import { RESUME_PATH } from '~/content/assets'
import { EXPERIENCE_CONTENT, WORK_EXPERIENCE } from '~/content/experience'
import { StaggeredItem } from '~/shared/components/layout/StaggeredItem'
import { ActionLink } from '~/shared/components/ui/ActionLink'
import { ArrowIcon } from '~/shared/components/ui/icons'
import {
  ANIMATION_DELAYS,
  getStaggerProps,
} from '~/shared/utils/animationConfig'
import { JobCard } from '~/sections/experience/components/JobCard'

export function JobHistory()
{
  return (
    <section aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="sr-only">
        {EXPERIENCE_CONTENT.heading}
      </h2>
      <div className="space-y-3 min-[1728px]:space-y-4">
        {WORK_EXPERIENCE.map((job, index) => (
          <StaggeredItem
            key={job.id}
            baseDelay={ANIMATION_DELAYS.jobHistory.base}
            stepDelay={ANIMATION_DELAYS.jobHistory.step}
            index={index}
          >
            <JobCard job={job} />
          </StaggeredItem>
        ))}

        <ActionLink
          href={RESUME_PATH}
          openInNewTab
          icon={<ArrowIcon />}
          {...getStaggerProps(
            ANIMATION_DELAYS.jobHistory.base,
            ANIMATION_DELAYS.jobHistory.step,
            WORK_EXPERIENCE.length
          )}
        >
          {EXPERIENCE_CONTENT.resumeCtaLabel}
        </ActionLink>
      </div>
    </section>
  )
}
