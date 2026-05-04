// src/shared/components/ui/ExternalLink.tsx
// shared anchor for styled external/text links

import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { cn, FOCUS_RING_CLASSES } from '~/shared/utils/classNames'
import { getNewTabLinkProps } from '~/shared/utils/linkProps'

// props for shared external link
interface ExternalLinkProps
  extends Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'children' | 'className' | 'href' | 'rel' | 'target'
  >
  {
  href: string
  children: ReactNode
  className?: string
  openInNewTab?: boolean
}

// shared anchor that centralizes new-tab semantics & focus treatment
export function ExternalLink({
  href,
  children,
  className,
  openInNewTab = true,
  ...props
}: ExternalLinkProps)
{
  return (
    <a
      href={href}
      className={cn(FOCUS_RING_CLASSES, className)}
      {...props}
      {...getNewTabLinkProps(openInNewTab)}
    >
      {children}
    </a>
  )
}
