// src/sections/experience/components/JobHistory.tsx
// brief job history w/ link to full resume

import { WORK_EXPERIENCE } from '../content/experienceTimeline';

// job history component
export function JobHistory() {
  return (
    <section className="space-y-8">
      {WORK_EXPERIENCE.map((job, index) => (
        <div key={index} className="group relative">
          <div className="mb-2 flex items-baseline justify-between gap-2">
            <h3 className="text-sm font-medium text-[var(--fg)]">
              {job.link ? (
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition"
                >
                  {job.company}
                </a>
              ) : (
                job.company
              )}
            </h3>
            <span className="text-xs text-[var(--muted)]">{job.dateRange}</span>
          </div>
          <div className="mb-1 text-sm text-[var(--muted)]">{job.title}</div>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            {job.description}
          </p>
          {job.technologies && job.technologies.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {job.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="rounded-full bg-[var(--accent)]/10 px-2 py-1 text-xs text-[var(--accent)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}

      <a
        href="/documents/resume-selected.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-[var(--accent)] transition hover:text-[var(--fg)]"
      >
        View Full Resume
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
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
    </section>
  );
}
