// src/components/display/SkillPill.tsx
// skill badge w/ optional tooltip showing related projects

import { useEffect, useRef, useState } from 'react';

import { SkillTooltip } from '~/components/display/SkillTooltip';
import { getProjectsBySkill } from '~/data/projectFilters';
import type { Project } from '~/types';

const DEFAULT_HOVER_DELAY = 150; // milliseconds

interface SkillPillProps {
  name: string;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  showProjectsOnHover?: boolean;
  hoverDelay?: number;
}

// skill pill component
export function SkillPill({
  name,
  size = 'sm',
  className = '',
  showProjectsOnHover = false,
  hoverDelay = DEFAULT_HOVER_DELAY,
}: SkillPillProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  // manage tooltip visibility & related projects on hover
  useEffect(() => {
    if (showProjectsOnHover && isHovered) {
      const projects = getProjectsBySkill(name);
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
  }, [isHovered, name, showProjectsOnHover, hoverDelay]);

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-2 py-1 md:px-3 md:py-1 text-xs sm:text-sm',
    md: 'px-3 py-1 text-sm',
  } as const;

  return (
    <>
      <span
        ref={pillRef}
        className={`bg-[var(--card)] text-[var(--muted)] rounded-full inline-flex items-center justify-center whitespace-nowrap hover:bg-[var(--border)] transition-colors duration-200 ${showProjectsOnHover ? 'cursor-help hover:underline decoration-dotted underline-offset-2' : ''} ${sizeClasses[size]} ${className}`}
        onMouseEnter={() => {
          if (showProjectsOnHover) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        {name}
      </span>
      {showProjectsOnHover && (
        <SkillTooltip
          projects={relatedProjects}
          isVisible={showTooltip}
          targetRef={pillRef}
        />
      )}
    </>
  );
}
