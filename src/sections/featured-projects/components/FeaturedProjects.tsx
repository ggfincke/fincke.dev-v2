// src/sections/featured-projects/components/FeaturedProjects.tsx
// featured projects highlight w/ link to full projects page

import { getFeaturedProjects } from '~/content/projects'
import { ActionLink } from '~/shared/components/ui/ActionLink'
import { ArrowIcon } from '~/shared/components/ui/icons'
import { useMediaQuery } from '~/shared/hooks/useMediaQuery'
import { ANIMATION_DELAYS, staggerDelay } from '~/shared/utils/animationConfig'
import { BREAKPOINTS } from '~/shared/utils/breakpoints'
import { FeaturedProjectCard } from './FeaturedProjectCard'

// featured project cards w/ archive link
export function FeaturedProjects()
{
  // show extra projects on ultra-wide viewports
  const showExpandedProjects = useMediaQuery(BREAKPOINTS.ultraWide)
  const featured = getFeaturedProjects(showExpandedProjects)

  return (
    <>
      {/* project cards */}
      {featured.map((project, index) => (
        <div
          key={project.id}
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

      {/* archive link */}
      <ActionLink
        to="/projects"
        icon={<ArrowIcon />}
        className="animate-slide-in-up opacity-0"
        style={{
          animationDelay: staggerDelay(
            ANIMATION_DELAYS.featuredProjects.base,
            ANIMATION_DELAYS.featuredProjects.step,
            featured.length
          ),
        }}
      >
        View All Projects
      </ActionLink>
    </>
  )
}
