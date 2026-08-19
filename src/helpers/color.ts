/**
 * @Function for parse HEX Channel
 */
const toHexChannel = (value: number): string =>
  Math.round(value * 255)
    .toString(16)
    .padStart(2, '0');

/**
 * @Function for converting HSL to HEX
 */
const hslToHex = (
  hue: number,
  saturation: number,
  lightness: number,
): string => {
  const s = saturation / 100;
  const l = lightness / 100;

  const k = (n: number): number => (n + hue / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number): number =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const [r, g, b] = [f(0), f(8), f(4)];

  return `#${toHexChannel(r)}${toHexChannel(g)}${toHexChannel(b)}`.toUpperCase();
};

/**
 * @Function for HEX to RGB
 */
export const hexToRgb = (hex: string): [number, number, number] => {
  const normalized: string = hex.replace('#', '');
  const r: number = parseInt(normalized.substring(0, 2), 16);
  const g: number = parseInt(normalized.substring(2, 4), 16);
  const b: number = parseInt(normalized.substring(4, 6), 16);
  return [r, g, b];
};

/**
 * @Function for RGB to HSL
 */
export const rgbToHsl = (
  r: number,
  g: number,
  b: number,
): [number, number, number] => {
  const rNorm: number = r / 255;
  const gNorm: number = g / 255;
  const bNorm: number = b / 255;

  const max: number = Math.max(rNorm, gNorm, bNorm);
  const min: number = Math.min(rNorm, gNorm, bNorm);
  const delta: number = max - min;

  let hue: number = 0;
  if (delta !== 0) {
    if (max === rNorm) {
      hue = ((gNorm - bNorm) / delta) % 6;
    } else if (max === gNorm) {
      hue = (bNorm - rNorm) / delta + 2;
    } else {
      hue = (rNorm - gNorm) / delta + 4;
    }
    hue = Math.round(hue * 60);
    if (hue < 0) hue += 360;
  }

  const lightness: number = (max + min) / 2;
  const saturation: number =
    delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  return [hue, Math.round(saturation * 100), Math.round(lightness * 100)];
};

/**
 * @Function for randomize HEX color
 */
const randomHex = (): string => {
  const hue: number = Math.floor(Math.random() * 360);
  const saturation: number = 60 + Math.random() * 30;
  const lightness: number = 42 + Math.random() * 26;

  return hslToHex(hue, saturation, lightness);
};

/**
 * @Function for formatting colors
 */
export const formatColorCodes = (hex: string): string => {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  return `RGB ${r}, ${g}, ${b}   HSL ${h}, ${s}%, ${l}%`;
};

export default randomHex;
