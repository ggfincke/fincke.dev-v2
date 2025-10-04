// src/sections/experience/components/JobCard.tsx

import type { WorkExperience } from '~/shared/types';
import { JobCompanyHeader } from './JobCompanyHeader';
import { JobTechnologies } from './JobTechnologies';

interface JobCardProps {
  job: WorkExperience;
}

export function JobCard({ job }: JobCardProps) {
  const content = (
    <>
      <div className="absolute -inset-3 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-4 lg:block lg:group-hover:bg-[var(--card)]/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(128,203,196,0.1)] lg:group-hover:drop-shadow-lg" />

      <div className="relative z-10">
        <JobCompanyHeader
          company={job.company}
          dateRange={job.dateRange}
        />

        <div className="mb-1 text-sm text-[var(--muted)]">{job.title}</div>

        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {job.description}
        </p>

        {job.technologies && (
          <JobTechnologies technologies={job.technologies} />
        )}
      </div>
    </>
  );

  if (job.link) {
    return (
      <a
        href={job.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block p-1 transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="group relative p-1 transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      {content}
    </div>
  );
}
