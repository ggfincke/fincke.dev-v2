// scripts/check-changelog.ts
// version hook gate: CHANGELOG.md must have notes for the bumped package version

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { readChangelogSection } from '~/scripts/lib/changelog'
import { REPO_ROOT } from '~/scripts/lib/paths'

// runs as the Bun "version" lifecycle hook, after package.json is bumped &
// before the commit & tag are created
const { version } = JSON.parse(
  readFileSync(join(REPO_ROOT, 'package.json'), 'utf8')
) as { version: string }

try
{
  readChangelogSection(
    readFileSync(join(REPO_ROOT, 'CHANGELOG.md'), 'utf8'),
    version
  )
}
catch (error)
{
  const reason = error instanceof Error ? error.message : String(error)
  console.error(
    `\n  ${reason}\n` +
      `  Add a "## [${version}]" section with notes to CHANGELOG.md before running bun pm version.\n`
  )
  process.exit(1)
}

console.log(`  Changelog entry found for v${version}`)
