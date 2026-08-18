/* WCAG: check for reducing animation on OS */
export const isReducedAnimation: boolean = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
).matches;

/* ELEMENTS SELECTORS */
export const LOADER_LOGO_SELECTOR = '.loader-logo';
export const LOADER_PERCENT_SELECTOR = '.loader-percent';
export const PRELOADER_SELECTOR = '#preloader';
export const BG_WRAPPER_SELECTOR = '#bg-wrapper';
