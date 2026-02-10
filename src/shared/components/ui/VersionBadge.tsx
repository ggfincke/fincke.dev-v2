// src/shared/components/ui/VersionBadge.tsx
// fetches latest GitHub release tag for a project repository

import { useEffect, useState } from 'react';

// props for version badge
interface VersionBadgeProps {
  repoUrl: string;
}

// latest release version badge from GitHub API (cached in sessionStorage)
export function VersionBadge({ repoUrl }: VersionBadgeProps) {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return;

    const [, owner, repo] = match;
    const cacheKey = `gh-release:${owner}/${repo}`;

    // check sessionStorage cache first
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      setVersion(cached);
      return;
    }

    const controller = new AbortController();

    fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
      signal: controller.signal,
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (typeof data?.tag_name === 'string') {
          sessionStorage.setItem(cacheKey, data.tag_name);
          setVersion(data.tag_name);
        }
      })
      .catch(() => {
        // swallow errors — badge is optional
      });

    return () => controller.abort();
  }, [repoUrl]);

  if (!version) return null;

  return (
    <span className="font-semibold text-base text-[var(--accent)] not-italic">
      {version} •{' '}
    </span>
  );
}
