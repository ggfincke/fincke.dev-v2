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

// props for skill pill
interface SkillPillProps
{
  technologyId: TechnologyId
  size?: 'xs' | 'sm' | 'md'
  className?: string
  showProjectsOnHover?: boolean
  getRelatedProjects?: (technologyId: TechnologyId) => Project[]
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
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)
  const tooltipId = useId()
  const technology = getTechnology(technologyId)
  const label = technology.label

  // manage tooltip visibility & related projects on hover
  useEffect(() =>
  {
    if (showProjectsOnHover && isHovered && getRelatedProjects)
    {
      const projects = getRelatedProjects(technologyId)
      setRelatedProjects(projects)

      hoverTimeoutRef.current = setTimeout(() =>
      {
        setShowTooltip(true)
      }, hoverDelay)
    }
    else
    {
      if (hoverTimeoutRef.current)
      {
        clearTimeout(hoverTimeoutRef.current)
        hoverTimeoutRef.current = null
      }
      setShowTooltip(false)
    }

    return () =>
    {
      if (hoverTimeoutRef.current)
      {
        clearTimeout(hoverTimeoutRef.current)
        hoverTimeoutRef.current = null
      }
    }
  }, [
    getRelatedProjects,
    hoverDelay,
    isHovered,
    showProjectsOnHover,
    technologyId,
  ])

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-2 py-1 md:px-3 md:py-1 text-xs sm:text-sm',
    md: 'px-3 py-1 text-sm',
  } as const

  const textColor = getTechnologyColor(technologyId)
  const bgColor = getTechnologyBackgroundColor(technologyId)

  const interactiveClasses = showProjectsOnHover
    ? `cursor-help ${isHovered ? 'underline decoration-dotted underline-offset-2 brightness-125' : ''} hover:underline hover:decoration-dotted hover:underline-offset-2 hover:brightness-125 ${FOCUS_RING_CLASSES}`
    : 'hover:brightness-125'

  const commonProps = {
    style: {
      color: textColor,
      backgroundColor: bgColor,
    },
    className: `rounded-full inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ${interactiveClasses} ${sizeClasses[size]} ${className}`,
    'aria-label': label,
    'aria-describedby': showTooltip ? tooltipId : undefined,
    onMouseEnter: () =>
    {
      if (showProjectsOnHover)
      {
        setIsHovered(true)
      }
    },
    onMouseLeave: () =>
    {
      setIsHovered(false)
    },
    onFocus: () =>
    {
      if (showProjectsOnHover)
      {
        setIsHovered(true)
      }
    },
    onBlur: () =>
    {
      setIsHovered(false)
    },
  }

  return (
    <>
      {showProjectsOnHover ? (
        <button
          type="button"
          ref={buttonRef}
          {...commonProps}
          className={`${commonProps.className} appearance-none border-0`}
        >
          {label}
        </button>
      ) : (
        <span ref={spanRef} {...commonProps}>
          {label}
        </span>
      )}
      {showProjectsOnHover && (
        <SkillTooltip
          id={tooltipId}
          projects={relatedProjects}
          isVisible={showTooltip}
          targetRef={buttonRef as RefObject<HTMLElement | null>}
        />
      )}
    </>
  )
}
