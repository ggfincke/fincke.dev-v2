// src/shared/components/ui/icons/ChevronIcon.tsx
// chevron icon w/ configurable direction

import { cn } from '~/shared/utils/classNames'

// props for chevron icon
interface ChevronIconProps
{
  size?: number
  className?: string
  direction?: 'left' | 'right' | 'up' | 'down'
}

// rotation classes for non-default chevron directions
const DIRECTION_ROTATION = {
  right: '',
  down: 'rotate-90',
  left: 'rotate-180',
  up: '-rotate-90',
} as const

// chevron SVG w/ configurable direction
export function ChevronIcon({
  size = 16,
  className,
  direction = 'right',
}: ChevronIconProps)
{
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(DIRECTION_ROTATION[direction], className)}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}
