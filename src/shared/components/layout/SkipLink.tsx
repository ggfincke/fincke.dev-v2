// src/shared/components/layout/SkipLink.tsx
// shared skip navigation link for page shells

import { SKIP_LINK_CLASSES } from '~/shared/utils/classNames'

// props for shared skip link
interface SkipLinkProps
{
  targetId?: string
}

// skip navigation link for keyboard users
export function SkipLink({ targetId = 'main-content' }: SkipLinkProps)
{
  return (
    <a href={`#${targetId}`} className={SKIP_LINK_CLASSES}>
      Skip to content
    </a>
  )
}
