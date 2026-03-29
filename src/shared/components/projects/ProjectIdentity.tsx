// src/shared/components/projects/ProjectIdentity.tsx
// shared project title block for featured & archive surfaces

import type { ElementType } from 'react'

import type { Collaborator } from '~/shared/types'
import { ExternalLinkIcon } from '~/shared/components/ui/icons'
import { ProjectCollaborators } from './ProjectCollaborators'

// project identity display variants
type ProjectIdentityVariant = 'featured' | 'archive'

// props for shared project identity block
interface ProjectIdentityProps
{
  title: string
  collaborators?: Collaborator[]
  variant: ProjectIdentityVariant
  hasExternalLink?: boolean
  titleAs?: ElementType
  titleClassName?: string
  collaboratorsClassName?: string
}

// shared project identity block w/ optional collaborator line
export function ProjectIdentity({
  title,
  collaborators,
  variant,
  hasExternalLink = false,
  titleAs: TitleTag = 'div',
  titleClassName = '',
  collaboratorsClassName = '',
}: ProjectIdentityProps)
{
  return (
    <div>
      <TitleTag className={titleClassName}>
        {title}
        {variant === 'featured' && hasExternalLink && (
          <ExternalLinkIcon size={12} className="ml-1 inline-block" />
        )}
      </TitleTag>

      {variant === 'archive' && collaborators && collaborators.length > 0 && (
        <ProjectCollaborators
          collaborators={collaborators}
          prefix="with "
          className={collaboratorsClassName}
        />
      )}
    </div>
  )
}
