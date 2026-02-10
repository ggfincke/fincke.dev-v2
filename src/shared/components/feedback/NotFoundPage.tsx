// src/shared/components/feedback/NotFoundPage.tsx
// 404 not found page for unmatched routes

import { Link } from 'react-router-dom';

// 404 page w/ back-to-home link
export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-4 text-center">
      <h1 className="text-6xl font-bold text-[var(--accent)]">404</h1>
      <p className="mt-4 text-xl text-[var(--fg)]">Page not found</p>
      <p className="mt-2 text-[var(--muted)]">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg border border-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
      >
        Go home
      </Link>
    </div>
  );
}
