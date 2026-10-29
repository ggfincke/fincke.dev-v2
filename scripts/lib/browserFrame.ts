// scripts/lib/browserFrame.ts
// fake chrome window header composited above screenshots so vh-based layout matches a real browser

// macos = menu bar + tabs + toolbar; desktop = tabs + toolbar (maximized window);
// tablet = ipados status bar + tabs + toolbar; phone = status bar + omnibox
export type BrowserFrameKind = 'macos' | 'desktop' | 'tablet' | 'phone'

// approximate chrome dark-theme heights in CSS pixels
const MENU_BAR_HEIGHT = 37
const TABLET_STATUS_BAR_HEIGHT = 24
const PHONE_STATUS_BAR_HEIGHT = 47
const TAB_STRIP_HEIGHT = 41
const TOOLBAR_HEIGHT = 46
const PHONE_OMNIBOX_HEIGHT = 56

const FRAME_HEIGHTS: Record<BrowserFrameKind, number> = {
  macos: MENU_BAR_HEIGHT + TAB_STRIP_HEIGHT + TOOLBAR_HEIGHT,
  desktop: TAB_STRIP_HEIGHT + TOOLBAR_HEIGHT,
  tablet: TABLET_STATUS_BAR_HEIGHT + TAB_STRIP_HEIGHT + TOOLBAR_HEIGHT,
  phone: PHONE_STATUS_BAR_HEIGHT + PHONE_OMNIBOX_HEIGHT,
}

export interface BrowserFrameInput
{
  kind: BrowserFrameKind
  width: number
  title: string
  url: string
  faviconUrl: string | null
  screenshotDataUri: string
}

export function getBrowserFrameHeight(kind: BrowserFrameKind): number
{
  return FRAME_HEIGHTS[kind]
}

function escapeHtml(value: string): string
{
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

// omnibox text drops the scheme like chrome does
function formatDisplayUrl(url: string): string
{
  const parsed = new URL(url)
  const path = parsed.pathname === '/' ? '' : parsed.pathname
  return `${parsed.host}${path}${parsed.search}`
}

function buildFavicon(faviconUrl: string | null): string
{
  return faviconUrl
    ? `<img class="favicon" src="${escapeHtml(faviconUrl)}" alt="" />`
    : '<span class="favicon placeholder"></span>'
}

function buildStatusBar(height: number): string
{
  return `<div class="status-bar" style="height:${height}px">
    <span>9:41</span><span class="status-icons">&#9679;&#9679;&#9679; 100%</span>
  </div>`
}

function buildDesktopHeader(input: BrowserFrameInput): string
{
  return `<div class="tab-strip">
    ${input.kind === 'macos' ? '<span class="lights"><i></i><i></i><i></i></span>' : ''}
    <div class="tab">
      ${buildFavicon(input.faviconUrl)}
      <span class="tab-title">${escapeHtml(input.title)}</span>
      <span class="tab-close">&#215;</span>
    </div>
    <span class="new-tab">+</span>
  </div>
  <div class="toolbar">
    <span class="nav">&#8592;</span><span class="nav">&#8594;</span><span class="nav">&#8635;</span>
    <div class="omnibox">${escapeHtml(formatDisplayUrl(input.url))}</div>
  </div>`
}

function buildPhoneHeader(input: BrowserFrameInput): string
{
  return `${buildStatusBar(PHONE_STATUS_BAR_HEIGHT)}
  <div class="phone-toolbar">
    <div class="omnibox">${escapeHtml(formatDisplayUrl(input.url))}</div>
  </div>`
}

function buildHeader(input: BrowserFrameInput): string
{
  switch (input.kind)
  {
    case 'macos':
      return `<div class="menu-bar"></div>${buildDesktopHeader(input)}`
    case 'desktop':
      return buildDesktopHeader(input)
    case 'tablet':
      return `${buildStatusBar(TABLET_STATUS_BAR_HEIGHT)}${buildDesktopHeader(input)}`
    case 'phone':
      return buildPhoneHeader(input)
  }
}

// full html doc: header stacked over the page screenshot at 1 css px per page px
export function buildBrowserFrameHtml(input: BrowserFrameInput): string
{
  return `<!doctype html>
<html>
<head>
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: ${input.width}px;
    background: #000;
    color: #e8eaed;
    font: 12px/1 ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
  }
  .menu-bar { height: ${MENU_BAR_HEIGHT}px; background: #000; }
  .status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    background: #202124;
    font-weight: 600;
    font-size: 14px;
  }
  .status-icons { font-size: 10px; letter-spacing: 1px; }
  .tab-strip {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    height: ${TAB_STRIP_HEIGHT}px;
    padding: 0 12px;
    background: #0e0e10;
  }
  .lights { display: flex; gap: 8px; align-self: center; margin-right: 12px; }
  .lights i { width: 12px; height: 12px; border-radius: 50%; background: #ff5f57; }
  .lights i:nth-child(2) { background: #febc2e; }
  .lights i:nth-child(3) { background: #28c840; }
  .tab {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 240px;
    height: 34px;
    padding: 0 12px;
    border-radius: 10px 10px 0 0;
    background: #202124;
  }
  .favicon { width: 16px; height: 16px; flex: none; }
  .favicon.placeholder { border-radius: 50%; background: #80cbc4; }
  .tab-title { flex: 1; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .tab-close, .new-tab { color: #9aa0a6; font-size: 16px; }
  .new-tab { align-self: center; }
  .toolbar {
    display: flex;
    align-items: center;
    gap: 14px;
    height: ${TOOLBAR_HEIGHT}px;
    padding: 0 14px;
    background: #202124;
    border-bottom: 1px solid #3c4043;
  }
  .nav { color: #9aa0a6; font-size: 16px; }
  .omnibox {
    flex: 1;
    display: flex;
    align-items: center;
    height: 34px;
    padding: 0 16px;
    border-radius: 17px;
    background: #303134;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
  }
  .phone-toolbar {
    display: flex;
    align-items: center;
    height: ${PHONE_OMNIBOX_HEIGHT}px;
    padding: 0 12px;
    background: #202124;
    border-bottom: 1px solid #3c4043;
  }
  .page { display: block; width: ${input.width}px; }
</style>
</head>
<body>
  ${buildHeader(input)}
  <img class="page" src="${input.screenshotDataUri}" alt="" />
</body>
</html>`
}
