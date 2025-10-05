// src/sections/featured-projects/components/FeaturedProjectTechnologies.tsx
// technology pills w/ overflow count

import { SkillPill } from '~/shared/components/ui/SkillPill';

interface FeaturedProjectTechnologiesProps {
  technologies: string[];
}

// featured project technologies component
export function FeaturedProjectTechnologies({
  technologies,
}: FeaturedProjectTechnologiesProps) {
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {technologies.slice(0, 4).map((tech, techIndex) => (
        <SkillPill key={techIndex} name={tech} size="sm" />
      ))}
      {technologies.length > 4 && (
        <span className="text-xs text-[var(--muted)]">
          +{technologies.length - 4} more
        </span>
      )}
    </div>
  );
}
