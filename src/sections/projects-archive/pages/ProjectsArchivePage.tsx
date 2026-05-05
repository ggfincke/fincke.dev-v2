// src/sections/projects-archive/pages/ProjectsArchivePage.tsx
// projects archive page w/ responsive table & card layouts

import { PROJECTS_CONTENT } from '~/content/projects'
import { PageShell } from '~/shared/components/layout/PageShell'
import { ActionLink } from '~/shared/components/ui/ActionLink'
import { ChevronIcon } from '~/shared/components/ui/icons'
import { PUBLIC_ROUTE_PATHS } from '~/shared/routing/publicRoutes'
import { ProjectsTable } from '~/sections/projects-archive/components/ProjectsTable'

// * Projects archive page component
export function ProjectsArchivePage()
{
  return (
    <PageShell className="pt-12 pb-24">
      <header className="space-y-4">
        <ActionLink
          to={PUBLIC_ROUTE_PATHS.home}
          icon={<ChevronIcon size={16} direction="left" />}
          iconPosition="start"
        >
          {PROJECTS_CONTENT.archiveBackLabel}
        </ActionLink>
        <div>
          <h1 className="text-4xl font-bold text-[var(--cyan)] md:text-5xl">
            {PROJECTS_CONTENT.archiveTitle}
          </h1>
          <p className="mt-3 text-lg text-[var(--muted)]">
            {PROJECTS_CONTENT.archiveDescription}
          </p>
        </div>
      </header>

      <section
        aria-labelledby="projects-archive-list-heading"
        className="mt-12"
      >
        <h2 id="projects-archive-list-heading" className="sr-only">
          {PROJECTS_CONTENT.archiveListHeading}
        </h2>
        <ProjectsTable />
      </section>

      <footer className="mt-16 text-center text-sm text-[var(--muted)]">
        {PROJECTS_CONTENT.archiveFooter}
      </footer>
    </PageShell>
  )
}
