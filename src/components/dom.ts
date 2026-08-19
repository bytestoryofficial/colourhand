import { animate } from 'motion';
import handImageUrl from '../assets/hand.png';

import randomHex, { formatColorCodes } from '../helpers/color';
import type { Timout } from '../helpers/types';

const handElement = document.querySelector<HTMLDivElement>('.hand-img');
const handImage = document.querySelector<HTMLImageElement>('#hero-hand-image');

let decodedImage: Promise<void> = Promise.resolve();

if (handImage && handElement) {
  handImage.src = handImageUrl;
  handElement.style.setProperty('--hand-mask', `url(${handImageUrl})`);

  decodedImage = handImage.decode().catch((error) => {
    console.log('Image Decoded Error: ', error);
  });
}

/**
 * @Function for generate random color
 */
const applyGeneratedColor = (
  hexValueElement: HTMLElement,
  codesElement: HTMLElement,
): void => {
  const newColor: string = randomHex();
  document.documentElement.style.setProperty('--clr-mask', newColor);
  hexValueElement.textContent = newColor;
  codesElement.innerHTML = formatColorCodes(newColor);
};

/**
 * @Function for init color
 */
const applyInitColor = (
  hexValueElement: HTMLElement,
  codesElement: HTMLElement,
): void => {
  const initialColor: string = getComputedStyle(document.documentElement)
    .getPropertyValue('--clr-mask')
    .trim();

  hexValueElement.textContent = initialColor.toUpperCase();
  codesElement.innerHTML = formatColorCodes(initialColor);
};

/**
 * @Function:
 * Create animation for copied! state
 */
const animateCopied = (buttonElement: HTMLButtonElement): void => {
  const checkIcon = buttonElement.querySelector<HTMLElement>(
    '[data-icon="check"]',
  );

  let resetTimeout: Timout | undefined;

  buttonElement.classList.add('is-copied');

  if (checkIcon)
    animate(
      checkIcon,
      { scale: [0.4, 1.15, 1] },
      { type: 'spring', stiffness: 500, damping: 15 },
    ).finished;

  clearTimeout(resetTimeout);
  resetTimeout = setTimeout(() => {
    buttonElement.classList.remove('is-copied');
  }, 1600);
};

/**
 * @Function:
 * Copy HEX color to the clipboard with onClick method
 * Checking for NotAllowedError (allowed only for HTTPS and localhost)
 */
const copyToClipboard = async (
  text: string,
  buttonElement: HTMLButtonElement,
): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    animateCopied(buttonElement);
  } catch (error: unknown) {
    console.log('Error with copyToClipboard: ', error);
  }
};

export {
  animateCopied,
  applyGeneratedColor,
  applyInitColor,
  copyToClipboard,
  decodedImage,
};
