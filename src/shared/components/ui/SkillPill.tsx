// src/shared/components/ui/SkillPill.tsx
// skill badge w/ optional tooltip showing related projects

import { type RefObject, useEffect, useId, useRef, useState } from 'react'

import {
  getTechnology,
  getTechnologyBackgroundColor,
  getTechnologyColor,
  type TechnologyId,
} from '~/content/technologies'
import { SkillTooltip } from '~/shared/components/feedback/SkillTooltip'
import type { Project } from '~/shared/types'
import { FOCUS_RING_CLASSES } from '~/shared/utils/classNames'

// default hover delay in ms
const DEFAULT_HOVER_DELAY = 150

const EMPTY_PROJECTS: readonly Project[] = []

// props for skill pill
interface SkillPillProps
{
  technologyId: TechnologyId
  size?: 'xs' | 'sm' | 'md'
  className?: string
  showProjectsOnHover?: boolean
  getRelatedProjects?: (technologyId: TechnologyId) => readonly Project[]
  hoverDelay?: number
}

// skill badge w/ optional tooltip
export function SkillPill({
  technologyId,
  size = 'sm',
  className = '',
  showProjectsOnHover = false,
  getRelatedProjects,
  hoverDelay = DEFAULT_HOVER_DELAY,
}: SkillPillProps)
{
  const [isTriggerActive, setIsTriggerActive] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const tooltipId = useId()
  const technology = getTechnology(technologyId)
  const label = technology.label

  const hasTooltip = showProjectsOnHover && Boolean(getRelatedProjects)
  const relatedProjects =
    hasTooltip && isTriggerActive && getRelatedProjects
      ? getRelatedProjects(technologyId)
      : EMPTY_PROJECTS

  // delay showing tooltip until hover sticks
  useEffect(() =>
  {
    if (!hasTooltip || !isTriggerActive)
    {
      setShowTooltip(false)
      return
    }

    const timeoutId = setTimeout(() =>
    {
      setShowTooltip(true)
    }, hoverDelay)

    return () =>
    {
      clearTimeout(timeoutId)
    }
  }, [hasTooltip, hoverDelay, isTriggerActive])

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-2 py-1 md:px-3 md:py-1 text-xs sm:text-sm',
    md: 'px-3 py-1 text-sm',
  } as const

  const textColor = getTechnologyColor(technologyId)
  const bgColor = getTechnologyBackgroundColor(technologyId)

  const interactiveClasses = hasTooltip
    ? `cursor-help ${isTriggerActive ? 'underline decoration-dotted underline-offset-2 brightness-125' : ''} hover:underline hover:decoration-dotted hover:underline-offset-2 hover:brightness-125 ${FOCUS_RING_CLASSES}`
    : 'hover:brightness-125'

  const commonProps = {
    style: {
      color: textColor,
      backgroundColor: bgColor,
    },
    className: `inline-flex items-center justify-center whitespace-nowrap rounded-full transition-[background-color,color,filter,text-decoration-color] duration-200 ${interactiveClasses} ${sizeClasses[size]} ${className}`,
    'aria-label': label,
    'aria-describedby': showTooltip ? tooltipId : undefined,
  }

  const activateTooltipTrigger = () =>
  {
    setIsTriggerActive(true)
  }

  const deactivateTooltipTrigger = () =>
  {
    setIsTriggerActive(false)
  }

  const tooltipTriggerProps = hasTooltip
    ? {
        tabIndex: 0,
        onMouseEnter: activateTooltipTrigger,
        onMouseLeave: deactivateTooltipTrigger,
        onFocus: activateTooltipTrigger,
        onBlur: deactivateTooltipTrigger,
      }
    : {}

  return (
    <>
      <span
        ref={hasTooltip ? triggerRef : undefined}
        {...commonProps}
        {...tooltipTriggerProps}
      >
        {label}
      </span>
      {hasTooltip && (
        <SkillTooltip
          id={tooltipId}
          projects={relatedProjects}
          isVisible={showTooltip}
          targetRef={triggerRef as RefObject<HTMLElement | null>}
        />
      )}
    </>
  )
}
