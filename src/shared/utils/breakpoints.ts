// src/shared/utils/breakpoints.ts
// centralized breakpoint constants for responsive behavior

// responsive breakpoint media queries & widths
export const BREAKPOINTS = {
  tabletWidth: 768,
  tabletQuery: '(min-width: 768px)',
  // tailwind lg; home page splits into two columns w/ the wave
  twoColumnQuery: '(min-width: 1024px)',
  ultraWide: '(min-width: 2560px)',
  // single-column home layout (below tailwind lg); no wave to clear, so every
  // featured tier fits
  stackedLayout: '(max-width: 1023.98px)',
  // compact home layout; keep in sync w/ @custom-variant short-desktop in globals.css
  shortDesktop:
    '(min-width: 1024px) and (max-height: 980px), (min-width: 1024px) and (max-width: 1279px) and (max-height: 1199px)',
  // room for a third featured card clear of the home page wave; narrower
  // two-column layouts wrap the cards taller, so width matters too
  tallViewport: '(min-width: 1280px) and (min-height: 1150px)',
} as const
