import '@fontsource-variable/fraunces/full-italic.css';
import '@fontsource/fira-sans';

import animatePreloaderText, {
  animateCountPercentUp,
} from './components/intro';
import './components/dom';

import * as SELECTORS from './constants/core';

import './style.css';

const init = async () => {
  const logoElement: HTMLElement | null = document.querySelector(
    SELECTORS.LOADER_LOGO_SELECTOR,
  );
  const percentElement: HTMLElement | null = document.querySelector(
    SELECTORS.LOADER_PERCENT_SELECTOR,
  );

  if (logoElement && percentElement) {
    await animatePreloaderText(logoElement, percentElement);
    await animateCountPercentUp(percentElement);
  }

  return null;
};

init();
