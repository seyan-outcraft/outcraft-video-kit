/**
 * Outcraft motion language.
 * One set of curves and durations for the whole video. This is what makes
 * every shot feel like the same brand.
 *
 * Durations are in frames at 30fps.
 */
import type { SpringConfig } from 'remotion';

export const dur = {
  snap: 6, // 0.20s — micro moves, small pops
  quick: 9, // 0.30s — text in, icon in
  base: 15, // 0.50s — the default move
  slow: 24, // 0.80s — hero reveals
  hold: 45, // 1.50s — how long a line stays readable
} as const;

/**
 * Cubic bezier curves for Easing.bezier(...).
 * Rule: things that ENTER decelerate. Things that LEAVE accelerate.
 */
export const ease = {
  /** Enter. Fast start, soft landing. The workhorse. */
  out: [0.16, 1, 0.3, 1] as const,
  /** Exit. Slow start, fast leave. */
  in: [0.7, 0, 0.84, 0] as const,
  /** Move something already on screen. */
  inOut: [0.65, 0, 0.35, 1] as const,
  /** Confident, mechanical. Good for logo and lockups. */
  swift: [0.22, 1, 0.36, 1] as const,
} as const;

/**
 * Springs. The Remotion default overshoots and wobbles — never use it on text.
 * These are damped on purpose.
 */
export const spring$ = {
  /** No bounce. Use for text and anything with an edge. */
  text: { damping: 200, mass: 0.6, stiffness: 120 } satisfies Partial<SpringConfig>,
  /** A trace of life. Use for logos, badges, cards. */
  soft: { damping: 26, mass: 0.8, stiffness: 140 } satisfies Partial<SpringConfig>,
  /** Visible pop. Use once per video, on the payoff. */
  pop: { damping: 14, mass: 0.7, stiffness: 180 } satisfies Partial<SpringConfig>,
} as const;

/** Frames between each item in a staggered group. Keep it tight. */
export const stagger = {
  char: 1.5,
  word: 3,
  line: 5,
} as const;

/** How far things travel. Small distances read as premium. */
export const travel = {
  sm: 24,
  md: 60,
  lg: 140,
} as const;
