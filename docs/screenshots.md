# Screenshot Workflow

This repo uses the built-in Playwright screenshot script in `scripts/screenshots.ts`. Treat that script as the only supported screenshot workflow unless you are intentionally replacing it.

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Run the screenshot sweep in another terminal:

   ```bash
   npm run screenshots
   ```

The script expects the dev server at `http://localhost:5173`.

## What It Captures

- Every public route from `scripts/lib/siteManifest.ts`
- Every viewport in the `VIEWPORTS` array inside `scripts/screenshots.ts`
- Full-page PNG screenshots after a built-in animation wait

Output is written to the repo-root `screenshots/` directory. That directory is gitignored and meant for manual review, not source control.

## Source of Truth

If you need to change screenshot behavior, update the script rather than this doc:

- Routes: `scripts/lib/siteManifest.ts`
- Viewports, wait timing, output naming: `scripts/screenshots.ts`

## Review Expectations

Use screenshot runs for manual regression review of:

- home page layout across mobile, tablet, desktop, and ultra-wide widths
- `/projects` archive layout in both card and table modes
- overflow, clipping, spacing, and animation regressions
- route-level chrome such as skip-link positioning and page-shell spacing

## Important Notes

- `npm run screenshots` is a manual review tool and is not part of `npm run ci:check`
- The screenshot script checks that the dev server is reachable before capturing
- For production-style audits, use `npm run build && npm run preview` plus `npm run lighthouse`
