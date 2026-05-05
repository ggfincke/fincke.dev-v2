// tests/ui/contentOwnedCopy.test.tsx
// regression coverage for visible copy owned by content modules

import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RESUME_ASSET } from '~/content/assets'
import { EDUCATION_CONTENT } from '~/content/education'
import { EXPERIENCE_CONTENT } from '~/content/experience'
import {
  ABOUT_CONTENT,
  HERO_CONTENT,
  SOCIAL_LINKS_CONTENT,
} from '~/content/home'
import { PROJECTS_CONTENT } from '~/content/projects'
import { EducationHistory } from '~/sections/education/components/EducationHistory'
import { FeaturedProjects } from '~/sections/featured-projects/components/FeaturedProjects'
import { JobHistory } from '~/sections/experience/components/JobHistory'
import { About } from '~/sections/home/components/About'
import { Hero } from '~/sections/home/components/Hero'
import { SocialLinks } from '~/sections/home/components/SocialLinks'
import { ProjectsArchivePage } from '~/sections/projects-archive/pages/ProjectsArchivePage'
import { PUBLIC_ROUTE_PATHS } from '~/shared/routing/publicRoutes'
import { renderWithRouter } from './render'

describe('content-owned UI copy', () =>
{
  it('renders home copy from typed content modules', () =>
  {
    renderWithRouter(
      <>
        <Hero />
        <About />
        <SocialLinks />
      </>
    )

    expect(
      screen.getByRole('heading', { name: HERO_CONTENT.name })
    ).toBeInTheDocument()
    expect(screen.getByText(HERO_CONTENT.tagline)).toBeInTheDocument()
    expect(
      screen.getByRole('region', { name: ABOUT_CONTENT.heading })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('navigation', {
        name: SOCIAL_LINKS_CONTENT.ariaLabel,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: SOCIAL_LINKS_CONTENT.showPhoneLabel,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        (_, element) =>
          element?.textContent ===
          `${ABOUT_CONTENT.contact.prefix}${ABOUT_CONTENT.email}${ABOUT_CONTENT.contact.suffix}`
      )
    ).toBeInTheDocument()
  })

  it('renders the resume CTA from experience content and asset metadata', () =>
  {
    renderWithRouter(<JobHistory />)

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: EXPERIENCE_CONTENT.heading,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: new RegExp(EXPERIENCE_CONTENT.resumeCtaLabel),
      })
    ).toHaveAttribute('href', RESUME_ASSET.path)
  })

  it('renders education and project archive copy from content modules', () =>
  {
    const { unmount } = renderWithRouter(<EducationHistory />)

    expect(
      screen.getByRole('region', { name: EDUCATION_CONTENT.heading })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: EDUCATION_CONTENT.heading,
      })
    ).toBeInTheDocument()

    unmount()
    renderWithRouter(<FeaturedProjects />)

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: PROJECTS_CONTENT.featuredHeading,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: PROJECTS_CONTENT.archiveCtaLabel,
      })
    ).toHaveAttribute('href', PUBLIC_ROUTE_PATHS.projects)

    unmount()
    renderWithRouter(<ProjectsArchivePage />)

    expect(
      screen.getByRole('link', {
        name: PROJECTS_CONTENT.archiveBackLabel,
      })
    ).toHaveAttribute('href', PUBLIC_ROUTE_PATHS.home)
    expect(
      screen.getByRole('heading', { name: PROJECTS_CONTENT.archiveTitle })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: PROJECTS_CONTENT.archiveListHeading,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(PROJECTS_CONTENT.archiveDescription)
    ).toBeInTheDocument()
    expect(screen.getByText(PROJECTS_CONTENT.archiveFooter)).toBeInTheDocument()
  })
})
