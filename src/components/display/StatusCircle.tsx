// src/components/display/StatusCircle.tsx
// circular status indicator w/ emoji & background color

import type { CSSProperties } from 'react';

import type { ProjectStatus } from '~/types';
import { statusConfig } from '~/utils/statusConfig';

interface StatusCircleProps {
  status: ProjectStatus;
  size?: number;
}

// status circle component
export function StatusCircle({ status, size = 32 }: StatusCircleProps) {
  const statusDisplay = statusConfig[status];

  const style: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${Math.round(size * 0.5)}px`,
    backgroundColor: `var(${statusDisplay.colorVar})`,
    color: 'var(--bg)',
  };

  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-medium"
      style={style}
      aria-label={statusDisplay.label}
      title={statusDisplay.label}
    >
      {statusDisplay.icon}
    </span>
  );
}
