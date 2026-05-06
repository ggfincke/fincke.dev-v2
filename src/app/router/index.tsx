// src/app/router/index.tsx
// route definitions for the application

import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import App from '~/app/App'
import { HomePage } from '~/sections/home/pages/HomePage'
import { ErrorFallback } from '~/shared/components/feedback/ErrorFallback'
import { NotFoundPage } from '~/shared/components/feedback/NotFoundPage'
import {
  PUBLIC_ROUTE_CHILD_PATHS,
  PUBLIC_ROUTE_PATHS,
} from '~/shared/routing/publicRoutes'

// shared app route tree for browser & memory routers
export const appRoutes: RouteObject[] = [
  {
    path: PUBLIC_ROUTE_PATHS.home,
    element: <App />,
    errorElement: <ErrorFallback />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PUBLIC_ROUTE_CHILD_PATHS.projects,
        lazy: async () =>
        {
          const { ProjectsArchivePage } = await import(
            '~/sections/projects-archive/pages/ProjectsArchivePage'
          )
          return { Component: ProjectsArchivePage }
        },
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]

// * Browser router configuration
export const router = createBrowserRouter(appRoutes)
