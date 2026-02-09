// src/sections/experience/components/JobHistory.tsx
// brief job history w/ link to full resume

import { useMediaQuery } from '~/shared/hooks/useMediaQuery';
import { WORK_EXPERIENCE } from '~/content/experience';
import { BREAKPOINTS } from '~/shared/utils/breakpoints';
import { ArrowIcon } from '~/shared/components/ui/ArrowIcon';
import { ANIMATION_DELAYS, staggerDelay } from '~/shared/utils/animationConfig';
import { JobCard } from './JobCard';

// job history section w/ resume link
export function JobHistory() {
  // filter jobs by viewport — wide shows additional entries
  const showExpandedExperience = useMediaQuery(BREAKPOINTS.ultraWideWithHeight);
  const visibleJobs = WORK_EXPERIENCE.filter(job =>
    job.visibility === 'wide' ? showExpandedExperience : true
  );

  return (
    <>
      {visibleJobs.map((job, index) => (
        <div
          key={job.company}
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

      <a
        href="/documents/resume-selected.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="animate-slide-in-up inline-flex items-center gap-2 text-sm text-[var(--red)] opacity-0 transition hover:text-[var(--white)]"
        style={{
          animationDelay: staggerDelay(
            ANIMATION_DELAYS.jobHistory.base,
            ANIMATION_DELAYS.jobHistory.step,
            visibleJobs.length
          ),
        }}
      >
        View Full Resume
        <ArrowIcon />
      </a>
    </>
  );
}
