// src/shared/components/ui/StatusBadge.tsx
// project status badge w/ emoji & color-coded styling

import type { CSSProperties } from 'react';

import type { ProjectStatus } from '~/shared/types';
import { statusConfig } from '~/shared/utils/statusConfig';

interface StatusBadgeProps {
  status: ProjectStatus;
}

// status badge component
export function StatusBadge({ status }: StatusBadgeProps) {
  const statusDisplay = statusConfig[status];

  const style = {
    color: `var(${statusDisplay.colorVar})`,
    backgroundColor: `var(${statusDisplay.bgColorVar})`,
  } satisfies CSSProperties;

  return (
    <span
      className="inline-flex items-center whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium"
      style={style}
    >
      {statusDisplay.icon} {statusDisplay.label}
    </span>
  );
}
