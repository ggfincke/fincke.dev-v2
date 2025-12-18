// src/sections/featured-projects/components/FeaturedProjectImage.tsx

interface FeaturedProjectImageProps {
  imagePath: string;
  imageAlt?: string;
  title: string;
}

export function FeaturedProjectImage({
  imagePath,
  imageAlt,
  title,
}: FeaturedProjectImageProps) {
  return (
    <div className="relative z-10 flex-shrink-0 overflow-hidden rounded-md border border-[var(--border)] bg-[var(--card)]/60 shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:group-hover:-translate-y-[3px] lg:group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-0 bg-[radial-gradient(circle_at_18%_18%,rgba(128,203,196,0.35),transparent_48%),radial-gradient(circle_at_82%_0%,rgba(255,255,255,0.14),transparent_36%)] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 motion-reduce:transition-none" />
      <img
        src={imagePath}
        alt={imageAlt || title}
        className="relative z-[2] h-24 w-32 object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-4px] group-hover:scale-[1.08] motion-reduce:transform-none"
      />
    </div>
  );
}
