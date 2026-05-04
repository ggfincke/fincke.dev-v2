// src/sections/experience/components/JobCard.tsx
// job experience card w/ company info & technologies

import { InteractiveCard } from '~/shared/components/layout/InteractiveCard'
import { TechPills } from '~/shared/components/ui/TechPills'
import type { WorkExperience } from '~/shared/types'
import { JobCompanyHeader } from '~/sections/experience/components/JobCompanyHeader'

// props for job experience card
interface JobCardProps
{
  job: WorkExperience
}

// job card w/ company header, description & technologies
export function JobCard({ job }: JobCardProps)
{
  return (
    <InteractiveCard href={job.link} withHoverBackdrop>
      <JobCompanyHeader company={job.company} period={job.period} />

      <div className="mb-1 text-sm text-[var(--yellow)]">{job.title}</div>

      <p className="text-sm leading-relaxed text-[var(--muted)]">
        {job.description}
      </p>

      {job.technologies && job.technologies.length > 0 && (
        <TechPills
          technologies={job.technologies}
          size="sm"
          as="ul"
          className="mt-2 flex flex-wrap gap-2"
        />
      )}
    </InteractiveCard>
  )
}
