// src/shared/components/ui/icons/ExternalLinkIcon.tsx
// external link icon (box w/ arrow)

// props for external link icon
interface ExternalLinkIconProps {
  size?: number;
  className?: string;
}

// external link SVG icon (box w/ arrow)
export function ExternalLinkIcon({
  size = 24,
  className,
}: ExternalLinkIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
