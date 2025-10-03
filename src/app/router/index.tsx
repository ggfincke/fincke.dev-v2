// src/app/router/index.tsx
// route definitions for the application

import { createBrowserRouter } from 'react-router-dom';
import App from '~/app/App';
import { ProjectsArchivePage } from '~/sections/projects-archive/pages/ProjectsArchivePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/projects',
    element: <ProjectsArchivePage />,
  },
]);
