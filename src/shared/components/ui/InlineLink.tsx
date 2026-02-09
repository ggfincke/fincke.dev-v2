// src/shared/components/ui/InlineLink.tsx
// styled inline link for text content

import type { ReactNode } from 'react';

const DEFAULT_INLINE_LINK_CLASSES =
  'text-[var(--red)] underline decoration-[var(--red)]/40 underline-offset-4 transition hover:text-[var(--white)] hover:decoration-[var(--white)]/40';

// props for inline link
interface InlineLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

// styled inline link for text content
export function InlineLink({
  href,
  children,
  className = DEFAULT_INLINE_LINK_CLASSES,
}: InlineLinkProps) {
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}
