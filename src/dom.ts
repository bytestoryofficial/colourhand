import handImageUrl from './assets/hand.png';

const handElement = document.querySelector<HTMLDivElement>('.hand-img');
const handImage = document.querySelector<HTMLImageElement>('#hero-hand-image');

if (handImage && handElement) {
  handImage.src = handImageUrl;
  handElement.style.setProperty('--hand-mask', `url(${handImageUrl})`);
}
