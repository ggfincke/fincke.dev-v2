// tests/fixtures.ts
// shared constants for minimal Phase 2 regression coverage

import { projects } from '~/content/projects'
import type { TechnologyId } from '~/content/technologies'
import type { Project, ProjectId, YearMonth } from '~/shared/types'

// look up a project fixture by id; throw w/ a useful message on miss
export function getProjectFixture(id: ProjectId): Project
{
  const project = projects.find((p) => p.id === id)
  if (!project)
  {
    throw new Error(`getProjectFixture: no project with id "${id}"`)
  }
  return project
}

export const FEATURED_DEFAULT_PROJECT_IDS = [
  'mdx-preview-for-vs-code',
  'swimmate-v2',
] as const

export const FEATURED_WITH_WIDE_PROJECT_IDS = [
  'mdx-preview-for-vs-code',
  'swimmate-v2',
  'minecart',
] as const

export const TECHNOLOGY_ALIAS_CASES: ReadonlyArray<
  readonly [alias: string, technologyId: TechnologyId]
> = [
  ['Postgres', 'postgresql'],
  ['Anthropic Claude', 'anthropic'],
  ['UIkit', 'uikit'],
  ['Hugging Face Transformers', 'transformers'],
]

export const REFERENCE_NOW: YearMonth = {
  year: 2026,
  month: 3,
}
