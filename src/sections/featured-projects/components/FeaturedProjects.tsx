// src/sections/featured-projects/components/FeaturedProjects.tsx
// featured projects highlight w/ link to full projects page

import { Link } from 'react-router-dom';
import { getFeaturedProjects } from '~/sections/projects-archive/content/projectFilters';
import { FEATURED_PROJECT_TITLES } from '../content/featuredProjects';

// featured projects component
export function FeaturedProjects() {
  const featured = getFeaturedProjects().filter(p =>
    FEATURED_PROJECT_TITLES.includes(p.title)
  );

  return (
    <section className="space-y-6">
      <div className="space-y-6">
        {featured.map((project, index) => (
          <div key={index} className="group relative flex gap-4">
            {project.imagePath && (
              <div className="flex-shrink-0 overflow-hidden rounded-md border border-[var(--border)]">
                <img
                  src={project.imagePath}
                  alt={project.imageAlt || project.title}
                  className="h-24 w-32 object-cover transition group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-medium text-[var(--fg)]">
                  {project.title}
                  {project.liveUrl && (
                    <svg
                      className="ml-1 inline-block h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  )}
                </h3>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                {project.tagline}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="rounded-full bg-[var(--accent)]/10 px-2 py-1 text-xs text-[var(--accent)]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="rounded-full bg-[var(--accent)]/10 px-2 py-1 text-xs text-[var(--muted)]">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-[var(--accent)] transition hover:text-[var(--fg)]"
      >
        View All Projects
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </section>
  );
}
