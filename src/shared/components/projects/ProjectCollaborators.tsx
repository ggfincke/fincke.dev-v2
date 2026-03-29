// src/shared/components/projects/ProjectCollaborators.tsx
// shared collaborator text renderer for project surfaces

import { ExternalLink } from '~/shared/components/ui/ExternalLink'
import type { Collaborator } from '~/shared/types'

// props for project collaborator text
interface ProjectCollaboratorsProps
{
  collaborators: Collaborator[]
  prefix?: string
  className?: string
}

// shared collaborator text w/ optional prefix
export function ProjectCollaborators({
  collaborators,
  prefix,
  className,
}: ProjectCollaboratorsProps)
{
  return (
    <span className={className}>
      {prefix}
      {collaborators.map((collaborator, index) => (
        <span key={collaborator.name}>
          {collaborator.url ? (
            <ExternalLink
              href={collaborator.url}
              className="rounded-sm hover:underline"
            >
              {collaborator.name}
            </ExternalLink>
          ) : (
            collaborator.name
          )}
          {index < collaborators.length - 1 ? ', ' : ''}
        </span>
      ))}
    </span>
  )
}
