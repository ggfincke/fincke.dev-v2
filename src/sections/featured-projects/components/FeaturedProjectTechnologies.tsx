// src/sections/featured-projects/components/FeaturedProjectTechnologies.tsx

interface FeaturedProjectTechnologiesProps {
  technologies: string[];
}

export function FeaturedProjectTechnologies({
  technologies,
}: FeaturedProjectTechnologiesProps) {
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {technologies.slice(0, 4).map((tech, techIndex) => (
        <span
          key={techIndex}
          className="rounded-full bg-[var(--accent)]/10 px-2 py-1 text-xs text-[var(--accent)]"
        >
          {tech}
        </span>
      ))}
      {technologies.length > 4 && (
        <span className="rounded-full bg-[var(--accent)]/10 px-2 py-1 text-xs text-[var(--muted)]">
          +{technologies.length - 4} more
        </span>
      )}
    </div>
  );
}
