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

    bgWrapperElement.addEventListener('mouseenter', () => {
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

export { animateDotsMousemove, animateParallaxHand };
