// src/sections/projects-archive/components/ProjectsTable.tsx
// comprehensive projects table w/ responsive card & table layouts

import { useMemo } from 'react'

import { useMediaQuery } from '~/shared/hooks/useMediaQuery'
import { staggerDelay } from '~/shared/utils/animationConfig'
import { useExpandableRows } from '../hooks/useExpandableRows'
import { extractLatestYear, extractLatestMonth } from '../utils/projectSort'
import { ProjectMobileCard } from './ProjectMobileCard'
import { ProjectTableRow } from './ProjectTableRow'
import { ProjectExpandedDetails } from './ProjectExpandedDetails'
import { getAllProjects } from '~/content/projects'

// * Projects table component w/ expandable rows
export function ProjectsTable()
{
  const projects = useMemo(() => getAllProjects(), [])
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const shouldShowCards = !isDesktop
  const shouldShowTable = isDesktop
  const { toggleRow, isExpanded } = useExpandableRows<number>()

  // sort projects by date desc to surface newest first
  const sortedProjects = useMemo(() =>
  {
    return [...projects].sort((a, b) =>
    {
      const yearA = extractLatestYear(a.dateRange)
      const yearB = extractLatestYear(b.dateRange)

      if (yearA !== yearB)
      {
        return yearB - yearA
      }

      const monthA = extractLatestMonth(a.dateRange)
      const monthB = extractLatestMonth(b.dateRange)

      return monthB - monthA
    })
  }, [projects])

  return (
    <div className="overflow-x-auto">
      {/* mobile card layout */}
      {shouldShowCards && (
        <div className="block md:hidden">
          <div className="space-y-4">
            {sortedProjects.map((project, index) =>
            {
              const expanded = isExpanded(index)

              return (
                <div
                  key={`mobile-project-${project.title}`}
                  className="animate-slide-in-up opacity-0"
                  style={{ animationDelay: staggerDelay(0.05, 0.03, index) }}
                >
                  <ProjectMobileCard
                    project={project}
                    expanded={expanded}
                    onToggle={() => toggleRow(index)}
                  />

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <div className={expanded ? 'expand-content-enter' : ''}>
                        <ProjectExpandedDetails
                          project={project}
                          variant="mobile"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* desktop table layout */}
      {shouldShowTable && (
        <table className="w-full table-fixed hidden md:table">
          <thead>
            <tr className="border-b-2 border-[var(--accent)]/20">
              <th className="text-left py-4 pl-4 pr-1 text-sm font-medium text-[var(--muted)] uppercase tracking-wider w-10" />
              <th className="text-left py-4 pl-4 pr-4 w-[8%] text-sm font-medium text-[var(--muted)] uppercase tracking-wider">
                Year
              </th>
              <th className="text-left py-4 pl-4 pr-2 w-[24%] text-sm font-medium text-[var(--muted)] uppercase tracking-wider">
                Project
              </th>
              <th className="text-center py-4 px-4 w-[7%] text-sm font-medium text-[var(--muted)] uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-4 pl-4 pr-4 w-[12%] text-sm font-medium text-[var(--muted)] uppercase tracking-wider">
                Made for
              </th>
              <th className="text-left py-4 pl-4 pr-4 text-sm font-medium text-[var(--muted)] uppercase tracking-wider">
                Built with
              </th>
              <th className="text-left py-4 pl-4 pr-4 w-[10%] text-sm font-medium text-[var(--muted)] uppercase tracking-wider">
                Links
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.flatMap((project, index) =>
            {
              const expanded = isExpanded(index)

              const mainRow = (
                <ProjectTableRow
                  key={`project-${project.title}`}
                  project={project}
                  expanded={expanded}
                  onToggle={() => toggleRow(index)}
                  index={index}
                />
              )

              const expandedRow = (
                <tr key={`expanded-${project.title}`}>
                  <td colSpan={7} className="p-0">
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                      <div className="overflow-hidden">
                        <div className={expanded ? 'expand-content-enter' : ''}>
                          <ProjectExpandedDetails
                            project={project}
                            variant="desktop"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )

              return [mainRow, expandedRow]
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
