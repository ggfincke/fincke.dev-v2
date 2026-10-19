// src/shared/utils/githubReleases.ts
// newest github release per linked repo, resolved at build time

// injected by the github-releases plugin in vite.config.ts on production
// builds; absent in dev & tests, where authored versions are used instead
declare const __GITHUB_RELEASES__: Readonly<Record<string, string>> | undefined

const BUILD_RELEASES: Readonly<Record<string, string>> =
  typeof __GITHUB_RELEASES__ === 'undefined' ? {} : __GITHUB_RELEASES__

// newest release tag for a repo URL, if the build found one
export function getRepoRelease(repoUrl?: string): string | undefined
{
  return repoUrl ? BUILD_RELEASES[repoUrl] : undefined
}
