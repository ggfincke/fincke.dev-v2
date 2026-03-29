// src/shared/utils/linkProps.ts
// shared helpers for new-tab link attributes

// derive target/rel attrs for links that open in a new tab
export function getNewTabLinkProps(openInNewTab = true)
{
  if (!openInNewTab)
  {
    return {}
  }

  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  } as const
}
