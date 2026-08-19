import { animate } from 'motion';

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
        { type: 'spring', stiffness: 100, damping: 50 },
      );
    });

    bgWrapperElement.addEventListener('mouseleave', () => {
      animate(
        handImageElement,
        { y: 0 },
        { type: 'spring', stiffness: 100, damping: 50 },
      );
    });
  }
};

export { animateParallaxHand };
