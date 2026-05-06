// src/shared/components/layout/ProjectLinks.tsx
// shared links renderer for project repository & live links

import type { ComponentType } from 'react'

import type { ExternalLink } from '~/shared/types'
import { ExternalLink as ExternalAnchor } from '~/shared/components/ui/ExternalLink'
import { IconLink } from '~/shared/components/ui/IconLink'
import { getButtonClasses } from '~/shared/utils/classNames'
import { getProjectLiveLabel } from '~/shared/utils/projectLinks'
import { ExternalLinkIcon } from '~/shared/components/ui/icons/ExternalLinkIcon'
import { GitHubIcon } from '~/shared/components/ui/icons/GitHubIcon'

// link display variant type
export type ProjectLinksVariant = 'icon' | 'button'

// project link "kind" → primary vs secondary CTA styling & label
type LinkKind = 'repo' | 'live' | 'extra'

interface ResolvedLink
{
  href: string
  // short aria-label used by the icon variant
  iconLabel: string
  // visible text for the button variant when size is sm
  buttonLabel: string
  // visible text for the button variant when size is md
  buttonLabelLong: string
  Icon: ComponentType<{ size?: number }>
  kind: LinkKind
}

// props for project links
interface ProjectLinksProps
{
  repoUrl?: string
  liveUrl?: string
  additionalLinks?: readonly ExternalLink[]
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

// flatten the (repo/live/extra) inputs into a single ordered list of links
function buildLinks(
  repoUrl: string | undefined,
  liveUrl: string | undefined,
  additionalLinks: readonly ExternalLink[] | undefined,
  resolvedLiveLabel: string | undefined,
  contextLabel?: string
): ResolvedLink[]
{
  const links: ResolvedLink[] = []

  if (repoUrl)
  {
    links.push({
      href: repoUrl,
      iconLabel: withProjectContext('Open GitHub repository', contextLabel),
      buttonLabel: 'Repository',
      buttonLabelLong: 'View Repository',
      Icon: GitHubIcon,
      kind: 'repo',
    })
  }

  if (liveUrl)
  {
    const live = resolvedLiveLabel ?? 'View Live Site'
    links.push({
      href: liveUrl,
      iconLabel: getLiveIconLabel(
        resolvedLiveLabel ?? 'Live Site',
        contextLabel
      ),
      buttonLabel: live,
      buttonLabelLong: live,
      Icon: ExternalLinkIcon,
      kind: 'live',
    })
  }

  for (const link of additionalLinks ?? [])
  {
    links.push({
      href: link.url,
      iconLabel: withProjectContext(`Open ${link.label}`, contextLabel),
      buttonLabel: link.label,
      buttonLabelLong: link.label,
      Icon: ExternalLinkIcon,
      kind: 'extra',
    })
  }

  return links
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

  const links = buildLinks(
    repoUrl,
    liveUrl,
    additionalLinks,
    resolvedLiveLabel,
    contextLabel
  )

  if (links.length === 0)
  {
    return null
  }

  if (variant === 'button')
  {
    const buttonIconSize = size === 'sm' ? 14 : 16
    return (
      <div className={className ?? 'flex flex-wrap gap-2'}>
        {links.map((link) =>
        {
          const colorVariant: 'primary' | 'secondary' =
            link.kind === 'live' ? 'primary' : 'secondary'
          const label = size === 'sm' ? link.buttonLabel : link.buttonLabelLong
          const Icon = link.Icon

          return (
            <ExternalAnchor
              key={link.href}
              href={link.href}
              className={getButtonClasses(size, colorVariant)}
            >
              <Icon size={buttonIconSize} /> {label}
            </ExternalAnchor>
          )
        })}
      </div>
    )
  }

  return (
    <div className={className ?? 'flex space-x-3'}>
      {links.map((link) =>
      {
        const Icon = link.Icon
        return (
          <IconLink key={link.href} href={link.href} label={link.iconLabel}>
            <Icon size={24} />
          </IconLink>
        )
      })}
    </div>
  )
}
