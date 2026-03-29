// tests/assetValidation.test.ts
// coverage for asset categorization & deployment metadata validation

import { describe, expect, it } from 'vitest'

import {
  createLocalFileReferenceMap,
  getPublicFileCategory,
  validateAssetInventory,
} from '../scripts/lib/assetValidation'
import { getContentInventory } from '../scripts/lib/contentInventory'

describe('asset validation', () =>
{
  it('classifies ignored and orphan paths correctly', () =>
  {
    const inventory = getContentInventory()
    const referenceMap = createLocalFileReferenceMap(inventory.localFiles)

    expect(getPublicFileCategory('/assets/.DS_Store', referenceMap)).toBe(
      'ignored'
    )
    expect(
      getPublicFileCategory(
        '/assets/projects/images/example-unused.png',
        referenceMap
      )
    ).toBe('orphan')
  })

  it('keeps retained files distinct from runtime files', () =>
  {
    const inventory = getContentInventory()
    const result = validateAssetInventory(inventory)
    const publicFiles = new Map(
      result.classifiedPublicFiles.map((file) => [file.path, file])
    )

    expect(publicFiles.get('/documents/resume-master.pdf')?.category).toBe(
      'retained'
    )
    expect(publicFiles.get('/documents/resume-selected.pdf')?.category).toBe(
      'runtime'
    )
    expect(publicFiles.get('/robots.txt')?.category).toBe('deployment')
  })

  it('validates robots and sitemap against the shared public route manifest', () =>
  {
    const result = validateAssetInventory(getContentInventory())

    expect(result.robots.hasExpectedSitemapUrl).toBe(true)
    expect(result.sitemap.missingUrls).toEqual([])
    expect(result.sitemap.extraUrls).toEqual([])
    expect(result.orphaned).toEqual([])
  })
})
