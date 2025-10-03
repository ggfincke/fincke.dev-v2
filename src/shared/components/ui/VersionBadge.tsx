// src/shared/components/ui/VersionBadge.tsx
// fetches latest GitHub release tag for a project repository

import { useEffect, useState } from 'react';

interface GitHubRelease {
  tag_name: string;
}

interface VersionBadgeProps {
  repoUrl: string;
}

// version badge component
export function VersionBadge({ repoUrl }: VersionBadgeProps) {
  const [version, setVersion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // fetch latest release from GitHub API
  useEffect(() => {
    let isMounted = true;

    const fetchLatestVersion = async () => {
      try {
        const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) {
          return;
        }

        const [, owner, repo] = match;
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/releases/latest`
        );

        if (!isMounted) {
          return;
        }

        if (response.ok) {
          const release: GitHubRelease = await response.json();
          setVersion(release.tag_name);
        }
      } catch {
        // swallow errors; badge is optional
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLatestVersion();

    return () => {
      isMounted = false;
    };
  }, [repoUrl]);

  if (loading || !version) {
    return null;
  }

  return (
    <span className="font-semibold text-base text-[var(--accent)] not-italic">
      {version} •{' '}
    </span>
  );
}
