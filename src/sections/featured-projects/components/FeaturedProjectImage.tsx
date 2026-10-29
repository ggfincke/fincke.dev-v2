// src/sections/featured-projects/components/FeaturedProjectImage.tsx
// featured project thumbnail w/ hover effects

import type { CSSProperties } from 'react'

import { MOTION_CLASSES } from '~/shared/utils/animationConfig'

// props for featured project image
interface FeaturedProjectImageProps
{
  imagePath: string
  imageAlt: string
  focus?: string
}

// project thumbnail w/ hover effects; compact cards crop to fill the wide box,
// stacked cards letterbox the full image
export function FeaturedProjectImage({
  imagePath,
  imageAlt,
  focus,
}: FeaturedProjectImageProps)
{
  return (
    <div
      className={`flex h-36 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--border)]/40 bg-[var(--bg)]/40 shadow-sm sm:h-32 sm:w-40 short-desktop:h-24 short-desktop:w-full ${MOTION_CLASSES.emphasizedTransformShadow} lg:group-hover:-translate-y-0.5 lg:group-hover:shadow-md`}
    >
      <img
        src={imagePath}
        alt={imageAlt}
        loading="lazy"
        width={160}
        height={128}
        style={{ '--thumb-focus': focus } as CSSProperties}
        className={`h-full w-full object-contain p-1 short-desktop:object-cover short-desktop:p-0 short-desktop:[object-position:var(--thumb-focus,center)] ${MOTION_CLASSES.emphasizedFilter} lg:group-hover:brightness-110`}
      />
    </div>
  )
}
