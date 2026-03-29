// src/app/router/index.tsx
// route definitions for the application

import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import App from '~/app/App'
import { HomePage } from '~/sections/home/pages/HomePage'
import { ErrorFallback } from '~/shared/components/feedback/ErrorFallback'
import { NotFoundPage } from '~/shared/components/feedback/NotFoundPage'

// shared app route tree for browser & memory routers
export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorFallback />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'projects',
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
