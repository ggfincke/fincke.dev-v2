// src/sections/featured-projects/components/FeaturedProjectCard.tsx
// featured project card w/ image & technologies

import { InteractiveCard } from '~/shared/components/layout/InteractiveCard'
import { ProjectIdentity } from '~/shared/components/projects/ProjectIdentity'
import { ProjectTechnologies } from '~/shared/components/projects/ProjectTechnologies'
import type { Project } from '~/shared/types'
import { getProjectViewModel } from '~/shared/utils/projectViewModel'
import { CARD_HOVER_BACKDROP } from '~/shared/utils/classNames'
import { FeaturedProjectImage } from './FeaturedProjectImage'

// props for featured project card
interface FeaturedProjectCardProps
{
  project: Project
}

// featured project card w/ image, header & technologies
export function FeaturedProjectCard({ project }: FeaturedProjectCardProps)
{
  const viewModel = getProjectViewModel(project)

  return (
    <InteractiveCard href={viewModel.primaryHref} className="flex gap-4">
      {/* hover backdrop */}
      <div className={CARD_HOVER_BACKDROP} />

      {/* project image */}
      {project.imagePath && (
        <FeaturedProjectImage
          imagePath={project.imagePath}
          imageAlt={project.imageAlt}
          title={project.title}
        />
      )}

      {/* project info */}
      <div className="relative z-10 flex-1">
        <ProjectIdentity
          title={project.title}
          variant="featured"
          hasExternalLink={!!viewModel.primaryHref}
          titleAs="h3"
          titleClassName="text-sm font-medium text-[var(--white)]"
        />

        <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
          {project.tagline}
        </p>

        <ProjectTechnologies
          technologies={project.technologies}
          maxVisible={4}
          size="sm"
          className="mt-2 flex flex-wrap gap-2 xl:flex-nowrap"
        />
      </div>
    </InteractiveCard>
  )
}
