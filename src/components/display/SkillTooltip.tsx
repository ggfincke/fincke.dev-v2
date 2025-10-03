// src/components/display/SkillTooltip.tsx
// interactive tooltip for skill pills w/ related projects

import { useEffect, useRef, useState } from 'react';

import { StatusCircle } from '~/components/display/StatusCircle';
import type { Project } from '~/types';

interface SkillTooltipProps
{
  projects: Project[];
  isVisible: boolean;
  targetRef: React.RefObject<HTMLElement | null>;
}

// skill tooltip component
export function SkillTooltip({ projects, isVisible, targetRef }: SkillTooltipProps)
{
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // calculate tooltip position based on target element
  useEffect(() =>
  {
    if (!isVisible || !targetRef.current || !tooltipRef.current)
    {
      return;
    }

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let top = targetRect.top - tooltipRect.height - 6;
    let left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;

    const padding = 8;

    if (top < padding)
    {
      top = targetRect.bottom + 6;
    }

    if (left < padding)
    {
      left = padding;
    }

    if (left + tooltipRect.width > window.innerWidth - padding)
    {
      left = window.innerWidth - tooltipRect.width - padding;
    }

    setPosition({ top, left });
  }, [isVisible, projects.length, targetRef]);

  if (!isVisible || projects.length === 0)
  {
    return null;
  }

  return (
    <div
      ref={tooltipRef}
      className="fixed z-50 bg-[var(--bg)] border border-[var(--border)] rounded-lg shadow-xl p-4 max-w-sm animate-fadeIn pointer-events-none"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <div className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
        Related Projects ({projects.length})
      </div>
      <div className="space-y-2">
        {projects.slice(0, 6).map((project) => (
          <div key={project.title} className="flex items-center gap-2">
            <StatusCircle status={project.status} size={18} />
            <span className="text-sm text-[var(--muted)] truncate">{project.title}</span>
          </div>
        ))}
        {projects.length > 6 && (
          <div className="text-sm text-[var(--color-text-secondary)] italic">
            +{projects.length - 6} more
          </div>
        )}
      </div>
      <div
        className="absolute w-2 h-2 bg-[var(--bg)] border-l border-b border-[var(--border)] rotate-45"
        style={{ bottom: '-5px', left: '50%', marginLeft: '-4px' }}
      />
    </div>
  );
}
