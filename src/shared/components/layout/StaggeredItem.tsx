// src/shared/components/layout/StaggeredItem.tsx
// wrapper for staggered entrance animation list items

import type { ReactNode } from 'react'

import { getStaggerProps } from '~/shared/utils/animationConfig'
import { cn } from '~/shared/utils/classNames'

interface StaggeredItemProps
{
  baseDelay: number
  stepDelay: number
  index: number
  children: ReactNode
  className?: string
}

export function StaggeredItem({
  baseDelay,
  stepDelay,
  index,
  children,
  className,
}: StaggeredItemProps)
{
  const { className: staggerClassName, style } = getStaggerProps(
    baseDelay,
    stepDelay,
    index
  )

  return (
    <div className={cn(staggerClassName, className)} style={style}>
      {children}
    </div>
  )
}
