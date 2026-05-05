// src/shared/components/ui/SkillPill.tsx
// skill badge w/ optional tooltip showing related projects

import { useEffect, useId, useRef, useState } from 'react'

import { getTechnologyDisplay, type TechnologyId } from '~/content/technologies'
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
  const triggerRef = useRef<HTMLButtonElement>(null)
  const tooltipId = useId()
  const { label, textColor, bgColor } = getTechnologyDisplay(technologyId)

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

  const interactiveClasses = hasTooltip
    ? `cursor-help ${isTriggerActive ? 'underline decoration-dotted underline-offset-2 brightness-125' : ''} hover:underline hover:decoration-dotted hover:underline-offset-2 hover:brightness-125 ${FOCUS_RING_CLASSES}`
    : 'hover:brightness-125'
  const pillStyle = { color: textColor, backgroundColor: bgColor }
  const pillClasses = `inline-flex items-center justify-center whitespace-nowrap rounded-full transition-[background-color,color,filter,text-decoration-color] duration-200 ${interactiveClasses} ${sizeClasses[size]} ${className}`

  if (!hasTooltip)
  {
    return (
      <span style={pillStyle} className={pillClasses} aria-label={label}>
        {label}
      </span>
    )
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        style={pillStyle}
        className={`appearance-none border-0 ${pillClasses}`}
        aria-label={label}
        aria-describedby={showTooltip ? tooltipId : undefined}
        onMouseEnter={() => setIsTriggerActive(true)}
        onMouseLeave={() => setIsTriggerActive(false)}
        onFocus={() => setIsTriggerActive(true)}
        onBlur={() => setIsTriggerActive(false)}
      >
        {label}
      </button>
      <SkillTooltip
        id={tooltipId}
        projects={relatedProjects}
        isVisible={showTooltip}
        targetRef={triggerRef}
      />
    </>
  )
}
