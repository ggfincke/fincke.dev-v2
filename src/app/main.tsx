// src/app/main.tsx
// application entry point w/ React StrictMode & routing

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import '~/styles/globals.css'
import { router } from '~/app/router'

// * Initialize & mount React app
const rootElement = document.getElementById('root')
if (!rootElement)
{
  throw new Error('#root not found in index.html')
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
