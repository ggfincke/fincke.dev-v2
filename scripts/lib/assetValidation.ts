// scripts/lib/assetValidation.ts
// local asset validation & deployment-file classification

import { readdirSync, statSync, type Stats } from 'fs'
import { basename, join, relative } from 'path'

import type { ContentInventory, LocalFileReference } from './contentInventory'
import { PUBLIC_DIR, REPO_ROOT, normalizeExternalUrl } from './contentInventory'
import { SITEMAP_URL, getPublicRouteUrls } from './siteManifest'

interface PublicFileEntry
{
  path: string
  diskPath: string
  sizeBytes: number
}

export type PublicFileCategory =
  | LocalFileReference['category']
  | 'ignored'
  | 'orphan'

export interface ClassifiedPublicFile
{
  path: string
  category: PublicFileCategory
  sizeBytes: number
  sources: string[]
}

export interface MissingLocalFile
{
  path: string
  category: LocalFileReference['category']
  storage: LocalFileReference['storage']
  sources: string[]
}

export interface AssetValidationResult
{
  found: LocalFileReference[]
  missing: MissingLocalFile[]
  orphaned: ClassifiedPublicFile[]
  ignored: ClassifiedPublicFile[]
  classifiedPublicFiles: ClassifiedPublicFile[]
  robots: {
    sitemapUrls: string[]
    expectedSitemapUrl: string
    hasExpectedSitemapUrl: boolean
  }
  sitemap: {
    actualUrls: string[]
    expectedUrls: string[]
    missingUrls: string[]
    extraUrls: string[]
  }
}

// walk dir, capturing each file's url-path, disk-path, & size in one pass
function listPublicFiles(dir: string): PublicFileEntry[]
{
  const results: PublicFileEntry[] = []

  for (const entry of readdirSync(dir, { withFileTypes: true }))
  {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory())
    {
      results.push(...listPublicFiles(fullPath))
      continue
    }

    const stats: Stats = statSync(fullPath)
    results.push({
      path: '/' + relative(PUBLIC_DIR, fullPath).replace(/\\/g, '/'),
      diskPath: fullPath,
      sizeBytes: stats.size,
    })
  }

  return results
}

// resolve disk path; treat ENOENT as "missing", rethrow anything else
function tryStatFile(filePath: string): Stats | undefined
{
  try
  {
    return statSync(filePath)
  }
  catch (error)
  {
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    )
    {
      return undefined
    }
    throw error
  }
}

function getDiskPath(reference: LocalFileReference): string
{
  const segments = reference.path.split('/').filter(Boolean)
  const baseDir = reference.storage === 'repo-root' ? REPO_ROOT : PUBLIC_DIR
  return join(baseDir, ...segments)
}

export function createLocalFileReferenceMap(
  references: ReadonlyArray<LocalFileReference>
): Map<string, LocalFileReference>
{
  return new Map(references.map((reference) => [reference.path, reference]))
}

export function getPublicFileCategory(
  path: string,
  referenceMap: ReadonlyMap<string, LocalFileReference>
): PublicFileCategory
{
  if (basename(path).startsWith('.'))
  {
    return 'ignored'
  }

  return referenceMap.get(path)?.category ?? 'orphan'
}

export function validateAssetInventory(
  inventory: ContentInventory
): AssetValidationResult
{
  const referenceMap = createLocalFileReferenceMap(inventory.localFiles)
  const found: LocalFileReference[] = []
  const missing: MissingLocalFile[] = []

  for (const reference of inventory.localFiles)
  {
    if (tryStatFile(getDiskPath(reference)) !== undefined)
    {
      found.push(reference)
      continue
    }

    missing.push({
      path: reference.path,
      category: reference.category,
      storage: reference.storage,
      sources: reference.sources,
    })
  }

  const classifiedPublicFiles = listPublicFiles(PUBLIC_DIR)
    .sort((left, right) => left.path.localeCompare(right.path))
    .map((entry) =>
    {
      const category = getPublicFileCategory(entry.path, referenceMap)
      return {
        path: entry.path,
        category,
        sizeBytes: entry.sizeBytes,
        sources: referenceMap.get(entry.path)?.sources ?? [],
      }
    })

  const normalizedExpectedSitemapUrl = normalizeExternalUrl(SITEMAP_URL)
  const normalizedRobotsSitemapUrls =
    inventory.robotsSitemapUrls.map(normalizeExternalUrl)

  const expectedSitemapUrls = getPublicRouteUrls().map(normalizeExternalUrl)
  const actualSitemapUrls = [
    ...new Set(inventory.sitemapUrls.map(normalizeExternalUrl)),
  ].sort((left, right) => left.localeCompare(right))
  const expectedSitemapUrlSet = new Set(expectedSitemapUrls)

  return {
    found,
    missing,
    orphaned: classifiedPublicFiles.filter(
      (file) => file.category === 'orphan'
    ),
    ignored: classifiedPublicFiles.filter(
      (file) => file.category === 'ignored'
    ),
    classifiedPublicFiles,
    robots: {
      sitemapUrls: inventory.robotsSitemapUrls,
      expectedSitemapUrl: SITEMAP_URL,
      hasExpectedSitemapUrl: normalizedRobotsSitemapUrls.includes(
        normalizedExpectedSitemapUrl
      ),
    },
    sitemap: {
      actualUrls: actualSitemapUrls,
      expectedUrls: expectedSitemapUrls,
      missingUrls: expectedSitemapUrls.filter(
        (url) => !actualSitemapUrls.includes(url)
      ),
      extraUrls: actualSitemapUrls.filter(
        (url) => !expectedSitemapUrlSet.has(url)
      ),
    },
  }
}
