// src/sections/projects-archive/components/ProjectExpandedDetails.tsx
// expanded project details section (shared between mobile & desktop)

import { ProjectLinks } from '~/shared/components/layout/ProjectLinks';
import { SkillPill } from '~/shared/components/ui/SkillPill';
import { StatusBadge } from '~/shared/components/ui/StatusBadge';
import { VersionBadge } from '~/shared/components/ui/VersionBadge';
import type { Project } from '~/shared/types';
import { renderCollaborators } from '~/shared/utils/renderCollaborators';

interface ProjectExpandedDetailsProps {
  project: Project;
  getLiveLabel: (url: string) => string;
  variant?: 'mobile' | 'desktop';
}

export function ProjectExpandedDetails({
  project,
  getLiveLabel,
  variant = 'desktop',
}: ProjectExpandedDetailsProps) {
  const isMobile = variant === 'mobile';
  const containerClass = isMobile
    ? 'mt-2 border border-[var(--border)] rounded-lg p-4 bg-[var(--card)]/50'
    : 'px-6 pb-8 bg-[var(--card)]/50 border-b border-[var(--border)] transition-all duration-300';
  const spacingClass = isMobile ? 'space-y-4' : 'space-y-6 pt-6';
  const skillSize = isMobile ? 'xs' : 'md';

  return (
    <div className={containerClass}>
      <div className={spacingClass}>
        {project.tagline && (
          <div className="text-base text-[var(--fg)]/80 italic">
            {project.tagline}
          </div>
        )}

        <div className="flex items-center gap-4">
          <StatusBadge status={project.status} />
          <span className="text-[var(--muted)] text-sm italic">
            {project.repoUrl && (
              <>
                <VersionBadge repoUrl={project.repoUrl} />
              </>
            )}
            {project.dateRange}
          </span>
        </div>

        {project.collaborators && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--accent)] mb-2">
              Collaborators
            </h4>
            <p className="text-[var(--muted)]">
              {renderCollaborators(project.collaborators)}
            </p>
          </div>
        )}

        {isMobile ? (
          <div>
            <h4 className="text-sm font-semibold text-[var(--accent)] mb-2">
              Description
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {project.bulletPoints.map((point, pointIndex) => (
                <li key={pointIndex} className="text-[var(--muted)] text-sm">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-[var(--accent)] mb-3">
                Description
              </h4>
              <ul className="list-disc pl-5 space-y-2">
                {project.bulletPoints.map((point, pointIndex) => (
                  <li key={pointIndex} className="text-[var(--muted)]">
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {project.imagePath && (
              <div className="lg:w-1/3 flex-shrink-0">
                <div className="rounded-lg p-4 w-full group relative hover:shadow-lg transition-all duration-300">
                  <img
                    src={project.imagePath}
                    alt={project.imageAlt ?? `${project.title} screenshot`}
                    className="w-full h-full rounded-lg object-contain transition-all duration-300 group-hover:scale-105 group-hover:z-50"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div>
          <h4
            className={`text-sm font-semibold text-[var(--accent)] ${isMobile ? 'mb-2' : 'mb-3'}`}
          >
            Technologies
          </h4>
          <div className={`flex flex-wrap ${isMobile ? 'gap-2' : 'gap-x-3 gap-y-2'}`}>
            {project.technologies.map(tech => (
              <SkillPill
                key={tech}
                name={tech}
                size={skillSize}
                showProjectsOnHover
              />
            ))}
          </div>
        </div>

        {(project.repoUrl || project.liveUrl) && (
          <div>
            <h4
              className={`text-sm font-semibold text-[var(--accent)] ${isMobile ? 'mb-2' : 'mb-3'}`}
            >
              Links
            </h4>
            <ProjectLinks
              repoUrl={project.repoUrl}
              liveUrl={project.liveUrl}
              variant="button"
              size={isMobile ? 'sm' : 'md'}
              liveLabel={
                project.liveUrl ? getLiveLabel(project.liveUrl) : undefined
              }
              className={isMobile ? undefined : 'flex flex-wrap gap-4'}
            />
          </div>
        )}
      </div>
    </div>
  );
}
