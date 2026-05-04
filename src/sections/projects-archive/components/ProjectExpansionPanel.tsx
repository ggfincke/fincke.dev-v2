// src/sections/projects-archive/components/ProjectExpansionPanel.tsx
// shared expandable panel wrapper for project details

import { memo, useRef, type ReactNode } from 'react'

import { MOTION_CLASSES } from '~/shared/utils/animationConfig'

// props for shared project expansion panel
interface ProjectExpansionPanelProps
{
  expanded: boolean
  id: string
  label: string
  children: ReactNode
}

// shared animated expansion panel for mobile & desktop archive layouts
function ProjectExpansionPanelImpl({
  expanded,
  id,
  label,
  children,
}: ProjectExpansionPanelProps)
{
  // latch once-expanded so children mount only after first open; keeps the
  // close animation but skips rendering 24 hidden detail panels on initial load
  const hasOpenedRef = useRef(expanded)
  if (expanded)
  {
    hasOpenedRef.current = true
  }

  return (
    <div
      className={`grid ${MOTION_CLASSES.emphasizedGridRows} ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
    >
      <div className="overflow-hidden">
        <div
          id={id}
          role="region"
          aria-label={label}
          aria-hidden={!expanded}
          inert={!expanded}
          className={expanded ? 'expand-content-enter' : undefined}
        >
          {hasOpenedRef.current ? children : null}
        </div>
      </div>
    </div>
  )
}

export const ProjectExpansionPanel = memo(ProjectExpansionPanelImpl)
