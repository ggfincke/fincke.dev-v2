// tests/documentationContracts.test.ts
// documentation source-of-truth invariants

import { existsSync, readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

const gitignore = readFileSync('.gitignore', 'utf8')
const prettierIgnore = readFileSync('.prettierignore', 'utf8')

function getIgnoreRules(source: string): string[]
{
  return source
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
}

describe('documentation contracts', () =>
{
  it('keeps dev-docs ignored as local working space', () =>
  {
    const ignoreRules = getIgnoreRules(gitignore)

    expect(ignoreRules).toContain('dev-docs/')
    expect(ignoreRules).not.toContain('dev-docs/local/')
    expect(ignoreRules).not.toContain('dev-docs/generated/')
  })

  it('keeps ignored dev-docs out of the Prettier gate', () =>
  {
    const ignoreRules = getIgnoreRules(prettierIgnore)

    expect(ignoreRules).toContain('dev-docs/')
  })

  it('keeps canonical maintainer docs under docs', () =>
  {
    expect(existsSync('docs/architecture.md')).toBe(true)
    expect(existsSync('docs/screenshots.md')).toBe(true)
  })
})
