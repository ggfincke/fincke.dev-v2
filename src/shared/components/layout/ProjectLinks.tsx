// src/shared/components/layout/ProjectLinks.tsx
// shared links renderer for project repository & live links

import type { ExternalLink } from '~/shared/types';
import { getButtonClasses } from '~/shared/utils/classNames';
import { ExternalLinkIcon } from '~/shared/components/ui/icons/ExternalLinkIcon';
import { GitHubIcon } from '~/shared/components/ui/icons/GitHubIcon';

// link display variant type
export type ProjectLinksVariant = 'icon' | 'button';

// props for project links
interface ProjectLinksProps {
  repoUrl?: string;
  liveUrl?: string;
  additionalLinks?: ExternalLink[];
  variant?: ProjectLinksVariant;
  size?: 'sm' | 'md';
  liveLabel?: string;
  className?: string;
}

// project links component w/ icon or button variants
export function ProjectLinks({
  repoUrl,
  liveUrl,
  additionalLinks,
  variant = 'icon',
  size = 'sm',
  liveLabel,
  className,
}: ProjectLinksProps) {
  if (
    !repoUrl &&
    !liveUrl &&
    (!additionalLinks || additionalLinks.length === 0)
  ) {
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
        {additionalLinks?.map(link => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={getButtonClasses(size, 'secondary')}
          >
            <ExternalLinkIcon size={size === 'sm' ? 14 : 16} />
            {` ${link.label}`}
          </a>
        ))}
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
      {additionalLinks?.map(link => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-sm"
          aria-label={link.label}
        >
          <ExternalLinkIcon size={24} />
        </a>
      ))}
    </div>
  );
}
