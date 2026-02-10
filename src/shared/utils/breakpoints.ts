// src/shared/utils/breakpoints.ts
// centralized breakpoint constants for responsive behavior

// responsive breakpoint media queries & widths
export const BREAKPOINTS = {
  ultraWide: '(min-width: 2560px)',
  ultraWideWithHeight: '(min-width: 2560px) and (min-height: 1400px)',
  table: 768,
} as const;
