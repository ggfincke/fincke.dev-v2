// focused coverage for shared collaborator rendering

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProjectCollaborators } from '~/shared/components/projects/ProjectCollaborators'

describe('ProjectCollaborators', () =>
{
  it('renders linked and unlinked collaborators with the same text contract', () =>
  {
    const { container } = render(
      <ProjectCollaborators
        prefix="with "
        collaborators={[
          {
            name: 'Jacob Goulet',
            url: 'https://example.com/jacob',
          },
          { name: 'Tyler Rossi' },
          {
            name: 'OpenAI',
            url: 'https://example.com/openai',
          },
        ]}
      />
    )

    expect(container.textContent).toBe('with Jacob Goulet, Tyler Rossi, OpenAI')

    expect(screen.getByRole('link', { name: 'Jacob Goulet' })).toHaveAttribute(
      'href',
      'https://example.com/jacob'
    )
    expect(screen.getByRole('link', { name: 'Jacob Goulet' })).toHaveAttribute(
      'target',
      '_blank'
    )

    expect(screen.getByRole('link', { name: 'OpenAI' })).toHaveAttribute(
      'href',
      'https://example.com/openai'
    )
    expect(screen.getByText(/Tyler Rossi/)).toBeInTheDocument()
  })

  it('renders single collaborators without trailing separators', () =>
  {
    const { container } = render(
      <ProjectCollaborators collaborators={[{ name: 'Solo Builder' }]} />
    )

    expect(container.textContent).toBe('Solo Builder')
  })
})
