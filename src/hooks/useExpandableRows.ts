// src/hooks/useExpandableRows.ts
// lightweight expandable-row state manager

import { useCallback, useState } from 'react';

// * custom hook for managing expandable row state
export function useExpandableRows<T>()
{
  const [expandedRows, setExpandedRows] = useState<T[]>([]);

  // toggle row expansion state
  const toggleRow = useCallback((id: T) =>
  {
    setExpandedRows((prev) =>
      prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id],
    );
  }, []);

  // check if row is expanded
  const isExpanded = useCallback((id: T) =>
  {
    return expandedRows.includes(id);
  }, [expandedRows]);

  return {
    expandedRows,
    toggleRow,
    isExpanded,
  };
}
