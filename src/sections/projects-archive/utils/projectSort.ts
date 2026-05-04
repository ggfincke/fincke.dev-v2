// src/sections/projects-archive/utils/projectSort.ts
// sort state, defaults, & comparators for the projects archive table

import type { Project, YearMonth } from '~/shared/types'
import { compareDateSpansByLatestDesc } from '~/shared/utils/dateSpan'
import { statusConfig } from '~/shared/utils/statusConfig'

export type ProjectSortKey = 'year' | 'project' | 'status' | 'madeFor'
export type ProjectSortDirection = 'asc' | 'desc'

export interface ProjectSortState
{
  key: ProjectSortKey
  direction: ProjectSortDirection
}

// initial sort matches the prior default (newest first)
export const DEFAULT_PROJECT_SORT: ProjectSortState = {
  key: 'year',
  direction: 'desc',
}

// direction a column activates w/ on first click
const DEFAULT_DIRECTIONS: Record<ProjectSortKey, ProjectSortDirection> = {
  year: 'desc',
  project: 'asc',
  status: 'asc',
  madeFor: 'asc',
}

function compareAscending(
  a: Project,
  b: Project,
  key: ProjectSortKey,
  now: YearMonth
): number
{
  switch (key)
  {
    case 'year':
      // dateSpan helper returns desc; negate so ascending = oldest first
      return -compareDateSpansByLatestDesc(a.period, b.period, now)
    case 'project':
      return a.title.localeCompare(b.title)
    case 'status':
      return statusConfig[a.status].rank - statusConfig[b.status].rank
    case 'madeFor':
      return a.madeFor.localeCompare(b.madeFor)
  }
}

export function compareProjects(
  a: Project,
  b: Project,
  state: ProjectSortState,
  now: YearMonth
): number
{
  const ascending = compareAscending(a, b, state.key, now)
  const primary = state.direction === 'asc' ? ascending : -ascending

  if (primary !== 0)
  {
    return primary
  }

  // stable, deterministic tiebreaker
  return a.title.localeCompare(b.title)
}

// determine the next sort state when a column header is clicked
export function nextSortState(
  current: ProjectSortState,
  key: ProjectSortKey
): ProjectSortState
{
  if (current.key === key)
  {
    return {
      key,
      direction: current.direction === 'asc' ? 'desc' : 'asc',
    }
  }

  return {
    key,
    direction: DEFAULT_DIRECTIONS[key],
  }
}
