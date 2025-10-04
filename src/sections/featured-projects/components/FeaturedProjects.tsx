// src/sections/featured-projects/components/FeaturedProjects.tsx
// featured projects highlight w/ link to full projects page

import { Link } from 'react-router-dom';
import { ArrowIcon } from '~/shared/components/ui/ArrowIcon';
import { getFeaturedProjects } from '~/sections/projects-archive/content/projectFilters';
import { FEATURED_PROJECT_TITLES } from '../content/featuredProjects';
import { FeaturedProjectCard } from './FeaturedProjectCard';

// featured projects component
export function FeaturedProjects() {
  const featured = getFeaturedProjects().filter(p =>
    FEATURED_PROJECT_TITLES.includes(p.title)
  );

  return (
    <section className="space-y-6 lg:space-y-8">
      <ol className="space-y-6 sm:space-y-8 group/list">
        {featured.map((project, index) => (
          <li key={index}>
            <FeaturedProjectCard project={project} />
          </li>
        ))}
      </ol>

      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-[var(--accent)] transition hover:text-[var(--fg)]"
      >
        View All Projects
        <ArrowIcon />
      </Link>
    </section>
  );
}
