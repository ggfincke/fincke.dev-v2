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

For a lightweight route smoke pass, run:

```bash
npm run screenshots:smoke
```

Smoke mode captures a small representative viewport matrix and uses reduced
motion so CI can verify that each public route renders non-empty main content
without waiting for the full visual review sweep.

## What It Captures

- Every public route from `scripts/lib/siteManifest.ts`
- Every viewport in the `VIEWPORTS` array inside `scripts/screenshots.ts`
- Full-page PNG screenshots after a built-in animation wait

Output is written to the repo-root `screenshots/` directory. That directory is gitignored and meant for manual review, not source control.

Smoke output is written under `screenshots/smoke/`.

## Source of Truth

If you need to change screenshot behavior, update the script rather than this doc:

- Routes: `scripts/lib/siteManifest.ts`
- Viewports, wait timing, output naming: `scripts/screenshots.ts`
- Local server origin, output root, and Playwright launch flags:
  `scripts/lib/browserAudit.ts`

## Review Expectations

Use screenshot runs for manual regression review of:

- home page layout across mobile, tablet, desktop, and ultra-wide widths
- `/projects` archive layout in both card and table modes
- overflow, clipping, spacing, and animation regressions
- route-level chrome such as skip-link positioning and page-shell spacing

## Important Notes

- `npm run screenshots` is the full manual review tool and is not part of `npm run ci:check`
- CI runs `npm run screenshots:smoke` as part of the separate browser verification job
- The screenshot script polls until the local server is reachable before capturing
- For production-style route audits, use `npm run build && npm run preview` plus `npm run browser:check`
