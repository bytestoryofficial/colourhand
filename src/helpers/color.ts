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
 * @Function for randomize HEX color
 */
const randomHex = (): string => {
  const hue: number = Math.floor(Math.random() * 360);
  const saturation: number = 60 + Math.random() * 30;
  const lightness: number = 42 + Math.random() * 26;

  return hslToHex(hue, saturation, lightness);
};

export default randomHex;
