// tests/automationContracts.test.ts
// release + CI automation invariants (parsed-config layer only)

import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

interface PackageJson
{
  scripts: Record<string, string>
}

const nodeTsConfig = readFileSync('tsconfig.node.json', 'utf8')
const packageJson = JSON.parse(
  readFileSync('package.json', 'utf8')
) as PackageJson

function getScript(name: string): string
{
  const script = packageJson.scripts[name]

  expect(script, `missing package script: ${name}`).toBeDefined()

  return script
}

function countOccurrences(text: string, value: string): number
{
  return text.split(value).length - 1
}

describe('automation contracts', () =>
{
  it('keeps CI checks non-duplicative', () =>
  {
    const ciCheck = getScript('ci:check')

    expect(getScript('format:check')).toBe('prettier --check .')
    expect(getScript('bundle')).toBe('vite build')
    expect(getScript('build')).toBe('npm run typecheck && npm run bundle')
    expect(ciCheck).toBe(
      'npm run format:check && npm run lint && npm run typecheck && ' +
        'npm test && npm run validate-assets && npm run bundle'
    )

    expect(ciCheck).not.toContain('npm run build')
    expect(countOccurrences(ciCheck, 'npm run lint')).toBe(1)
    expect(countOccurrences(ciCheck, 'npm run typecheck')).toBe(1)
    expect(countOccurrences(ciCheck, 'npm run bundle')).toBe(1)
  })

  it('keeps browser verification separate from deterministic CI checks', () =>
  {
    expect(getScript('screenshots:smoke')).toBe(
      'npx tsx scripts/screenshots.ts --smoke'
    )
    expect(getScript('audit:accessibility')).toBe(
      'npx tsx scripts/accessibility.ts'
    )
    expect(getScript('browser:check')).toBe(
      'npm run audit:accessibility && npm run lighthouse && ' +
        'npm run screenshots:smoke'
    )

    expect(getScript('ci:check')).not.toContain('browser:check')
    expect(getScript('ci:check')).not.toContain('lighthouse')
    expect(getScript('ci:check')).not.toContain('screenshots')
  })

  it('keeps Node type checks independent from DOM libs', () =>
  {
    expect(nodeTsConfig).toContain('"lib": ["ES2023"]')
    expect(nodeTsConfig).not.toContain('"DOM"')
  })
})
