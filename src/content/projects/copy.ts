// src/content/projects/copy.ts
// project section & archive page copy

import type { ProjectsContent } from '~/shared/types'
import { deepFreeze } from '~/shared/utils/deepFreeze'

export const PROJECTS_CONTENT: ProjectsContent = deepFreeze({
  featuredHeading: 'Featured Projects',
  archiveCtaLabel: 'View All Projects',
  archiveBackLabel: 'Back',
  archiveTitle: 'All Projects',
  archiveDescription: 'A complete archive of things I have built.',
  archiveListHeading: 'Project Archive',
  archiveFooter: 'Private repositories available upon request',
})
