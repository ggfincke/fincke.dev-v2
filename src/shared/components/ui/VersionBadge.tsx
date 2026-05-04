// src/shared/components/ui/VersionBadge.tsx
// fetches latest GitHub release tag for a project repository

import { useEffect, useState } from 'react'

// props for version badge
interface VersionBadgeProps
{
  repoUrl: string
}

interface GitHubRepo
{
  owner: string
  repo: string
}

type CachedRelease = string | null | undefined

const RELEASE_MISS_TTL_MS = 1000 * 60 * 30
const inFlightReleaseRequests = new Map<string, Promise<string | null>>()

function parseGitHubRepo(repoUrl: string): GitHubRepo | null
{
  const match = repoUrl.match(
    /github\.com\/(?<owner>[^/?#]+)\/(?<repo>[^/?#]+)/
  )
  const owner = match?.groups?.owner
  const repo = match?.groups?.repo?.replace(/\.git$/, '')

  return owner && repo ? { owner, repo } : null
}

function readSessionValue(key: string): string | null
{
  try
  {
    return sessionStorage.getItem(key)
  }
  catch
  {
    return null
  }
}

function writeSessionValue(key: string, value: string): void
{
  try
  {
    sessionStorage.setItem(key, value)
  }
  catch
  {
    // cache is optional
  }
}

function removeSessionValue(key: string): void
{
  try
  {
    sessionStorage.removeItem(key)
  }
  catch
  {
    // cache is optional
  }
}

function getMissCacheKey(cacheKey: string): string
{
  return `${cacheKey}:miss`
}

function getCachedRelease(cacheKey: string): CachedRelease
{
  const cachedRelease = readSessionValue(cacheKey)
  if (cachedRelease)
  {
    return cachedRelease
  }

  const missCacheKey = getMissCacheKey(cacheKey)
  const missTimestamp = Number(readSessionValue(missCacheKey))
  if (!Number.isFinite(missTimestamp))
  {
    removeSessionValue(missCacheKey)
    return undefined
  }

  if (Date.now() - missTimestamp <= RELEASE_MISS_TTL_MS)
  {
    return null
  }

  removeSessionValue(missCacheKey)
  return undefined
}

function cacheRelease(cacheKey: string, version: string): void
{
  writeSessionValue(cacheKey, version)
  removeSessionValue(getMissCacheKey(cacheKey))
}

function cacheReleaseMiss(cacheKey: string): void
{
  writeSessionValue(getMissCacheKey(cacheKey), String(Date.now()))
}

function getReleaseTag(data: unknown): string | null
{
  if (
    typeof data === 'object' &&
    data !== null &&
    'tag_name' in data &&
    typeof data.tag_name === 'string'
  )
  {
    return data.tag_name
  }

  return null
}

function fetchLatestRelease({
  owner,
  repo,
}: GitHubRepo): Promise<string | null>
{
  const cacheKey = `gh-release:${owner}/${repo}`
  const inFlight = inFlightReleaseRequests.get(cacheKey)

  if (inFlight)
  {
    return inFlight
  }

  const request = fetch(
    `https://api.github.com/repos/${owner}/${repo}/releases/latest`
  )
    .then(async (res) =>
    {
      if (!res.ok)
      {
        cacheReleaseMiss(cacheKey)
        return null
      }

      const version = getReleaseTag(await res.json())
      if (!version)
      {
        cacheReleaseMiss(cacheKey)
        return null
      }

      cacheRelease(cacheKey, version)
      return version
    })
    .catch(() =>
    {
      cacheReleaseMiss(cacheKey)
      return null
    })
    .finally(() =>
    {
      inFlightReleaseRequests.delete(cacheKey)
    })

  inFlightReleaseRequests.set(cacheKey, request)
  return request
}

// latest release version badge from GitHub API (cached in sessionStorage)
export function VersionBadge({ repoUrl }: VersionBadgeProps)
{
  const [version, setVersion] = useState<string | null>(null)

  useEffect(() =>
  {
    setVersion(null)

    const githubRepo = parseGitHubRepo(repoUrl)
    if (!githubRepo)
    {
      return
    }

    const cacheKey = `gh-release:${githubRepo.owner}/${githubRepo.repo}`
    const cached = getCachedRelease(cacheKey)
    if (cached !== undefined)
    {
      setVersion(cached)
      return
    }

    let isActive = true

    fetchLatestRelease(githubRepo).then((latestVersion) =>
    {
      if (isActive)
      {
        setVersion(latestVersion)
      }
    })

    return () =>
    {
      isActive = false
    }
  }, [repoUrl])

  if (!version) return null

  return (
    <span className="font-semibold text-base text-[var(--accent)] not-italic">
      {version} •{' '}
    </span>
  )
}
