// tests/ui/matchMedia.ts
// lightweight matchMedia mock utilities for jsdom tests

const mediaQueryMatches = new Map<string, boolean>()
type MatchMediaListener = (event: MediaQueryListEvent) => void

const mediaQueryListeners = new Map<string, Set<MatchMediaListener>>()

export function setMatchMediaMatch(query: string, matches: boolean)
{
  mediaQueryMatches.set(query, matches)
  const listeners = mediaQueryListeners.get(query)

  if (!listeners)
  {
    return
  }

  const event = { matches, media: query } as MediaQueryListEvent
  for (const listener of listeners)
  {
    listener(event)
  }
}

export function resetMatchMedia()
{
  mediaQueryMatches.clear()
  mediaQueryListeners.clear()
}

export function installMatchMediaMock(target: Window)
{
  Object.defineProperty(target, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string): MediaQueryList =>
    {
      const matches = mediaQueryMatches.get(query) ?? false
      const addListener = (listener: MatchMediaListener | null) =>
      {
        if (!listener)
        {
          return
        }

        const listeners = mediaQueryListeners.get(query) ?? new Set()
        listeners.add(listener)
        mediaQueryListeners.set(query, listeners)
      }
      const removeListener = (listener: MatchMediaListener | null) =>
      {
        if (!listener)
        {
          return
        }

        mediaQueryListeners.get(query)?.delete(listener)
      }

      return {
        matches,
        media: query,
        onchange: null,
        addEventListener: (
          _type: string,
          listener: EventListenerOrEventListenerObject | null
        ) =>
        {
          if (typeof listener === 'function')
          {
            addListener(listener as MatchMediaListener)
          }
        },
        removeEventListener: (
          _type: string,
          listener: EventListenerOrEventListenerObject | null
        ) =>
        {
          if (typeof listener === 'function')
          {
            removeListener(listener as MatchMediaListener)
          }
        },
        addListener,
        removeListener,
        dispatchEvent: () => false,
      }
    },
  })
}
