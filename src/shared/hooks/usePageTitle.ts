// src/shared/hooks/usePageTitle.ts
// per-route document titles w/ restore to the site default

import { useEffect } from 'react'

import { HOME_HEAD } from '~/shared/routing/publicRoutes'

const DEFAULT_TITLE = HOME_HEAD.title

// set the document title for a route; restores the default on unmount
export function usePageTitle(title?: string): void
{
  useEffect(() =>
  {
    document.title = title ? `${title} | Garrett Fincke` : DEFAULT_TITLE

    return () =>
    {
      document.title = DEFAULT_TITLE
    }
  }, [title])
}
