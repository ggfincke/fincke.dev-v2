// src/app/main.tsx
// application entry point w/ React StrictMode & routing

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '~/styles/globals.css';
import { router } from '~/app/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
