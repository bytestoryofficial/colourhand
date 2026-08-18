import '@fontsource-variable/fraunces/full-italic.css';
import '@fontsource/fira-sans';

import animatePreloaderText, {
  animateBackgroundLineScaling,
  animateCountPercentUp,
} from './components/intro';
import './components/dom';

import * as SELECTORS from './helpers/constants';

import './style.css';

const init = async () => {
  const logoElement: HTMLElement | null = document.querySelector(
    SELECTORS.LOADER_LOGO_SELECTOR,
  );
  const percentElement: HTMLElement | null = document.querySelector(
    SELECTORS.LOADER_PERCENT_SELECTOR,
  );
  const preloaderElement: HTMLElement | null = document.querySelector(
    SELECTORS.PRELOADER_SELECTOR,
  );
  const bgWrapperElement: HTMLElement | null = document.querySelector(
    SELECTORS.BG_WRAPPER_SELECTOR,
  );

  if (logoElement && percentElement && preloaderElement && bgWrapperElement) {
    await animatePreloaderText(logoElement, percentElement);
    await animateCountPercentUp(percentElement);
    await animateBackgroundLineScaling(
      preloaderElement,
      logoElement,
      percentElement,
      bgWrapperElement,
    );
  }

  return Promise.resolve();
};

init();
