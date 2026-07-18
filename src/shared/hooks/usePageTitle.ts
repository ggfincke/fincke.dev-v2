// src/shared/hooks/usePageTitle.ts
// per-route document titles w/ restore to the site default

import { useEffect } from 'react'

// must match the static <title> in index.html
const DEFAULT_TITLE = 'Garrett Fincke | Software Engineer'

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
