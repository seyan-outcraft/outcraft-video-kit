/**
 * OUTCRAFT — THE ENGINE. Every sound in the film, in frame order.
 *
 * Ported unchanged from engine/src/EngineSound.tsx. Read it next to
 * engine/src/engine/beat.ts — the numbers are the same 120 BPM grid.
 *
 *   from   absolute frame in the film (30fps)
 *   src    path under assets/audio/sfx, without the .mp3
 *   volume the cue's own level, before MASTER
 *   frames how long to let it run. Longer files are cut here with a short fade.
 *   note   what it is under
 *   swell  ramp from 0.12 to full over this many frames. Risers only.
 *
 * THE VOCABULARY is the product-promo one — whoosh, impact, riser, sparkle,
 * transition — plus foley wherever the picture earns it. No synthesised UI
 * bleeps (DO-NOT-DO 50).
 *
 * EVERY CUT GETS TWO CUES, a movement and a weight. A whoosh on its own is
 * thin on a laptop speaker and a bass hit on its own has no direction.
 */
export const CUES = [
  // 1 - YOUR STACK. 0.0-3.0s. Ground: cream.
  { from: 0, src: 'transition/air-woosh-deep', volume: 0.3, frames: 40, note: 'the film opens' },
  { from: 0, src: 'transition/air-whoosh-powerful', volume: 0.34, frames: 34, note: 'fifteen tiles coming at the frame from every edge' },
  { from: 6, src: 'impact/hit-blow', volume: 0.22, frames: 18, note: 'the first tiles hitting the wall' },
  { from: 14, src: 'impact/hit-blow', volume: 0.2, frames: 18, note: 'the middle of the storm' },
  { from: 24, src: 'impact/hit-fast-exciting', volume: 0.26, frames: 22, note: 'the wall completing' },
  { from: 34, src: 'transition/sweep-short', volume: 0.18, frames: 18, note: 'ALL YOUR TOOLS. rises in' },
  { from: 48, src: 'light/light-sweep-magic', volume: 0.24, frames: 30, note: 'the purple wave crossing the wall on the diagonal' },
  { from: 78, src: 'transition/air-zoom-vacuum', volume: 0.4, frames: 26, note: 'cut 1 - the whole wall implodes into one point' },
  { from: 84, src: 'impact/bass-hit-futuristic', volume: 0.34, frames: 30, note: 'cut 1 - the point it collapses to' },

  // 2 - ONE SIGNAL. 3.0-8.0s. Ground: black.
  { from: 90, src: 'impact/bass-hit-short', volume: 0.32, frames: 26, note: 'the beacon lands where the wall vanished' },
  { from: 92, src: 'light/sparkle-touch', volume: 0.14, frames: 20, note: 'the beacon - a little light on it' },
  { from: 98, src: 'transition/sweep-fast-small', volume: 0.16, frames: 16, note: 'the first ring leaving the beacon' },
  { from: 98, src: 'text/typewriter-digital', volume: 0.24, frames: 26, note: 'ONE SIGNAL. - eleven characters flipping onto the baseline' },
  { from: 108, src: 'transition/sweep-fast-small', volume: 0.12, frames: 16, note: 'the second ring' },
  { from: 130, src: 'transition/sweep-short', volume: 0.16, frames: 18, note: 'the three signal chips arrive together' },
  { from: 200, src: 'transition/sweep-fast-small', volume: 0.13, frames: 16, note: 'the chips lift away after 1.7s of holding still' },
  { from: 225, src: 'transition/whoosh-big', volume: 0.38, frames: 30, note: 'cut 2 - the beacon growing until it is the frame' },
  { from: 225, src: 'impact/impact-cine-big', volume: 0.32, frames: 40, note: 'cut 2 - weight under the growth' },

  // 3 - SOMETHING PICKS IT UP. 8.0-12.0s. Ground: purple.
  { from: 244, src: 'transition/wind-swoosh-short', volume: 0.24, frames: 22, note: 'SOMETHING PICKS IT UP. burns in' },
  { from: 270, src: 'transition/sweep-short', volume: 0.18, frames: 18, note: 'AN AI SALES TEAM. takes the space under it' },
  { from: 272, src: 'light/sparkle', volume: 0.14, frames: 26, note: 'the answer - a little light on the reveal' },
  { from: 322, src: 'riser/riser-cine', volume: 0.26, frames: 30, swell: 24, note: 'tension under the one still shot in the first half' },
  { from: 345, src: 'mech/door-open-futuristic', volume: 0.38, frames: 32, note: 'cut 3 - the purple ground parts like a barn door' },
  { from: 345, src: 'impact/impact-transition', volume: 0.32, frames: 38, note: 'cut 3 - weight under the doors' },

  // 4 - VOICE. SMS. EMAIL. WHATSAPP. 12.0-16.0s. Ground: black.
  { from: 353, src: 'counter/clock-tick-single', volume: 0.28, frames: 12, note: 'VOICE.' },
  { from: 365, src: 'counter/clock-tick-single', volume: 0.28, frames: 12, note: 'SMS.' },
  { from: 377, src: 'counter/clock-tick-single', volume: 0.28, frames: 12, note: 'EMAIL.' },
  { from: 389, src: 'mech/gear-lock-metallic', volume: 0.28, frames: 24, note: 'WHATSAPP. - the fourth and last one' },
  { from: 413, src: 'light/light-sweep-magic', volume: 0.26, frames: 30, note: 'the purple pass checking each channel is live' },
  { from: 439, src: 'light/sparkle-poof-hit', volume: 0.24, frames: 26, note: 'all four lighting together' },
  { from: 439, src: 'impact/hit-fast-exciting', volume: 0.22, frames: 22, note: 'all four - weight under the light' },
  { from: 462, src: 'transition/sweep-metal-quick', volume: 0.4, frames: 28, note: 'cut 4 - five cream bars shred the frame' },
  { from: 462, src: 'impact/impact-transition', volume: 0.36, frames: 40, note: 'cut 4 - weight under the shred' },

  // 5 - IT DECIDES. 16.0-20.0s. Ground: cream.
  { from: 480, src: 'transition/sweep-short', volume: 0.16, frames: 18, note: 'the four channel chips arrive as the bars clear' },
  { from: 486, src: 'transition/wind-swoosh-short', volume: 0.22, frames: 20, note: 'IT READS THE REPLY.' },
  { from: 501, src: 'transition/swoosh-quick', volume: 0.2, frames: 18, note: 'PICKS THE CHANNEL. - one line later, 15 frames apart' },
  { from: 510, src: 'mech/gear-lock-metallic', volume: 0.26, frames: 22, note: 'the VOICE chip locks purple - the choice being made' },
  { from: 516, src: 'transition/swoosh-quick', volume: 0.2, frames: 18, note: 'PICKS THE NEXT MOVE.' },
  { from: 588, src: 'transition/warp-slide', volume: 0.36, frames: 26, note: 'cut 5 - the skewed indigo panel crosses from the right' },
  { from: 588, src: 'impact/impact-deep-whoosh', volume: 0.34, frames: 34, note: 'cut 5 - weight under the panel' },

  // 6 - IT DOESN'T STOP. 20.0-26.0s. Ground: deep indigo.
  { from: 600, src: 'transition/air-woosh-deep', volume: 0.26, frames: 26, note: 'landing on indigo' },
  { from: 614, src: 'riser/riser-cine', volume: 0.3, frames: 100, swell: 90, note: 'the cadence building all the way into BOOKED' },
  { from: 614, src: 'counter/clock-tick-single', volume: 0.26, frames: 12, note: 'CALL - NOW' },
  { from: 630, src: 'counter/clock-tick-single', volume: 0.26, frames: 12, note: 'EMAIL - 5 MIN' },
  { from: 646, src: 'counter/clock-tick-single', volume: 0.26, frames: 12, note: 'CALL - 6 HRS' },
  { from: 662, src: 'counter/clock-tick-single', volume: 0.26, frames: 12, note: 'SMS - 1 DAY' },
  { from: 678, src: 'counter/clock-tick-single', volume: 0.26, frames: 12, note: 'CALL - 2 DAYS' },
  { from: 708, src: 'impact/impact-movie-epic', volume: 0.44, frames: 48, note: 'BOOKED. - the white pill lands' },
  { from: 708, src: 'light/sparkle', volume: 0.16, frames: 40, note: 'BOOKED. - a little light on top' },
  { from: 765, src: 'transition/whoosh-fast', volume: 0.36, frames: 28, note: 'cut 6 - the rail rolls up and off the top' },
  { from: 765, src: 'impact/impact-transition', volume: 0.28, frames: 34, note: 'cut 6 - weight under the roll' },

  // 7 - 24/7. 26.0-28.9s. Ground: cream.
  { from: 782, src: 'impact/bass-hit-short', volume: 0.3, frames: 26, note: '24/7 struck onto the frame' },
  { from: 782, src: 'counter/clock-knob-spin', volume: 0.24, frames: 24, note: '24/7 - the four characters landing' },
  { from: 804, src: 'transition/sweep-short', volume: 0.16, frames: 18, note: 'IT NEVER CLOCKS OFF' },
  { from: 855, src: 'transition/air-woosh-quick', volume: 0.34, frames: 24, note: 'cut 7 - the black band irises open from the middle' },
  { from: 855, src: 'impact/bass-hit-futuristic', volume: 0.34, frames: 32, note: 'cut 7 - weight under the band' },

  // 8 - THEN IT WRITES BACK. 28.9-35.0s. Ground: light grey.
  { from: 866, src: 'transition/sweep-fast-small', volume: 0.2, frames: 18, note: '20+ NATIVE INTEGRATIONS' },
  { from: 872, src: 'transition/wind-swoosh-short', volume: 0.22, frames: 20, note: 'THEN IT WRITES BACK.' },
  { from: 880, src: 'transition/sweep-short', volume: 0.18, frames: 20, note: 'the six lockup tiles rising' },
  { from: 926, src: 'light/light-sweep-magic', volume: 0.26, frames: 62, note: 'the write pulse stepping through the six, 10 frames apart' },
  { from: 930, src: 'light/sparkle-touch', volume: 0.12, frames: 16, note: 'the first check' },
  { from: 950, src: 'light/sparkle-touch', volume: 0.12, frames: 16, note: 'the third check' },
  { from: 970, src: 'light/sparkle-touch', volume: 0.12, frames: 16, note: 'the fifth check' },
  { from: 986, src: 'light/sparkle', volume: 0.13, frames: 30, note: 'all six ticked at once - held for 1.7s' },
  { from: 1038, src: 'transition/air-whoosh-powerful', volume: 0.36, frames: 28, note: 'cut 8 - the wall pushes outward and clears' },
  { from: 1038, src: 'impact/impact-deep-whoosh', volume: 0.3, frames: 34, note: 'cut 8 - weight under the opening' },

  // 9 - $100,000+ RECOVERED. 35.0-40.0s. Ground: cream.
  { from: 1052, src: 'counter/clock-knob-spin', volume: 0.3, frames: 54, note: 'the money counting, echoing the storm at the top of the film' },
  { from: 1104, src: 'impact/bass-hit-short', volume: 0.34, frames: 30, note: '$100,000 lands' },
  { from: 1104, src: 'light/sparkle-poof-hit', volume: 0.2, frames: 26, note: 'the + stamps on after it' },
  { from: 1110, src: 'text/marker-pen-line', volume: 0.24, frames: 24, note: 'the black rule draws' },
  { from: 1116, src: 'transition/sweep-short', volume: 0.18, frames: 18, note: 'RECOVERED. EVERY MONTH.' },
  { from: 1142, src: 'light/sparkle-touch', volume: 0.12, frames: 22, note: 'the Pulsetto logo' },
  { from: 1185, src: 'transition/whoosh-big', volume: 0.38, frames: 28, note: 'cut 9 - the black shutter drops from the top' },
  { from: 1185, src: 'impact/impact-cine-big', volume: 0.32, frames: 38, note: 'cut 9 - weight under the shutter' },

  // 10 - 30x ROI. 40.0-43.0s. Ground: black.
  { from: 1200, src: 'impact/impact-epic-trailer', volume: 0.44, frames: 44, note: '30x thrown in from a scatter and stopping dead' },
  { from: 1200, src: 'light/sparkle', volume: 0.14, frames: 30, note: '30x - a little light on the payoff' },
  { from: 1224, src: 'transition/sweep-short', volume: 0.16, frames: 18, note: 'ROI' },
  { from: 1275, src: 'transition/whoosh-big', volume: 0.36, frames: 30, note: 'cut 10 - teal ink floods across on a slant' },
  { from: 1275, src: 'impact/impact-cine-big', volume: 0.3, frames: 40, note: 'cut 10 - weight under the flood' },

  // 11 - THE LOGO. 43.0-48.0s. Ground: dark teal.
  { from: 1291, src: 'light/light-sweep-magic', volume: 0.3, frames: 46, note: 'the logo wipes on behind its clip' },
  { from: 1319, src: 'light/sparkle-touch', volume: 0.16, frames: 24, note: 'outcraft.ai' },
  { from: 1343, src: 'impact/bass-hit-short', volume: 0.22, frames: 28, note: 'Book a demo' },
  { from: 1343, src: 'light/sparkle-poof-hit', volume: 0.14, frames: 22, note: 'Book a demo - a little light on the CTA' },
];
