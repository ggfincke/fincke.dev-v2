// scripts/release-preflight.ts
// release workflow gate: validates a tag & writes its changelog notes to a file
// Usage: bun scripts/release-preflight.ts <tag> <notes-file>

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { runReleasePreflight } from '~/scripts/lib/changelog'
import { REPO_ROOT } from '~/scripts/lib/paths'

const [tag, notesFile] = process.argv.slice(2)
if (!tag || !notesFile)
{
  console.error('Usage: bun scripts/release-preflight.ts <tag> <notes-file>')
  process.exit(1)
}

const { version } = JSON.parse(
  readFileSync(join(REPO_ROOT, 'package.json'), 'utf8')
) as { version: string }

try
{
  const { notes } = runReleasePreflight({
    tag,
    packageVersion: version,
    changelog: readFileSync(join(REPO_ROOT, 'CHANGELOG.md'), 'utf8'),
  })
  writeFileSync(notesFile, `${notes}\n`)
  console.log(`Release preflight passed for ${tag}`)
}
catch (error)
{
  console.error(
    `Release preflight failed: ${error instanceof Error ? error.message : String(error)}`
  )
  process.exit(1)
}
