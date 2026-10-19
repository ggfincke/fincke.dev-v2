// src/shared/types/writing.ts
// published article types

import type { YearMonth } from '~/shared/types/dates'

// writing section copy
export interface WritingContent
{
  readonly heading: string
}

// published article shape
export interface Article
{
  readonly id: string
  readonly title: string
  readonly url: string
  readonly publisher: string
  readonly published: YearMonth
}
