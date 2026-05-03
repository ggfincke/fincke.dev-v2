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
    const docker = screen.getByText('Docker')
    const scaleAi = screen.getByText('Scale AI')
    const aiInfrastructure = screen.getByText('AI infrastructure')

    expect(uiKit.tagName).toBe('SPAN')
    expect(uiKit).toHaveStyle({ color: 'var(--blue)' })

    expect(postgres.tagName).toBe('SPAN')
    expect(postgres).toHaveStyle({ color: 'var(--purple)' })

    expect(githubActions.tagName).toBe('SPAN')
    expect(githubActions).toHaveStyle({ color: 'var(--orange)' })

    expect(docker.tagName).toBe('SPAN')
    expect(docker).toHaveStyle({ color: 'var(--purple)' })

    expect(scaleAi.tagName).toBe('SPAN')
    expect(scaleAi).toHaveStyle({ color: 'var(--red)' })

    expect(aiInfrastructure.tagName).toBe('SPAN')
    expect(aiInfrastructure).toHaveStyle({ color: 'var(--yellow)' })

    expect(container.querySelector('span[style*="color"]')).not.toBeNull()
    expect(
      screen.queryByText('Ironman', { selector: 'span' })
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'garrettfincke@gmail.com' })
    ).toHaveAttribute('href', 'mailto:garrettfincke@gmail.com')
  })
})
