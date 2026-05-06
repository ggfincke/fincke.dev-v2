// src/shared/types/assets.ts
// content-owned public asset metadata types

export type PublicAssetCategory = 'runtime' | 'deployment' | 'retained'
export type PublicAssetStorage = 'public' | 'repo-root'

// inventory-side record consumed by repo automation only
export interface PublicAssetReference
{
  readonly path: string
  readonly category: PublicAssetCategory
  readonly storage: PublicAssetStorage
  readonly source: string
}

// UI-side record — what components actually read at render time
export interface ImageAssetReference
{
  readonly path: string
  readonly alt: string
}
