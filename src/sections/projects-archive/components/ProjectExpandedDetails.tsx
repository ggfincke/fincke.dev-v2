// src/sections/projects-archive/components/ProjectExpandedDetails.tsx
// expanded project details — separate Mobile / Desktop variants

import { memo, type ReactNode } from 'react'

import { ProjectLinks } from '~/shared/components/layout/ProjectLinks'
import { ProjectCollaborators } from '~/shared/components/projects/ProjectCollaborators'
import { ProjectTechnologies } from '~/shared/components/projects/ProjectTechnologies'
import { StatusBadge } from '~/shared/components/ui/StatusBadge'
import { VersionBadge } from '~/shared/components/ui/VersionBadge'
import type { Project } from '~/shared/types'
import { MOTION_CLASSES } from '~/shared/utils/animationConfig'
import {
  getProjectViewModel,
  type ProjectViewModel,
} from '~/shared/utils/projectViewModel'

// shared inner-section heading
function DetailsHeading({
  className,
  children,
}: {
  className?: string
  children: ReactNode
})
{
  return (
    <h4
      className={`text-sm font-semibold text-[var(--accent)] ${className ?? ''}`.trim()}
    >
      {children}
    </h4>
  )
}

// shared header row: status badge + version + period
function ProjectMeta({
  project,
  viewModel,
}: {
  project: Project
  viewModel: ProjectViewModel
})
{
  return (
    <div className="flex items-center gap-4">
      <StatusBadge status={project.status} />
      <span className="text-[var(--muted)] text-sm italic">
        {project.repoUrl && <VersionBadge repoUrl={project.repoUrl} />}
        {viewModel.periodLabel}
      </span>
    </div>
  )
}

// shared collaborators block
function Collaborators({ project }: { project: Project })
{
  if (!project.collaborators)
  {
    return null
  }
  return (
    <div>
      <DetailsHeading className="mb-2">Collaborators</DetailsHeading>
      <ProjectCollaborators
        collaborators={project.collaborators}
        className="text-[var(--muted)]"
      />
    </div>
  )
}

interface VariantProps
{
  project: Project
  viewModel?: ProjectViewModel
}

// mobile expanded details
function MobileProjectDetailsImpl({
  project,
  viewModel = getProjectViewModel(project),
}: VariantProps)
{
  return (
    <div className="mt-2 border border-[var(--border)] rounded-lg p-4 bg-[var(--card)]/50">
      <div className="space-y-4">
        {project.tagline && (
          <div className="text-base text-[var(--fg)]/80 italic">
            {project.tagline}
          </div>
        )}

        <ProjectMeta project={project} viewModel={viewModel} />
        <Collaborators project={project} />

        <div>
          <DetailsHeading className="mb-2">Description</DetailsHeading>
          <ul className="list-disc pl-5 space-y-1">
            {project.bulletPoints.map((point, pointIndex) => (
              <li key={pointIndex} className="text-[var(--muted)] text-sm">
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <DetailsHeading className="mb-2">Technologies</DetailsHeading>
          <ProjectTechnologies
            technologies={project.technologies}
            size="xs"
            showRelatedProjects
            className="flex flex-wrap gap-2"
          />
        </div>

        {viewModel.hasLinks && (
          <div>
            <DetailsHeading className="mb-2">Links</DetailsHeading>
            <ProjectLinks
              repoUrl={project.repoUrl}
              liveUrl={project.liveUrl}
              additionalLinks={project.additionalLinks}
              variant="button"
              size="sm"
              contextLabel={project.title}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// desktop expanded details
function DesktopProjectDetailsImpl({
  project,
  viewModel = getProjectViewModel(project),
}: VariantProps)
{
  return (
    <div
      className={`px-6 pt-4 pb-6 bg-[var(--card)]/70 border-b border-[var(--border)] border-t-2 border-t-[var(--accent)]/30 ${MOTION_CLASSES.emphasizedColors}`}
    >
      <div className="space-y-6">
        {project.tagline && (
          <div className="text-base text-[var(--fg)]/80 italic">
            {project.tagline}
          </div>
        )}

        <ProjectMeta project={project} viewModel={viewModel} />
        <Collaborators project={project} />

        <div className="flex flex-col xl:flex-row xl:items-center gap-8">
          <div className="flex-1">
            <DetailsHeading className="mb-3">Description</DetailsHeading>
            <ul className="list-disc pl-5 space-y-2">
              {project.bulletPoints.map((point, pointIndex) => (
                <li key={pointIndex} className="text-[var(--muted)]">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {project.imagePath && (
            <div className="xl:w-1/3 flex-shrink-0">
              <div className="border border-[var(--border)] rounded-lg bg-[var(--bg)]/50 overflow-hidden p-3">
                <img
                  src={project.imagePath}
                  alt={viewModel.imageAlt}
                  className={`w-full h-full rounded-lg object-contain ${MOTION_CLASSES.emphasizedFilter} hover:brightness-110`}
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <DetailsHeading className="mb-3">Technologies</DetailsHeading>
          <ProjectTechnologies
            technologies={project.technologies}
            size="md"
            showRelatedProjects
            className="flex flex-wrap gap-x-3 gap-y-2"
          />
        </div>

        {viewModel.hasLinks && (
          <div>
            <DetailsHeading className="mb-3">Links</DetailsHeading>
            <ProjectLinks
              repoUrl={project.repoUrl}
              liveUrl={project.liveUrl}
              additionalLinks={project.additionalLinks}
              variant="button"
              size="md"
              className="flex flex-wrap gap-4"
              contextLabel={project.title}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export const MobileProjectDetails = memo(MobileProjectDetailsImpl)
export const DesktopProjectDetails = memo(DesktopProjectDetailsImpl)

// dispatcher kept to preserve existing variant-based call sites
interface ProjectExpandedDetailsProps extends VariantProps
{
  variant?: 'mobile' | 'desktop'
}

// expanded project details (dispatcher)
export function ProjectExpandedDetails({
  variant = 'desktop',
  ...rest
}: ProjectExpandedDetailsProps)
{
  return variant === 'mobile' ? (
    <MobileProjectDetails {...rest} />
  ) : (
    <DesktopProjectDetails {...rest} />
  )
}
