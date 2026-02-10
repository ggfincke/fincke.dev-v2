// src/shared/components/ui/icons/ArrowIcon.tsx
// right arrow icon for navigation links

// props for arrow icon
interface ArrowIconProps {
  size?: number;
  className?: string;
}

// right arrow SVG for navigation links
export function ArrowIcon({ size = 16, className }: ArrowIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
}
