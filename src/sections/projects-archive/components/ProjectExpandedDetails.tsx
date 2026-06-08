// src/sections/projects-archive/components/ProjectExpandedDetails.tsx
// expanded project details for mobile & desktop archive layouts

import { memo, type ReactNode } from 'react'

import { ProjectLinks } from '~/shared/components/layout/ProjectLinks'
import { ProjectCollaborators } from '~/shared/components/projects/ProjectCollaborators'
import { ProjectTechnologies } from '~/shared/components/projects/ProjectTechnologies'
import { StatusBadge } from '~/shared/components/ui/StatusBadge'
import { VersionBadge } from '~/shared/components/ui/VersionBadge'
import type { Project } from '~/shared/types'
import { MOTION_CLASSES } from '~/shared/utils/animationConfig'
import type { ProjectViewModel } from '~/shared/utils/projectViewModel'

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

interface ProjectDetailsProps
{
  project: Project
  viewModel: ProjectViewModel
}

function ProjectDetailsSummary({ project, viewModel }: ProjectDetailsProps)
{
  return (
    <>
      {project.tagline && (
        <div className="text-base text-[var(--fg)]/80 italic">
          {project.tagline}
        </div>
      )}

      <ProjectMeta project={project} viewModel={viewModel} />
      <Collaborators project={project} />
    </>
  )
}

interface ProjectDescriptionProps
{
  project: Project
  headingClassName: string
  listClassName: string
  itemClassName: string
  className?: string
}

function ProjectDescription({
  project,
  headingClassName,
  listClassName,
  itemClassName,
  className,
}: ProjectDescriptionProps)
{
  return (
    <div className={className}>
      <DetailsHeading className={headingClassName}>Description</DetailsHeading>
      <ul className={listClassName}>
        {project.bulletPoints.map((point, pointIndex) => (
          <li key={pointIndex} className={itemClassName}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}

interface ProjectTechnologiesBlockProps
{
  project: Project
  headingClassName: string
  size: 'xs' | 'sm' | 'md'
  className: string
}

function ProjectTechnologiesBlock({
  project,
  headingClassName,
  size,
  className,
}: ProjectTechnologiesBlockProps)
{
  return (
    <div>
      <DetailsHeading className={headingClassName}>Technologies</DetailsHeading>
      <ProjectTechnologies
        technologies={project.technologies}
        size={size}
        showRelatedProjects
        className={className}
      />
    </div>
  )
}

interface ProjectLinksBlockProps
{
  project: Project
  viewModel: ProjectViewModel
  headingClassName: string
  size: 'sm' | 'md'
  className?: string
}

function ProjectLinksBlock({
  project,
  viewModel,
  headingClassName,
  size,
  className,
}: ProjectLinksBlockProps)
{
  if (!viewModel.hasLinks)
  {
    return null
  }

  return (
    <div>
      <DetailsHeading className={headingClassName}>Links</DetailsHeading>
      <ProjectLinks
        repoUrl={project.repoUrl}
        liveUrl={project.liveUrl}
        additionalLinks={project.additionalLinks}
        variant="button"
        size={size}
        className={className}
        contextLabel={project.title}
      />
    </div>
  )
}

function ProjectImagePreview({ viewModel }: { viewModel: ProjectViewModel })
{
  if (!viewModel.imagePath)
  {
    return null
  }

  return (
    <div className="xl:w-1/3 flex-shrink-0">
      <div className="border border-[var(--border)] rounded-lg bg-[var(--bg)]/50 overflow-hidden p-3">
        <img
          src={viewModel.imagePath}
          alt={viewModel.imageAlt}
          className={`w-full h-full rounded-lg object-contain ${MOTION_CLASSES.emphasizedFilter} hover:brightness-110`}
          loading="lazy"
        />
      </div>
    </div>
  )
}

function MobileProjectDetailsImpl({ project, viewModel }: ProjectDetailsProps)
{
  return (
    <div className="mt-2 border border-[var(--border)] rounded-lg p-4 bg-[var(--card)]/50">
      <div className="space-y-4">
        <ProjectDetailsSummary project={project} viewModel={viewModel} />
        <ProjectDescription
          project={project}
          headingClassName="mb-2"
          listClassName="list-disc pl-5 space-y-1"
          itemClassName="text-[var(--muted)] text-sm"
        />
        <ProjectTechnologiesBlock
          project={project}
          headingClassName="mb-2"
          size="xs"
          className="flex flex-wrap gap-2"
        />
        <ProjectLinksBlock
          project={project}
          viewModel={viewModel}
          headingClassName="mb-2"
          size="sm"
        />
      </div>
    </div>
  )
}

function DesktopProjectDetailsImpl({
  project,
  viewModel,
}: ProjectDetailsProps)
{
  return (
    <div
      className={`px-6 pt-4 pb-6 bg-[var(--card)]/70 border-b border-[var(--border)] border-t-2 border-t-[var(--accent)]/30 ${MOTION_CLASSES.emphasizedColors}`}
    >
      <div className="space-y-6">
        <ProjectDetailsSummary project={project} viewModel={viewModel} />

        <div className="flex flex-col xl:flex-row xl:items-center gap-8">
          <ProjectDescription
            project={project}
            headingClassName="mb-3"
            listClassName="list-disc pl-5 space-y-2"
            itemClassName="text-[var(--muted)]"
            className="flex-1"
          />
          <ProjectImagePreview viewModel={viewModel} />
        </div>

        <ProjectTechnologiesBlock
          project={project}
          headingClassName="mb-3"
          size="md"
          className="flex flex-wrap gap-x-3 gap-y-2"
        />
        <ProjectLinksBlock
          project={project}
          viewModel={viewModel}
          headingClassName="mb-3"
          size="md"
          className="flex flex-wrap gap-4"
        />
      </div>
    </div>
  )
}

export const MobileProjectDetails = memo(MobileProjectDetailsImpl)
export const DesktopProjectDetails = memo(DesktopProjectDetailsImpl)
