// tests/ui/semanticContracts.test.tsx
// focused accessibility semantics for shared UI primitives

import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { SkillPill } from '~/shared/components/ui/SkillPill'
import { TechPills } from '~/shared/components/ui/TechPills'
import { BrandIcon } from '~/shared/components/ui/icons'
import { getProjectFixture } from '../fixtures'

describe('skill pill semantics', () =>
{
  it('uses a focusable tooltip trigger without button semantics', async () =>
  {
    const user = userEvent.setup()

    render(
      <SkillPill
        technologyId="typescript"
        showProjectsOnHover
        getRelatedProjects={() => [
          getProjectFixture('mdx-preview-for-vs-code'),
        ]}
        hoverDelay={0}
      />
    )

    const trigger = screen.getByText('TypeScript')

    expect(trigger.tagName).toBe('SPAN')
    expect(trigger).toHaveAttribute('tabindex', '0')
    expect(
      screen.queryByRole('button', { name: 'TypeScript' })
    ).not.toBeInTheDocument()

    await user.tab()

    expect(trigger).toHaveFocus()

    const tooltip = await screen.findByRole('tooltip')

    expect(tooltip).toHaveTextContent('Related Projects (1)')
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
  })

  it('renders non-tooltip pills as plain non-focusable text', () =>
  {
    render(<SkillPill technologyId="react" />)

    const pill = screen.getByText('React')

    expect(pill.tagName).toBe('SPAN')
    expect(pill).not.toHaveAttribute('tabindex')
    expect(
      screen.queryByRole('button', { name: 'React' })
    ).not.toBeInTheDocument()
  })
})

describe('tech pill list semantics', () =>
{
  it('renders overflow as a list item when the wrapper is a list', () =>
  {
    const { container } = render(
      <TechPills
        technologies={['typescript', 'react', 'vite']}
        maxVisible={2}
        as="ul"
      />
    )

    const list = screen.getByRole('list')
    const listItems = within(list).getAllByRole('listitem')
    const overflow = within(list).getByText('+1 more')

    expect(listItems).toHaveLength(3)
    expect(overflow.closest('li')).toBeInTheDocument()
    expect(container.querySelector('ul > span')).not.toBeInTheDocument()
  })
})

describe('decorative brand icon semantics', () =>
{
  it('hides decorative brand glyphs without assigning an image role', () =>
  {
    const { container } = render(<BrandIcon path="M12 2l8 20H4L12 2z" />)
    const svg = container.querySelector('svg')

    if (!svg)
    {
      throw new Error('Expected BrandIcon to render an SVG')
    }

    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).not.toHaveAttribute('role')
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
