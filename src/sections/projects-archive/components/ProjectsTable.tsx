// src/sections/projects-archive/components/ProjectsTable.tsx
// comprehensive projects table w/ responsive card & table layouts

import { useMemo } from 'react';

import { getAllProjects } from '../content/projectFilters';
import { useExpandableRows } from '../hooks/useExpandableRows';
import { useTableResponsive } from '../hooks/useTableResponsive';
import { extractLatestYear, extractLatestMonth } from '../utils/projectSort';
import { ProjectMobileCard } from './ProjectMobileCard';
import { ProjectTableRow } from './ProjectTableRow';
import { ProjectExpandedDetails } from './ProjectExpandedDetails';

// determine live link label based on URL type
const getLiveLabel = (url: string): string => {
  return url.toLowerCase().endsWith('.pdf') ? 'View Report' : 'View Live Site';
};

// * Projects table component w/ expandable rows
export function ProjectsTable() {
  const projects = useMemo(() => getAllProjects(), []);
  const { shouldShowCards, shouldShowTable } = useTableResponsive();
  const { toggleRow, isExpanded } = useExpandableRows<number>();

  // sort projects by date desc to surface newest first
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
              const expanded = isExpanded(index);

              return (
                <div key={`mobile-project-${project.title}`}>
                  <ProjectMobileCard
                    project={project}
                    expanded={expanded}
                    onToggle={() => toggleRow(index)}
                  />

                  {expanded && (
                    <ProjectExpandedDetails
                      project={project}
                      getLiveLabel={getLiveLabel}
                      variant="mobile"
                    />
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
              const expanded = isExpanded(index);

              const mainRow = (
                <ProjectTableRow
                  key={`project-${project.title}`}
                  project={project}
                  expanded={expanded}
                  onToggle={() => toggleRow(index)}
                  getLiveLabel={getLiveLabel}
                />
              );

              if (!expanded) {
                return [mainRow];
              }

              const expandedRow = (
                <tr key={`expanded-${project.title}`}>
                  <td colSpan={7} className="p-0">
                    <ProjectExpandedDetails
                      project={project}
                      getLiveLabel={getLiveLabel}
                      variant="desktop"
                    />
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
