// src/shared/components/ui/StatusCircle.tsx
// circular status indicator w/ emoji & background color

import type { CSSProperties } from 'react'

import type { ProjectStatus } from '~/shared/types'
import { statusConfig } from '~/shared/utils/statusConfig'

// props for status circle
interface StatusCircleProps
{
  status: ProjectStatus
  size?: number
  // set when a visible label sits next to the circle so it isn't announced twice
  decorative?: boolean
}

// circular status indicator w/ emoji
export function StatusCircle({
  status,
  size = 32,
  decorative = false,
}: StatusCircleProps)
{
  const statusDisplay = statusConfig[status]

  const style: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    // emoji renders at half the circle diameter for visual balance
    fontSize: `${Math.round(size * 0.5)}px`,
    backgroundColor: `var(${statusDisplay.colorVar})`,
    color: 'var(--bg)',
  }

  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-medium"
      style={style}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : statusDisplay.label}
      title={decorative ? undefined : statusDisplay.label}
    >
      {statusDisplay.icon}
    </span>
  )
}
