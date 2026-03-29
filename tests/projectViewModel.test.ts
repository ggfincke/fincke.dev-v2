// tests/projectViewModel.test.ts
// focused coverage for shared project view metadata

import { describe, expect, it } from 'vitest'

import { projects } from '~/content/projects'
import { getProjectLiveLabel } from '~/shared/utils/projectLinks'
import { getProjectViewModel } from '~/shared/utils/projectViewModel'

const mdxPreviewProject = projects.find(
  (project) => project.id === 'mdx-preview-for-vs-code'
)
const loomProject = projects.find((project) => project.id === 'loom')

describe('project view model', () =>
{
  it('derives stable display metadata from project content', () =>
  {
    expect(mdxPreviewProject).toBeDefined()

    const viewModel = getProjectViewModel(mdxPreviewProject!)

    expect(viewModel.primaryHref).toBe(
      'https://marketplace.visualstudio.com/items?itemName=ggfincke.vsc-mdx-preview'
    )
    expect(viewModel.startYear).toBe('2026')
    expect(viewModel.periodLabel).toBe('Jan 2026 – Present')
    expect(viewModel.hasLinks).toBe(true)
    expect(viewModel.detailsId).toBe('project-details-mdx-preview-for-vs-code')
    expect(viewModel.detailsLabel).toBe('Details for MDX Preview for VS Code')
  })

  it('falls back to repository links when no live URL exists', () =>
  {
    expect(loomProject).toBeDefined()

    const viewModel = getProjectViewModel(loomProject!)

    expect(viewModel.primaryHref).toBe('https://github.com/ggfincke/loom')
  })
})

describe('project live labels', () =>
{
  it('maps known URL types to stable labels', () =>
  {
    expect(
      getProjectLiveLabel(
        '/assets/projects/documents/MATH_452_-_Final_Report.pdf'
      )
    ).toBe('View Report')

    expect(
      getProjectLiveLabel(
        'https://marketplace.visualstudio.com/items?itemName=ggfincke.vsc-mdx-preview'
      )
    ).toBe('VS Code Marketplace')

    expect(getProjectLiveLabel('https://fincke.dev')).toBe('View Live Site')
  })
})
