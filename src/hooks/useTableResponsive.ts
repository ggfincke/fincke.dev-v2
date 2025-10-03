// src/hooks/useTableResponsive.ts
// minimal responsive hook for switching between table & card layouts

import { useEffect, useState } from 'react';

const TABLE_BREAKPOINT = 768; // tailwind md

// * custom hook for responsive table/card layout switching
export function useTableResponsive()
{
  const [width, setWidth] = useState<number>(() =>
  {
    return typeof window === 'undefined' ? TABLE_BREAKPOINT : window.innerWidth;
  });

  // listen for window resize events
  useEffect(() =>
  {
    const handleResize = () =>
    {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () =>
    {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const shouldShowCards = width < TABLE_BREAKPOINT;
  const shouldShowTable = !shouldShowCards;

  return {
    shouldShowCards,
    shouldShowTable,
    tableVariant: shouldShowCards ? 'cards' : 'table' as const,
  };
}
