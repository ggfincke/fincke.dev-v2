// src/components/projects/ProjectsTable.tsx
// comprehensive projects table w/ responsive card & table layouts

import { useMemo } from 'react';

import { Collaborators } from '~/components/display/Collaborators';
import { renderCollaborators } from '~/utils/renderCollaborators';
import { ProjectLinks } from '~/components/display/ProjectLinks';
import { SkillPill } from '~/components/display/SkillPill';
import { StatusBadge } from '~/components/display/StatusBadge';
import { StatusCircle } from '~/components/display/StatusCircle';
import { VersionBadge } from '~/components/display/VersionBadge';
import { getAllProjects } from '~/data/projects';
import { useExpandableRows } from '~/hooks/useExpandableRows';
import { useTableResponsive } from '~/hooks/useTableResponsive';
import type { Project } from '~/types';

// determine live link label based on URL type
const getLiveLabel = (url: string): string => {
  return url.toLowerCase().endsWith('.pdf') ? 'View Report' : 'View Live Site';
};

// extract latest year from date range string
const extractLatestYear = (dateRange: string): number => {
  const years = dateRange.match(/\d{4}/g);
  if (!years) {
    return 0;
  }
  return Math.max(...years.map(year => Number.parseInt(year, 10)));
};

// extract latest month from date range string
const extractLatestMonth = (dateRange: string): number => {
  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];
  const lower = dateRange.toLowerCase();
  const matches = lower.match(
    /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*/g
  );

  if (!matches) {
    return 0;
  }

  const latestYear = extractLatestYear(dateRange);
  let latestMonth = 0;

  for (const match of matches) {
    const monthIndex = months.findIndex(month => match.startsWith(month));
    if (monthIndex === -1) {
      continue;
    }

    const monthPos = lower.indexOf(match);
    const yearPos = lower.indexOf(String(latestYear));

    if (
      latestYear === 0 ||
      Math.abs(monthPos - yearPos) < 50 ||
      monthIndex > latestMonth
    ) {
      latestMonth = monthIndex;
    }
  }

  return latestMonth;
};

// format collaborators for display
const formatCollaborators = (collaborators: Project['collaborators']) => {
  if (!collaborators) {
    return null;
  }

  return (
    <div className="text-sm text-[var(--muted)]">
      <Collaborators value={collaborators} />
    </div>
  );
};

// * projects table component w/ expandable rows
export function ProjectsTable() {
  const projects = useMemo(() => getAllProjects(), []);
  const { shouldShowCards, shouldShowTable } = useTableResponsive();
  const { toggleRow, isExpanded } = useExpandableRows<number>();

  // sort projects by date (descending) to show newest first
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const yearA = extractLatestYear(a.dateRange);
      const yearB = extractLatestYear(b.dateRange);

      if (yearA !== yearB) {
        return yearB - yearA;
      }

      const monthA = extractLatestMonth(a.dateRange);
      const monthB = extractLatestMonth(b.dateRange);

      return monthB - monthA;
    });
  }, [projects]);

  return (
    <div className="overflow-x-auto">
      {shouldShowCards && (
        <div className="block md:hidden">
          <div className="space-y-4">
            {sortedProjects.map((project, index) => {
              const year = project.dateRange.match(/\d{4}/)?.[0] ?? 'TBD';
              const expanded = isExpanded(index);

              return (
                <div key={`mobile-project-${project.title}`}>
                  <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--card)]/30 hover:bg-[var(--card)]/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-[var(--muted)] font-mono text-sm font-medium min-w-[3rem]">
                        {year}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-[var(--fg)] text-lg mb-1">
                          {project.title}
                        </div>
                        {project.collaborators && (
                          <div className="text-sm text-[var(--muted)]">
                            with {renderCollaborators(project.collaborators)}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleRow(index)}
                        className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors p-1 rounded hover:bg-[var(--card)] flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                        aria-label={
                          expanded
                            ? 'Collapse project details'
                            : 'Expand project details'
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transform transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {expanded && (
                    <div className="mt-2 border border-[var(--border)] rounded-lg p-4 bg-[var(--card)]/50">
                      <div className="space-y-4">
                        {project.tagline && (
                          <div className="text-base text-[var(--fg)]/80 italic">
                            {project.tagline}
                          </div>
                        )}

                        <div className="flex items-center gap-4">
                          <StatusBadge status={project.status} />
                          <span className="text-[var(--muted)] text-sm italic">
                            {project.repoUrl && (
                              <>
                                <VersionBadge repoUrl={project.repoUrl} />
                              </>
                            )}
                            {project.dateRange}
                          </span>
                        </div>

                        {project.collaborators && (
                          <div>
                            <h4 className="text-sm font-semibold text-[var(--accent)] mb-2">
                              Collaborators
                            </h4>
                            <p className="text-[var(--muted)]">
                              {renderCollaborators(project.collaborators)}
                            </p>
                          </div>
                        )}

                        <div>
                          <h4 className="text-sm font-semibold text-[var(--accent)] mb-2">
                            Description
                          </h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {project.bulletPoints.map((point, pointIndex) => (
                              <li
                                key={pointIndex}
                                className="text-[var(--muted)] text-sm"
                              >
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-[var(--accent)] mb-2">
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map(tech => (
                              <SkillPill
                                key={tech}
                                name={tech}
                                size="xs"
                                showProjectsOnHover
                              />
                            ))}
                          </div>
                        </div>

                        {(project.repoUrl || project.liveUrl) && (
                          <div>
                            <h4 className="text-sm font-semibold text-[var(--accent)] mb-2">
                              Links
                            </h4>
                            <ProjectLinks
                              repoUrl={project.repoUrl}
                              liveUrl={project.liveUrl}
                              variant="button"
                              size="sm"
                              liveLabel={
                                project.liveUrl
                                  ? getLiveLabel(project.liveUrl)
                                  : undefined
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {shouldShowTable && (
        <table className="w-full table-fixed hidden md:table">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left py-4 pl-6 pr-6 text-sm font-medium text-[var(--muted)] uppercase tracking-wider w-8" />
              <th className="text-left py-4 pl-4 pr-4 w-[8%] text-sm font-medium text-[var(--muted)] uppercase tracking-wider">
                Year
              </th>
              <th className="text-left py-4 pl-4 pr-2 w-[20%] text-sm font-medium text-[var(--muted)] uppercase tracking-wider">
                Project
              </th>
              <th className="text-center py-4 px-4 w-[10%] text-sm font-medium text-[var(--muted)] uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-4 pl-4 pr-4 w-[15%] text-sm font-medium text-[var(--muted)] uppercase tracking-wider">
                Made for
              </th>
              <th className="text-left py-4 pl-4 pr-4 text-sm font-medium text-[var(--muted)] uppercase tracking-wider">
                Built with
              </th>
              <th className="text-left py-4 pl-4 pr-4 w-[10%] text-sm font-medium text-[var(--muted)] uppercase tracking-wider">
                Link
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.flatMap((project, index) => {
              const year = project.dateRange.match(/\d{4}/)?.[0] ?? 'TBD';
              const expanded = isExpanded(index);

              const mainRow = (
                <tr
                  key={`project-${project.title}`}
                  className="border-b border-[var(--border)] hover:bg-[var(--card)] transition-colors"
                >
                  <td className="py-6 pl-6 pr-2">
                    <button
                      type="button"
                      onClick={() => toggleRow(index)}
                      className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors p-1 rounded hover:bg-[var(--card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                      aria-label={
                        expanded
                          ? 'Collapse project details'
                          : 'Expand project details'
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transform transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </td>
                  <td className="py-6 pl-4 pr-4 text-[var(--muted)] font-mono text-sm">
                    {year}
                  </td>
                  <td className="py-6 pl-4 pr-2">
                    <div className="font-semibold text-[var(--fg)] text-lg mb-1">
                      {project.title}
                    </div>
                    {formatCollaborators(project.collaborators)}
                  </td>
                  <td className="py-6 px-4 text-center">
                    <StatusCircle status={project.status} />
                  </td>
                  <td className="py-6 pl-4 pr-4 text-[var(--muted)]">
                    {project.madeFor}
                  </td>
                  <td className="py-6 pl-4 pr-4">
                    <div className="flex flex-wrap gap-2 items-center max-w-xs">
                      {project.technologies.slice(0, 3).map(tech => (
                        <SkillPill
                          key={tech}
                          name={tech}
                          size="xs"
                          showProjectsOnHover
                        />
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[var(--muted)] text-xs">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-6 pl-4 pr-4">
                    <ProjectLinks
                      repoUrl={project.repoUrl}
                      liveUrl={project.liveUrl}
                      variant="icon"
                      liveLabel={
                        project.liveUrl
                          ? getLiveLabel(project.liveUrl)
                          : undefined
                      }
                      className="flex space-x-4"
                    />
                  </td>
                </tr>
              );

              if (!expanded) {
                return [mainRow];
              }

              const expandedRow = (
                <tr key={`expanded-${project.title}`}>
                  <td colSpan={7} className="p-0">
                    <div className="px-6 pb-8 bg-[var(--card)]/50 border-b border-[var(--border)] transition-all duration-300">
                      <div className="space-y-6 pt-6">
                        {project.tagline && (
                          <div className="text-base text-[var(--fg)]/80 italic">
                            {project.tagline}
                          </div>
                        )}

                        <div className="flex items-center gap-4">
                          <StatusBadge status={project.status} />
                          <span className="text-[var(--muted)] text-sm italic">
                            {project.repoUrl && (
                              <>
                                <VersionBadge repoUrl={project.repoUrl} />
                              </>
                            )}
                            {project.dateRange}
                          </span>
                        </div>

                        {project.collaborators && (
                          <div>
                            <h4 className="text-sm font-semibold text-[var(--accent)] mb-2">
                              Collaborators
                            </h4>
                            <p className="text-[var(--muted)]">
                              {renderCollaborators(project.collaborators)}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-[var(--accent)] mb-3">
                              Description
                            </h4>
                            <ul className="list-disc pl-5 space-y-2">
                              {project.bulletPoints.map((point, pointIndex) => (
                                <li
                                  key={pointIndex}
                                  className="text-[var(--muted)]"
                                >
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {project.imagePath && (
                            <div className="lg:w-1/3 flex-shrink-0">
                              <div className="rounded-lg p-4 w-full group relative hover:shadow-lg transition-all duration-300">
                                <img
                                  src={project.imagePath}
                                  alt={
                                    project.imageAlt ??
                                    `${project.title} screenshot`
                                  }
                                  className="w-full h-full rounded-lg object-contain transition-all duration-300 group-hover:scale-105 group-hover:z-50"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-[var(--accent)] mb-3">
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-x-3 gap-y-2">
                            {project.technologies.map(tech => (
                              <SkillPill
                                key={tech}
                                name={tech}
                                size="md"
                                showProjectsOnHover
                              />
                            ))}
                          </div>
                        </div>

                        {(project.repoUrl || project.liveUrl) && (
                          <div>
                            <h4 className="text-sm font-semibold text-[var(--accent)] mb-3">
                              Links
                            </h4>
                            <ProjectLinks
                              repoUrl={project.repoUrl}
                              liveUrl={project.liveUrl}
                              variant="button"
                              size="md"
                              liveLabel={
                                project.liveUrl
                                  ? getLiveLabel(project.liveUrl)
                                  : undefined
                              }
                              className="flex flex-wrap gap-4"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );

              return [mainRow, expandedRow];
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
