// src/sections/home/hooks/useViewportFit.ts
// shrinks the root font size so the two-column home page fits above the wave w/o scrolling

import { useLayoutEffect, type RefObject } from 'react'

import { BREAKPOINTS } from '~/shared/utils/breakpoints'

// below this the text gets too small to read, so very short windows scroll instead
const MIN_SCALE = 0.6
// layout is rem-based, so one pass is near exact; extra passes absorb rewrapping
const MAX_PASSES = 3

// * Fits the home page into the viewport on two-column layouts
// content & wave are sized in rem, so scaling the root font scales the whole
// page; stacked (single-column) layouts scroll normally & keep the default size
export function useViewportFit(
  contentRef: RefObject<HTMLElement | null>,
  waveRef: RefObject<HTMLElement | null>
): void
{
  useLayoutEffect(() =>
  {
    const root = document.documentElement
    const twoColumn = window.matchMedia(BREAKPOINTS.twoColumnQuery)
    let frame = 0

    const fit = () =>
    {
      root.style.fontSize = ''
      const content = contentRef.current
      const wave = waveRef.current
      if (!twoColumn.matches || !content || !wave) return

      let scale = 1
      for (let pass = 0; pass < MAX_PASSES; pass++)
      {
        // content must end where the wave starts
        const needed =
          content.getBoundingClientRect().bottom +
          window.scrollY +
          wave.getBoundingClientRect().height
        if (needed <= window.innerHeight || scale === MIN_SCALE) return

        scale = Math.max(MIN_SCALE, (scale * window.innerHeight) / needed)
        root.style.fontSize = `${scale * 100}%`
      }
    }

    // wait a frame so media-query driven re-renders land before measuring
    const scheduleFit = () =>
    {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(fit)
    }

    fit()
    window.addEventListener('resize', scheduleFit)
    void document.fonts.ready.then(scheduleFit)

    return () =>
    {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', scheduleFit)
      root.style.fontSize = ''
    }
  }, [contentRef, waveRef])
}
