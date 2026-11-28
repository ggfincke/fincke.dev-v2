// src/shared/components/feedback/ErrorFallback.tsx
// error fallback for route-level error boundary

import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { FullScreenMessagePage } from '~/shared/components/feedback/FullScreenMessagePage'
import { FULL_SCREEN_MESSAGE_ACTION_CLASSES } from '~/shared/utils/classNames'

// route error fallback rendered through shared full-screen message shell
export function ErrorFallback()
{
  const error = useRouteError()

  let title = 'Something went wrong'
  let message = 'An unexpected error occurred. Please try reloading the page.'

  if (isRouteErrorResponse(error))
  {
    title = `${error.status} ${error.statusText}`
    message = error.data?.toString() ?? message
  }
  else if (error instanceof Error)
  {
    message = error.message
  }

  return (
    <FullScreenMessagePage
      visual={
        <div className="mb-4 text-6xl text-[var(--red)]" aria-hidden="true">
          !
        </div>
      }
      // a failed lazy route stays failed for this document, so in-app
      // navigation can't recover it; a reload can
      action={
        <button
          type="button"
          onClick={() => window.location.reload()}
          className={FULL_SCREEN_MESSAGE_ACTION_CLASSES}
        >
          Reload page
        </button>
      }
    >
      <h1 className="text-2xl font-bold text-[var(--fg)]">{title}</h1>
      <p className="mt-4 max-w-md text-[var(--muted)]">{message}</p>
    </FullScreenMessagePage>
  )
}
