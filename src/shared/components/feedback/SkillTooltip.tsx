// src/shared/components/feedback/SkillTooltip.tsx
// interactive tooltip for skill pills w/ related projects

import { useEffect, useRef, useState } from 'react';

import { StatusCircle } from '~/shared/components/ui/StatusCircle';
import type { Project } from '~/shared/types';

// space between tooltip & target element
const TOOLTIP_SPACING = 6;
// minimum gap from viewport edge
const VIEWPORT_PADDING = 8;
const MAX_VISIBLE_PROJECTS = 6;

// props for skill tooltip
interface SkillTooltipProps {
  projects: Project[];
  isVisible: boolean;
  targetRef: React.RefObject<HTMLElement | null>;
}

// skill tooltip w/ related projects list
export function SkillTooltip({
  projects,
  isVisible,
  targetRef,
}: SkillTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // compute tooltip position w/ target metrics
  useEffect(() => {
    if (!isVisible || !targetRef.current || !tooltipRef.current) {
      return;
    }

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let top = targetRect.top - tooltipRect.height - TOOLTIP_SPACING;
    let left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;

    if (top < VIEWPORT_PADDING) {
      top = targetRect.bottom + TOOLTIP_SPACING;
    }

    if (left < VIEWPORT_PADDING) {
      left = VIEWPORT_PADDING;
    }

    if (left + tooltipRect.width > window.innerWidth - VIEWPORT_PADDING) {
      left = window.innerWidth - tooltipRect.width - VIEWPORT_PADDING;
    }

    setPosition({ top, left });
  }, [isVisible, projects.length, targetRef]);

  if (!isVisible || projects.length === 0) {
    return null;
  }

  return (
    <div
      ref={tooltipRef}
      className="fixed z-50 bg-[var(--bg)] border border-[var(--border)] rounded-lg shadow-xl p-4 max-w-sm animate-fadeIn pointer-events-none"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <div className="text-sm font-medium text-[var(--muted)] mb-3">
        Related Projects ({projects.length})
      </div>
      <div className="space-y-2">
        {projects.slice(0, MAX_VISIBLE_PROJECTS).map(project => (
          <div key={project.title} className="flex items-center gap-2">
            <StatusCircle status={project.status} size={18} />
            <span className="text-sm text-[var(--muted)] truncate">
              {project.title}
            </span>
          </div>
        ))}
        {projects.length > MAX_VISIBLE_PROJECTS && (
          <div className="text-sm text-[var(--muted)] italic">
            +{projects.length - MAX_VISIBLE_PROJECTS} more
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
