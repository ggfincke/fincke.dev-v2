// src/sections/experience/components/JobHistory.tsx
// brief job history w/ link to full resume

import { useMediaQuery } from '~/shared/hooks/useMediaQuery';
import { WORK_EXPERIENCE } from '~/content/experience';
import { JobCard } from './JobCard';

// job history component
export function JobHistory() {
  const showExpandedExperience = useMediaQuery(
    '(min-width: 2560px) and (min-height: 1400px)'
  );
  const visibleJobs = WORK_EXPERIENCE.filter(job =>
    job.visibility === 'wide' ? showExpandedExperience : true
  );

  return (
    <>
      {visibleJobs.map((job, index) => (
        <div
          key={index}
          className="animate-slide-in-up opacity-0"
          style={{ animationDelay: `${0.4 + index * 0.1}s` }}
        >
          <JobCard job={job} />
        </div>
      ))}

      <a
        href="/documents/resume-selected.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="animate-slide-in-up inline-flex items-center gap-2 text-sm text-[var(--red)] opacity-0 transition hover:text-[var(--white)]"
        style={{ animationDelay: `${0.4 + visibleJobs.length * 0.1}s` }}
      >
        View Full Resume
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
    </>
  );
}
