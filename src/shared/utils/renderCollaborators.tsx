// src/shared/utils/renderCollaborators.tsx
// shared renderer for collaborators w/ optional link support

import type { ReactNode } from 'react';

import type { Collaborator } from '~/shared/types';

export type CollaboratorsValue =
  | string
  | string[]
  | Collaborator
  | Collaborator[];

// render collaborators as text or links
export function renderCollaborators(value: CollaboratorsValue): ReactNode {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value) && value.every(entry => typeof entry === 'string')) {
    return (value as string[]).join(', ');
  }

  if (!Array.isArray(value) && typeof value === 'object') {
    const collab = value as Collaborator;
    return collab.url ? (
      <a
        href={collab.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-sm"
      >
        {collab.name}
      </a>
    ) : (
      collab.name
    );
  }

  if (Array.isArray(value) && value.every(entry => typeof entry === 'object')) {
    return (value as Collaborator[]).map((collab, index, arr) => (
      <span key={collab.name}>
        {collab.url ? (
          <a
            href={collab.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-sm"
          >
            {collab.name}
          </a>
        ) : (
          collab.name
        )}
        {index < arr.length - 1 ? ', ' : ''}
      </span>
    ));
  }

  return null;
}
