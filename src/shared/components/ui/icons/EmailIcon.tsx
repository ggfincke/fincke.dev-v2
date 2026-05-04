// src/shared/components/ui/icons/EmailIcon.tsx
// outline-style email envelope icon

// props for email icon
interface EmailIconProps
{
  size?: number
  className?: string
}

// outline email envelope SVG
export function EmailIcon({
  size = 24,
  className = 'h-6 w-6',
}: EmailIconProps)
{
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
