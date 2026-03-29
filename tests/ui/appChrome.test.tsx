// tests/ui/appChrome.test.tsx
// route-level shell & feedback coverage for shared app chrome

import { screen } from '@testing-library/react'
import { createRoutesFromElements, data, Route } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { appRoutes } from '~/app/router'
import { ErrorFallback } from '~/shared/components/feedback/ErrorFallback'
import { renderRouteTree } from './render'

describe('app chrome routes', () =>
{
  it('renders the shared skip link and main landmark on the home route', async () =>
  {
    renderRouteTree(appRoutes, ['/'])

    expect(
      screen.getAllByRole('link', { name: 'Skip to content' })
    ).toHaveLength(1)
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'About' })).toBeInTheDocument()
  })

  it('renders the shared skip link and archive content on the projects route', async () =>
  {
    renderRouteTree(appRoutes, ['/projects'])

    expect(
      await screen.findByRole('heading', { name: 'All Projects' })
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: 'Skip to content' })
    ).toHaveLength(1)
    expect(screen.getByRole('main')).toBeInTheDocument()
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
