// src/shared/components/feedback/RouteLoadingFallback.tsx
// placeholder shown while a directly visited lazy route downloads

// the status line fades in late so a fast chunk never flashes it
export function RouteLoadingFallback()
{
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4 text-sm text-[var(--muted)]">
      <p
        role="status"
        className="animate-fadeIn opacity-0"
        style={{ animationDelay: '400ms' }}
      >
        Loading…
      </p>
    </main>
  )
}
