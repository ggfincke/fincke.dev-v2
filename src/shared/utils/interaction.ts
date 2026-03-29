// src/shared/utils/interaction.ts
// shared helpers for nested interactive elements

import type { HTMLAttributes } from 'react'

// stop nested controls from triggering parent row/card interactions
export function getNestedInteractionProps<T extends HTMLElement>(): Pick<
  HTMLAttributes<T>,
  'onClick' | 'onKeyDown'
>
{
  return {
    onClick: (event) =>
    {
      event.stopPropagation()
    },
    onKeyDown: (event) =>
    {
      event.stopPropagation()
    },
  }
}
