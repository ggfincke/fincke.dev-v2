// src/shared/hooks/useTooltipTrigger.ts
// open/close state for a tooltip held by hover, keyboard focus, or a press

import { useEffect, useRef, useState } from 'react'
import type { FocusEvent, MouseEvent, PointerEvent, RefObject } from 'react'

// long enough for the pointer to cross the gap between trigger & tooltip
const POINTER_CLOSE_DELAY = 120

interface TooltipTriggerOptions
{
  enabled: boolean
  // ms a holder must stay before the tooltip shows
  showDelay: number
  triggerRef: RefObject<HTMLElement | null>
}

export interface TooltipTrigger
{
  // something is holding the tooltip, even if the show delay is still running
  isActive: boolean
  isOpen: boolean
  triggerProps: {
    onPointerEnter: (event: PointerEvent) => void
    onPointerLeave: (event: PointerEvent) => void
    onPointerDown: (event: PointerEvent) => void
    onFocus: (event: FocusEvent<HTMLElement>) => void
    onBlur: () => void
    onClick: (event: MouseEvent) => void
  }
  tooltipProps: {
    onPointerEnter: (event: PointerEvent) => void
    onPointerLeave: (event: PointerEvent) => void
  }
}

// * mouse hover (trigger or tooltip), keyboard focus & a press each hold it
// Escape, blur & an outside press release every holder; a mouse click never
// closes a hovered tooltip, while keyboard & touch presses toggle it
export function useTooltipTrigger({
  enabled,
  showDelay,
  triggerRef,
}: TooltipTriggerOptions): TooltipTrigger
{
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const lastPointerType = useRef('')
  const isActive = enabled && (isHovered || isFocused || isPinned)

  // restart the show delay once the last holder lets go
  if (!isActive && isReady)
  {
    setIsReady(false)
  }

  useEffect(() =>
  {
    if (!isActive)
    {
      return
    }

    const timeoutId = setTimeout(() => setIsReady(true), showDelay)
    return () => clearTimeout(timeoutId)
  }, [isActive, showDelay])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  // Escape dismisses w/o moving pointer or focus (WCAG 1.4.13); a press
  // outside releases a pin on touch browsers that never blur the trigger
  useEffect(() =>
  {
    if (!isActive)
    {
      return
    }

    function dismiss()
    {
      setIsHovered(false)
      setIsFocused(false)
      setIsPinned(false)
    }
    function handleKey(event: KeyboardEvent)
    {
      if (event.key === 'Escape')
      {
        dismiss()
      }
    }
    function handlePointerDown(event: globalThis.PointerEvent)
    {
      const target = event.target as Element | null
      if (
        !triggerRef.current?.contains(target) &&
        !target?.closest('[role="tooltip"]')
      )
      {
        dismiss()
      }
    }

    window.addEventListener('keydown', handleKey)
    document.addEventListener('pointerdown', handlePointerDown)
    return () =>
    {
      window.removeEventListener('keydown', handleKey)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isActive, triggerRef])

  // touch & pen emulate hover w/o a reliable leave, so only a mouse hovers
  const holdHover = (event: PointerEvent) =>
  {
    if (event.pointerType === 'mouse')
    {
      clearTimeout(closeTimer.current)
      setIsHovered(true)
    }
  }
  const releaseHover = (event: PointerEvent) =>
  {
    if (event.pointerType === 'mouse')
    {
      clearTimeout(closeTimer.current)
      closeTimer.current = setTimeout(
        () => setIsHovered(false),
        POINTER_CLOSE_DELAY
      )
    }
  }

  return {
    isActive,
    isOpen: isActive && isReady,
    triggerProps: {
      onPointerEnter: holdHover,
      onPointerLeave: releaseHover,
      onPointerDown: (event) =>
      {
        lastPointerType.current = event.pointerType
      },
      // mouse-click focus isn't focus-visible, so it never holds the tooltip
      onFocus: (event) =>
      {
        if (event.currentTarget.matches(':focus-visible'))
        {
          setIsFocused(true)
        }
      },
      onBlur: () =>
      {
        setIsFocused(false)
        setIsPinned(false)
      },
      onClick: (event) =>
      {
        // detail is 0 for a keyboard press
        if (event.detail > 0 && lastPointerType.current === 'mouse')
        {
          clearTimeout(closeTimer.current)
          setIsHovered(true)
          return
        }

        setIsFocused(false)
        setIsPinned(!isActive)
      },
    },
    tooltipProps: {
      onPointerEnter: holdHover,
      onPointerLeave: releaseHover,
    },
  }
}
