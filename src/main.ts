import '@fontsource-variable/fraunces/full-italic.css';
import '@fontsource/fira-sans';

import animatePreloaderText, {
  animateCountPercentUp,
  animateIntroPage,
} from './components/intro';
import './components/dom';

import * as SELECTORS from './helpers/constants';
import type { HTMLElementNull } from './helpers/types';

import './style.css';
import { applyGeneratedColor, decodedImage } from './components/dom';

const init = async () => {
  // ------------- HTML SELECTORS FOR ANIMATION -------------
  const logoElement: HTMLElementNull = document.querySelector(
    SELECTORS.LOADER_LOGO_SELECTOR,
  );
  const percentElement: HTMLElementNull = document.querySelector(
    SELECTORS.LOADER_PERCENT_SELECTOR,
  );
  const preloaderElement: HTMLElementNull = document.querySelector(
    SELECTORS.PRELOADER_SELECTOR,
  );
  const bgWrapperElement: HTMLElementNull = document.querySelector(
    SELECTORS.BG_WRAPPER_SELECTOR,
  );
  const navLeftElement: HTMLElementNull = document.querySelector(
    SELECTORS.NAV_LEFT_SELECTOR,
  );
  const navRightElement: HTMLElementNull = document.querySelector(
    SELECTORS.NAV_RIGHT_SELECTOR,
  );
  const handImageElement: HTMLElementNull = document.querySelector(
    SELECTORS.HAND_IMAGE_SELECTOR,
  );
  const panelElement: HTMLElementNull = document.querySelector(
    SELECTORS.PANEL_SELECTOR,
  );

  // ------------- HTML SELECTORS FOR WORK -------------
  const generateBtnSelector = document.querySelector<HTMLButtonElement>(
    SELECTORS.GENERATE_BTN_SELECTOR,
  );
  const hexSelector = document.querySelector<HTMLElement>(
    SELECTORS.HEX_SELECTOR,
  );

  if (
    logoElement &&
    percentElement &&
    preloaderElement &&
    bgWrapperElement &&
    navLeftElement &&
    navRightElement &&
    handImageElement &&
    panelElement
  ) {
    await animatePreloaderText(logoElement, percentElement);
    await animateCountPercentUp(percentElement);
    await animateIntroPage(
      preloaderElement,
      logoElement,
      percentElement,
      bgWrapperElement,
      navLeftElement,
      navRightElement,
      handImageElement,
      decodedImage,
      panelElement,
    );
  }

  if (generateBtnSelector && hexSelector) {
    generateBtnSelector.addEventListener('click', () => {
      applyGeneratedColor(hexSelector);
    });
  }

  return Promise.resolve();
};

init();
