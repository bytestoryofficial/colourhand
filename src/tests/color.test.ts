import { describe, expect, it } from 'vitest';

import randomHex, {
  formatColorCodes,
  getContrastInk,
  hexToRgb,
  hslToHex,
  rgbToHsl,
} from '../helpers/color';

/**
 * @Test
 * Hext To RGB
 * -----------------------------------------------------------------
 */
describe('hexToRgb', () => {
  it('converts white to correctly', () => {
    expect(hexToRgb('#FFFFFF')).toEqual([255, 255, 255]);
  });

  it('coverts black correctly', () => {
    expect(hexToRgb('#000000')).toEqual([0, 0, 0]);
  });

  it('converts a mixed color correctly', () => {
    expect(hexToRgb('#FF5733')).toEqual([255, 87, 51]);
  });

  it('works without the # prefix too', () => {
    expect(hexToRgb('FFFFFF')).toEqual([255, 255, 255]);
  });
});

/**
 * @Test
 * HSL To HEX
 * -----------------------------------------------------------------
 */
describe('hslToHex', () => {
  it('converts pure red (hue 0, full saturation, mid lightness)', () => {
    expect(hslToHex(0, 100, 50)).toBe('#FF0000');
  });

  it('converts pure green (hue 120)', () => {
    expect(hslToHex(120, 100, 50)).toBe('#00FF00');
  });

  it('converts pure blue (hue 240)', () => {
    expect(hslToHex(240, 100, 50)).toBe('#0000FF');
  });

  it('converts black regardless of hue when lightness is 0', () => {
    expect(hslToHex(180, 50, 0)).toBe('#000000');
  });

  it('converts white regardless of hue when lightness is 100', () => {
    expect(hslToHex(180, 50, 100)).toBe('#FFFFFF');
  });
});

/**
 * @Test
 * RGB to HSL
 * -----------------------------------------------------------------
 */
describe('rgbToHsl', () => {
  it('converts pure red back to hue 0', () => {
    expect(rgbToHsl(255, 0, 0)).toEqual([0, 100, 50]);
  });

  it('converts pure white to zero saturation, full lightness', () => {
    expect(rgbToHsl(255, 255, 255)).toEqual([0, 0, 100]);
  });

  it('converts pure black to zero saturation, zero lightness', () => {
    expect(rgbToHsl(0, 0, 0)).toEqual([0, 0, 0]);
  });

  it('converts gray to zero saturation', () => {
    expect(rgbToHsl(128, 128, 128)).toEqual([0, 0, 50]);
  });
});

/**
 * @Test
 * Random HEX logic
 * -----------------------------------------------------------------
 */
describe('randomHext', () => {
  it('always return a valid 7-char hex string with #', () => {
    const result = randomHex();
    expect(result).toMatch(/^#[0-9A-F]{6}$/);
  });

  it('returns different colors across multiple calls', () => {
    const results = new Set(Array.from({ length: 20 }, () => randomHex()));
    expect(results.size).toBeGreaterThan(1);
  });
});

/**
 * @Test
 * Generate contract INK color logic
 * -----------------------------------------------------------------
 */
describe('getContrastInk', () => {
  it('returns black text for a light background', () => {
    expect(getContrastInk('#FFFFFF')).toBe('#000000');
  });

  it('returns white text for a dark background', () => {
    expect(getContrastInk('#000000')).toBe('#ffffff');
  });

  it('returns white text for a moderately dark color', () => {
    expect(getContrastInk('#212121')).toBe('#ffffff');
  });
});

/**
 * @Test
 * Format color codes to HTML <RGB> and <HSL>
 * -----------------------------------------------------------------
 */
describe('formatColorCodes', () => {
  it('formats pure red into the expected HTML string', () => {
    const result = formatColorCodes('#FF0000');
    const expectToBe =
      '<span>RGB 255, 0, 0</span>/<span>HSL 0, 100%, 50%</span>';
    expect(result).toBe(expectToBe);
  });
});
