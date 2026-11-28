// src/sections/featured-projects/components/FeaturedProjects.tsx
// featured projects highlight w/ link to full projects page

import type { CSSProperties } from 'react'

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
import { cn } from '~/shared/utils/classNames'
import { FeaturedProjectCard } from '~/sections/featured-projects/components/FeaturedProjectCard'

// featured project cards w/ archive link
export function FeaturedProjects()
{
  const isStacked = useMediaQuery(BREAKPOINTS.stackedLayout)
  // compact cards sit side by side, so a third one fits the row
  const isShortDesktop = useMediaQuery(BREAKPOINTS.shortDesktop)
  const isShortLandscape = useMediaQuery(BREAKPOINTS.shortLandscape)
  const showExpandedProjects = useMediaQuery(BREAKPOINTS.ultraWide)
  const showTallProjects = useMediaQuery(BREAKPOINTS.tallViewport)
  const featured = getFeaturedProjects(
    (isStacked && !isShortLandscape) || showExpandedProjects,
    isStacked || isShortDesktop || showTallProjects
  )
  const ctaStagger = getStaggerProps(
    ANIMATION_DELAYS.featuredProjects.base,
    ANIMATION_DELAYS.featuredProjects.step,
    featured.length
  )

  return (
    <section aria-labelledby="featured-projects-heading">
      <h2 id="featured-projects-heading" className="sr-only">
        {PROJECTS_CONTENT.featuredHeading}
      </h2>
      {/* short desktops put the cards side by side, one column per project */}
      <div
        className="space-y-3 min-[1728px]:space-y-4 compact-projects:grid compact-projects:grid-cols-[repeat(var(--featured-count),minmax(0,1fr))] compact-projects:space-y-0 short-desktop:gap-x-4 short-desktop:gap-y-3 short-landscape:gap-2.5"
        style={{ '--featured-count': featured.length } as CSSProperties}
      >
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
          className={cn(
            ctaStagger.className,
            'compact-projects:col-span-full compact-projects:justify-self-start'
          )}
          style={ctaStagger.style}
        >
          {PROJECTS_CONTENT.archiveCtaLabel}
        </ActionLink>
      </div>
    </section>
  )
}
