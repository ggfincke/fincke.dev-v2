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
    <div className="relative z-10 flex-shrink-0 overflow-hidden rounded-md border border-[var(--border)]">
      <img
        src={imagePath}
        alt={imageAlt || title}
        className="h-24 w-32 object-cover transition group-hover:scale-105"
      />
    </div>
  );
}
