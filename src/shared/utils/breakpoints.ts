// src/shared/utils/breakpoints.ts
// centralized breakpoint constants for responsive behavior

// responsive breakpoint media queries & widths
export const BREAKPOINTS = {
  tabletWidth: 768,
  tabletQuery: '(min-width: 768px)',
  ultraWide: '(min-width: 2560px)',
  // room for a third featured card clear of the home page wave; narrower
  // two-column layouts wrap the cards taller, so width matters too
  tallViewport: '(min-width: 1280px) and (min-height: 1150px)',
} as const
