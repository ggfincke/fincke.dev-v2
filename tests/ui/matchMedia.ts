// tests/ui/matchMedia.ts
// lightweight matchMedia mock utilities for jsdom tests

const mediaQueryMatches = new Map<string, boolean>()

export function setMatchMediaMatch(query: string, matches: boolean)
{
  mediaQueryMatches.set(query, matches)
}

export function resetMatchMedia()
{
  mediaQueryMatches.clear()
}

export function installMatchMediaMock(target: Window)
{
  Object.defineProperty(target, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string): MediaQueryList =>
    {
      const matches = mediaQueryMatches.get(query) ?? false

      return {
        matches,
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false,
      }
    },
  })
}
