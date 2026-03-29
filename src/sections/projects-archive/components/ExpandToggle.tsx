// src/sections/projects-archive/components/ExpandToggle.tsx
// expandable row toggle button w/ chevron icon

import { ChevronIcon } from '~/shared/components/ui/icons'
import { FOCUS_RING_CLASSES } from '~/shared/utils/classNames'

// props for expand toggle
interface ExpandToggleProps
{
  expanded: boolean
  onToggle: () => void
  controlsId: string
  title: string
}

// expandable row toggle button w/ chevron icon
export function ExpandToggle({
  expanded,
  onToggle,
  controlsId,
  title,
}: ExpandToggleProps)
{
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`p-1 rounded flex-shrink-0 transition-all duration-150 hover:scale-110 active:scale-95 ${FOCUS_RING_CLASSES} ${expanded ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : 'text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--card)]'}`}
      aria-expanded={expanded}
      aria-controls={controlsId}
      aria-label={
        expanded
          ? `Collapse details for ${title}`
          : `Expand details for ${title}`
      }
    >
      <ChevronIcon
        className={`transform transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`}
      />
    </button>
  )
}
