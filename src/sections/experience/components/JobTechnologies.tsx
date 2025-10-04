// src/sections/experience/components/JobTechnologies.tsx

interface JobTechnologiesProps {
  technologies: string[];
}

export function JobTechnologies({ technologies }: JobTechnologiesProps) {
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <ul className="mt-2 flex flex-wrap">
      {technologies.map((tech, techIndex) => (
        <li key={techIndex} className="mr-1.5 mt-2">
          <div className="flex items-center rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium leading-5 text-[var(--accent)]">
            {tech}
          </div>
        </li>
      ))}
    </ul>
  );
}
