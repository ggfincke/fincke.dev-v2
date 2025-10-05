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
  className = 'text-[var(--red)] underline decoration-[var(--red)]/40 underline-offset-4 transition hover:text-[var(--white)] hover:decoration-[var(--white)]/40',
}: InlineLinkProps) {
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}
