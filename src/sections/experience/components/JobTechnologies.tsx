// src/sections/experience/components/JobTechnologies.tsx
// technology pills for job experience

import { TechPills } from '~/shared/components/ui/TechPills';

// props for job technologies list
interface JobTechnologiesProps {
  technologies: string[];
}

// technology pills for job experience
export function JobTechnologies({ technologies }: JobTechnologiesProps) {
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <TechPills
      technologies={technologies}
      size="sm"
      as="ul"
      className="mt-2 flex flex-wrap gap-2"
    />
  );
}
