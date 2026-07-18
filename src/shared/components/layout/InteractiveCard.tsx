// src/shared/components/layout/InteractiveCard.tsx
// wrapper component that conditionally renders link or div w/ hover effects

import type { ReactNode } from 'react'

import { ExternalLink } from '~/shared/components/ui/ExternalLink'
import { CARD_HOVER_BACKDROP, cn } from '~/shared/utils/classNames'

const BASE_CLASSES = 'relative block p-1'

// hover affordances only apply to linked cards so static cards don't read as clickable
const LINK_CLASSES = 'group'

// props for interactive card
interface InteractiveCardProps
{
  href?: string
  children: ReactNode
  className?: string
  contentClassName?: string
  openInNewTab?: boolean
  withHoverBackdrop?: boolean
}

// card wrapper that renders link or div w/ hover effects
export function InteractiveCard({
  href,
  children,
  className,
  contentClassName,
  openInNewTab = true,
  withHoverBackdrop = false,
}: InteractiveCardProps)
{
  const isLink = Boolean(href)
  const showHoverBackdrop = withHoverBackdrop && isLink
  const classes = cn(BASE_CLASSES, isLink && LINK_CLASSES, className)
  const content =
    showHoverBackdrop || contentClassName ? (
      <div
        className={cn(showHoverBackdrop && 'relative z-10', contentClassName)}
      >
        {children}
      </div>
    ) : (
      children
    )

  const inner = showHoverBackdrop ? (
    <>
      <div className={CARD_HOVER_BACKDROP} />
      {content}
    </>
  ) : (
    content
  )

  if (href)
  {
    return (
      <ExternalLink href={href} className={classes} openInNewTab={openInNewTab}>
        {inner}
      </ExternalLink>
    )
  }

  return <div className={classes}>{inner}</div>
}
