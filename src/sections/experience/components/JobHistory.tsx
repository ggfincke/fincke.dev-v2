// src/sections/experience/components/JobHistory.tsx
// brief job history w/ link to full resume

import { WORK_EXPERIENCE } from '~/content/experience'
import { ActionLink } from '~/shared/components/ui/ActionLink'
import { ArrowIcon } from '~/shared/components/ui/icons'
import {
  ANIMATION_DELAYS,
  getStaggerStyle,
} from '~/shared/utils/animationConfig'
import { JobCard } from '~/sections/experience/components/JobCard'
import { RESUME_PATH } from '~/sections/experience/components/jobHistory.paths'

// job history section w/ resume link
export function JobHistory()
{
  return (
    <>
      {/* job cards */}
      {WORK_EXPERIENCE.map((job, index) => (
        <div
          key={job.id}
          className="animate-slide-in-up opacity-0"
          style={getStaggerStyle(
            ANIMATION_DELAYS.jobHistory.base,
            ANIMATION_DELAYS.jobHistory.step,
            index
          )}
        >
          <JobCard job={job} />
        </div>
      ))}

      {/* resume link */}
      <ActionLink
        href={RESUME_PATH}
        openInNewTab
        icon={<ArrowIcon />}
        className="animate-slide-in-up opacity-0"
        style={getStaggerStyle(
          ANIMATION_DELAYS.jobHistory.base,
          ANIMATION_DELAYS.jobHistory.step,
          WORK_EXPERIENCE.length
        )}
      >
        View Full Resume
      </ActionLink>
    </>
  )
}
