// tests/ui/projectSurfaces.test.tsx
// shared rendering checks for featured & expanded project surfaces

import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { projects } from '~/content/projects'
import { FeaturedProjectCard } from '~/sections/featured-projects/components/FeaturedProjectCard'
import { ProjectExpandedDetails } from '~/sections/projects-archive/components/ProjectExpandedDetails'
import { renderWithRouter } from './render'

const portfolioProject = projects.find(
  (project) => project.id === 'portfolio-website-v2'
)
const loomProject = projects.find((project) => project.id === 'loom')
const collaboratorProject = projects.find(
  (project) =>
    project.id ===
    'deep-learning-architecture-comparison-and-analysis-for-cifar-10'
)

describe('featured project card', () =>
{
  it('prefers live URLs and falls back to repository URLs', () =>
  {
    expect(portfolioProject).toBeDefined()
    expect(loomProject).toBeDefined()

    const { unmount } = renderWithRouter(
      <FeaturedProjectCard project={portfolioProject!} />
    )

    expect(
      screen.getByText('Portfolio Website v2').closest('a')
    ).toHaveAttribute('href', 'https://fincke.dev')

    unmount()
    renderWithRouter(<FeaturedProjectCard project={loomProject!} />)

    expect(screen.getByText('Loom').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/ggfincke/loom'
    )
  })

  it('renders shared project technologies on featured cards', () =>
  {
    expect(portfolioProject).toBeDefined()

    renderWithRouter(<FeaturedProjectCard project={portfolioProject!} />)

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })
})

describe('expanded project details', () =>
{
  it('renders shared project technologies and collaborator text', () =>
  {
    expect(collaboratorProject).toBeDefined()

    renderWithRouter(
      <ProjectExpandedDetails
        project={collaboratorProject!}
        variant="desktop"
      />
    )

    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('TensorFlow')).toBeInTheDocument()
    expect(screen.getByText(/Jacob Goulet/)).toBeInTheDocument()
    expect(screen.getByText(/Tyler Rossi/)).toBeInTheDocument()
  })
})
