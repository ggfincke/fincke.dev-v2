// src/shared/types/assets.ts
// content-owned public asset metadata types

export type PublicAssetCategory = 'runtime' | 'deployment' | 'retained'
export type PublicAssetStorage = 'public' | 'repo-root'

export interface PublicAssetReference
{
  readonly path: string
  readonly category: PublicAssetCategory
  readonly storage: PublicAssetStorage
  readonly source: string
}

export interface ImageAssetReference extends PublicAssetReference
{
  readonly alt: string
}
