/* WCAG: check for reducing animation on OS */
export const isReducedAnimation: boolean = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
).matches;

/* ELEMENTS SELECTORS */
export const LOADER_LOGO_SELECTOR = '.loader-logo';
export const LOADER_PERCENT_SELECTOR = '.loader-percent';
export const PRELOADER_SELECTOR = '#preloader';
export const BG_WRAPPER_SELECTOR = '#bg-wrapper';
export const NAV_LEFT_SELECTOR = '.nav-left';
export const NAV_RIGHT_SELECTOR = '.nav-right';
export const HAND_IMAGE_SELECTOR = '.hand-img';
export const PANEL_SELECTOR = '.panel';
export const GENERATE_BTN_SELECTOR = '#generate-btn';
export const HEX_SELECTOR = '#hex-value';
export const EYEBROW_SELECTOR = '#panel-eyebrow';
export const COPY_BTN_SELECTOR = '#copy-btn';
export const CODES_SELECTOR = '#color-codes';
export const DOTS_SELECTOR = '.bg-dots-base';
export const LOGO_SELECTOR = '#logo';
export const NAV_GITHUB_SELECTOR = '#nav-github';
export const HINT_SELECTOR = '#panel-hint';
export const GITHUB_LINK_SELECTOR = '#github-link';
