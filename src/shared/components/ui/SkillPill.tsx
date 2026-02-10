// src/shared/components/ui/SkillPill.tsx
// skill badge w/ optional tooltip showing related projects

import { useEffect, useId, useRef, useState } from 'react';

import { SkillTooltip } from '~/shared/components/feedback/SkillTooltip';
import type { Project } from '~/shared/types';
import { getTechColor, getTechBgColor } from '~/shared/utils/techColors';

// default hover delay in ms
const DEFAULT_HOVER_DELAY = 150;

// props for skill pill
interface SkillPillProps {
  name: string;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  showProjectsOnHover?: boolean;
  getRelatedProjects?: (name: string) => Project[];
  hoverDelay?: number;
}

// skill badge w/ optional tooltip
export function SkillPill({
  name,
  size = 'sm',
  className = '',
  showProjectsOnHover = false,
  getRelatedProjects,
  hoverDelay = DEFAULT_HOVER_DELAY,
}: SkillPillProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const tooltipId = useId();

  // manage tooltip visibility & related projects on hover
  useEffect(() => {
    if (showProjectsOnHover && isHovered && getRelatedProjects) {
      const projects = getRelatedProjects(name);
      setRelatedProjects(projects);

      hoverTimeoutRef.current = setTimeout(() => {
        setShowTooltip(true);
      }, hoverDelay);
    } else {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setShowTooltip(false);
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };
  }, [isHovered, name, showProjectsOnHover, getRelatedProjects, hoverDelay]);

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-2 py-1 md:px-3 md:py-1 text-xs sm:text-sm',
    md: 'px-3 py-1 text-sm',
  } as const;

  const textColor = getTechColor(name);
  const bgColor = getTechBgColor(name);

  const interactiveClasses = showProjectsOnHover
    ? `cursor-help ${isHovered ? 'underline decoration-dotted underline-offset-2 brightness-125' : ''} hover:underline hover:decoration-dotted hover:underline-offset-2 hover:brightness-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]`
    : 'hover:brightness-125';

  return (
    <>
      <span
        ref={pillRef}
        style={{
          color: textColor,
          backgroundColor: bgColor,
        }}
        className={`rounded-full inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ${interactiveClasses} ${sizeClasses[size]} ${className}`}
        aria-label={name}
        aria-describedby={showTooltip ? tooltipId : undefined}
        tabIndex={showProjectsOnHover ? 0 : undefined}
        onMouseEnter={() => {
          if (showProjectsOnHover) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onFocus={() => {
          if (showProjectsOnHover) {
            setIsHovered(true);
          }
        }}
        onBlur={() => {
          setIsHovered(false);
        }}
      >
        {name}
      </span>
      {showProjectsOnHover && (
        <SkillTooltip
          id={tooltipId}
          projects={relatedProjects}
          isVisible={showTooltip}
          targetRef={pillRef}
        />
      )}
    </>
  );
}
