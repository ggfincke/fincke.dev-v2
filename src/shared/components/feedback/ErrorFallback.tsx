// src/shared/components/feedback/ErrorFallback.tsx
// error fallback for route-level error boundary

import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

// route error fallback w/ reload action
export function ErrorFallback() {
  const error = useRouteError();

  let title = 'Something went wrong';
  let message = 'An unexpected error occurred. Please try reloading the page.';

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = error.data?.toString() ?? message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  const handleReload = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-4 text-center">
      <div className="text-6xl mb-4 text-[var(--red)]" aria-hidden="true">
        !
      </div>
      <h1 className="text-2xl font-bold text-[var(--fg)]">{title}</h1>
      <p className="mt-4 max-w-md text-[var(--muted)]">{message}</p>
      <button
        type="button"
        onClick={handleReload}
        className="mt-8 inline-flex items-center gap-2 rounded-lg border border-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)] cursor-pointer"
      >
        Go home
      </button>
    </div>
  );
}
