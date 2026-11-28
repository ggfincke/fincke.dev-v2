// tests/releasePreflight.test.ts
// release preflight contract: tag syntax, manifest match & changelog notes

import { describe, expect, it } from 'vitest'

import {
  readChangelogSection,
  runReleasePreflight,
} from '~/scripts/lib/changelog'

const CHANGELOG = [
  '# Changelog',
  '',
  'Notes for [2.9.0] are mentioned here in prose, as ## [2.9.0] mid-line.',
  '',
  '## [3.0.0-rc.1] - 2026-12-01',
  '',
  '### Added',
  '',
  '- Release candidate note',
  '',
  '## [2.10.0] - 2026-11-20',
  '',
  '### Fixed',
  '',
  '- First fix',
  '- Second fix',
  '',
  '## [2.1.0] - 2026-01-05',
  '',
  '   ',
  '',
  '## [2.0.0] - 2026-01-01',
  '',
  '- Last section runs to the end of the file',
  '',
].join('\n')

function preflight(tag: string, packageVersion: string)
{
  return runReleasePreflight({ tag, packageVersion, changelog: CHANGELOG })
}

describe('release preflight', () =>
{
  it('returns exactly the notes under a stable or prerelease heading', () =>
  {
    expect(preflight('v2.10.0', '2.10.0')).toEqual({
      tag: { tag: 'v2.10.0', version: '2.10.0', prerelease: false },
      notes: '### Fixed\n\n- First fix\n- Second fix',
    })
    expect(preflight('v3.0.0-rc.1', '3.0.0-rc.1')).toEqual({
      tag: { tag: 'v3.0.0-rc.1', version: '3.0.0-rc.1', prerelease: true },
      notes: '### Added\n\n- Release candidate note',
    })
    expect(readChangelogSection(CHANGELOG, '2.0.0')).toBe(
      '- Last section runs to the end of the file'
    )
  })

  it('matches the heading literally, at the start of a line', () =>
  {
    // "." must not act as a wildcard: 2.1.0 is not 2.10.0, nor 2x10y0
    expect(() => readChangelogSection(CHANGELOG, '2.1')).toThrow(/found 0/)
    expect(() => readChangelogSection(CHANGELOG, '2x10y0')).toThrow(/found 0/)
    // mentioned only in prose
    expect(() => readChangelogSection(CHANGELOG, '2.9.0')).toThrow(/found 0/)
  })

  it('rejects a missing section & a section w/o notes', () =>
  {
    expect(() => preflight('v9.9.9', '9.9.9')).toThrow(/exactly one/)
    expect(() => preflight('v2.1.0', '2.1.0')).toThrow(/has no notes/)
  })

  it('rejects a tag that does not match package.json', () =>
  {
    expect(() => preflight('v2.10.0', '2.11.0')).toThrow(/does not match/)
  })

  it('rejects tags outside vX.Y.Z or vX.Y.Z-prerelease', () =>
  {
    for (const tag of ['2.10.0', 'v2.10', 'v2.10.0+build', 'v2.10.0;id', 'v'])
    {
      expect(() => preflight(tag, '2.10.0')).toThrow(/not a release tag/)
    }
  })
})
