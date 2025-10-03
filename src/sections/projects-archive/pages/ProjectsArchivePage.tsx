// src/sections/projects-archive/pages/ProjectsArchivePage.tsx
// projects archive page w/ responsive table & card layouts

import { Link } from 'react-router-dom';
import { ProjectsTable } from '../components/ProjectsTable';

// projects archive page component
export function ProjectsArchivePage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--muted)] overflow-y-auto">
      {/* page header w/ back link */}
      <main id="top" className="mx-auto max-w-7xl px-4 pt-12 pb-24">
        <header className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition hover:text-[var(--fg)]"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-[var(--fg)] md:text-5xl">
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

        <footer className="mt-16 text-center text-sm text-[var(--muted)]">
          Private repositories available upon request
        </footer>
      </main>
    </div>
  );
}
