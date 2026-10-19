// src/shared/components/ui/VersionBadge.tsx
// latest github release tag shown beside a project's dates

// props for version badge
interface VersionBadgeProps
{
  version: string
}

// release tag resolved at build time (see shared/utils/githubReleases)
export function VersionBadge({ version }: VersionBadgeProps)
{
  return (
    <span className="font-semibold text-base text-[var(--accent)] not-italic">
      {version} •{' '}
    </span>
  )
}
