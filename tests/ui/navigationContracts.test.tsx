// tests/ui/navigationContracts.test.tsx
// shared navigation/link primitive coverage for phase 4

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { ActionLink } from '~/shared/components/ui/ActionLink'
import { ExternalLink } from '~/shared/components/ui/ExternalLink'
import { FullScreenMessagePage } from '~/shared/components/feedback/FullScreenMessagePage'
import { IconLink } from '~/shared/components/ui/IconLink'
import { JobHistory } from '~/sections/experience/components/JobHistory'
import { FeaturedProjects } from '~/sections/featured-projects/components/FeaturedProjects'
import { SocialLinks } from '~/sections/home/components/SocialLinks'
import { ProjectLinks } from '~/shared/components/layout/ProjectLinks'
import { getProjectFixture } from '../fixtures'
import { renderWithRouter } from './render'

const portfolioProject = getProjectFixture('portfolio-website-v2')

describe('shared navigation primitives', () =>
{
  it('renders internal and href-based action links correctly', () =>
  {
    const { unmount } = renderWithRouter(
      <ActionLink to="/projects">View All Projects</ActionLink>
    )

    expect(
      screen.getByRole('link', { name: 'View All Projects' })
    ).toHaveAttribute('href', '/projects')

    unmount()

    renderWithRouter(
      <ActionLink href="/documents/garrett_fincke_resume.pdf" openInNewTab>
        View Full Resume
      </ActionLink>
    )

    expect(
      screen.getByRole('link', { name: 'View Full Resume' })
    ).toHaveAttribute('target', '_blank')
    expect(
      screen.getByRole('link', { name: 'View Full Resume' })
    ).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('applies shared external-link and icon-link contracts', () =>
  {
    const { unmount } = renderWithRouter(
      <ExternalLink href="https://example.com">Read more</ExternalLink>
    )

    expect(screen.getByRole('link', { name: 'Read more' })).toHaveAttribute(
      'target',
      '_blank'
    )
    expect(screen.getByRole('link', { name: 'Read more' }).className).toContain(
      'focus-visible:ring-2'
    )

    unmount()

    renderWithRouter(
      <IconLink
        href="mailto:test@example.com"
        label="Email"
        openInNewTab={false}
      >
        <span aria-hidden="true">E</span>
      </IconLink>
    )

    const emailLink = screen.getByRole('link', { name: 'Email' })
    expect(emailLink).not.toHaveAttribute('target')
    expect(emailLink).not.toHaveAttribute('rel')
  })

  it('renders the shared full-screen feedback shell', () =>
  {
    renderWithRouter(
      <FullScreenMessagePage visual={<div aria-hidden="true">404</div>}>
        <h1>Page not found</h1>
        <p>The page does not exist.</p>
      </FullScreenMessagePage>
    )

    expect(
      screen.getByRole('heading', { name: 'Page not found' })
    ).toBeInTheDocument()
    expect(screen.getByText('The page does not exist.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/'
    )
  })
})

describe('phase 4 consumer regressions', () =>
{
  it('keeps the resume and archive CTA destinations unchanged', () =>
  {
    const { unmount } = renderWithRouter(<JobHistory />)

    expect(
      screen.getByRole('link', { name: 'View Full Resume' })
    ).toHaveAttribute('href', '/documents/garrett_fincke_resume.pdf')

    unmount()

    renderWithRouter(<FeaturedProjects />)

    expect(
      screen.getByRole('link', { name: 'View All Projects' })
    ).toHaveAttribute('href', '/projects')
  })

  it('adds project context to icon-only project links', () =>
  {
    renderWithRouter(
      <ProjectLinks
        repoUrl={portfolioProject.repoUrl}
        liveUrl={portfolioProject.liveUrl}
        variant="icon"
        contextLabel={portfolioProject.title}
      />
    )

    expect(
      screen.getByRole('link', {
        name: `Open GitHub repository for ${portfolioProject.title}`,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: `Open Live Site for ${portfolioProject.title}`,
      })
    ).toBeInTheDocument()
  })

  it('drives social-link new-tab behavior from content data', async () =>
  {
    const user = userEvent.setup()

    renderWithRouter(<SocialLinks />)

    expect(screen.getByRole('link', { name: 'Email' })).not.toHaveAttribute(
      'target'
    )
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'target',
      '_blank'
    )
    expect(
      screen.queryByRole('link', { name: 'Phone' })
    ).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Show phone number' }))

    expect(
      screen.getByRole('link', { name: '+1 (724) 777-7186' })
    ).toHaveAttribute('href', 'tel:+17247777186')
  })
})
