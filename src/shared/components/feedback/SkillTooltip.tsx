// src/shared/components/feedback/SkillTooltip.tsx
// interactive tooltip for skill pills w/ related projects

import { useLayoutEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { createPortal } from 'react-dom'

import { StatusCircle } from '~/shared/components/ui/StatusCircle'
import type { Project } from '~/shared/types'

// space between tooltip & target element
const TOOLTIP_SPACING = 6
// minimum gap from viewport edge
const VIEWPORT_PADDING = 8
const MAX_VISIBLE_PROJECTS = 6

interface SkillTooltipProps
{
  id: string
  projects: readonly Project[]
  isVisible: boolean
  targetRef: React.RefObject<HTMLElement | null>
  // the tooltip is hoverable, so the trigger needs to know when the pointer is on it
  onPointerEnter: (event: PointerEvent) => void
  onPointerLeave: (event: PointerEvent) => void
}

function clamp(value: number, min: number, max: number): number
{
  return Math.max(min, Math.min(value, max))
}

// skill tooltip w/ related projects list
export function SkillTooltip({
  id,
  projects,
  isVisible,
  targetRef,
  onPointerEnter,
  onPointerLeave,
}: SkillTooltipProps)
{
  const tooltipRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    arrowLeft: 0,
    isBelow: false,
    hasArrow: true,
    maxHeight: 0,
  })

  // position from target metrics before paint, then follow the target on
  // scroll (capture catches nested scrollers) & resize
  useLayoutEffect(() =>
  {
    const target = targetRef.current
    const tooltip = tooltipRef.current
    const body = bodyRef.current
    if (!isVisible || !target || !tooltip || !body)
    {
      return
    }

    const updatePosition = () =>
    {
      const targetRect = target.getBoundingClientRect()
      const tooltipRect = tooltip.getBoundingClientRect()

      // natural height, ignoring any max-height from the previous pass
      const height =
        body.scrollHeight + (tooltip.offsetHeight - tooltip.clientHeight)
      const maxHeight = window.innerHeight - 2 * VIEWPORT_PADDING
      const shownHeight = Math.min(height, maxHeight)
      const spaceAbove = targetRect.top - TOOLTIP_SPACING - VIEWPORT_PADDING
      const spaceBelow =
        window.innerHeight -
        targetRect.bottom -
        TOOLTIP_SPACING -
        VIEWPORT_PADDING
      const fitsBeside = height <= Math.max(spaceAbove, spaceBelow)
      const isBelow =
        height > spaceAbove && (height <= spaceBelow || spaceBelow > spaceAbove)

      // when neither side has room, slide over the target instead of off-screen
      const top = clamp(
        isBelow
          ? targetRect.bottom + TOOLTIP_SPACING
          : targetRect.top - TOOLTIP_SPACING - shownHeight,
        VIEWPORT_PADDING,
        window.innerHeight - VIEWPORT_PADDING - shownHeight
      )
      let left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2

      if (left < VIEWPORT_PADDING)
      {
        left = VIEWPORT_PADDING
      }

      if (left + tooltipRect.width > window.innerWidth - VIEWPORT_PADDING)
      {
        left = window.innerWidth - tooltipRect.width - VIEWPORT_PADDING
      }

      // arrow should point at target center
      const targetCenter = targetRect.left + targetRect.width / 2
      const arrowLeft = Math.max(
        8,
        Math.min(targetCenter - left, tooltipRect.width - 8)
      )

      setPosition({
        top,
        left,
        arrowLeft,
        isBelow,
        hasArrow: fitsBeside,
        maxHeight,
      })
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
    return () =>
    {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isVisible, projects, targetRef])

  if (!isVisible || projects.length === 0)
  {
    return null
  }

  // portal to body so transformed ancestors (stagger-animated rows) don't
  // become the containing block for fixed positioning or trap z-index
  return createPortal(
    <div
      ref={tooltipRef}
      id={id}
      role="tooltip"
      className="fixed z-50 max-w-sm rounded-lg border border-[var(--border)] bg-[var(--bg)] shadow-xl animate-fadeIn"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {/* scrolls only when the list is taller than the viewport itself */}
      <div
        ref={bodyRef}
        className="overflow-y-auto rounded-lg p-4"
        style={{ maxHeight: `${position.maxHeight}px` }}
      >
        <div className="text-sm font-medium text-[var(--muted)] mb-3">
          Related Projects ({projects.length})
        </div>
        <div className="space-y-2">
          {projects.slice(0, MAX_VISIBLE_PROJECTS).map((project) => (
            <div key={project.id} className="flex items-center gap-2">
              <StatusCircle status={project.status} size={18} />
              <span className="text-sm text-[var(--muted)] truncate">
                {project.title}
              </span>
            </div>
          ))}
          {projects.length > MAX_VISIBLE_PROJECTS && (
            <div className="text-sm text-[var(--muted)] italic">
              +{projects.length - MAX_VISIBLE_PROJECTS} more
            </div>
          )}
        </div>
      </div>
      {/* arrow flips to the top edge when the tooltip sits below the target */}
      {position.hasArrow && (
        <div
          className={`absolute w-2 h-2 bg-[var(--bg)] border-[var(--border)] rotate-45 ${position.isBelow ? 'border-t border-l' : 'border-b border-r'}`}
          style={{
            [position.isBelow ? 'top' : 'bottom']: '-5px',
            left: `${position.arrowLeft}px`,
            marginLeft: '-4px',
          }}
        />
      )}
    </div>,
    document.body
  )
}
