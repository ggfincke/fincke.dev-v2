// src/sections/experience/components/JobTechnologies.tsx
// technology pills for job experience

import { SkillPill } from '~/shared/components/ui/SkillPill';

interface JobTechnologiesProps {
  technologies: string[];
}

// job technologies component
export function JobTechnologies({ technologies }: JobTechnologiesProps) {
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <ul className="mt-2 flex flex-wrap gap-2">
      {technologies.map((tech, techIndex) => (
        <li key={techIndex}>
          <SkillPill name={tech} size="sm" />
        </li>
      ))}
    </ul>
  );
}
