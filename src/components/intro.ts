import { animate } from 'motion';

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
const animateBackgroundLineScaling = async (
  preloaderElement: HTMLElement,
  logoElement: HTMLElement,
  percentElement: HTMLElement,
  backgroundWrapperElement: HTMLElement,
): Promise<void> => {
  // --- unload preload title & percent elements ---
  await animate(
    [logoElement, percentElement],
    { opacity: [1, 0], y: [0, -18] },
    { duration: 0.6, ease: [0.4, 0, 1, 1] },
  ).finished;

  // --- animate fade bg-line ---
  const fadePreloader = animate(
    preloaderElement,
    { opacity: [1, 0] },
    { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  ).finished;

  // --- bg-line full scaling animation [1. left-right, 2. top-bottom] ---
  const naturalHeight = backgroundWrapperElement.offsetHeight;
  const LINE_PX = 2;
  const thinScaleY = LINE_PX / naturalHeight;

  await animate(
    backgroundWrapperElement,
    { scaleX: [0.05, 1], scaleY: [thinScaleY, thinScaleY] },
    { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
  ).finished;

  await animate(
    backgroundWrapperElement,
    { scaleX: [1, 1], scaleY: [thinScaleY, 1] },
    { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  ).finished;

  await fadePreloader;
  preloaderElement.remove();
};

export { animateBackgroundLineScaling, animateCountPercentUp };
export default animatePreloaderText;
