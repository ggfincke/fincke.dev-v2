// src/sections/featured-projects/components/FeaturedProjectCard.tsx
// featured project card w/ image & technologies

import { trackAnalyticsEvent } from '~/shared/analytics/track-event'
import { InteractiveCard } from '~/shared/components/layout/InteractiveCard'
import { ProjectIdentity } from '~/shared/components/projects/ProjectIdentity'
import { ProjectTechnologies } from '~/shared/components/projects/ProjectTechnologies'
import type { Project } from '~/shared/types'
import { getProjectViewModel } from '~/shared/utils/projectViewModel'
import { FeaturedProjectImage } from '~/sections/featured-projects/components/FeaturedProjectImage'

// props for featured project card
interface FeaturedProjectCardProps
{
  project: Project
}

// featured project card w/ image, header & technologies; short desktops
// stack the image on top & swap the tagline + pills for one short line
export function FeaturedProjectCard({ project }: FeaturedProjectCardProps)
{
  const viewModel = getProjectViewModel(project)

  return (
    <InteractiveCard
      href={viewModel.primaryHref}
      onClick={() =>
        trackAnalyticsEvent({
          type: 'project_click',
          projectId: project.id,
          destination:
            viewModel.primaryHref === project.liveUrl ? 'live' : 'repo',
        })
      }
      contentClassName="flex flex-col gap-4 sm:flex-row compact-projects:flex-col short-desktop:gap-2 short-landscape:gap-1.5"
      withHoverBackdrop
    >
      {viewModel.imagePath && (
        <FeaturedProjectImage
          imagePath={project.feature?.thumbnailPath ?? viewModel.imagePath}
          imageAlt={viewModel.imageAlt}
          focus={project.feature?.thumbnailFocus}
        />
      )}

      <div className="min-w-0 flex-1">
        <ProjectIdentity
          title={project.title}
          variant="featured"
          hasExternalLink={!!viewModel.primaryHref}
          titleAs="h3"
          titleClassName="text-sm font-medium text-[var(--white)] short-landscape:text-[0.8125rem]"
        />

        <p className="mt-1 text-sm leading-relaxed text-[var(--muted)] compact-projects:hidden">
          {viewModel.tagline}
        </p>
        <p className="mt-0.5 hidden truncate text-sm text-[var(--muted)] compact-projects:block short-landscape:text-xs">
          {project.feature?.shortTagline}
        </p>

        <ProjectTechnologies
          technologies={project.technologies}
          maxVisible={4}
          size="sm"
          className="mt-2 flex flex-wrap gap-2 xl:flex-nowrap compact-projects:hidden"
        />
      </div>
    </InteractiveCard>
  )
}
