// src/sections/projects-archive/utils/getLiveLabel.ts
// determine live link label based on URL type

// resolve label from URL pattern (PDF, marketplace, etc.)
export const getLiveLabel = (url: string): string => {
  const lower = url.toLowerCase();
  if (lower.endsWith('.pdf')) return 'View Report';
  if (lower.includes('marketplace.visualstudio.com'))
    return 'VS Code Marketplace';
  return 'View Live Site';
};
