// src/sections/experience/components/JobCard.tsx
// job experience card w/ company info & technologies

import { InteractiveCard } from '~/shared/components/layout/InteractiveCard';
import type { WorkExperience } from '~/shared/types';
import { CARD_HOVER_BACKDROP } from '~/shared/utils/classNames';
import { JobCompanyHeader } from './JobCompanyHeader';
import { JobTechnologies } from './JobTechnologies';

// props for job experience card
interface JobCardProps {
  job: WorkExperience;
}

// job card w/ company header, description & technologies
export function JobCard({ job }: JobCardProps) {
  return (
    <InteractiveCard href={job.link}>
      <div className={CARD_HOVER_BACKDROP} />

      <div className="relative z-10">
        <JobCompanyHeader company={job.company} dateRange={job.dateRange} />

        <div className="mb-1 text-sm text-[var(--yellow)]">{job.title}</div>

        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {job.description}
        </p>

        {job.technologies && (
          <JobTechnologies technologies={job.technologies} />
        )}
      </div>
    </InteractiveCard>
  );
}
