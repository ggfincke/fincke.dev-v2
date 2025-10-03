// src/utils/pathUtils.ts
// shared path utilities for routing

// normalize pathname by removing trailing slashes
export const normalizePath = (pathname: string): string => {
  if (pathname === '/') {
    return pathname;
  }

  return pathname.replace(/\/$/, '') || '/';
};
