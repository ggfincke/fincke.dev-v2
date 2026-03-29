// tests/fixtures.ts
// shared constants for minimal Phase 2 regression coverage

import type { TechnologyId } from '~/content/technologies'
import type { YearMonth } from '~/shared/types'

export const FEATURED_DEFAULT_PROJECT_IDS = [
  'mdx-preview-for-vs-code',
  'loom',
  'swimmate-v2',
] as const

export const FEATURED_WITH_WIDE_PROJECT_IDS = [
  ...FEATURED_DEFAULT_PROJECT_IDS,
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
