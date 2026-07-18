// src/sections/projects-archive/utils/projectSort.ts
// sort state, defaults, & comparators for the projects archive table

import type { Project } from '~/shared/types'
import { getYearMonthValue } from '~/shared/utils/dateSpan'
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

function compareAscending(a: Project, b: Project, key: ProjectSortKey): number
{
  switch (key)
  {
    case 'year':
      return (
        getYearMonthValue(a.period.start) - getYearMonthValue(b.period.start)
      )
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
  state: ProjectSortState
): number
{
  const ascending = compareAscending(a, b, state.key)
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

// URL search param names so refresh/back/share preserve the sort
const SORT_PARAM = 'sort'
const DIRECTION_PARAM = 'dir'

const SORT_KEYS: readonly ProjectSortKey[] = [
  'year',
  'project',
  'status',
  'madeFor',
]

function isProjectSortKey(value: string | null): value is ProjectSortKey
{
  return SORT_KEYS.includes(value as ProjectSortKey)
}

// read sort state from URL params, falling back to the default
export function parseSortParams(params: URLSearchParams): ProjectSortState
{
  const key = params.get(SORT_PARAM)

  if (!isProjectSortKey(key))
  {
    return DEFAULT_PROJECT_SORT
  }

  const direction = params.get(DIRECTION_PARAM)

  return {
    key,
    direction:
      direction === 'asc' || direction === 'desc'
        ? direction
        : DEFAULT_DIRECTIONS[key],
  }
}

// write sort state into URL params; drops them at the default for clean URLs
export function serializeSortParams(
  params: URLSearchParams,
  state: ProjectSortState
): URLSearchParams
{
  const next = new URLSearchParams(params)

  if (
    state.key === DEFAULT_PROJECT_SORT.key &&
    state.direction === DEFAULT_PROJECT_SORT.direction
  )
  {
    next.delete(SORT_PARAM)
    next.delete(DIRECTION_PARAM)
    return next
  }

  next.set(SORT_PARAM, state.key)
  next.set(DIRECTION_PARAM, state.direction)
  return next
}
