// src/shared/components/ui/InlineLink.tsx
// styled inline link for text content

import type { ReactNode } from 'react';

interface InlineLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

// inline link component
export function InlineLink({
  href,
  children,
  className = 'underline decoration-[var(--muted)] underline-offset-4 hover:text-[var(--fg)]',
}: InlineLinkProps) {
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}
