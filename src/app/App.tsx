// src/app/App.tsx
// main application component w/ layout & decorative effects

import { Hero } from '~/sections/home/components/Hero';
import { About } from '~/sections/home/components/About';
import { SocialLinks } from '~/sections/home/components/SocialLinks';
import { JobHistory } from '~/sections/experience/components/JobHistory';
import { FeaturedProjects } from '~/sections/featured-projects/components/FeaturedProjects';
import { GlowEffect } from '~/sections/home/components/GlowEffect';
import { DecorativeWave } from '~/sections/home/components/DecorativeWave';

// main app component
function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--muted)]">
      {/* main content section */}
      <main id="top" className="relative mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* left column: hero + about + social */}
          <div className="space-y-8">
            <Hero />
            <About />
            <SocialLinks />
          </div>

          {/* right column: job history + featured projects */}
          <div className="space-y-12 pt-11">
            <JobHistory />
            <FeaturedProjects />
          </div>
        </div>
      </main>

      {/* decorative effects */}
      <GlowEffect />
      <DecorativeWave />
    </div>
  );
}

export default App;
