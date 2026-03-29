// src/sections/projects-archive/components/ExpandToggle.tsx
// expandable row toggle button w/ chevron icon

import { ChevronIcon } from '~/shared/components/ui/icons'

// props for expand toggle
interface ExpandToggleProps
{
  expanded: boolean
  onToggle: () => void
}

// expandable row toggle button w/ chevron icon
export function ExpandToggle({ expanded, onToggle }: ExpandToggleProps)
{
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`p-1 rounded flex-shrink-0 transition-all duration-150 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ${expanded ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : 'text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--card)]'}`}
      aria-expanded={expanded}
      aria-label={
        expanded ? 'Collapse project details' : 'Expand project details'
      }
    >
      <ChevronIcon
        className={`transform transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`}
      />
    </button>
  )
}
