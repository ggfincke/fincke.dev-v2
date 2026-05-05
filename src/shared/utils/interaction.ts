// src/shared/utils/interaction.ts
// shared helpers for nested interactive elements

import type { HTMLAttributes } from 'react'

// stop only the keys parents care about; let Tab/Esc/arrows bubble naturally
const ACTIVATION_KEYS = new Set(['Enter', ' '])

function stopProp(event: { stopPropagation(): void }): void
{
  event.stopPropagation()
}

function stopActivationKeys(event: {
  key: string
  stopPropagation(): void
}): void
{
  if (ACTIVATION_KEYS.has(event.key))
  {
    event.stopPropagation()
  }
}

// frozen, identity-stable handler bag (same reference across renders)
const NESTED_INTERACTION_PROPS = Object.freeze({
  onClick: stopProp,
  onKeyDown: stopActivationKeys,
})

// stop nested controls from triggering parent row/card interactions
export function getNestedInteractionProps<T extends HTMLElement>(): Pick<
  HTMLAttributes<T>,
  'onClick' | 'onKeyDown'
>
{
  return NESTED_INTERACTION_PROPS as Pick<
    HTMLAttributes<T>,
    'onClick' | 'onKeyDown'
  >
}
