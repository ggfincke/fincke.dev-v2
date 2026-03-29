// src/shared/components/layout/InteractiveCard.tsx
// wrapper component that conditionally renders link or div w/ hover effects

import type { ReactNode } from 'react'

import { ExternalLink } from '~/shared/components/ui/ExternalLink'

const BASE_CLASSES =
  'group relative block p-1 transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50'

// props for interactive card
interface InteractiveCardProps
{
  href?: string
  children: ReactNode
  className?: string
}

// card wrapper that renders link or div w/ hover effects
export function InteractiveCard({
  href,
  children,
  className = '',
}: InteractiveCardProps)
{
  const classes = `${BASE_CLASSES} ${className}`

  if (href)
  {
    return (
      <ExternalLink href={href} className={classes}>
        {children}
      </ExternalLink>
    )
  }

  return <div className={classes}>{children}</div>
}
