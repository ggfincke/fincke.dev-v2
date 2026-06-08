// scripts/validate-assets.ts
// validates local runtime/deployment assets & classifies retained/orphaned files
// Usage: bun run validate-assets

import {
  validateAssetInventory,
  type ClassifiedPublicFile,
  type MissingLocalFile,
} from '~/scripts/lib/assetValidation'
import { formatSources, printSection } from '~/scripts/lib/cliFormat'
import {
  getContentInventory,
  type LocalFileReference,
} from '~/scripts/lib/contentInventory'

function printFileSection<T>(
  title: string,
  files: readonly T[],
  formatFile: (file: T) => string
): void
{
  printSection(`${title} (${files.length})`)
  for (const file of files)
  {
    console.log(formatFile(file))
  }
}

function formatFoundAsset(file: LocalFileReference): string
{
  return `  OK  ${file.path}  (${formatSources(file.sources)})`
}

function formatBlockingMissingAsset(file: MissingLocalFile): string
{
  return `  !!  ${file.path}  [${file.category}; ${file.storage}]  (${formatSources(file.sources)})`
}

function formatRetainedMissingAsset(file: MissingLocalFile): string
{
  return `  ??  ${file.path}  [${file.category}; ${file.storage}]  (${formatSources(file.sources)})`
}

function formatOrphanedAsset(file: ClassifiedPublicFile): string
{
  return `  !!  ${file.path}  (${file.sizeBytes} bytes)`
}

function formatIgnoredAsset(file: ClassifiedPublicFile): string
{
  return `  --  ${file.path}`
}

function main()
{
  const inventory = getContentInventory()
  const result = validateAssetInventory(inventory)

  const foundByCategory = {
    runtime: result.found.filter((file) => file.category === 'runtime'),
    deployment: result.found.filter((file) => file.category === 'deployment'),
    retained: result.found.filter((file) => file.category === 'retained'),
  }
  const blockingMissing = result.missing.filter(
    (file) => file.category !== 'retained'
  )
  const retainedMissing = result.missing.filter(
    (file) => file.category === 'retained'
  )
  const hasDeploymentMetadataFailure =
    !result.robots.hasExpectedSitemapUrl ||
    result.sitemap.missingUrls.length > 0 ||
    result.sitemap.extraUrls.length > 0

  printFileSection(
    'Found Runtime Assets',
    foundByCategory.runtime,
    formatFoundAsset
  )
  printFileSection(
    'Found Deployment Assets',
    foundByCategory.deployment,
    formatFoundAsset
  )
  printFileSection(
    'Found Retained Assets',
    foundByCategory.retained,
    formatFoundAsset
  )

  if (blockingMissing.length > 0)
  {
    printFileSection(
      'Missing Runtime / Deployment Assets',
      blockingMissing,
      formatBlockingMissingAsset
    )
  }
  else
  {
    console.log('\nNo missing runtime or deployment assets.')
  }

  if (retainedMissing.length > 0)
  {
    printFileSection(
      'Missing Retained Assets',
      retainedMissing,
      formatRetainedMissingAsset
    )
  }
  else
  {
    console.log('\nNo missing retained assets.')
  }

  if (result.orphaned.length > 0)
  {
    printFileSection('Unexpected Orphans', result.orphaned, formatOrphanedAsset)
  }
  else
  {
    console.log('\nNo unexpected orphaned files.')
  }

  if (result.ignored.length > 0)
  {
    printFileSection('Ignored Files', result.ignored, formatIgnoredAsset)
  }

  printSection('Deployment Metadata')
  console.log(
    `  robots.txt sitemap reference: ` +
      `${result.robots.hasExpectedSitemapUrl ? 'OK' : 'MISSING'} ` +
      `(${result.robots.expectedSitemapUrl})`
  )
  console.log(
    `  sitemap.xml routes: ${result.sitemap.actualUrls.length} actual / ` +
      `${result.sitemap.expectedUrls.length} expected`
  )

  if (result.sitemap.missingUrls.length > 0)
  {
    console.log('  Missing sitemap URLs:')
    for (const url of result.sitemap.missingUrls)
    {
      console.log(`    !!  ${url}`)
    }
  }

  if (result.sitemap.extraUrls.length > 0)
  {
    console.log('  Extra sitemap URLs:')
    for (const url of result.sitemap.extraUrls)
    {
      console.log(`    ??  ${url}`)
    }
  }

  console.log(
    `\nSummary: ${result.found.length} found, ${blockingMissing.length} blocking missing, ` +
      `${retainedMissing.length} retained missing, ${result.orphaned.length} orphaned, ` +
      `${result.ignored.length} ignored\n`
  )

  if (
    blockingMissing.length > 0 ||
    result.orphaned.length > 0 ||
    hasDeploymentMetadataFailure
  )
  {
    process.exit(1)
  }
}

main()
