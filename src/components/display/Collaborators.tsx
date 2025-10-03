// src/components/display/Collaborators.tsx
// collaborators component wrapper

import {
  renderCollaborators,
  type CollaboratorsValue,
} from '~/utils/renderCollaborators';

// collaborators component wrapper
export function Collaborators({ value }: { value: CollaboratorsValue }) {
  return <>{renderCollaborators(value)}</>;
}
