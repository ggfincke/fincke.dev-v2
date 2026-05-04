// tests/textHighlight.test.tsx
// coverage for shared static-prose highlighting helpers

import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { buildTermPattern, highlightText } from '~/shared/utils/textHighlight'

import { renderWithRouter } from './ui/render'

describe('textHighlight utilities', () =>
{
  it('prioritizes longer terms before substring terms', () =>
  {
    const colorMap = new Map([
      ['AI infrastructure', 'var(--yellow)'],
      ['AI', 'var(--blue)'],
    ])
    const pattern = buildTermPattern(colorMap.keys())

    renderWithRouter(
      <p>{highlightText('AI infrastructure uses AI', pattern, colorMap)}</p>
    )

    expect(screen.getByText('AI infrastructure')).toHaveStyle({
      color: 'var(--yellow)',
    })
    expect(screen.getByText('AI')).toHaveStyle({ color: 'var(--blue)' })
  })
})
