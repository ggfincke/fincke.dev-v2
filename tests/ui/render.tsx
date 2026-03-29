// tests/ui/render.tsx
// shared render helpers for UI tests

import type { ReactElement } from 'react'

import { render } from '@testing-library/react'
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom'

// render a component tree w/ router context
export function renderWithRouter(
  ui: ReactElement,
  initialEntries: string[] = ['/']
)
{
  return render(
    <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
  )
}

// render a route tree through a memory router
export function renderRouteTree(
  routes: RouteObject[],
  initialEntries: string[] = ['/']
)
{
  const router = createMemoryRouter(routes, { initialEntries })

  return {
    router,
    ...render(<RouterProvider router={router} />),
  }
}
