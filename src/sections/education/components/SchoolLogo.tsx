// src/sections/education/components/SchoolLogo.tsx
// official school logos rendered as bitmap assets

import {
  PENN_STATE_LOGO_PATH,
  PITT_LOGO_PATH,
} from '~/sections/education/components/schoolLogos.paths'
import { cn } from '~/shared/utils/classNames'

interface SchoolLogoProps
{
  className?: string
}

const LOGO_CLASSES = 'object-contain'

// university of pittsburgh seal
export function PittLogo({ className }: SchoolLogoProps)
{
  return (
    <img
      src={PITT_LOGO_PATH}
      alt="University of Pittsburgh"
      className={cn(LOGO_CLASSES, className)}
      loading="lazy"
      decoding="async"
    />
  )
}

// penn state nittany lion shield
export function PennStateLogo({ className }: SchoolLogoProps)
{
  return (
    <img
      src={PENN_STATE_LOGO_PATH}
      alt="The Pennsylvania State University"
      className={cn(LOGO_CLASSES, className)}
      loading="lazy"
      decoding="async"
    />
  )
}
