// src/sections/featured-projects/components/FeaturedProjectHeader.tsx
// project title w/ external link icon

interface FeaturedProjectHeaderProps {
  title: string;
  hasLink?: boolean;
}

// featured project header component
export function FeaturedProjectHeader({
  title,
  hasLink,
}: FeaturedProjectHeaderProps) {
  return (
    <h3 className="text-sm font-medium text-[var(--white)]">
      {title}
      {hasLink && (
        <svg
          className="ml-1 inline-block h-3 w-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      )}
    </h3>
  );
}
