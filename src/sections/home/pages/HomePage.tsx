// src/sections/home/pages/HomePage.tsx
// home page route content

import { useRef } from 'react'

import { EducationHistory } from '~/sections/education/components/EducationHistory'
import { JobHistory } from '~/sections/experience/components/JobHistory'
import { FeaturedProjects } from '~/sections/featured-projects/components/FeaturedProjects'
import { About } from '~/sections/home/components/About'
import { DecorativeWave } from '~/sections/home/components/DecorativeWave'
import { GlowEffect } from '~/sections/home/components/GlowEffect'
import { Hero } from '~/sections/home/components/Hero'
import { SocialLinks } from '~/sections/home/components/SocialLinks'
import { WritingList } from '~/sections/writing/components/WritingList'
import { useViewportFit } from '~/sections/home/hooks/useViewportFit'
import { PageShell } from '~/shared/components/layout/PageShell'

// home page route content w/ decorative effects
export function HomePage()
{
  const contentRef = useRef<HTMLDivElement>(null)
  const waveRef = useRef<HTMLDivElement>(null)
  useViewportFit(contentRef, waveRef)

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* short desktops center content in the space above the wave
          (10.75rem = WAVE_HEIGHT in DecorativeWave) */}
      <PageShell className="relative py-12 short-desktop:flex short-desktop:min-h-[calc(100vh-10.75rem)] short-desktop:flex-col short-desktop:justify-center short-desktop:py-5 min-[2560px]:max-w-[87.5rem]">
        <div
          ref={contentRef}
          className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20"
        >
          <div className="space-y-6 short-desktop:space-y-3">
            <Hero />
            <About />
            <EducationHistory />
            <WritingList />
            <SocialLinks />
          </div>

          <div className="pt-2 lg:pt-11 short-desktop:pt-0">
            <div className="space-y-3 min-[1728px]:space-y-4">
              <JobHistory />
            </div>
            <div className="mt-10 space-y-3 min-[1728px]:mt-12 min-[1728px]:space-y-4 short-desktop:mt-6">
              <FeaturedProjects />
            </div>
          </div>
        </div>
      </PageShell>

      <GlowEffect />
      <DecorativeWave ref={waveRef} />
    </div>
  )
}
