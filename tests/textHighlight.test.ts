// tests/textHighlight.test.ts
// focused coverage for static-prose highlighting helpers

import { isValidElement, type ReactElement } from 'react'
import { describe, expect, it } from 'vitest'

import { buildTermPattern, highlightText } from '~/shared/utils/textHighlight'

interface HighlightProps
{
  children: string
  style: {
    color: string
  }
}

function getHighlightElements(
  parts: ReturnType<typeof highlightText>
): Array<ReactElement<HighlightProps>>
{
  return parts.filter((part): part is ReactElement<HighlightProps> =>
  {
    return isValidElement<HighlightProps>(part)
  })
}

describe('textHighlight utilities', () =>
{
  it('prioritizes longer terms before substring terms', () =>
  {
    const colorMap = new Map([
      ['AI infrastructure', 'var(--yellow)'],
      ['AI', 'var(--blue)'],
    ])
    const pattern = buildTermPattern(colorMap.keys())
    const highlights = getHighlightElements(
      highlightText('AI infrastructure uses AI', pattern, colorMap)
    )

    expect(highlights.map((part) => part.props.children)).toEqual([
      'AI infrastructure',
      'AI',
    ])
    expect(highlights.map((part) => part.props.style.color)).toEqual([
      'var(--yellow)',
      'var(--blue)',
    ])
  })
})
