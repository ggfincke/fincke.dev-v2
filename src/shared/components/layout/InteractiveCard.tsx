// src/shared/components/layout/InteractiveCard.tsx
// wrapper component that conditionally renders link or div w/ hover effects

import type { ReactNode } from 'react'

import { ExternalLink } from '~/shared/components/ui/ExternalLink'
import { CARD_HOVER_BACKDROP, cn } from '~/shared/utils/classNames'

const BASE_CLASSES =
  'group relative block p-1 transition-opacity lg:hover:!opacity-100 lg:group-hover/list:opacity-50'

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
  const classes = cn(BASE_CLASSES, className)
  const content =
    withHoverBackdrop || contentClassName ? (
      <div
        className={cn(withHoverBackdrop && 'relative z-10', contentClassName)}
      >
        {children}
      </div>
    ) : (
      children
    )

  const inner = withHoverBackdrop ? (
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
