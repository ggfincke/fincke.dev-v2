// src/app/App.tsx
// root layout route for shared app chrome

import { Outlet } from 'react-router-dom'

import { SkipLink } from '~/shared/components/layout/SkipLink'

// * Root app layout route
function App()
{
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--muted)]">
      <SkipLink />
      <Outlet />
    </div>
  )
}

export default App
