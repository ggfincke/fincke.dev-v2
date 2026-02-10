// src/sections/projects-archive/pages/ProjectsArchivePage.tsx
// projects archive page w/ responsive table & card layouts

import { Link } from 'react-router-dom';
import { ChevronIcon } from '~/shared/components/ui/icons';
import { ProjectsTable } from '../components/ProjectsTable';

// * Projects archive page component
export function ProjectsArchivePage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--muted)] overflow-y-auto">
      {/* skip nav link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--bg)] focus:font-medium"
      >
        Skip to content
      </a>
      {/* page header w/ back link */}
      <main id="main-content" className="mx-auto max-w-7xl px-4 pt-12 pb-24">
        <header className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--red)] transition hover:text-[var(--white)]"
          >
            <ChevronIcon size={16} direction="left" />
            Back
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-[var(--cyan)] md:text-5xl">
              All Projects
            </h1>
            <p className="mt-3 text-lg text-[var(--muted)]">
              A complete archive of things I have built.
            </p>
          </div>
        </header>

        {/* projects table */}
        <section className="mt-12">
          <ProjectsTable />
        </section>

        {/* page footer */}
        <footer className="mt-16 text-center text-sm text-[var(--muted)]">
          Private repositories available upon request
        </footer>
      </main>
    </div>
  );
}
