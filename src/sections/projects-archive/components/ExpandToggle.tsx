// src/sections/projects-archive/components/ExpandToggle.tsx
// expandable row toggle button w/ chevron icon

import { ChevronIcon } from '~/shared/components/ui/icons';

// props for expand toggle
interface ExpandToggleProps {
  expanded: boolean;
  onToggle: () => void;
}

// expandable row toggle button w/ chevron icon
export function ExpandToggle({ expanded, onToggle }: ExpandToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors p-1 rounded hover:bg-[var(--card)] flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      aria-expanded={expanded}
      aria-label={
        expanded ? 'Collapse project details' : 'Expand project details'
      }
    >
      <ChevronIcon
        className={`transform transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
      />
    </button>
  );
}
