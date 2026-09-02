import { animate, type MotionValue, motionValue } from 'motion';

import * as SELECTORS from '../helpers/constants';
import type { HTMLElementNull } from '../helpers/types';

/**
 * @Animation
 * Create parallax onMouse effect for hand image
 */
const animateParallaxHand = (): void => {
  const handImageElement: HTMLElementNull = document.querySelector(
    SELECTORS.HAND_IMAGE_SELECTOR,
  );
  const bgWrapperElement: HTMLElementNull = document.querySelector(
    SELECTORS.BG_WRAPPER_SELECTOR,
  );

  if (handImageElement && bgWrapperElement) {
    const PARALLAX_RANGE_PX = 26;

    bgWrapperElement.addEventListener('mousemove', (event: MouseEvent) => {
      const rect: DOMRect = bgWrapperElement.getBoundingClientRect();
      // add to cursor -1 on top and +1 on bottom
      const offsetYPX: number =
        ((event.clientY - rect.top) / rect.height) * 3 - 1;
      const targetHandYMove: number = -offsetYPX * PARALLAX_RANGE_PX;

      animate(
        handImageElement,
        { y: targetHandYMove },
        { type: 'spring', stiffness: 100, damping: 70 },
      );
    });

    bgWrapperElement.addEventListener('mouseleave', () => {
      animate(
        handImageElement,
        { y: 0 },
        { type: 'spring', stiffness: 100, damping: 70 },
      );
    });
  }
};

/**
 * @Animation
 * Create hover animation for github link
 */
const animateGithubHover = (): void => {
  const githubLinkElement = document.querySelector<HTMLElement>(
    SELECTORS.GITHUB_LINK_SELECTOR,
  );
  const githubSpanElement = document.querySelector<HTMLElement>(
    SELECTORS.NAV_GITHUB_SELECTOR,
  );

  if (!githubLinkElement || !githubSpanElement) return;

  const MAGNETIC_STRENGTH: number = 0.35;

  githubLinkElement.addEventListener('mouseenter', (event: MouseEvent) => {
    const rect: DOMRect = githubLinkElement.getBoundingClientRect();
    const centerX: number = rect.left + rect.width / 2;
    const centerY: number = rect.top + rect.height / 2;

    const offsetX: number = (event.clientX - centerX) * MAGNETIC_STRENGTH;
    const offsetY: number = (event.clientY - centerY) * MAGNETIC_STRENGTH;

    animate(
      githubSpanElement,
      { x: offsetX, y: offsetY, scale: 1.02 },
      { type: 'spring', stiffness: 200, damping: 15 },
    );
  });

  githubLinkElement.addEventListener('mouseleave', () => {
    animate(
      githubSpanElement,
      { x: 0, y: 0, scale: 1 },
      { type: 'spring', stiffness: 200, damping: 14 },
    );
  });
};

/**
 * @Animation
 * Create mousemove blick dots animation
 */
const animateDotsMousemove = (): void => {
  const bgWrapperElement: HTMLElementNull = document.querySelector(
    SELECTORS.BG_WRAPPER_SELECTOR,
  );

  if (bgWrapperElement) {
    const mx: MotionValue<number> = motionValue(50);
    const my: MotionValue<number> = motionValue(50);

    mx.on('change', (latest: number) => {
      bgWrapperElement.style.setProperty('--mx', `${latest}%`);
    });

    my.on('change', (latest: number) => {
      bgWrapperElement.style.setProperty('--my', `${latest}%`);
    });

    if (bgWrapperElement.matches(':hover')) {
      bgWrapperElement.classList.add('is-hovering');
    }

    bgWrapperElement.addEventListener('mouseenter', (event: MouseEvent) => {
      const rect: DOMRect = bgWrapperElement.getBoundingClientRect();
      const initialX: number = ((event.clientX - rect.left) / rect.width) * 100;
      const initialY: number = ((event.clientY - rect.top) / rect.height) * 100;

      mx.jump(initialX);
      my.jump(initialY);

      bgWrapperElement.classList.add('is-hovering');
    });

    bgWrapperElement.addEventListener('mouseleave', () => {
      bgWrapperElement.classList.remove('is-hovering');
    });

    bgWrapperElement.addEventListener('mousemove', (event: MouseEvent) => {
      const rect: DOMRect = bgWrapperElement.getBoundingClientRect();
      const targetX: number = ((event.clientX - rect.left) / rect.width) * 100;
      const targetY: number = ((event.clientY - rect.top) / rect.height) * 100;

      animate(mx, targetX, { type: 'spring', stiffness: 100, damping: 20 });
      animate(my, targetY, { type: 'spring', stiffness: 100, damping: 20 });
    });
  }
};

export { animateDotsMousemove, animateGithubHover, animateParallaxHand };
