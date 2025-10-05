// src/sections/experience/components/JobHistory.tsx
// brief job history w/ link to full resume

import { WORK_EXPERIENCE } from '../content/experienceTimeline';
import { JobCard } from './JobCard';

// job history component
export function JobHistory() {
  return (
    <section className="space-y-6 lg">
      <ol className="space-y-6 sm:space-y-8 group/list">
        {WORK_EXPERIENCE.map((job, index) => (
          <li key={index}>
            <JobCard job={job} />
          </li>
        ))}
      </ol>

      <a
        href="/documents/resume-selected.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-[var(--red)] transition hover:text-[var(--white)]"
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
    </section>
  );
}
