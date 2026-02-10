// src/app/router/index.tsx
// route definitions for the application

import { createBrowserRouter } from 'react-router-dom';
import App from '~/app/App';
import { ErrorFallback } from '~/shared/components/feedback/ErrorFallback';
import { NotFoundPage } from '~/shared/components/feedback/NotFoundPage';

// * Router configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorFallback />,
  },
  {
    path: '/projects',
    lazy: async () => {
      const { ProjectsArchivePage } = await import(
        '~/sections/projects-archive/pages/ProjectsArchivePage'
      );
      return { Component: ProjectsArchivePage };
    },
    errorElement: <ErrorFallback />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
