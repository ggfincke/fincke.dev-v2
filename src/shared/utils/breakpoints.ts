// src/shared/utils/breakpoints.ts
// centralized breakpoint constants for responsive behavior

// responsive breakpoint media queries & widths
export const BREAKPOINTS = {
  tabletWidth: 768,
  tabletQuery: '(min-width: 768px)',
  ultraWide: '(min-width: 2560px)',
  ultraWideWithHeight: '(min-width: 2560px) and (min-height: 1400px)',
} as const
