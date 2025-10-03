// src/components/display/ProjectLinks.tsx
// shared links renderer for project repository & live links

import { getButtonClasses } from '~/utils/classNames';

export type ProjectLinksVariant = 'icon' | 'button';

interface ProjectLinksProps {
  repoUrl?: string;
  liveUrl?: string;
  variant?: ProjectLinksVariant;
  size?: 'sm' | 'md';
  liveLabel?: string;
  className?: string;
}

// github icon component
function GitHubIcon({ size, className }: { size: number; className?: string }) {
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
      className={className}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

// external link icon component
function ExternalLinkIcon({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
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
      className={className}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// project links component w/ icon or button variants
export function ProjectLinks({
  repoUrl,
  liveUrl,
  variant = 'icon',
  size = 'sm',
  liveLabel,
  className,
}: ProjectLinksProps) {
  if (!repoUrl && !liveUrl) {
    return null;
  }

  if (variant === 'button') {
    return (
      <div className={className ?? 'flex flex-wrap gap-2'}>
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={getButtonClasses(size, 'secondary')}
          >
            <GitHubIcon size={size === 'sm' ? 14 : 16} />
            {size !== 'sm' ? ' View Repository' : ' Repository'}
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={getButtonClasses(size, 'primary')}
          >
            <ExternalLinkIcon size={size === 'sm' ? 14 : 16} />
            {liveLabel ? ` ${liveLabel}` : ' View Live Site'}
          </a>
        )}
      </div>
    );
  }

  return (
    <div className={className ?? 'flex space-x-3'}>
      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-sm"
          aria-label="GitHub Repository"
        >
          <GitHubIcon size={24} />
        </a>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-sm"
          aria-label={liveLabel || 'Live Site'}
        >
          <ExternalLinkIcon size={24} />
        </a>
      )}
    </div>
  );
}
