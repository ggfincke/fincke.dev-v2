// src/sections/featured-projects/components/FeaturedProjectImage.tsx
// featured project thumbnail w/ hover effects

// props for featured project image
interface FeaturedProjectImageProps {
  imagePath: string;
  imageAlt?: string;
  title: string;
}

// project thumbnail w/ hover effects
export function FeaturedProjectImage({
  imagePath,
  imageAlt,
  title,
}: FeaturedProjectImageProps) {
  return (
    <div className="relative z-10 flex h-32 w-40 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg)]/80 shadow-md transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:group-hover:-translate-y-0.5 lg:group-hover:shadow-lg">
      <img
        src={imagePath}
        alt={imageAlt || title}
        className="max-h-full max-w-full object-contain p-2 transition-[filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:brightness-110 motion-reduce:transition-none"
      />
    </div>
  );
}
