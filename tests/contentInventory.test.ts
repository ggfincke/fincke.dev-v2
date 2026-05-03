// tests/contentInventory.test.ts
// coverage for shared content & metadata inventory

import { describe, expect, it } from 'vitest'

import {
  getContentInventory,
  normalizeExternalUrl,
} from '../scripts/lib/contentInventory'

describe('content inventory', () =>
{
  it('dedupes external urls while preserving all source locations', () =>
  {
    const inventory = getContentInventory()
    const githubProfile = inventory.externalUrls.find(
      (entry) =>
        entry.normalizedUrl ===
        normalizeExternalUrl('https://github.com/ggfincke')
    )

    expect(githubProfile).toBeDefined()
    expect(githubProfile?.sources).toEqual(
      expect.arrayContaining(['social: GitHub', 'index.html json-ld sameAs'])
    )
  })

  it('collects runtime, deployment, retained, and root-level local files', () =>
  {
    const inventory = getContentInventory()
    const localFiles = new Map(
      inventory.localFiles.map((reference) => [reference.path, reference])
    )

    expect(localFiles.get('/thumbnail.ico')).toMatchObject({
      category: 'runtime',
      storage: 'repo-root',
    })
    expect(localFiles.get('/assets/images/profile.jpg')).toMatchObject({
      category: 'runtime',
      storage: 'public',
    })
    expect(
      localFiles.get('/documents/garrett_fincke_resume.pdf')
    ).toMatchObject({
      category: 'runtime',
    })
    expect(localFiles.get('/documents/resume-master.pdf')).toMatchObject({
      category: 'retained',
    })
    expect(localFiles.get('/robots.txt')).toMatchObject({
      category: 'deployment',
    })
    expect(localFiles.get('/sitemap.xml')).toMatchObject({
      category: 'deployment',
    })
  })

  it('collects robots and sitemap urls from shipped deployment files', () =>
  {
    const inventory = getContentInventory()

    expect(inventory.robotsSitemapUrls).toContain(
      'https://fincke.dev/sitemap.xml'
    )
    expect(inventory.sitemapUrls).toEqual(
      expect.arrayContaining([
        'https://fincke.dev/',
        'https://fincke.dev/projects',
      ])
    )
  })
})
