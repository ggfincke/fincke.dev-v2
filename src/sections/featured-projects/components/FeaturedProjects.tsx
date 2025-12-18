// src/sections/featured-projects/components/FeaturedProjects.tsx
// featured projects highlight w/ link to full projects page

import { Link } from 'react-router-dom';
import { ArrowIcon } from '~/shared/components/ui/ArrowIcon';
import { getFeaturedProjects } from '~/sections/projects-archive/content/projectFilters';
import {
  FEATURED_PROJECT_TITLES,
  WIDE_FEATURED_PROJECT_TITLES,
} from '../content/featuredProjects';
import { FeaturedProjectCard } from './FeaturedProjectCard';
import { useMediaQuery } from '~/shared/hooks/useMediaQuery';

// featured projects component
export function FeaturedProjects() {
  const showExpandedProjects = useMediaQuery('(min-width: 1920px)');
  const featuredTitles = showExpandedProjects
    ? [...FEATURED_PROJECT_TITLES, ...WIDE_FEATURED_PROJECT_TITLES]
    : FEATURED_PROJECT_TITLES;

  const featured = getFeaturedProjects().filter(project =>
    featuredTitles.includes(project.title)
  );

  return (
    <section
      className="animate-slide-in-right space-y-6 opacity-0 lg:space-y-8"
      style={{ animationDelay: '0.4s' }}
    >
      <ol className="space-y-6 sm:space-y-8 group/list">
        {featured.map((project, index) => (
          <li
            key={index}
            className="animate-slide-in-up opacity-0"
            style={{ animationDelay: `${0.6 + index * 0.1}s` }}
          >
            <FeaturedProjectCard project={project} />
          </li>
        ))}
      </ol>

      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-[var(--red)] transition hover:text-[var(--white)]"
      >
        View All Projects
        <ArrowIcon />
      </Link>
    </section>
  );
}
