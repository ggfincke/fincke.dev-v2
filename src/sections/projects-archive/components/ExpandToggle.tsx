// src/sections/projects-archive/components/ExpandToggle.tsx
// expandable row toggle button w/ chevron icon

interface ExpandToggleProps {
  expanded: boolean;
  onToggle: () => void;
}

export function ExpandToggle({ expanded, onToggle }: ExpandToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors p-1 rounded hover:bg-[var(--card)] flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      aria-label={
        expanded ? 'Collapse project details' : 'Expand project details'
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transform transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );
}
