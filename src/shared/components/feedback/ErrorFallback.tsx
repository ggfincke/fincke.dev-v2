// src/shared/components/feedback/ErrorFallback.tsx
// error fallback for route-level error boundary

import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { FullScreenMessagePage } from '~/shared/components/feedback/FullScreenMessagePage'

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
      title={title}
      description={message}
    />
  )
}
