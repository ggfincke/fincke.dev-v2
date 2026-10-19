// scripts/lib/githubReleases.ts
// resolves each linked repo's newest github release for the production build

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { runnerImport } from 'vite'

import type { Project } from '~/shared/types'

// this repo's release is cut from the commit being built, so its package
// version is already correct while the github release may not exist yet
const SELF_REPO_URL = 'https://github.com/ggfincke/fincke.dev-v2'

const REQUEST_TIMEOUT_MS = 8000

interface GitHubRelease
{
  tag_name: string
  draft: boolean
}

// newest non-draft release (pre-releases included); undefined when the repo has none
async function fetchNewestRelease(
  repoUrl: string,
  headers: Record<string, string>
): Promise<string | undefined>
{
  const [, owner, repo] = new URL(repoUrl).pathname.split('/')
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/releases?per_page=10`,
    { headers, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) }
  )

  if (response.status === 404)
  {
    return undefined
  }
  if (!response.ok)
  {
    throw new Error(`HTTP ${response.status}`)
  }

  const releases = (await response.json()) as GitHubRelease[]
  return releases.find((release) => !release.draft)?.tag_name
}

// map of repoUrl -> newest release tag for every github-linked project.
// failures (offline, rate limits) are skipped so the build falls back to
// authored versions instead of failing
export async function resolveProjectReleases(
  root: string
): Promise<Record<string, string>>
{
  const { module } = await runnerImport<{ projects: readonly Project[] }>(
    '/src/content/projects/all.ts',
    {
      configFile: false,
      root,
      logLevel: 'silent',
      resolve: { alias: { '~': resolve(root, 'src') } },
    }
  )
  const { version } = JSON.parse(
    readFileSync(resolve(root, 'package.json'), 'utf8')
  ) as { version: string }

  const repoUrls = [
    ...new Set(
      module.projects
        .map((project) => project.repoUrl)
        .filter(
          (url): url is string =>
            url?.startsWith('https://github.com/') ?? false
        )
    ),
  ]
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  }

  const releases: Record<string, string> = { [SELF_REPO_URL]: `v${version}` }
  const failures: string[] = []

  await Promise.all(
    repoUrls
      .filter((repoUrl) => repoUrl !== SELF_REPO_URL)
      .map(async (repoUrl) =>
      {
        try
        {
          const tag = await fetchNewestRelease(repoUrl, headers)
          if (tag)
          {
            releases[repoUrl] = tag
          }
        }
        catch (error)
        {
          const reason = error instanceof Error ? error.message : String(error)
          failures.push(`${repoUrl}: ${reason}`)
        }
      })
  )

  if (failures.length > 0)
  {
    console.warn(
      `github releases: ${failures.length} lookup(s) failed, using authored versions for those\n  ${failures.join('\n  ')}`
    )
  }

  return releases
}
