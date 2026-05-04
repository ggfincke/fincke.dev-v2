// src/sections/projects-archive/components/SortableHeader.tsx
// table header cell w/ click-to-sort button & direction indicator

import { ChevronIcon } from '~/shared/components/ui/icons'
import { FOCUS_RING_CLASSES, cn } from '~/shared/utils/classNames'
import type {
  ProjectSortDirection,
  ProjectSortKey,
} from '~/sections/projects-archive/utils/projectSort'

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
  const directionLabel = direction === 'asc' ? 'ascending' : 'descending'
  const ariaSort = active ? directionLabel : 'none'
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
            ? `Sort by ${label} (currently ${directionLabel})`
            : `Sort by ${label}`
        }
      >
        <span>{label}</span>
        <SortIndicator active={active} direction={direction} />
      </button>
    </th>
  )
}

// stacked chevrons; active arrow inherits the parent text color
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
  const iconClass = 'h-2.5 w-2.5 shrink-0 stroke-[2.75]'

  return (
    <span
      aria-hidden="true"
      className="inline-flex flex-col items-center leading-none"
    >
      <ChevronIcon
        size={10}
        direction="up"
        className={cn(iconClass, upActive ? 'text-current' : inactiveClass)}
      />
      <ChevronIcon
        size={10}
        direction="down"
        className={cn(
          '-mt-1',
          iconClass,
          downActive ? 'text-current' : inactiveClass
        )}
      />
    </span>
  )
}
