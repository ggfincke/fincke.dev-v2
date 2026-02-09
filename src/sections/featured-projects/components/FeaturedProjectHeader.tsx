// src/sections/featured-projects/components/FeaturedProjectHeader.tsx
// project title w/ external link icon

import { ExternalLinkIcon } from '~/shared/components/ui/icons';

// props for featured project header
interface FeaturedProjectHeaderProps {
  title: string;
  hasLink?: boolean;
}

// project title w/ optional external link icon
export function FeaturedProjectHeader({
  title,
  hasLink,
}: FeaturedProjectHeaderProps) {
  return (
    <h3 className="text-sm font-medium text-[var(--white)]">
      {title}
      {hasLink && <ExternalLinkIcon size={12} className="ml-1 inline-block" />}
    </h3>
  );
}
