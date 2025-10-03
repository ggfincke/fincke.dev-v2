// src/shared/utils/classNames.ts
// common CSS class combinations for consistent styling

const baseButtonClasses =
  'inline-flex items-center gap-2 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]';

const buttonSizes = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2',
} as const;

const buttonColors = {
  secondary:
    'bg-[var(--card)] text-[var(--muted)] hover:bg-[var(--border)] hover:shadow-md',
  primary:
    'bg-[var(--accent)] !text-[var(--accent-contrast,var(--bg))] hover:bg-opacity-90 hover:shadow-md',
} as const;

// generate button class string based on size & variant
export function getButtonClasses(
  size: keyof typeof buttonSizes = 'md',
  variant: keyof typeof buttonColors = 'secondary'
): string {
  return `${baseButtonClasses} ${buttonSizes[size]} ${buttonColors[variant]}`;
}
