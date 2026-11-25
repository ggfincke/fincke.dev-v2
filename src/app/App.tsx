// src/app/App.tsx
// root layout route for shared app chrome

import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { SkipLink } from '~/shared/components/layout/SkipLink'
import {
  getAnalyticsPagePath,
  trackAnalyticsEvent,
} from '~/shared/analytics/track-event'

// * Root app layout route
function App()
{
  const { pathname } = useLocation()
  const pagePath = getAnalyticsPagePath(pathname)

  useEffect(() =>
  {
    if (pagePath)
    {
      trackAnalyticsEvent({ type: 'page_view' }, pagePath)
    }
  }, [pagePath])

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--muted)]">
      <SkipLink />
      <Outlet />
    </div>
  )
}

export default App
