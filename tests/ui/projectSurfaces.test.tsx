// tests/ui/projectSurfaces.test.tsx
// shared rendering checks for featured & expanded project surfaces

import { screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { FeaturedProjectCard } from '~/sections/featured-projects/components/FeaturedProjectCard'
import { ProjectExpandedDetails } from '~/sections/projects-archive/components/ProjectExpandedDetails'
import { VersionBadge } from '~/shared/components/ui/VersionBadge'
import { getProjectFixture } from '../fixtures'
import { renderWithRouter } from './render'

describe('featured project card', () =>
{
  it('prefers live URLs and falls back to repository URLs', () =>
  {
    const { unmount } = renderWithRouter(
      <FeaturedProjectCard
        project={getProjectFixture('portfolio-website-v2')}
      />
    )

    expect(
      screen.getByText('Portfolio Website v2').closest('a')
    ).toHaveAttribute('href', 'https://fincke.dev')

    unmount()
    renderWithRouter(
      <FeaturedProjectCard project={getProjectFixture('loom')} />
    )

    expect(screen.getByText('Loom').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/ggfincke/loom'
    )
  })

  it('renders shared project technologies on featured cards', () =>
  {
    renderWithRouter(
      <FeaturedProjectCard
        project={getProjectFixture('portfolio-website-v2')}
      />
    )

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })
})

describe('expanded project details', () =>
{
  it('renders shared project technologies and collaborator text', () =>
  {
    renderWithRouter(
      <ProjectExpandedDetails
        project={getProjectFixture(
          'deep-learning-architecture-comparison-and-analysis-for-cifar-10'
        )}
        variant="desktop"
      />
    )

    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('TensorFlow')).toBeInTheDocument()
    expect(screen.getByText(/Jacob Goulet/)).toBeInTheDocument()
    expect(screen.getByText(/Tyler Rossi/)).toBeInTheDocument()
  })
})

describe('version badge', () =>
{
  it('dedupes concurrent release requests for the same repository', async () =>
  {
    const fetchMock = vi.mocked(fetch)
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ tag_name: 'v1.2.3' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    )

    renderWithRouter(
      <>
        <VersionBadge repoUrl="https://github.com/ggfincke/loom" />
        <VersionBadge repoUrl="https://github.com/ggfincke/loom" />
      </>
    )

    expect(await screen.findAllByText(/v1\.2\.3/)).toHaveLength(2)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('caches release misses to avoid repeated optional lookups', async () =>
  {
    const fetchMock = vi.mocked(fetch)
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 404 }))

    const { unmount } = renderWithRouter(
      <VersionBadge repoUrl="https://github.com/ggfincke/no-releases" />
    )

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
    unmount()

    renderWithRouter(
      <VersionBadge repoUrl="https://github.com/ggfincke/no-releases" />
    )

    await Promise.resolve()
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
