// src/sections/home/components/GlowEffect.tsx
// decorative radial glow effect

// glow effect component
export function GlowEffect() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[42vh] -z-10 h-72 w-[60rem] -translate-x-1/2 rounded-full"
      style={{
        background:
          'radial-gradient(circle at center, rgba(128,203,196,0.18), transparent 60%)',
      }}
      aria-hidden="true"
    />
  );
}
