// src/sections/education/components/SchoolLogo.tsx
// official school logos rendered as bitmap assets

import { SCHOOL_LOGO_ASSETS } from '~/content/assets'
import type { EducationLogo } from '~/shared/types'
import { cn } from '~/shared/utils/classNames'

interface SchoolLogoProps
{
  logo: EducationLogo
  className?: string
}

const LOGO_CLASSES = 'object-contain'

// official school logo bitmap
export function SchoolLogo({ logo, className }: SchoolLogoProps)
{
  const asset = SCHOOL_LOGO_ASSETS[logo]

  return (
    <img
      src={asset.path}
      alt={asset.alt}
      className={cn(LOGO_CLASSES, className)}
      loading="lazy"
      decoding="async"
    />
  )
}
