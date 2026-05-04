// src/sections/projects-archive/components/ProjectsTable.tsx
// comprehensive projects table w/ responsive card & table layouts

import { useCallback, useMemo, useState } from 'react'

import { getAllProjects } from '~/content/projects'
import type { ProjectId } from '~/shared/types'
import { useMediaQuery } from '~/shared/hooks/useMediaQuery'
import {
  ANIMATION_DELAYS,
  getStaggerStyle,
} from '~/shared/utils/animationConfig'
import { BREAKPOINTS } from '~/shared/utils/breakpoints'
import { getCurrentYearMonth } from '~/shared/utils/dateSpan'
import { useExpandableRows } from '~/sections/projects-archive/hooks/useExpandableRows'
import {
  compareProjects,
  DEFAULT_PROJECT_SORT,
  nextSortState,
  type ProjectSortKey,
  type ProjectSortState,
} from '~/sections/projects-archive/utils/projectSort'
import { ProjectExpansionPanel } from '~/sections/projects-archive/components/ProjectExpansionPanel'
import { ProjectMobileCard } from '~/sections/projects-archive/components/ProjectMobileCard'
import { ProjectTableRow } from '~/sections/projects-archive/components/ProjectTableRow'
import { ProjectExpandedDetails } from '~/sections/projects-archive/components/ProjectExpandedDetails'
import { SortableHeader } from '~/sections/projects-archive/components/SortableHeader'
import { getProjectViewModel } from '~/shared/utils/projectViewModel'

// * Projects table component w/ expandable rows
export function ProjectsTable()
{
  const isDesktop = useMediaQuery(BREAKPOINTS.tabletQuery)
  const { toggleRow, isExpanded } = useExpandableRows<ProjectId>()
  const [sortState, setSortState] =
    useState<ProjectSortState>(DEFAULT_PROJECT_SORT)

  const sortedProjects = useMemo(() =>
  {
    const now = getCurrentYearMonth()
    return [...getAllProjects()].sort((a, b) =>
      compareProjects(a, b, sortState, now)
    )
  }, [sortState])

  const handleSort = useCallback((key: ProjectSortKey) =>
  {
    setSortState((current) => nextSortState(current, key))
  }, [])

  if (!isDesktop)
  {
    return (
      <div className="overflow-x-clip">
        <div className="space-y-4">
          {sortedProjects.map((project, index) =>
          {
            const expanded = isExpanded(project.id)
            const viewModel = getProjectViewModel(project)

            return (
              <div
                key={`mobile-project-${project.id}`}
                className="animate-slide-in-up opacity-0"
                style={getStaggerStyle(
                  ANIMATION_DELAYS.projectsArchive.mobile.base,
                  ANIMATION_DELAYS.projectsArchive.mobile.step,
                  index
                )}
              >
                <ProjectMobileCard
                  project={project}
                  viewModel={viewModel}
                  expanded={expanded}
                  toggleRow={toggleRow}
                />

                <ProjectExpansionPanel
                  expanded={expanded}
                  id={viewModel.detailsId}
                  label={viewModel.detailsLabel}
                >
                  <ProjectExpandedDetails
                    project={project}
                    viewModel={viewModel}
                    variant="mobile"
                  />
                </ProjectExpansionPanel>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-clip">
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b-2 border-[var(--accent)]/20">
            <th className="text-left py-4 pl-4 pr-1 text-sm font-medium text-[var(--muted)] uppercase tracking-wider w-10" />
            <SortableHeader
              label="Year"
              sortKey="year"
              active={sortState.key === 'year'}
              direction={sortState.direction}
              onSort={handleSort}
              className="text-left pl-4 pr-4 w-[8%]"
            />
            <SortableHeader
              label="Project"
              sortKey="project"
              active={sortState.key === 'project'}
              direction={sortState.direction}
              onSort={handleSort}
              className="text-left pl-4 pr-2 w-[24%]"
            />
            <SortableHeader
              label="Status"
              sortKey="status"
              active={sortState.key === 'status'}
              direction={sortState.direction}
              onSort={handleSort}
              align="center"
              className="text-center px-4 w-[7%]"
            />
            <SortableHeader
              label="Made for"
              sortKey="madeFor"
              active={sortState.key === 'madeFor'}
              direction={sortState.direction}
              onSort={handleSort}
              className="text-left pl-4 pr-4 w-[12%]"
            />
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
                viewModel={viewModel}
                expanded={expanded}
                toggleRow={toggleRow}
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
                      viewModel={viewModel}
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
    </div>
  )
}
