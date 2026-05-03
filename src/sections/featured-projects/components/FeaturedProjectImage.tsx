// src/sections/featured-projects/components/FeaturedProjectImage.tsx
// featured project thumbnail w/ hover effects

import { MOTION_CLASSES } from '~/shared/utils/animationConfig'

// props for featured project image
interface FeaturedProjectImageProps
{
  imagePath: string
  imageAlt?: string
  title: string
}

// project thumbnail w/ hover effects
export function FeaturedProjectImage({
  imagePath,
  imageAlt,
  title,
}: FeaturedProjectImageProps)
{
  return (
    <div
      className={`relative z-10 flex h-32 w-40 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--border)]/40 bg-[var(--bg)]/40 shadow-sm transition-all duration-300 ${MOTION_CLASSES.emphasizedOut} motion-reduce:transition-none lg:group-hover:-translate-y-0.5 lg:group-hover:shadow-md`}
    >
      <img
        src={imagePath}
        alt={imageAlt || title}
        loading="lazy"
        className={`max-h-full max-w-full object-contain p-1 transition-[filter] duration-300 ${MOTION_CLASSES.emphasizedOut} lg:group-hover:brightness-110 motion-reduce:transition-none`}
      />
    </div>
  )
}
