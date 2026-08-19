import '@fontsource-variable/fraunces/full-italic.css';
import '@fontsource/fira-sans';

import { animateParallaxHand } from './components/effects';
import animatePreloaderText, {
  animateCountPercentUp,
  animateIntroPage,
} from './components/intro';
import './components/dom';
import {
  applyGeneratedColor,
  applyInitColor,
  copyToClipboard,
  decodedImage,
} from './components/dom';

import * as SELECTORS from './helpers/constants';
import type { HTMLElementNull } from './helpers/types';

import './style.css';

const init = async () => {
  // ------------- HTML SELECTORS FOR WORK -------------
  const generateBtnSelector = document.querySelector<HTMLButtonElement>(
    SELECTORS.GENERATE_BTN_SELECTOR,
  );
  const hexSelector = document.querySelector<HTMLElement>(
    SELECTORS.HEX_SELECTOR,
  );
  const codesElement = document.querySelector<HTMLElement>(
    SELECTORS.CODES_SELECTOR,
  );
  const copyButton = document.querySelector<HTMLButtonElement>(
    SELECTORS.COPY_BTN_SELECTOR,
  );

  /* Apply start color for HEX and background */
  if (hexSelector && codesElement) applyInitColor(hexSelector, codesElement);

  /* Generate colors onClick */
  if (generateBtnSelector && hexSelector && codesElement) {
    generateBtnSelector.addEventListener('click', () => {
      applyGeneratedColor(hexSelector, codesElement);
    });
  }

  /* Copy btn onClick */
  if (copyButton && hexSelector) {
    copyButton.addEventListener('click', () => {
      const hex = hexSelector.textContent;
      void copyToClipboard(hex, copyButton);
    });
  }

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

  animateParallaxHand();

  return Promise.resolve();
};

init();
