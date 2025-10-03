// src/App.tsx
// main application component w/ layout & decorative effects

import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { GlowEffect } from './components/GlowEffect';
import { DecorativeWave } from './components/DecorativeWave';

// main app component
function App()
{
  return (
    <div className="relative h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
      <Navigation />

      {/* main content section */}
      <header id="top" className="relative mx-auto max-w-6xl px-4">
        <div className="min-h-[calc(100svh-80px)] grid items-center gap-10 pt-24 pb-24 md:grid-cols-2">
          <Hero />
          <About />
        </div>
      </header>

      {/* decorative effects */}
      <GlowEffect />
      <DecorativeWave />

      <div className="h-40" />
    </div>
  );
}

export default App;
