import handImageUrl from '../assets/hand.png';

import randomHex, { formatColorCodes } from '../helpers/color';

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

export { applyGeneratedColor, applyInitColor, decodedImage };
