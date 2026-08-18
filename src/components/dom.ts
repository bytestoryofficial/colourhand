import handImageUrl from '../assets/hand.png';

import randomHex from '../helpers/color';

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
const applyGeneratedColor = (hexValueElement: HTMLElement): void => {
  const newColor = randomHex();
  document.documentElement.style.setProperty('--clr-mask', newColor);
  hexValueElement.textContent = newColor;
};

export { applyGeneratedColor, decodedImage };
