// src/sections/featured-projects/components/FeaturedProjects.tsx
// featured projects highlight w/ link to full projects page

import { Link } from 'react-router-dom';

import { getFeaturedProjects } from '~/content/projects';
import { ArrowIcon } from '~/shared/components/ui/ArrowIcon';
import { useMediaQuery } from '~/shared/hooks/useMediaQuery';
import { ANIMATION_DELAYS, staggerDelay } from '~/shared/utils/animationConfig';
import { BREAKPOINTS } from '~/shared/utils/breakpoints';
import { FeaturedProjectCard } from './FeaturedProjectCard';

// featured project cards w/ archive link
export function FeaturedProjects() {
  // show extra projects on ultra-wide viewports
  const showExpandedProjects = useMediaQuery(BREAKPOINTS.ultraWide);
  const featured = getFeaturedProjects(showExpandedProjects);

  return (
    <>
      {featured.map((project, index) => (
        <div
          key={project.title}
          className="animate-slide-in-up opacity-0"
          style={{
            animationDelay: staggerDelay(
              ANIMATION_DELAYS.featuredProjects.base,
              ANIMATION_DELAYS.featuredProjects.step,
              index
            ),
          }}
        >
          <FeaturedProjectCard project={project} />
        </div>
      ))}

      <Link
        to="/projects"
        className="animate-slide-in-up inline-flex items-center gap-2 text-sm text-[var(--red)] opacity-0 transition hover:text-[var(--white)]"
        style={{
          animationDelay: staggerDelay(
            ANIMATION_DELAYS.featuredProjects.base,
            ANIMATION_DELAYS.featuredProjects.step,
            featured.length
          ),
        }}
      >
        View All Projects
        <ArrowIcon />
      </Link>
    </>
  );
}
