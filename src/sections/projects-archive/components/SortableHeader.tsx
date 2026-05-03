// src/sections/projects-archive/components/SortableHeader.tsx
// table header cell w/ click-to-sort button & direction indicator

import { FOCUS_RING_CLASSES } from '~/shared/utils/classNames'
import type { ProjectSortDirection, ProjectSortKey } from '../utils/projectSort'

// props for sortable header
interface SortableHeaderProps
{
  label: string
  sortKey: ProjectSortKey
  active: boolean
  direction: ProjectSortDirection
  onSort: (key: ProjectSortKey) => void
  align?: 'left' | 'center'
  className?: string
}

// table header cell w/ click-to-sort button & direction indicator
export function SortableHeader({
  label,
  sortKey,
  active,
  direction,
  onSort,
  align = 'left',
  className = '',
}: SortableHeaderProps)
{
  const ariaSort = active
    ? direction === 'asc'
      ? 'ascending'
      : 'descending'
    : 'none'
  const justifyClass = align === 'center' ? 'justify-center' : 'justify-start'
  const activeTextClass = active
    ? 'text-[var(--accent)]'
    : 'text-[var(--muted)]'

  return (
    <th
      scope="col"
      aria-sort={ariaSort}
      className={`py-4 text-sm font-medium uppercase tracking-wider ${className}`}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={`group/sort inline-flex w-full items-center gap-1.5 ${justifyClass} ${activeTextClass} uppercase tracking-wider transition-colors hover:text-[var(--accent)] ${FOCUS_RING_CLASSES}`}
        aria-label={
          active
            ? `Sort by ${label} (currently ${direction === 'asc' ? 'ascending' : 'descending'})`
            : `Sort by ${label}`
        }
      >
        <span>{label}</span>
        <SortIndicator active={active} direction={direction} />
      </button>
    </th>
  )
}

// stacked up/down arrows; active arrow inherits the parent text color
function SortIndicator({
  active,
  direction,
}: {
  active: boolean
  direction: ProjectSortDirection
})
{
  const upActive = active && direction === 'asc'
  const downActive = active && direction === 'desc'
  const inactiveClass =
    'text-[var(--muted)]/30 group-hover/sort:text-[var(--muted)]/60'

  return (
    <span
      aria-hidden="true"
      className="inline-flex flex-col items-center leading-none"
    >
      <svg
        width="8"
        height="5"
        viewBox="0 0 8 5"
        className={upActive ? 'text-current' : inactiveClass}
      >
        <path d="M4 0 L8 5 L0 5 Z" fill="currentColor" />
      </svg>
      <svg
        width="8"
        height="5"
        viewBox="0 0 8 5"
        className={`mt-0.5 ${downActive ? 'text-current' : inactiveClass}`}
      >
        <path d="M0 0 L8 0 L4 5 Z" fill="currentColor" />
      </svg>
    </span>
  )
}
