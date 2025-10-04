// src/shared/components/layout/InteractiveCard.tsx
// wrapper component that conditionally renders link or div w/ hover effects

import type { ReactNode } from 'react';

interface InteractiveCardProps {
  href?: string;
  children: ReactNode;
  className?: string;
}

// interactive card wrapper
export function InteractiveCard({
  href,
  children,
  className = 'group relative block p-1 transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50',
}: InteractiveCardProps) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return <div className={className}>{children}</div>;
}
