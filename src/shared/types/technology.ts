// src/shared/types/technology.ts
// shared technology types

// technology category union type
export type TechnologyCategory =
  | 'language'
  | 'framework'
  | 'infra'
  | 'data'
  | 'tooling'
  | 'platform'

// canonical technology entry shape
export interface TechnologyDefinition<TId extends string = string>
{
  id: TId
  label: string
  category: TechnologyCategory
  aliases?: string[]
}
