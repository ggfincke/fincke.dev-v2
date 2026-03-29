// src/sections/projects-archive/components/ProjectExpansionPanel.tsx
// shared expandable panel wrapper for project details

import type { ReactNode } from 'react'

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
export function ProjectExpansionPanel({
  expanded,
  id,
  label,
  children,
}: ProjectExpansionPanelProps)
{
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-300 ${MOTION_CLASSES.emphasizedOut} ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
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
          {children}
        </div>
      </div>
    </div>
  )
}
