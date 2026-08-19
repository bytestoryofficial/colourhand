import { animate, stagger } from 'motion';

import { isReducedAnimation } from '../helpers/constants';

/*
 @Animation function for reveal Title and Percent in preloader wrapper
 */
const animatePreloaderText = (
  logoElement: HTMLElement,
  percentElement: HTMLElement,
): Promise<void> => {
  if (isReducedAnimation) {
    logoElement.style.opacity = '1';
    percentElement.style.opacity = '1';
    return Promise.resolve();
  }

  animate(
    logoElement,
    { opacity: [0, 1], y: [24, 0] },
    { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
  );

  return animate(
    percentElement,
    { opacity: [0, 1], y: [18, 0] },
    { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
  ).finished;
};

/*
 @Animation function for percent [0 -> 100%] counting on frames
 */
const animateCountPercentUp = (percentElement: HTMLElement): Promise<void> => {
  return new Promise((resolve) => {
    if (isReducedAnimation) {
      percentElement.textContent = '100%';
      resolve();
      return;
    }

    const duration: number = 1600;
    const start: number = performance.now();

    const percentTick = (now: number) => {
      const elapsed: number = now - start;
      const progress: number = elapsed / duration;
      const rawPercent = Math.round(progress * 100);
      const percent = Math.min(100, rawPercent);

      percentElement.textContent = `${percent}%`;

      if (elapsed < duration) requestAnimationFrame(percentTick);
      else resolve();
    };

    requestAnimationFrame(percentTick);
  });
};

/*
 @Animation function growing main wrapper from line to background 
 */
const animateIntroPage = async (
  preloaderElement: HTMLElement,
  logoElement: HTMLElement,
  percentElement: HTMLElement,
  backgroundWrapperElement: HTMLElement,
  navLeftElement: HTMLElement,
  navRightElement: HTMLElement,
  handElement: HTMLElement,
  handDecoded: Promise<void>,
  panelElement: HTMLElement,
): Promise<void> => {
  // --- unload preload title & percent elements ---
  await animate(
    [logoElement, percentElement],
    { opacity: [1, 0], y: [0, -18] },
    { duration: 0.5, ease: [0.4, 0, 1, 1] },
  ).finished;

  // --- animate fade bg-line ---
  const fadePreloader = animate(
    preloaderElement,
    { opacity: [1, 0] },
    { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  ).finished;

  // --- bg-line full scaling animation [phase 1. left-right, phase 2. top-bottom] ---
  const naturalHeight = backgroundWrapperElement.offsetHeight;
  const LINE_PX = 2;
  const thinScaleY = LINE_PX / naturalHeight;

  await handDecoded;

  // phase 1
  await animate(
    backgroundWrapperElement,
    { scaleX: [0.05, 1], scaleY: [thinScaleY, thinScaleY] },
    { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
  ).finished;

  // phase 2
  const PHASE_2_DURATION = 0.75;
  const NAV_DELAY_INTO_PHASE_2 = 0.85;
  const HAND_DELAY_INTO_PHASE_2 = 0.9;
  const PANEL_DELAY_INTO_PHASE_2 = 0.95;

  const scaleLine = animate(
    backgroundWrapperElement,
    { scaleX: [1, 1], scaleY: [thinScaleY, 1] },
    { duration: PHASE_2_DURATION, ease: [0.76, 0, 0.24, 1] },
  ).finished;

  // --- animate navigation ---
  const revealNavigation = animate(
    [navLeftElement, navRightElement],
    { y: [-16, 0], opacity: [0, 1] },
    {
      duration: 0.8,
      delay: stagger(0.08, { startDelay: NAV_DELAY_INTO_PHASE_2 }),
      ease: [0.25, 1, 0.36, 1],
    },
  ).finished;

  // --- animate hand ---
  const revealHand = animate(
    handElement,
    { opacity: [0, 1], x: [-60, 0] },
    {
      duration: 0.85,
      delay: HAND_DELAY_INTO_PHASE_2,
      ease: [0.22, 1, 0.36, 1],
    },
  ).finished;

  // -- animate panel --
  const panelRows = Array.from(panelElement.children) as HTMLElement[];

  if (isReducedAnimation) {
    panelRows.forEach((row) => {
      row.style.opacity = '1';
    });
    return Promise.resolve();
  }

  const panelFadeOut = animate(
    panelRows,
    { y: [16, 0], opacity: [0, 1] },
    {
      duration: 0.9,
      delay: stagger(0.08, { startDelay: PANEL_DELAY_INTO_PHASE_2 }),
      ease: [0.22, 1, 0.36, 1],
    },
  ).finished;

  await Promise.all([
    fadePreloader,
    scaleLine,
    revealHand,
    revealNavigation,
    panelFadeOut,
  ]);
  preloaderElement.remove();
};

export { animateCountPercentUp, animateIntroPage };
export default animatePreloaderText;
