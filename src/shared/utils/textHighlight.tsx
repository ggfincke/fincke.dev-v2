// src/shared/utils/textHighlight.tsx
// text highlighting helpers for static prose

import type { ReactNode } from 'react'

function escapeRegExp(value: string): string
{
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// longest terms first so multi-word phrases win over substrings
export function buildTermPattern(terms: Iterable<string>): RegExp | null
{
  const escapedTerms = [...terms]
    .map(escapeRegExp)
    .sort((left, right) => right.length - left.length)

  if (escapedTerms.length === 0)
  {
    return null
  }

  return new RegExp(`(${escapedTerms.join('|')})`, 'g')
}

export function highlightText(
  text: string,
  pattern: RegExp | null,
  colorMap: ReadonlyMap<string, string>
): ReactNode[]
{
  if (!pattern)
  {
    return [text]
  }

  const parts = text.split(pattern)
  return parts.map((part, index) =>
  {
    const color = colorMap.get(part)
    if (color)
    {
      return (
        <span key={index} style={{ color }}>
          {part}
        </span>
      )
    }

    return part
  })
}
