// src/sections/projects-archive/hooks/useExpandableRows.ts
// lightweight expandable-row state manager

import { useCallback, useState } from 'react'

// * custom hook for managing expandable row state
export function useExpandableRows<T>()
{
  const [expandedRows, setExpandedRows] = useState(() => new Set<T>())
  const [openedRows, setOpenedRows] = useState(() => new Set<T>())

  // stable toggle so memoized rows can depend on it
  const toggleRow = useCallback((id: T) =>
  {
    setOpenedRows((prev) =>
    {
      if (prev.has(id))
      {
        return prev
      }

      const next = new Set(prev)
      next.add(id)
      return next
    })

    setExpandedRows((prev) =>
    {
      const next = new Set(prev)

      if (next.has(id))
      {
        next.delete(id)
      }
      else
      {
        next.add(id)
      }

      return next
    })
  }, [])

  const isExpanded = (id: T) => expandedRows.has(id)
  const hasOpened = (id: T) => openedRows.has(id)

  return {
    toggleRow,
    isExpanded,
    hasOpened,
  }
}
