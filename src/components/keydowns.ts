import { applyGeneratedColor } from './dom';

/**
 * @Function
 * Generate color with SPACEBAR pressing
 */
const spacebarGenerateColor = () => {
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.code !== 'Space') return;

    // checking for typing context in fields
    const activeElement = document.activeElement;
    const isTypingContext =
      activeElement instanceof HTMLInputElement ||
      activeElement instanceof HTMLTextAreaElement;

    if (isTypingContext) return;

    event.preventDefault();
    applyGeneratedColor();
  });
};

export { spacebarGenerateColor };
