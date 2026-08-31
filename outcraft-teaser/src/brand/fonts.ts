/**
 * Brand faces. Bricolage Grotesque for display only. Inter for everything else.
 * Never set body copy in the display face.
 */
import { cancelRender, continueRender, delayRender } from 'remotion';
import { loadFont as loadBricolage } from '@remotion/google-fonts/BricolageGrotesque';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

const bricolage = loadBricolage('normal', {
  weights: ['700', '800'],
  subsets: ['latin'],
});

const inter = loadInter('normal', {
  weights: ['400', '600'],
  subsets: ['latin'],
});

export const fontFamily = {
  display: bricolage.fontFamily,
  body: inter.fontFamily,
} as const;

export const waitForFonts = () =>
  Promise.all([bricolage.waitUntilDone(), inter.waitUntilDone()]);

/**
 * Hold the render until both faces are actually on the page.
 *
 * Without this a still or a render can be drawn before the woff2 arrives and
 * the browser silently falls back to Helvetica — the type looks nothing like
 * the brand and nothing errors. Done once at module scope, so it costs one
 * delay for the whole film, not one per scene.
 */
const fontsReady = delayRender('Loading Bricolage Grotesque and Inter');
waitForFonts()
  .then(() => continueRender(fontsReady))
  .catch((err) => cancelRender(err));
