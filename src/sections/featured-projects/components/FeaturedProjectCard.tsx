// src/sections/featured-projects/components/FeaturedProjectCard.tsx

import type { Project } from '~/shared/types';
import { FeaturedProjectImage } from './FeaturedProjectImage';
import { FeaturedProjectHeader } from './FeaturedProjectHeader';
import { FeaturedProjectTechnologies } from './FeaturedProjectTechnologies';

interface FeaturedProjectCardProps {
  project: Project;
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const linkUrl = project.liveUrl || project.repoUrl;

  const content = (
    <>
      <div className="absolute -inset-3 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-4 lg:block lg:group-hover:bg-[var(--card)]/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(128,203,196,0.1)] lg:group-hover:drop-shadow-lg" />

      {project.imagePath && (
        <FeaturedProjectImage
          imagePath={project.imagePath}
          imageAlt={project.imageAlt}
          title={project.title}
        />
      )}

      <div className="relative z-10 flex-1">
        <FeaturedProjectHeader title={project.title} hasLink={!!linkUrl} />

        <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
          {project.tagline}
        </p>

        {project.technologies && (
          <FeaturedProjectTechnologies technologies={project.technologies} />
        )}
      </div>
    </>
  );

  if (linkUrl) {
    return (
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex gap-4 p-1 transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="group relative flex gap-4 p-1 transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      {content}
    </div>
  );
}
