// src/shared/components/ui/IconLink.tsx
// shared icon-only anchor for social/project links

import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { cn, ICON_LINK_CLASSES } from '~/shared/utils/classNames'
import { getNewTabLinkProps } from '~/shared/utils/linkProps'

// props for icon link
interface IconLinkProps
  extends Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'aria-label' | 'children' | 'className' | 'href' | 'rel' | 'target'
  >
  {
  href: string
  label: string
  children: ReactNode
  className?: string
  openInNewTab?: boolean
}

// icon-only link w/ explicit accessibility label
export function IconLink({
  href,
  label,
  children,
  className,
  openInNewTab = true,
  ...props
}: IconLinkProps)
{
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(ICON_LINK_CLASSES, className)}
      {...props}
      {...getNewTabLinkProps(openInNewTab)}
    >
      {children}
    </a>
  )
}
