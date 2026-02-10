// src/shared/components/ui/icons/GitHubIcon.tsx
// GitHub logo icon via simple-icons

import { siGithub } from 'simple-icons';

// props for GitHub icon
interface GitHubIconProps {
  size?: number;
  className?: string;
}

// GitHub logo SVG via simple-icons
export function GitHubIcon({ size = 24, className }: GitHubIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
    >
      <path d={siGithub.path} />
    </svg>
  );
}
