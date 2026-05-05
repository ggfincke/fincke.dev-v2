// src/shared/components/ui/icons/BrandIcon.tsx
// internal shared brand icon renderer for filled-path SVG glyphs

// props for brand icon
interface BrandIconProps
{
  path: string
  size?: number
  className?: string
}

// filled-path SVG icon (24x24 viewBox)
export function BrandIcon({ path, size = 24, className }: BrandIconProps)
{
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
    >
      <path d={path} />
    </svg>
  )
}
