// scripts/validate-assets.ts
// validates local runtime/deployment assets & classifies retained/orphaned files
// Usage: npm run validate-assets

import { validateAssetInventory } from '~/scripts/lib/assetValidation'
import { formatSources, printSection } from '~/scripts/lib/cliFormat'
import { getContentInventory } from '~/scripts/lib/contentInventory'

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

  printSection(`Found Runtime Assets (${foundByCategory.runtime.length})`)
  for (const file of foundByCategory.runtime)
  {
    console.log(`  OK  ${file.path}  (${formatSources(file.sources)})`)
  }

  printSection(`Found Deployment Assets (${foundByCategory.deployment.length})`)
  for (const file of foundByCategory.deployment)
  {
    console.log(`  OK  ${file.path}  (${formatSources(file.sources)})`)
  }

  printSection(`Found Retained Assets (${foundByCategory.retained.length})`)
  for (const file of foundByCategory.retained)
  {
    console.log(`  OK  ${file.path}  (${formatSources(file.sources)})`)
  }

  if (blockingMissing.length > 0)
  {
    printSection(
      `Missing Runtime / Deployment Assets (${blockingMissing.length})`
    )
    for (const file of blockingMissing)
    {
      console.log(
        `  !!  ${file.path}  [${file.category}; ${file.storage}]  (${formatSources(file.sources)})`
      )
    }
  }
  else
  {
    console.log('\nNo missing runtime or deployment assets.')
  }

  if (retainedMissing.length > 0)
  {
    printSection(`Missing Retained Assets (${retainedMissing.length})`)
    for (const file of retainedMissing)
    {
      console.log(
        `  ??  ${file.path}  [${file.category}; ${file.storage}]  (${formatSources(file.sources)})`
      )
    }
  }
  else
  {
    console.log('\nNo missing retained assets.')
  }

  if (result.orphaned.length > 0)
  {
    printSection(`Unexpected Orphans (${result.orphaned.length})`)
    for (const file of result.orphaned)
    {
      console.log(`  !!  ${file.path}  (${file.sizeBytes} bytes)`)
    }
  }
  else
  {
    console.log('\nNo unexpected orphaned files.')
  }

  if (result.ignored.length > 0)
  {
    printSection(`Ignored Files (${result.ignored.length})`)
    for (const file of result.ignored)
    {
      console.log(`  --  ${file.path}`)
    }
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
