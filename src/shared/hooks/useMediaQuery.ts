// src/shared/hooks/useMediaQuery.ts
// simple viewport media query hook for client-side components

import { useCallback, useSyncExternalStore } from 'react'

function getServerSnapshot(): boolean
{
  return false
}

// * Subscribe to a media query & return whether it currently matches
export function useMediaQuery(query: string): boolean
{
  const subscribe = useCallback(
    (onStoreChange: () => void) =>
    {
      if (typeof window === 'undefined')
      {
        return () => undefined
      }

      const mediaQuery = window.matchMedia(query)
      const handleChange = () => onStoreChange()

      mediaQuery.addEventListener('change', handleChange)

      return () => mediaQuery.removeEventListener('change', handleChange)
    },
    [query]
  )

  const getSnapshot = useCallback(() =>
  {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  }, [query])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
