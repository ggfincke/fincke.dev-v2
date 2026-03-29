// tests/ui/aboutHighlighting.test.tsx
// focused About highlighting coverage for curated registry-backed terms

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { About } from '~/sections/home/components/About'

describe('About highlighting', () =>
{
  it('highlights curated registry-backed terms and leaves unrelated prose plain', () =>
  {
    const { container } = render(<About />)

    const uiKit = screen.getByText('UIKit')
    const postgres = screen.getByText('Postgres')
    const githubActions = screen.getByText('GitHub Actions')

    expect(uiKit.tagName).toBe('SPAN')
    expect(uiKit).toHaveClass('text-[var(--blue)]')

    expect(postgres.tagName).toBe('SPAN')
    expect(postgres).toHaveClass('text-[var(--purple)]')

    expect(githubActions.tagName).toBe('SPAN')
    expect(githubActions).toHaveClass('text-[var(--purple)]')

    expect(
      container.querySelector(
        'span.text-\\[var\\(--blue\\)\\], span.text-\\[var\\(--purple\\)\\], span.text-\\[var\\(--green\\)\\]'
      )
    ).not.toBeNull()
    expect(
      screen.queryByText('Docker', { selector: 'span' })
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'garrettfincke@gmail.com' })
    ).toHaveAttribute('href', 'mailto:garrettfincke@gmail.com')
  })
})
