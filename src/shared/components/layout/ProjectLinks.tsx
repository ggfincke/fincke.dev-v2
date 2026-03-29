// src/shared/components/layout/ProjectLinks.tsx
// shared links renderer for project repository & live links

import type { ExternalLink } from '~/shared/types'
import { ExternalLink as ExternalAnchor } from '~/shared/components/ui/ExternalLink'
import { IconLink } from '~/shared/components/ui/IconLink'
import { getButtonClasses } from '~/shared/utils/classNames'
import { getProjectLiveLabel } from '~/shared/utils/projectLinks'
import { ExternalLinkIcon } from '~/shared/components/ui/icons/ExternalLinkIcon'
import { GitHubIcon } from '~/shared/components/ui/icons/GitHubIcon'

// link display variant type
export type ProjectLinksVariant = 'icon' | 'button'

// props for project links
interface ProjectLinksProps
{
  repoUrl?: string
  liveUrl?: string
  additionalLinks?: ExternalLink[]
  variant?: ProjectLinksVariant
  size?: 'sm' | 'md'
  liveLabel?: string
  className?: string
  contextLabel?: string
}

function withProjectContext(label: string, contextLabel?: string)
{
  if (!contextLabel)
  {
    return label
  }

  return `${label} for ${contextLabel}`
}

function getLiveIconLabel(resolvedLiveLabel: string, contextLabel?: string)
{
  const liveDestination = resolvedLiveLabel.replace(/^View /, '')
  return withProjectContext(`Open ${liveDestination}`, contextLabel)
}

// project links component w/ icon or button variants
export function ProjectLinks({
  repoUrl,
  liveUrl,
  additionalLinks,
  variant = 'icon',
  size = 'sm',
  liveLabel,
  className,
  contextLabel,
}: ProjectLinksProps)
{
  const resolvedLiveLabel = liveUrl
    ? (liveLabel ?? getProjectLiveLabel(liveUrl))
    : undefined

  if (
    !repoUrl &&
    !liveUrl &&
    (!additionalLinks || additionalLinks.length === 0)
  )
  {
    return null
  }

  if (variant === 'button')
  {
    return (
      <div className={className ?? 'flex flex-wrap gap-2'}>
        {repoUrl && (
          <ExternalAnchor
            href={repoUrl}
            className={getButtonClasses(size, 'secondary')}
          >
            <GitHubIcon size={size === 'sm' ? 14 : 16} />
            {size !== 'sm' ? ' View Repository' : ' Repository'}
          </ExternalAnchor>
        )}
        {liveUrl && (
          <ExternalAnchor
            href={liveUrl}
            className={getButtonClasses(size, 'primary')}
          >
            <ExternalLinkIcon size={size === 'sm' ? 14 : 16} />
            {resolvedLiveLabel ? ` ${resolvedLiveLabel}` : ' View Live Site'}
          </ExternalAnchor>
        )}
        {additionalLinks?.map((link) => (
          <ExternalAnchor
            key={link.url}
            href={link.url}
            className={getButtonClasses(size, 'secondary')}
          >
            <ExternalLinkIcon size={size === 'sm' ? 14 : 16} />
            {` ${link.label}`}
          </ExternalAnchor>
        ))}
      </div>
    )
  }

  return (
    <div className={className ?? 'flex space-x-3'}>
      {repoUrl && (
        <IconLink
          href={repoUrl}
          label={withProjectContext('Open GitHub repository', contextLabel)}
        >
          <GitHubIcon size={24} />
        </IconLink>
      )}
      {liveUrl && (
        <IconLink
          href={liveUrl}
          label={getLiveIconLabel(
            resolvedLiveLabel || 'Live Site',
            contextLabel
          )}
        >
          <ExternalLinkIcon size={24} />
        </IconLink>
      )}
      {additionalLinks?.map((link) => (
        <IconLink
          key={link.url}
          href={link.url}
          label={withProjectContext(`Open ${link.label}`, contextLabel)}
        >
          <ExternalLinkIcon size={24} />
        </IconLink>
      ))}
    </div>
  )
}
