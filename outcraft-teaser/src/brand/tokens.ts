/**
 * Outcraft brand tokens — derived from outcraft-brand-book-v1.0.md
 * Sizes are for a 1920x1080 composition.
 */

export const color = {
  // Brand
  purple: '#6366F1',
  deepIndigo: '#232F8B',
  darkTeal: '#003F4E',
  coral: '#FE4E32',

  // Extended
  purpleHover: '#4F46E5',
  purplePress: '#4338CA',
  purpleSoft: '#818CF8',
  purpleSubdued: '#E7E7FD',
  tealDark2: '#012A34',
  tealMid: '#12857F',

  // Ink
  nearBlack: '#010101',
  inkSecondary: '#33353A',
  inkMuted: '#6A6F76',

  // Surfaces
  white: '#FFFFFF',
  cream: '#FAF8F1',
  lightGrey: '#F6F7F7',

  // Borders
  borderCool: '#E6E9EB',
  borderInput: '#CDD2D6',
} as const;

export const gradient = {
  brand: `linear-gradient(180deg, ${color.purple}, ${color.deepIndigo})`,
  teal: `linear-gradient(180deg, ${color.darkTeal}, ${color.tealDark2})`,
  spark: `linear-gradient(180deg, ${color.purple}, ${color.coral})`,
} as const;

/**
 * Type scale for 1920x1080.
 * The brand book web scale is multiplied by ~2.8 so text reads on a screen
 * that is watched, not read. Minimums come from the Remotion layout rules:
 * headline >= 150px, supporting text >= 78px at this width.
 */
export const type = {
  displayXL: 220,
  display: 160,
  displaySM: 120,
  heading: 88,
  body: 56,
  eyebrow: 40,
} as const;

export const tracking = {
  display: '-0.03em', // brand book: -2px at 56px
  heading: '-0.015em',
  body: '0em',
  eyebrow: '0.11em', // brand book: +1.6px at 14px, uppercase
} as const;

/** Safe area for 1920x1080. Nothing important goes outside this. */
export const safe = {
  x: 142,
  y: 178,
} as const;

export const grid = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;
