// src/sections/home/pages/HomePage.tsx
// home page route content

import { EducationHistory } from '~/sections/education/components/EducationHistory'
import { JobHistory } from '~/sections/experience/components/JobHistory'
import { FeaturedProjects } from '~/sections/featured-projects/components/FeaturedProjects'
import { About } from '~/sections/home/components/About'
import { DecorativeWave } from '~/sections/home/components/DecorativeWave'
import { GlowEffect } from '~/sections/home/components/GlowEffect'
import { Hero } from '~/sections/home/components/Hero'
import { SocialLinks } from '~/sections/home/components/SocialLinks'
import { PageShell } from '~/shared/components/layout/PageShell'

// home page route content w/ decorative effects
export function HomePage()
{
  return (
    <div className="relative min-h-screen overflow-hidden">
      <PageShell className="relative py-12 min-[2560px]:max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="space-y-6">
            <Hero />
            <About />
            <EducationHistory />
            <SocialLinks />
          </div>

          <div className="pt-2 lg:pt-11">
            <div className="space-y-3 min-[1728px]:space-y-4">
              <JobHistory />
            </div>
            <div className="mt-10 space-y-3 min-[1728px]:mt-12 min-[1728px]:space-y-4">
              <FeaturedProjects />
            </div>
          </div>
        </div>
      </PageShell>

      <GlowEffect />
      <DecorativeWave />
    </div>
  )
}
