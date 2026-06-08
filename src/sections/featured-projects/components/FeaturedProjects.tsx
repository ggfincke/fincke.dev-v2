// src/sections/featured-projects/components/FeaturedProjects.tsx
// featured projects highlight w/ link to full projects page

import { getFeaturedProjects, PROJECTS_CONTENT } from '~/content/projects'
import { StaggeredItem } from '~/shared/components/layout/StaggeredItem'
import { ActionLink } from '~/shared/components/ui/ActionLink'
import { ArrowIcon } from '~/shared/components/ui/icons'
import { useMediaQuery } from '~/shared/hooks/useMediaQuery'
import { PUBLIC_ROUTE_PATHS } from '~/shared/routing/publicRoutes'
import {
  ANIMATION_DELAYS,
  getStaggerProps,
} from '~/shared/utils/animationConfig'
import { BREAKPOINTS } from '~/shared/utils/breakpoints'
import { FeaturedProjectCard } from '~/sections/featured-projects/components/FeaturedProjectCard'

// featured project cards w/ archive link
export function FeaturedProjects()
{
  const showExpandedProjects = useMediaQuery(BREAKPOINTS.ultraWide)
  const featured = getFeaturedProjects(showExpandedProjects)

  return (
    <section aria-labelledby="featured-projects-heading">
      <h2 id="featured-projects-heading" className="sr-only">
        {PROJECTS_CONTENT.featuredHeading}
      </h2>
      <div className="space-y-3 min-[1728px]:space-y-4">
        {featured.map((project, index) => (
          <StaggeredItem
            key={project.id}
            baseDelay={ANIMATION_DELAYS.featuredProjects.base}
            stepDelay={ANIMATION_DELAYS.featuredProjects.step}
            index={index}
          >
            <FeaturedProjectCard project={project} />
          </StaggeredItem>
        ))}

        <ActionLink
          to={PUBLIC_ROUTE_PATHS.projects}
          icon={<ArrowIcon />}
          {...getStaggerProps(
            ANIMATION_DELAYS.featuredProjects.base,
            ANIMATION_DELAYS.featuredProjects.step,
            featured.length
          )}
        >
          {PROJECTS_CONTENT.archiveCtaLabel}
        </ActionLink>
      </div>
    </section>
  )
}
