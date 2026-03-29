// src/sections/experience/components/JobHistory.tsx
// brief job history w/ link to full resume

import { useMediaQuery } from '~/shared/hooks/useMediaQuery'
import { WORK_EXPERIENCE } from '~/content/experience'
import { ActionLink } from '~/shared/components/ui/ActionLink'
import { BREAKPOINTS } from '~/shared/utils/breakpoints'
import { ArrowIcon } from '~/shared/components/ui/icons'
import { ANIMATION_DELAYS, staggerDelay } from '~/shared/utils/animationConfig'
import { JobCard } from './JobCard'

// job history section w/ resume link
export function JobHistory()
{
  // filter jobs by viewport — wide shows additional entries
  const showExpandedExperience = useMediaQuery(BREAKPOINTS.ultraWideWithHeight)
  const visibleJobs = WORK_EXPERIENCE.filter((job) =>
    job.showOnUltraWide ? showExpandedExperience : true
  )

  return (
    <>
      {/* job cards */}
      {visibleJobs.map((job, index) => (
        <div
          key={job.id}
          className="animate-slide-in-up opacity-0"
          style={{
            animationDelay: staggerDelay(
              ANIMATION_DELAYS.jobHistory.base,
              ANIMATION_DELAYS.jobHistory.step,
              index
            ),
          }}
        >
          <JobCard job={job} />
        </div>
      ))}

      {/* resume link */}
      <ActionLink
        href="/documents/resume-selected.pdf"
        openInNewTab
        icon={<ArrowIcon />}
        className="animate-slide-in-up opacity-0"
        style={{
          animationDelay: staggerDelay(
            ANIMATION_DELAYS.jobHistory.base,
            ANIMATION_DELAYS.jobHistory.step,
            visibleJobs.length
          ),
        }}
      >
        View Full Resume
      </ActionLink>
    </>
  )
}
