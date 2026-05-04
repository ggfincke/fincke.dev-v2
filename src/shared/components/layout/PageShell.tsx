// src/shared/components/layout/PageShell.tsx
// shared route-level main content shell

import type { ReactNode } from 'react'

import { cn } from '~/shared/utils/classNames'

// props for page shell
interface PageShellProps
{
  children: ReactNode
  className?: string
  mainId?: string
}

// shared main landmark & width container for top-level pages
export function PageShell({
  children,
  className,
  mainId = 'main-content',
}: PageShellProps)
{
  return (
    <main id={mainId} className={cn('mx-auto max-w-7xl px-4', className)}>
      {children}
    </main>
  )
}
