// src/sections/featured-projects/components/FeaturedProjects.tsx
// featured projects highlight w/ link to full projects page

import { Link } from 'react-router-dom';

import {
  FEATURED_PROJECT_TITLES,
  WIDE_FEATURED_PROJECT_TITLES,
  getFeaturedProjects,
} from '~/content/projects';
import { ArrowIcon } from '~/shared/components/ui/ArrowIcon';
import { useMediaQuery } from '~/shared/hooks/useMediaQuery';
import { FeaturedProjectCard } from './FeaturedProjectCard';

// featured projects component
export function FeaturedProjects() {
  const showExpandedProjects = useMediaQuery('(min-width: 2560px)');
  const featuredTitles = showExpandedProjects
    ? [...FEATURED_PROJECT_TITLES, ...WIDE_FEATURED_PROJECT_TITLES]
    : FEATURED_PROJECT_TITLES;

  const featured = getFeaturedProjects().filter(project =>
    featuredTitles.includes(project.title)
  );

  return (
    <>
      {featured.map((project, index) => (
        <div
          key={index}
          className="animate-slide-in-up opacity-0"
          style={{ animationDelay: `${0.6 + index * 0.1}s` }}
        >
          <FeaturedProjectCard project={project} />
        </div>
      ))}

      <Link
        to="/projects"
        className="animate-slide-in-up inline-flex items-center gap-2 text-sm text-[var(--red)] opacity-0 transition hover:text-[var(--white)]"
        style={{ animationDelay: `${0.6 + featured.length * 0.1}s` }}
      >
        View All Projects
        <ArrowIcon />
      </Link>
    </>
  );
}
