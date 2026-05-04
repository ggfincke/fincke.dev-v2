// src/shared/components/layout/NestedInteractionBoundary.tsx
// named boundary for controls nested inside clickable rows/cards

import type { ReactNode } from 'react'

import { getNestedInteractionProps } from '~/shared/utils/interaction'

// props for nested interaction boundary
interface NestedInteractionBoundaryProps
{
  children: ReactNode
  className?: string
}

// named boundary for controls nested inside clickable rows/cards
export function NestedInteractionBoundary({
  children,
  className,
}: NestedInteractionBoundaryProps)
{
  return (
    <div
      className={className}
      role="presentation"
      {...getNestedInteractionProps<HTMLDivElement>()}
    >
      {children}
    </div>
  )
}
