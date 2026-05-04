// src/shared/components/feedback/FullScreenMessagePage.tsx
// shared full-screen shell for 404 & route-error pages

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { FULL_SCREEN_MESSAGE_ACTION_CLASSES } from '~/shared/utils/classNames'

// props for full-screen message page
interface FullScreenMessagePageProps
{
  visual?: ReactNode
  // pre-styled <h1> & <p> elements composed by the caller
  children: ReactNode
  homeLabel?: string
}

// centered full-screen feedback page shell
export function FullScreenMessagePage({
  visual,
  children,
  homeLabel = 'Go home',
}: FullScreenMessagePageProps)
{
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-4 text-center text-[var(--muted)]">
      {visual}
      {children}
      <Link to="/" className={FULL_SCREEN_MESSAGE_ACTION_CLASSES}>
        {homeLabel}
      </Link>
    </div>
  )
}
