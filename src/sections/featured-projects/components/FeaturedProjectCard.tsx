// src/sections/featured-projects/components/FeaturedProjectCard.tsx
// featured project card w/ image & technologies

import { InteractiveCard } from '~/shared/components/layout/InteractiveCard';
import type { Project } from '~/shared/types';
import { CARD_HOVER_BACKDROP } from '~/shared/utils/classNames';
import { FeaturedProjectImage } from './FeaturedProjectImage';
import { FeaturedProjectHeader } from './FeaturedProjectHeader';
import { FeaturedProjectTechnologies } from './FeaturedProjectTechnologies';

// props for featured project card
interface FeaturedProjectCardProps {
  project: Project;
}

// featured project card w/ image, header & technologies
export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  // prefer live URL, fall back to repo URL
  const linkUrl = project.liveUrl || project.repoUrl;

  return (
    <InteractiveCard
      href={linkUrl}
      className="group relative flex gap-4 p-1 transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
    >
      <div className={CARD_HOVER_BACKDROP} />

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
    </InteractiveCard>
  );
}
