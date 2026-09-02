import { animate } from 'motion';
import handImageUrl from '../assets/hand.png';

import randomHex, { formatColorCodes, getContrastInk } from '../helpers/color';
import * as SELECTORS from '../helpers/constants';
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
 * @Enum Function
 * Get all selectors for generating color and return them all
 */
const useGenerateSelectors = () => {
  const hexSelector = document.querySelector<HTMLElement>(
    SELECTORS.HEX_SELECTOR,
  );
  const codesElement = document.querySelector<HTMLElement>(
    SELECTORS.CODES_SELECTOR,
  );
  const eyebrowElement = document.querySelector<HTMLElement>(
    SELECTORS.EYEBROW_SELECTOR,
  );
  const generateBtnSelector = document.querySelector<HTMLButtonElement>(
    SELECTORS.GENERATE_BTN_SELECTOR,
  );
  const copyButton = document.querySelector<HTMLButtonElement>(
    SELECTORS.COPY_BTN_SELECTOR,
  );
  const navLogoElement = document.querySelector<HTMLElement>(
    SELECTORS.LOGO_SELECTOR,
  );
  const navIconElement = document.querySelector<HTMLElement>(
    SELECTORS.NAV_GITHUB_SELECTOR,
  );
  const hintElement = document.querySelector<HTMLElement>(
    SELECTORS.HINT_SELECTOR,
  );

  return {
    hexValueElement: hexSelector,
    codesElement,
    eyebrowElement,
    generateButton: generateBtnSelector,
    copyButton,
    logo: navLogoElement,
    navIcon: navIconElement,
    hintElement,
  };
};

/**
 * @Function for generate random color
 */
const applyGeneratedColor = (): void => {
  const newColor: string = randomHex();
  const inkColor: string = getContrastInk(newColor);

  const {
    codesElement,
    hexValueElement,
    eyebrowElement,
    generateButton,
    copyButton,
    logo,
    navIcon,
    hintElement,
  } = useGenerateSelectors();

  if (
    codesElement &&
    hexValueElement &&
    eyebrowElement &&
    generateButton &&
    copyButton &&
    logo &&
    navIcon &&
    hintElement
  ) {
    codesElement.innerHTML = formatColorCodes(newColor);
    hexValueElement.textContent = newColor;

    hexValueElement.style.color = inkColor;
    codesElement.style.color = inkColor;
    eyebrowElement.style.color = inkColor;
    generateButton.style.color = inkColor;
    generateButton.style.borderColor = inkColor;
    copyButton.style.color = inkColor;
    copyButton.style.borderColor = inkColor;
    logo.style.color = inkColor;
    navIcon.style.color = inkColor;
    hintElement.style.color = inkColor;

    document.documentElement.style.setProperty('--clr-mask', newColor);
    document.documentElement.style.setProperty('--dot-ink', inkColor);
  }
};

/**
 * @Function for init color
 */
const applyInitColor = (): void => {
  const initialColor: string = getComputedStyle(document.documentElement)
    .getPropertyValue('--clr-mask')
    .trim();
  const inkColor: string = getContrastInk(initialColor);

  const {
    codesElement,
    hexValueElement,
    eyebrowElement,
    generateButton,
    copyButton,
    logo,
    navIcon,
    hintElement,
  } = useGenerateSelectors();

  if (
    codesElement &&
    hexValueElement &&
    eyebrowElement &&
    generateButton &&
    copyButton &&
    logo &&
    navIcon &&
    hintElement
  ) {
    hexValueElement.textContent = initialColor.toUpperCase();
    codesElement.innerHTML = formatColorCodes(initialColor);

    hexValueElement.style.color = inkColor;
    codesElement.style.color = inkColor;
    eyebrowElement.style.color = inkColor;
    generateButton.style.color = inkColor;
    generateButton.style.borderColor = inkColor;
    copyButton.style.color = inkColor;
    copyButton.style.borderColor = inkColor;
    logo.style.color = inkColor;
    navIcon.style.color = inkColor;
    hintElement.style.color = inkColor;

    document.documentElement.style.setProperty('--dot-ink', inkColor);
  }
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
