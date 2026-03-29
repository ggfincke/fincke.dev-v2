// src/shared/components/feedback/FullScreenMessagePage.tsx
// shared full-screen shell for 404 & route-error pages

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { FULL_SCREEN_MESSAGE_ACTION_CLASSES } from '~/shared/utils/classNames'

// props for full-screen message page
interface FullScreenMessagePageProps
{
  visual?: ReactNode
  title: ReactNode
  description: ReactNode
  secondaryDescription?: ReactNode
  homeLabel?: string
  titleClassName?: string
  descriptionClassName?: string
  secondaryDescriptionClassName?: string
}

// centered full-screen feedback page shell
export function FullScreenMessagePage({
  visual,
  title,
  description,
  secondaryDescription,
  homeLabel = 'Go home',
  titleClassName = 'text-2xl font-bold text-[var(--fg)]',
  descriptionClassName = 'mt-4 max-w-md text-[var(--muted)]',
  secondaryDescriptionClassName = 'mt-2 max-w-md text-[var(--muted)]',
}: FullScreenMessagePageProps)
{
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-4 text-center text-[var(--muted)]">
      {visual}
      <h1 className={titleClassName}>{title}</h1>
      <p className={descriptionClassName}>{description}</p>
      {secondaryDescription && (
        <p className={secondaryDescriptionClassName}>{secondaryDescription}</p>
      )}
      <Link to="/" className={FULL_SCREEN_MESSAGE_ACTION_CLASSES}>
        {homeLabel}
      </Link>
    </div>
  )
}
