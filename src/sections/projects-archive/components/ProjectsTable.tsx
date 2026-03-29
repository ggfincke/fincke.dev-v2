// src/sections/projects-archive/components/ProjectsTable.tsx
// comprehensive projects table w/ responsive card & table layouts

import { useMemo } from 'react'

import { getAllProjects } from '~/content/projects'
import { useMediaQuery } from '~/shared/hooks/useMediaQuery'
import { ANIMATION_DELAYS, staggerDelay } from '~/shared/utils/animationConfig'
import { BREAKPOINTS } from '~/shared/utils/breakpoints'
import { compareDateSpansByLatestDesc } from '~/shared/utils/dateSpan'
import { useExpandableRows } from '../hooks/useExpandableRows'
import { ProjectExpansionPanel } from './ProjectExpansionPanel'
import { ProjectMobileCard } from './ProjectMobileCard'
import { ProjectTableRow } from './ProjectTableRow'
import { ProjectExpandedDetails } from './ProjectExpandedDetails'
import { getProjectViewModel } from '~/shared/utils/projectViewModel'

// * Projects table component w/ expandable rows
export function ProjectsTable()
{
  const projects = useMemo(() => getAllProjects(), [])
  const isDesktop = useMediaQuery(BREAKPOINTS.tabletQuery)
  const shouldShowCards = !isDesktop
  const shouldShowTable = isDesktop
  const { toggleRow, isExpanded } = useExpandableRows<string>()

  // sort projects by date desc to surface newest first
  const sortedProjects = useMemo(() =>
  {
    return [...projects].sort((a, b) =>
      compareDateSpansByLatestDesc(a.period, b.period)
    )
  }, [projects])

  return (
    <div className="overflow-x-auto">
      {/* mobile card layout */}
      {shouldShowCards && (
        <div className="block md:hidden">
          <div className="space-y-4">
            {sortedProjects.map((project, index) =>
            {
              const expanded = isExpanded(project.id)
              const viewModel = getProjectViewModel(project)

              return (
                <div
                  key={`mobile-project-${project.id}`}
                  className="animate-slide-in-up opacity-0"
                  style={{
                    animationDelay: staggerDelay(
                      ANIMATION_DELAYS.projectsArchive.mobile.base,
                      ANIMATION_DELAYS.projectsArchive.mobile.step,
                      index
                    ),
                  }}
                >
                  <ProjectMobileCard
                    project={project}
                    expanded={expanded}
                    onToggle={() => toggleRow(project.id)}
                  />

                  <ProjectExpansionPanel
                    expanded={expanded}
                    id={viewModel.detailsId}
                    label={viewModel.detailsLabel}
                  >
                    <ProjectExpandedDetails
                      project={project}
                      variant="mobile"
                    />
                  </ProjectExpansionPanel>
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
              const expanded = isExpanded(project.id)
              const viewModel = getProjectViewModel(project)

              const mainRow = (
                <ProjectTableRow
                  key={`project-${project.id}`}
                  project={project}
                  expanded={expanded}
                  onToggle={() => toggleRow(project.id)}
                  index={index}
                />
              )

              const expandedRow = (
                <tr key={`expanded-${project.id}`}>
                  <td colSpan={7} className="p-0">
                    <ProjectExpansionPanel
                      expanded={expanded}
                      id={viewModel.detailsId}
                      label={viewModel.detailsLabel}
                    >
                      <ProjectExpandedDetails
                        project={project}
                        variant="desktop"
                      />
                    </ProjectExpansionPanel>
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
