import { animate } from 'motion';

import { isReducedAnimation } from '../constants/core';

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
    { opacity: [0, 1], y: [30, 0] },
    { duration: 1, ease: [0.22, 1, 0.36, 1] },
  );

  return animate(
    percentElement,
    { opacity: [0, 1], y: [18, 0] },
    { duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
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

      percentElement.textContent = `${percent} %`;

      if (elapsed < duration) requestAnimationFrame(percentTick);
      else resolve();
    };

    requestAnimationFrame(percentTick);
  });
};

export { animateCountPercentUp };
export default animatePreloaderText;
