// tests/ui/appChrome.test.tsx
// route-level shell & feedback coverage for shared app chrome

import { screen } from '@testing-library/react'
import { createRoutesFromElements, data, Route } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { appRoutes } from '~/app/router'
import { EDUCATION_CONTENT } from '~/content/education'
import { EXPERIENCE_CONTENT } from '~/content/experience'
import { ABOUT_CONTENT } from '~/content/home'
import { PROJECTS_CONTENT } from '~/content/projects'
import { ErrorFallback } from '~/shared/components/feedback/ErrorFallback'
import { renderRouteTree } from './render'

describe('app chrome routes', () =>
{
  it('renders the shared skip link and main landmark on the home route', async () =>
  {
    renderRouteTree(appRoutes, ['/'])

    expect(
      screen.getByRole('link', { name: 'Skip to content' })
    ).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(
      screen.getByRole('region', { name: ABOUT_CONTENT.heading })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: EDUCATION_CONTENT.heading,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: EXPERIENCE_CONTENT.heading,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: PROJECTS_CONTENT.featuredHeading,
      })
    ).toBeInTheDocument()
  })

  it('renders the shared skip link and archive content on the projects route', async () =>
  {
    renderRouteTree(appRoutes, ['/projects'])

    expect(
      await screen.findByRole('heading', {
        name: PROJECTS_CONTENT.archiveTitle,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Skip to content' })
    ).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: PROJECTS_CONTENT.archiveListHeading,
      })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back' })).toHaveAttribute(
      'href',
      '/'
    )
  })

  it('keeps the 404 page outside the shared route shell', async () =>
  {
    renderRouteTree(appRoutes, ['/missing'])

    expect(
      await screen.findByRole('heading', { name: 'Page not found' })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'Skip to content' })
    ).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/'
    )
  })
})

describe('error fallback', () =>
{
  it('renders route response errors through the shared feedback shell', async () =>
  {
    const responseErrorRoutes = createRoutesFromElements(
      <Route
        path="/"
        loader={() =>
        {
          throw data('Missing project', {
            status: 404,
            statusText: 'Not Found',
          })
        }}
        element={<div>ok</div>}
        errorElement={<ErrorFallback />}
      />
    )

    renderRouteTree(responseErrorRoutes, ['/'])

    expect(
      await screen.findByRole('heading', { name: '404 Not Found' })
    ).toBeInTheDocument()
    expect(screen.getByText('Missing project')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/'
    )
  })

  it('renders thrown errors through the shared feedback shell', async () =>
  {
    const thrownErrorRoutes = createRoutesFromElements(
      <Route
        path="/"
        loader={() =>
        {
          throw new Error('Exploded while loading route')
        }}
        element={<div>ok</div>}
        errorElement={<ErrorFallback />}
      />
    )

    renderRouteTree(thrownErrorRoutes, ['/'])

    expect(
      await screen.findByRole('heading', { name: 'Something went wrong' })
    ).toBeInTheDocument()
    expect(screen.getByText('Exploded while loading route')).toBeInTheDocument()
  })
})
