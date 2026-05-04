// src/shared/components/ui/ActionLink.tsx
// shared section/page action link for route CTAs

import type { CSSProperties, ReactNode } from 'react'
import { Link, type To } from 'react-router-dom'

import { cn, ACTION_LINK_CLASSES } from '~/shared/utils/classNames'
import { getNewTabLinkProps } from '~/shared/utils/linkProps'

// common action link props
interface ActionLinkBaseProps
{
  children: ReactNode
  className?: string
  style?: CSSProperties
  icon?: ReactNode
  iconPosition?: 'start' | 'end'
  ariaLabel?: string
}

// discriminated action link props
type ActionLinkProps =
  | (ActionLinkBaseProps & {
      to: To
      href?: never
      openInNewTab?: never
    })
  | (ActionLinkBaseProps & {
      href: string
      to?: never
      openInNewTab?: boolean
    })

// shared CTA/action link for internal routes or href targets
export function ActionLink({
  children,
  className,
  style,
  icon,
  iconPosition = 'end',
  ariaLabel,
  ...props
}: ActionLinkProps)
{
  const classes = cn(ACTION_LINK_CLASSES, className)
  const content = (
    <>
      {icon && iconPosition === 'start' && icon}
      {children}
      {icon && iconPosition === 'end' && icon}
    </>
  )

  if (props.to !== undefined)
  {
    return (
      <Link
        to={props.to}
        className={classes}
        style={style}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    )
  }

  return (
    <a
      href={props.href}
      className={classes}
      style={style}
      aria-label={ariaLabel}
      {...getNewTabLinkProps(props.openInNewTab)}
    >
      {content}
    </a>
  )
}
