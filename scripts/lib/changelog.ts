// scripts/lib/changelog.ts
// strict CHANGELOG.md section reader & release tag preflight

// stable `vX.Y.Z` or prerelease `vX.Y.Z-<id>`; nothing else may reach a release
const RELEASE_TAG_PATTERN = /^v(\d+\.\d+\.\d+(-[0-9A-Za-z][0-9A-Za-z.-]*)?)$/

export interface ReleaseTag
{
  tag: string
  // tag w/o the leading `v`
  version: string
  prerelease: boolean
}

export interface ReleasePreflightInput
{
  tag: string
  packageVersion: string
  changelog: string
}

export function parseReleaseTag(tag: string): ReleaseTag
{
  const match = RELEASE_TAG_PATTERN.exec(tag)
  if (!match)
  {
    throw new Error(
      `"${tag}" is not a release tag; expected vX.Y.Z or vX.Y.Z-<prerelease>`
    )
  }

  return { tag, version: match[1], prerelease: match[2] !== undefined }
}

// * body of the one `## [<version>]` section, trimmed
// headings are compared as plain text at the start of a line, so `.` is
// literal & a version mentioned in prose can't stand in for a section
export function readChangelogSection(
  changelog: string,
  version: string
): string
{
  const heading = `## [${version}]`
  const lines = changelog.split(/\r?\n/)
  const starts = lines.flatMap((line, index) =>
    line === heading || line.startsWith(`${heading} `) ? [index] : []
  )

  if (starts.length !== 1)
  {
    throw new Error(
      `CHANGELOG.md needs exactly one "${heading}" section (found ${starts.length})`
    )
  }

  const bodyStart = starts[0] + 1
  const nextHeading = lines.findIndex(
    (line, index) => index >= bodyStart && line.startsWith('## ')
  )
  const body = lines
    .slice(bodyStart, nextHeading === -1 ? undefined : nextHeading)
    .join('\n')
    .trim()

  if (!body)
  {
    throw new Error(`CHANGELOG.md section "${heading}" has no notes`)
  }

  return body
}

// tag syntax, tag vs manifest version, & usable notes; throws on the first miss
export function runReleasePreflight({
  tag,
  packageVersion,
  changelog,
}: ReleasePreflightInput): { tag: ReleaseTag; notes: string }
{
  const releaseTag = parseReleaseTag(tag)
  if (releaseTag.version !== packageVersion)
  {
    throw new Error(
      `tag ${tag} does not match package.json version ${packageVersion}`
    )
  }

  return {
    tag: releaseTag,
    notes: readChangelogSection(changelog, releaseTag.version),
  }
}
