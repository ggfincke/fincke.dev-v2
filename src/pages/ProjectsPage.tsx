// src/pages/ProjectsPage.tsx
// projects archive page w/ responsive table & card layouts

import { useEffect } from 'react';

import { Navigation } from '~/components/Navigation';
import { ProjectsTable } from '~/components/projects/ProjectsTable';

// projects page component
export function ProjectsPage() {
  // enable scrolling for projects page
  useEffect(() => {
    const originalOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'auto';

    return () => {
      document.documentElement.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <Navigation />

      {/* page header w/ back link */}
      <main id="top" className="mx-auto max-w-6xl px-4 pt-28 pb-24">
        <header className="space-y-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-light)]"
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
          </a>
          <div>
            <h1 className="text-4xl font-bold text-[var(--color-text-light)] md:text-5xl">
              All Projects
            </h1>
            <p className="mt-3 text-lg text-[var(--color-text)]">
              A complete archive of things I have built.
            </p>
          </div>
        </header>

        {/* projects table */}
        <section className="mt-12">
          <ProjectsTable />
        </section>

        <footer className="mt-16 text-center text-sm text-[var(--color-text-secondary)]">
          Private repositories available upon request
        </footer>
      </main>
    </div>
  );
}

export default ProjectsPage;
