// src/sections/projects-archive/pages/ProjectsArchivePage.tsx
// projects archive page w/ responsive table & card layouts

import { PageShell } from '~/shared/components/layout/PageShell'
import { ActionLink } from '~/shared/components/ui/ActionLink'
import { ChevronIcon } from '~/shared/components/ui/icons'
import { ProjectsTable } from '~/sections/projects-archive/components/ProjectsTable'

// * Projects archive page component
export function ProjectsArchivePage()
{
  return (
    <PageShell className="pt-12 pb-24">
      <header className="space-y-4">
        <ActionLink
          to="/"
          icon={<ChevronIcon size={16} direction="left" />}
          iconPosition="start"
        >
          Back
        </ActionLink>
        <div>
          <h1 className="text-4xl font-bold text-[var(--cyan)] md:text-5xl">
            All Projects
          </h1>
          <p className="mt-3 text-lg text-[var(--muted)]">
            A complete archive of things I have built.
          </p>
        </div>
      </header>

      <section className="mt-12">
        <ProjectsTable />
      </section>

      <footer className="mt-16 text-center text-sm text-[var(--muted)]">
        Private repositories available upon request
      </footer>
    </PageShell>
  )
}
