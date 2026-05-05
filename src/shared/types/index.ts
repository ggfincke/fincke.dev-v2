// src/shared/types/index.ts
// barrel export for all shared types

export type {
  ImageAssetReference,
  PublicAssetCategory,
  PublicAssetReference,
  PublicAssetStorage,
} from '~/shared/types/assets'
export type { DateSpan, YearMonth } from '~/shared/types/dates'
export type {
  AboutContent,
  HeroContent,
  SocialLink,
  SocialLinksContent,
} from '~/shared/types/home'
export type {
  Education,
  EducationContent,
  EducationId,
  EducationLogo,
} from '~/shared/types/education'
export type {
  ExperienceContent,
  WorkExperience,
  WorkExperienceId,
} from '~/shared/types/experience'
export type {
  TechnologyCategory,
  TechnologyDefinition,
} from '~/shared/types/technology'
export type {
  Project,
  Collaborator,
  ProjectContentStatus,
  ProjectId,
  ProjectsContent,
  ProjectResourceAvailability,
  ProjectResourceState,
  ProjectStatus,
  ExternalLink,
  ProjectFeature,
  ProjectFeatureTier,
} from '~/shared/types/projects'
export { PROJECT_RESOURCE_AVAILABILITIES } from '~/shared/types/projects'
