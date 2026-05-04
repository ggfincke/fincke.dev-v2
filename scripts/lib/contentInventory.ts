// scripts/lib/contentInventory.ts
// canonical inventory of content links, local files, & deployment metadata

import { readFileSync } from 'fs'
import { join } from 'path'

import { WORK_EXPERIENCE } from '../../src/content/experience'
import { SOCIAL_LINKS } from '../../src/content/home'
import { projects } from '../../src/content/projects'
import {
  PENN_STATE_LOGO_PATH,
  PITT_LOGO_PATH,
} from '../../src/sections/education/components/schoolLogos.paths'
import { RESUME_PATH } from '../../src/sections/experience/components/jobHistory.paths'
import { SITE_ORIGIN } from './siteManifest'

export type LocalFileCategory = 'runtime' | 'deployment' | 'retained'
export type LocalFileStorage = 'public' | 'repo-root'

export interface ExternalUrlReference
{
  url: string
  normalizedUrl: string
  sources: string[]
}

export interface LocalFileReference
{
  path: string
  normalizedPath: string
  category: LocalFileCategory
  storage: LocalFileStorage
  sources: string[]
}

interface RawExternalUrlReference
{
  url: string
  source: string
}

interface RawLocalFileReference
{
  path: string
  category: LocalFileCategory
  source: string
  storage: LocalFileStorage
}

interface IndexHtmlExternalAttributeSource
{
  tagName: 'link' | 'meta'
  matchAttribute: 'rel' | 'property' | 'name'
  matchValue: string
  urlAttribute: 'href' | 'content'
  source: string
}

export interface ContentInventory
{
  externalUrls: ExternalUrlReference[]
  localFiles: LocalFileReference[]
  robotsSitemapUrls: string[]
  sitemapUrls: string[]
}

export const REPO_ROOT = join(import.meta.dirname, '..', '..')
export const PUBLIC_DIR = join(REPO_ROOT, 'public')

const ROOT_LEVEL_LOCAL_FILES = new Set(['/thumbnail.ico'])

const MANUAL_RUNTIME_LOCAL_FILES: ReadonlyArray<RawLocalFileReference> = [
  {
    path: RESUME_PATH,
    category: 'runtime',
    source: 'JobHistory resume download',
    storage: 'public',
  },
  {
    path: PITT_LOGO_PATH,
    category: 'runtime',
    source: 'EducationCard Pitt logo',
    storage: 'public',
  },
  {
    path: PENN_STATE_LOGO_PATH,
    category: 'runtime',
    source: 'EducationCard Penn State logo',
    storage: 'public',
  },
]

const MANUAL_RETAINED_LOCAL_FILES: ReadonlyArray<RawLocalFileReference> = [
  {
    path: '/documents/resume-master.pdf',
    category: 'retained',
    source: 'retained manual resume source',
    storage: 'public',
  },
  {
    path: '/assets/logos/brand/fincke-logo.svg',
    category: 'retained',
    source: 'retained brand asset',
    storage: 'public',
  },
]

const DEPLOYMENT_LOCAL_FILES: ReadonlyArray<RawLocalFileReference> = [
  {
    path: '/robots.txt',
    category: 'deployment',
    source: 'deployment robots.txt',
    storage: 'public',
  },
  {
    path: '/sitemap.xml',
    category: 'deployment',
    source: 'deployment sitemap.xml',
    storage: 'public',
  },
]

const INDEX_HTML_EXTERNAL_ATTRIBUTE_SOURCES: ReadonlyArray<IndexHtmlExternalAttributeSource> =
  [
    {
      tagName: 'link',
      matchAttribute: 'rel',
      matchValue: 'canonical',
      urlAttribute: 'href',
      source: 'index.html canonical',
    },
    {
      tagName: 'meta',
      matchAttribute: 'property',
      matchValue: 'og:url',
      urlAttribute: 'content',
      source: 'index.html og:url',
    },
    {
      tagName: 'meta',
      matchAttribute: 'property',
      matchValue: 'og:image',
      urlAttribute: 'content',
      source: 'index.html og:image',
    },
    {
      tagName: 'meta',
      matchAttribute: 'name',
      matchValue: 'twitter:url',
      urlAttribute: 'content',
      source: 'index.html twitter:url',
    },
    {
      tagName: 'meta',
      matchAttribute: 'name',
      matchValue: 'twitter:image',
      urlAttribute: 'content',
      source: 'index.html twitter:image',
    },
  ]

function readTextFileIfExists(relativePath: string): string
{
  const filePath = join(REPO_ROOT, relativePath)

  try
  {
    return readFileSync(filePath, 'utf8')
  }
  catch (error)
  {
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    )
    {
      return ''
    }
    throw error
  }
}

function addSource(sources: string[], source: string)
{
  if (!sources.includes(source))
  {
    sources.push(source)
  }
}

export function normalizeExternalUrl(rawUrl: string): string
{
  const url = new URL(rawUrl)
  url.hash = ''
  return url.toString()
}

export function normalizeLocalPath(rawPath: string): string
{
  if (/^https?:\/\//i.test(rawPath))
  {
    return new URL(rawPath).pathname || '/'
  }

  const withoutLeadingSlash = rawPath.replace(/^\/+/, '')
  return `/${withoutLeadingSlash}`
}

function getStorageForPath(path: string): LocalFileStorage
{
  return ROOT_LEVEL_LOCAL_FILES.has(path) ? 'repo-root' : 'public'
}

function getSameOriginStaticPath(url: string): string | null
{
  const parsed = new URL(url)

  if (parsed.origin !== SITE_ORIGIN)
  {
    return null
  }

  const path = parsed.pathname || '/'
  const lastSegment = path.split('/').pop() ?? ''

  return lastSegment.includes('.') ? path : null
}

function addExternalReference(
  references: Map<string, ExternalUrlReference>,
  url: string,
  source: string
)
{
  const normalizedUrl = normalizeExternalUrl(url)
  const existing = references.get(normalizedUrl)

  if (existing)
  {
    addSource(existing.sources, source)
    return
  }

  references.set(normalizedUrl, {
    url: normalizedUrl,
    normalizedUrl,
    sources: [source],
  })
}

function addLocalReference(
  references: Map<string, LocalFileReference>,
  reference: RawLocalFileReference
)
{
  const normalizedPath = normalizeLocalPath(reference.path)
  const existing = references.get(normalizedPath)

  if (existing)
  {
    if (
      existing.category !== reference.category ||
      existing.storage !== reference.storage
    )
    {
      throw new Error(
        `Conflicting local file reference for ${normalizedPath}: ` +
          `${existing.category}/${existing.storage} vs ` +
          `${reference.category}/${reference.storage}`
      )
    }

    addSource(existing.sources, reference.source)
    return
  }

  references.set(normalizedPath, {
    path: normalizedPath,
    normalizedPath,
    category: reference.category,
    storage: reference.storage,
    sources: [reference.source],
  })
}

function getTagAttribute(tag: string, name: string): string | undefined
{
  return tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1]
}

function matchesTagAttribute(
  tag: string,
  name: string,
  expectedValue: string
): boolean
{
  return getTagAttribute(tag, name)?.toLowerCase() === expectedValue
}

function extractIndexHtmlTagReferences(indexHtml: string): {
  externalUrls: RawExternalUrlReference[]
  localFiles: RawLocalFileReference[]
}
{
  const externalUrls: RawExternalUrlReference[] = []
  const localFiles: RawLocalFileReference[] = []

  for (const match of indexHtml.matchAll(/<(link|meta)\b[^>]*>/gi))
  {
    const tag = match[0]
    const tagName = match[1]?.toLowerCase()

    if (tagName !== 'link' && tagName !== 'meta')
    {
      continue
    }

    for (const source of INDEX_HTML_EXTERNAL_ATTRIBUTE_SOURCES)
    {
      if (
        source.tagName !== tagName ||
        !matchesTagAttribute(tag, source.matchAttribute, source.matchValue)
      )
      {
        continue
      }

      const url = getTagAttribute(tag, source.urlAttribute)
      if (url)
      {
        externalUrls.push({ url, source: source.source })
      }
    }

    if (tagName !== 'link' || !matchesTagAttribute(tag, 'rel', 'icon'))
    {
      continue
    }

    const href = getTagAttribute(tag, 'href')
    if (!href)
    {
      continue
    }

    const path = normalizeLocalPath(href)
    localFiles.push({
      path,
      category: 'runtime',
      source: 'index.html favicon',
      storage: getStorageForPath(path),
    })
  }

  return { externalUrls, localFiles }
}

export function extractJsonLdMetadataUrls(
  indexHtml: string
): RawExternalUrlReference[]
{
  const scriptMatch = indexHtml.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/i
  )

  if (!scriptMatch?.[1])
  {
    return []
  }

  const trimmed = scriptMatch[1].trim()

  try
  {
    const parsed = JSON.parse(trimmed) as {
      sameAs?: unknown
      url?: unknown
    }
    const urls: RawExternalUrlReference[] = []

    if (typeof parsed.url === 'string')
    {
      urls.push({
        url: parsed.url,
        source: 'index.html json-ld url',
      })
    }

    if (Array.isArray(parsed.sameAs))
    {
      for (const value of parsed.sameAs)
      {
        if (typeof value === 'string')
        {
          urls.push({
            url: value,
            source: 'index.html json-ld sameAs',
          })
        }
      }
    }

    return urls
  }
  catch
  {
    return []
  }
}

export function extractIndexHtmlReferences(indexHtml: string): {
  externalUrls: RawExternalUrlReference[]
  localFiles: RawLocalFileReference[]
}
{
  const { externalUrls, localFiles } = extractIndexHtmlTagReferences(indexHtml)
  externalUrls.push(...extractJsonLdMetadataUrls(indexHtml))

  for (const reference of externalUrls)
  {
    const staticPath = getSameOriginStaticPath(reference.url)

    if (!staticPath)
    {
      continue
    }

    localFiles.push({
      path: staticPath,
      category: 'runtime',
      source: reference.source,
      storage: getStorageForPath(staticPath),
    })
  }

  return { externalUrls, localFiles }
}

export function extractRobotsSitemapUrls(robotsTxt: string): string[]
{
  return [...robotsTxt.matchAll(/^Sitemap:\s*(\S+)\s*$/gim)].map(
    (match) => match[1]
  )
}

export function extractSitemapUrls(sitemapXml: string): string[]
{
  return [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/gim)].map(
    (match) => match[1]
  )
}

// inventory is derived from static content; cache after first computation
let cachedInventory: ContentInventory | undefined

export function getContentInventory(): ContentInventory
{
  if (cachedInventory !== undefined)
  {
    return cachedInventory
  }
  cachedInventory = computeContentInventory()
  return cachedInventory
}

function computeContentInventory(): ContentInventory
{
  const externalReferences = new Map<string, ExternalUrlReference>()
  const localReferences = new Map<string, LocalFileReference>()

  for (const project of projects)
  {
    if (project.repoUrl)
    {
      addExternalReference(
        externalReferences,
        project.repoUrl,
        `project repo: ${project.title}`
      )
    }

    if (project.liveUrl)
    {
      if (project.liveUrl.startsWith('/'))
      {
        addLocalReference(localReferences, {
          path: project.liveUrl,
          category: 'runtime',
          source: `project liveUrl: ${project.title}`,
          storage: 'public',
        })
      }
      else
      {
        addExternalReference(
          externalReferences,
          project.liveUrl,
          `project liveUrl: ${project.title}`
        )
      }
    }

    if (project.imagePath)
    {
      addLocalReference(localReferences, {
        path: project.imagePath,
        category: 'runtime',
        source: `project image: ${project.title}`,
        storage: 'public',
      })
    }

    for (const link of project.additionalLinks ?? [])
    {
      addExternalReference(
        externalReferences,
        link.url,
        `project link: ${project.title} (${link.label})`
      )
    }
  }

  for (const socialLink of SOCIAL_LINKS)
  {
    if (!('url' in socialLink))
    {
      continue
    }

    addExternalReference(
      externalReferences,
      socialLink.url,
      `social: ${socialLink.label}`
    )
  }

  for (const job of WORK_EXPERIENCE)
  {
    if (!job.link)
    {
      continue
    }

    addExternalReference(
      externalReferences,
      job.link,
      `experience: ${job.company}`
    )
  }

  for (const reference of MANUAL_RUNTIME_LOCAL_FILES)
  {
    addLocalReference(localReferences, reference)
  }

  for (const reference of MANUAL_RETAINED_LOCAL_FILES)
  {
    addLocalReference(localReferences, reference)
  }

  for (const reference of DEPLOYMENT_LOCAL_FILES)
  {
    addLocalReference(localReferences, reference)
  }

  const indexHtml = readTextFileIfExists('index.html')
  const { externalUrls, localFiles } = extractIndexHtmlReferences(indexHtml)

  for (const reference of externalUrls)
  {
    addExternalReference(externalReferences, reference.url, reference.source)
  }

  for (const reference of localFiles)
  {
    addLocalReference(localReferences, reference)
  }

  const robotsTxt = readTextFileIfExists('public/robots.txt')
  const robotsSitemapUrls = extractRobotsSitemapUrls(robotsTxt)

  for (const sitemapUrl of robotsSitemapUrls)
  {
    addExternalReference(externalReferences, sitemapUrl, 'robots.txt sitemap')
  }

  const sitemapXml = readTextFileIfExists('public/sitemap.xml')
  const sitemapUrls = extractSitemapUrls(sitemapXml)

  for (const sitemapUrl of sitemapUrls)
  {
    addExternalReference(externalReferences, sitemapUrl, 'sitemap.xml route')
  }

  return {
    externalUrls: [...externalReferences.values()].sort((left, right) =>
      left.url.localeCompare(right.url)
    ),
    localFiles: [...localReferences.values()].sort((left, right) =>
      left.path.localeCompare(right.path)
    ),
    robotsSitemapUrls,
    sitemapUrls,
  }
}
