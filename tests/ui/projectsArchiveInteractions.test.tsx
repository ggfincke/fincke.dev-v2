// tests/ui/projectsArchiveInteractions.test.tsx
// archive interaction coverage for desktop & mobile layouts

import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { ProjectsTable } from '~/sections/projects-archive/components/ProjectsTable'
import { BREAKPOINTS } from '~/shared/utils/breakpoints'
import { renderWithRouter } from './render'
import { setMatchMediaMatch } from './matchMedia'

const MDX_PREVIEW_TITLE = 'MDX Preview for VS Code'
const MDX_PREVIEW_DETAILS_LABEL = 'Details for MDX Preview for VS Code'

function renderDesktopArchive()
{
  setMatchMediaMatch(BREAKPOINTS.tabletQuery, true)
  return renderWithRouter(<ProjectsTable />)
}

function renderMobileArchive()
{
  setMatchMediaMatch(BREAKPOINTS.tabletQuery, false)
  return renderWithRouter(<ProjectsTable />)
}

describe('projects archive desktop interactions', () =>
{
  it('renders the desktop table layout and expands a row from row clicks', async () =>
  {
    const user = userEvent.setup()

    renderDesktopArchive()

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(
      screen.queryByRole('region', { name: MDX_PREVIEW_DETAILS_LABEL })
    ).not.toBeInTheDocument()

    const row = screen.getByRole('row', { name: new RegExp(MDX_PREVIEW_TITLE) })

    await user.click(row)

    expect(
      screen.getByRole('region', { name: MDX_PREVIEW_DETAILS_LABEL })
    ).toBeInTheDocument()
  })

  it('toggles exactly once from the expand button and isolates nested links and tech pills', async () =>
  {
    const user = userEvent.setup()

    renderDesktopArchive()

    const row = screen.getByRole('row', { name: new RegExp(MDX_PREVIEW_TITLE) })

    const rowScope = within(row)

    await user.click(
      rowScope.getByRole('link', {
        name: `Open GitHub repository for ${MDX_PREVIEW_TITLE}`,
      })
    )
    expect(
      screen.queryByRole('region', { name: MDX_PREVIEW_DETAILS_LABEL })
    ).not.toBeInTheDocument()

    await user.click(rowScope.getByRole('button', { name: 'TypeScript' }))
    expect(
      screen.queryByRole('region', { name: MDX_PREVIEW_DETAILS_LABEL })
    ).not.toBeInTheDocument()

    await user.click(
      rowScope.getByRole('button', {
        name: `Expand details for ${MDX_PREVIEW_TITLE}`,
      })
    )
    expect(
      screen.getByRole('region', { name: MDX_PREVIEW_DETAILS_LABEL })
    ).toBeInTheDocument()
  })
})

describe('projects archive mobile interactions', () =>
{
  it('renders cards instead of the table and toggles with keyboard controls', async () =>
  {
    const user = userEvent.setup()

    renderMobileArchive()

    expect(screen.queryByRole('table')).not.toBeInTheDocument()

    const card = screen.getByRole('button', {
      name: `Toggle details for ${MDX_PREVIEW_TITLE}`,
    })

    expect(card).toHaveAttribute('aria-expanded', 'false')

    card.focus()
    await user.keyboard('{Enter}')

    expect(card).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByRole('region', { name: MDX_PREVIEW_DETAILS_LABEL })
    ).toBeInTheDocument()

    await user.keyboard('[Space]')
    expect(card).toHaveAttribute('aria-expanded', 'false')
    expect(
      screen.queryByRole('region', { name: MDX_PREVIEW_DETAILS_LABEL })
    ).not.toBeInTheDocument()
  })

  it('prevents nested controls from re-toggling the mobile card', async () =>
  {
    const user = userEvent.setup()

    renderMobileArchive()

    const card = screen.getByRole('button', {
      name: `Toggle details for ${MDX_PREVIEW_TITLE}`,
    })

    const cardScope = within(card)

    await user.click(
      cardScope.getByRole('link', {
        name: `Open GitHub repository for ${MDX_PREVIEW_TITLE}`,
      })
    )
    expect(card).toHaveAttribute('aria-expanded', 'false')

    await user.click(cardScope.getByRole('button', { name: 'TypeScript' }))
    expect(card).toHaveAttribute('aria-expanded', 'false')

    await user.click(
      cardScope.getByRole('button', {
        name: `Expand details for ${MDX_PREVIEW_TITLE}`,
      })
    )
    expect(card).toHaveAttribute('aria-expanded', 'true')
  })
})
