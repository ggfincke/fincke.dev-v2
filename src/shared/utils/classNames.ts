// src/shared/utils/classNames.ts
// common CSS class combinations for consistent styling

// merge class fragments, dropping falsy values; collapses extra whitespace
export function cn(...parts: Array<string | false | null | undefined>): string
{
  return parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim()
}

export const FOCUS_RING_CLASSES =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]'

export const SKIP_LINK_CLASSES =
  'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--bg)] focus:font-medium'

export const ACTION_LINK_CLASSES = `inline-flex items-center gap-2 rounded-sm text-sm text-[var(--red)] transition hover:text-[var(--white)] ${FOCUS_RING_CLASSES}`

export const ICON_LINK_CLASSES = `rounded-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)] ${FOCUS_RING_CLASSES}`

export const FULL_SCREEN_MESSAGE_ACTION_CLASSES = `mt-8 inline-flex items-center gap-2 rounded-lg border border-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)] ${FOCUS_RING_CLASSES}`

const baseButtonClasses = `inline-flex items-center gap-2 rounded-lg transition-[background-color,color,box-shadow] duration-200 ${FOCUS_RING_CLASSES}`

const buttonSizes = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2',
} as const

const buttonColors = {
  secondary:
    'bg-[var(--card)] text-[var(--muted)] hover:bg-[var(--border)] hover:shadow-md',
  primary:
    'bg-[var(--accent)] !text-[var(--accent-contrast,var(--bg))] hover:bg-opacity-90 hover:shadow-md',
} as const

// hover backdrop for interactive cards (job, education, featured project)
export const CARD_HOVER_BACKDROP =
  'absolute -inset-x-3 -inset-y-1.5 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-4 lg:-inset-y-2 lg:block lg:group-hover:bg-[var(--card)]/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(128,203,196,0.1)] lg:group-hover:drop-shadow-lg'

// generate button class string based on size & variant
export function getButtonClasses(
  size: keyof typeof buttonSizes = 'md',
  variant: keyof typeof buttonColors = 'secondary'
): string
{
  return `${baseButtonClasses} ${buttonSizes[size]} ${buttonColors[variant]}`
}
