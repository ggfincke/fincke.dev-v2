// src/shared/components/ui/StatusCircle.tsx
// circular status indicator w/ emoji & background color

import type { CSSProperties } from 'react';

import type { ProjectStatus } from '~/shared/types';
import { statusConfig } from '~/shared/utils/statusConfig';

// props for status circle
interface StatusCircleProps {
  status: ProjectStatus;
  size?: number;
}

// circular status indicator w/ emoji
export function StatusCircle({ status, size = 32 }: StatusCircleProps) {
  const statusDisplay = statusConfig[status];

  const style: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    // emoji renders at half the circle diameter for visual balance
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
