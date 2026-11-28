// src/app/App.tsx
// root layout route for shared app chrome

import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'

import { SkipLink } from '~/shared/components/layout/SkipLink'
import {
  getAnalyticsPagePath,
  trackAnalyticsEvent,
} from '~/shared/analytics/track-event'
import { useCanonicalUrl } from '~/shared/hooks/useCanonicalUrl'

// * Root app layout route
function App()
{
  const { pathname } = useLocation()
  const pagePath = getAnalyticsPagePath(pathname)
  useCanonicalUrl()

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
      {/* forward navigation starts at the top; Back restores position */}
      <ScrollRestoration />
    </div>
  )
}

export default App
