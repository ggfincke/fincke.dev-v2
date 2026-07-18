// src/sections/projects-archive/components/StatusLegend.tsx
// legend mapping status icons to their labels for the archive

import { getAllProjects } from '~/content/projects'
import { StatusCircle } from '~/shared/components/ui/StatusCircle'
import type { ProjectStatus } from '~/shared/types'
import { statusConfig } from '~/shared/utils/statusConfig'

// statuses actually present in the archive, in rank order
function getUsedStatuses(): ProjectStatus[]
{
  const used = new Set(getAllProjects().map((project) => project.status))
  return [...used].sort((a, b) => statusConfig[a].rank - statusConfig[b].rank)
}

const USED_STATUSES = getUsedStatuses()

// status icon legend shown above the projects table & cards
export function StatusLegend()
{
  return (
    <ul
      aria-label="Status legend"
      className="flex flex-wrap items-center gap-x-4 gap-y-2"
    >
      {USED_STATUSES.map((status) => (
        <li key={status} className="flex items-center gap-1.5">
          <StatusCircle status={status} size={16} decorative />
          <span className="text-xs text-[var(--muted)]">
            {statusConfig[status].label}
          </span>
        </li>
      ))}
    </ul>
  )
}
