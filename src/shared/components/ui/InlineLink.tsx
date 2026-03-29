// src/shared/components/ui/InlineLink.tsx
// styled inline link for text content

import type { ReactNode } from 'react'

import { FOCUS_RING_CLASSES } from '~/shared/utils/classNames'

// props for inline link
interface InlineLinkProps
{
  href: string
  children: ReactNode
  className?: string
}

// styled inline link for text content
export function InlineLink({
  href,
  children,
  className = '',
}: InlineLinkProps)
{
  return (
    <a
      className={`rounded-sm text-[var(--red)] underline decoration-[var(--red)]/40 underline-offset-4 transition hover:text-[var(--white)] hover:decoration-[var(--white)]/40 ${FOCUS_RING_CLASSES} ${className}`}
      href={href}
    >
      {children}
    </a>
  )
}
