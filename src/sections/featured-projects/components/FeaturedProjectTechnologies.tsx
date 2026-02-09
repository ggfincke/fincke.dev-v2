// src/sections/featured-projects/components/FeaturedProjectTechnologies.tsx
// technology pills w/ overflow count

import { TechPills } from '~/shared/components/ui/TechPills';

// props for featured project technologies
interface FeaturedProjectTechnologiesProps {
  technologies: string[];
}

// technology pills w/ overflow count
export function FeaturedProjectTechnologies({
  technologies,
}: FeaturedProjectTechnologiesProps) {
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <TechPills
      technologies={technologies}
      maxVisible={4}
      size="sm"
      className="mt-2 flex flex-wrap gap-2 xl:flex-nowrap"
    />
  );
}
