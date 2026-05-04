// src/shared/components/feedback/NotFoundPage.tsx
// 404 not found page for unmatched routes

import { FullScreenMessagePage } from '~/shared/components/feedback/FullScreenMessagePage'

// 404 page w/ shared full-screen message shell
export function NotFoundPage()
{
  return (
    <FullScreenMessagePage
      visual={
        <div className="mb-4 text-6xl font-bold text-[var(--accent)]">404</div>
      }
    >
      <h1 className="text-xl text-[var(--fg)]">Page not found</h1>
      <p className="mt-2 max-w-md text-[var(--muted)]">
        The page you are looking for does not exist or has been moved.
      </p>
    </FullScreenMessagePage>
  )
}
