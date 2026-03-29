// src/shared/utils/projectLinks.ts
// shared helpers for project links

// resolve label from URL pattern (PDF, marketplace, etc.)
export function getProjectLiveLabel(url: string): string
{
  const lower = url.toLowerCase()

  if (lower.endsWith('.pdf'))
  {
    return 'View Report'
  }

  if (lower.includes('marketplace.visualstudio.com'))
  {
    return 'VS Code Marketplace'
  }

  return 'View Live Site'
}
