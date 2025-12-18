// src/shared/hooks/useMediaQuery.ts
// simple viewport media query hook for client-side components

import { useEffect, useState } from 'react';

// subscribe to a media query and return whether it currently matches
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia(query);
    const updateMatch = (event: MediaQueryListEvent) =>
      setMatches(event.matches);

    // sync initial value + subscribe
    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateMatch);

    return () => mediaQuery.removeEventListener('change', updateMatch);
  }, [query]);

  return matches;
}
