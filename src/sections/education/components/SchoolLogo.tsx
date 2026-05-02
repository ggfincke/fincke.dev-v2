// src/sections/education/components/SchoolLogo.tsx
// official school logos rendered as bitmap assets

const LOGO_CLASSES = 'h-full w-full object-contain'

// university of pittsburgh seal
export function PittLogo()
{
  return (
    <img
      src="/assets/logos/schools/pitt.png"
      alt="University of Pittsburgh"
      className={LOGO_CLASSES}
      loading="lazy"
      decoding="async"
    />
  )
}

// penn state nittany lion shield
export function PennStateLogo()
{
  return (
    <img
      src="/assets/logos/schools/penn-state.png"
      alt="The Pennsylvania State University"
      className={LOGO_CLASSES}
      loading="lazy"
      decoding="async"
    />
  )
}
