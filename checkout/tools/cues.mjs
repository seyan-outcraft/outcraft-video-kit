/**
 * OUTCRAFT — THE UNASKED QUESTION. Every sound in the film, in frame order.
 *
 * Read this next to STORYBOARD.md — the numbers are the same 120 BPM grid.
 * A beat is 15 frames. A bar is 60 frames. The film is 1440 frames.
 *
 *   from    absolute frame in the film (30fps)
 *   src     path under assets/audio/sfx, without the .mp3
 *   volume  the cue's own level, before MASTER
 *   frames  how long to let it run. Longer files are cut here with a short fade.
 *   note    what it is under
 *   swell   ramp from 0.12 to full over this many frames. Risers only.
 *
 * THE VOCABULARY is the product-promo one — whoosh, impact, riser, sparkle,
 * transition — plus foley wherever the picture earns it. No synthesised UI
 * bleeps: a synth pluck makes a brand film sound like a mobile game
 * (DO-NOT-DO 50).
 *
 * EVERY CUT GETS TWO CUES, a movement and a weight. A whoosh on its own is thin
 * on a laptop speaker, and a bass hit on its own has no direction.
 *
 * THE ONE RULE THIS FILM ADDS: scene 6 is the quiet. The email shot is the one
 * the product argues with, so it is the one place the bed drops and almost
 * nothing else happens. Everything after it has to feel like the room opening.
 */
export const CUES = [
  /* ================= 1 · THE CART · 0-120 · cream ================= */
  { from: 0,   src: 'transition/air-woosh-deep',        volume: 0.26, frames: 36, note: 'the film opens on a checkout' },
  { from: 4,   src: 'transition/sweep-fast-small',      volume: 0.16, frames: 16, note: 'CHECKOUT arrives' },
  { from: 10,  src: 'counter/clock-knob-spin',          volume: 0.30, frames: 56, note: 'the total rolling up to $284.00' },
  { from: 62,  src: 'counter/clock-tick-single',        volume: 0.22, frames: 12, note: 'the last digit settling' },
  { from: 90,  src: 'text/marker-pen-line',             volume: 0.30, frames: 16, note: 'the coral rule striking through the money' },
  { from: 90,  src: 'impact/hit-blow',                  volume: 0.26, frames: 18, note: 'weight under the strike' },
  { from: 98,  src: 'transition/sweep-fast-small',      volume: 0.14, frames: 14, note: 'ABANDONED types in under it' },
  { from: 120, src: 'transition/air-zoom-vacuum',       volume: 0.34, frames: 26, note: 'CUT 1 - the digits falling out of the frame' },
  { from: 122, src: 'impact/bass-hit-short',            volume: 0.30, frames: 26, note: 'CUT 1 - the floor going out from under it' },

  /* ================= 2 · SEVENTY · 120-210 · cream ================= */
  { from: 126, src: 'transition/sweep-short',           volume: 0.20, frames: 20, note: '70% rising through the gap' },
  { from: 132, src: 'impact/hit-fast-exciting',         volume: 0.24, frames: 22, note: '70% landing' },
  { from: 145, src: 'transition/sweep-fast-small',      volume: 0.13, frames: 14, note: 'of carts end like this.' },
  { from: 196, src: 'text/marker-pen-line',             volume: 0.32, frames: 18, note: 'CUT 2 - the coral rule drawing across the number' },
  { from: 209, src: 'impact/impact-cine-big',           volume: 0.34, frames: 32, note: 'CUT 2 - the frame inverting to black' },

  /* ================= 3 · THE BELIEF · 210-285 · black ================= */
  { from: 214, src: 'transition/air-woosh-quick',       volume: 0.20, frames: 18, note: 'YOU CALL THIS' },
  { from: 218, src: 'transition/sweep-metal-quick',     volume: 0.22, frames: 20, note: 'A LOST SALE. rising on black' },
  { from: 262, src: 'riser/riser-cine',                 volume: 0.26, frames: 30, swell: 22, note: 'the pressure under the turn that is coming' },
  { from: 285, src: 'transition/whoosh-big',            volume: 0.40, frames: 30, note: 'CUT 3 - the frame shearing in half' },
  { from: 285, src: 'impact/impact-movie-epic',         volume: 0.36, frames: 40, note: 'CUT 3 - weight under the shear' },

  /* ================= 4 · THE TURN · 285-450 · black then purple ================= */
  { from: 290, src: 'impact/bass-hit-futuristic',       volume: 0.32, frames: 28, note: "IT ISN'T. landing" },
  { from: 355, src: 'transition/air-whoosh-powerful',   volume: 0.26, frames: 24, note: "IT ISN'T. leaving upward" },
  { from: 358, src: 'transition/warp-slide',            volume: 0.34, frames: 30, note: 'the purple flooding out of the middle' },
  { from: 361, src: 'impact/impact-transition',         volume: 0.30, frames: 30, note: 'the flood arriving at the edges' },
  { from: 365, src: 'transition/sweep-short',           volume: 0.18, frames: 18, note: "IT'S A" },
  { from: 374, src: 'impact/hit-fast-exciting',         volume: 0.30, frames: 24, note: 'QUESTION. - the pivot of the whole film' },
  { from: 374, src: 'light/sparkle-touch',              volume: 0.13, frames: 20, note: 'a little light on the pivot' },
  { from: 436, src: 'transition/air-zoom-vacuum',       volume: 0.30, frames: 24, note: 'CUT 4 - the question mark growing' },
  { from: 445, src: 'mech/door-open-futuristic',        volume: 0.28, frames: 30, note: 'CUT 4 - the dot of the glyph opening out' },

  /* ================= 5 · THE QUESTIONS · 450-630 · cream ================= */
  { from: 453, src: 'transition/swoosh-quick',          volume: 0.20, frames: 16, note: 'Will it fit?' },
  { from: 455, src: 'impact/hit-blow',                  volume: 0.13, frames: 14, note: 'the first bubble landing' },
  { from: 477, src: 'transition/swoosh-quick',          volume: 0.19, frames: 16, note: 'When does it ship?' },
  { from: 479, src: 'impact/hit-blow',                  volume: 0.12, frames: 14, note: 'the second bubble landing' },
  { from: 501, src: 'transition/swoosh-quick',          volume: 0.19, frames: 16, note: 'Is it really titanium?' },
  { from: 503, src: 'impact/hit-blow',                  volume: 0.12, frames: 14, note: 'the third bubble landing' },
  { from: 525, src: 'transition/swoosh-quick',          volume: 0.19, frames: 16, note: 'Can I send it back?' },
  { from: 527, src: 'impact/hit-blow',                  volume: 0.12, frames: 14, note: 'the fourth bubble landing' },
  { from: 555, src: 'transition/sweep-metal-quick',     volume: 0.20, frames: 18, note: 'the stack lifting and stepping down a size' },
  { from: 560, src: 'impact/bass-hit-short',            volume: 0.30, frames: 26, note: 'NOBODY ASKED.' },
  { from: 624, src: 'transition/air-zoom-vacuum',       volume: 0.36, frames: 28, note: 'CUT 5 - every bubble swallowed by one point' },
  { from: 629, src: 'impact/impact-deep-whoosh',        volume: 0.26, frames: 30, note: 'CUT 5 - the weight of the swallow' },

  /* ================= 6 · THE EMAIL · 630-720 · light grey =================
     THE QUIET. The bed drops to 0.14 across this shot. Four cues in three
     seconds, and one of them is a clock. That is the point. */
  { from: 632, src: 'transition/sweep-short',           volume: 0.14, frames: 18, note: 'the envelope arriving, alone' },
  { from: 640, src: 'counter/clock-tick-single',        volume: 0.16, frames: 14, note: '5% - and nothing happening' },
  { from: 676, src: 'counter/clock-tick-single',        volume: 0.13, frames: 14, note: 'the clock again. still nothing.' },
  { from: 700, src: 'riser/riser-cine',                 volume: 0.30, frames: 26, swell: 20, note: 'the room about to open' },
  { from: 705, src: 'transition/whoosh-fast',           volume: 0.32, frames: 24, note: 'CUT 6 - the first ring leaving the envelope' },
  { from: 710, src: 'transition/air-whoosh-powerful',   volume: 0.30, frames: 24, note: 'CUT 6 - the second ring' },
  { from: 715, src: 'impact/impact-epic-trailer',       volume: 0.38, frames: 40, note: 'CUT 6 - the third ring carrying the indigo out' },

  /* ================= 7 · SO ASK THEM · 720-840 · deep indigo ================= */
  { from: 726, src: 'transition/sweep-short',           volume: 0.22, frames: 20, note: 'SO ASK THEM. rising' },
  { from: 732, src: 'impact/hit-fast-exciting',         volume: 0.28, frames: 22, note: 'the line landing' },
  { from: 745, src: 'light/light-sweep-magic',          volume: 0.26, frames: 40, note: 'the voice drawing itself in, left to right' },
  { from: 775, src: 'light/sparkle-touch',              volume: 0.14, frames: 20, note: 'the four channels under the wave' },
  { from: 828, src: 'transition/warp-slide',            volume: 0.34, frames: 28, note: 'CUT 7 - the waveform travelling right as the wipe edge' },
  { from: 833, src: 'impact/bass-hit-futuristic',       volume: 0.30, frames: 30, note: 'CUT 7 - weight behind the edge' },

  /* ================= 8 · ANSWERED · 840-975 · dark teal ================= */
  { from: 851, src: 'light/sparkle-touch',              volume: 0.18, frames: 16, note: 'tick 1 - Will it fit?' },
  { from: 863, src: 'light/sparkle-touch',              volume: 0.18, frames: 16, note: 'tick 2 - When does it ship?' },
  { from: 875, src: 'light/sparkle-touch',              volume: 0.18, frames: 16, note: 'tick 3 - Is it really titanium?' },
  { from: 887, src: 'light/sparkle-touch',              volume: 0.18, frames: 16, note: 'tick 4 - Can I send it back?' },
  { from: 906, src: 'transition/sweep-short',           volume: 0.20, frames: 18, note: 'the total coming back' },
  { from: 906, src: 'counter/clock-knob-spin',          volume: 0.30, frames: 36, note: 'the odometer rolling back up to $284.00' },
  { from: 930, src: 'impact/hit-fast-exciting',         volume: 0.32, frames: 24, note: 'RECOVERED. - the loop closing' },
  { from: 930, src: 'light/sparkle-poof-hit',           volume: 0.20, frames: 24, note: 'the light on the loop closing' },
  { from: 969, src: 'transition/air-woosh-quick',       volume: 0.30, frames: 24, note: 'CUT 8 - the tile turning over' },
  { from: 975, src: 'mech/gear-lock-metallic',          volume: 0.26, frames: 24, note: 'CUT 8 - the back face locking into place' },

  /* ================= 9 · THE CHAIN · 975-1095 · cream ================= */
  { from: 981,  src: 'transition/sweep-fast-small',     volume: 0.18, frames: 14, note: 'CALL' },
  { from: 990,  src: 'transition/sweep-fast-small',     volume: 0.17, frames: 14, note: 'NO ANSWER, TEXT' },
  { from: 999, src: 'transition/sweep-fast-small',     volume: 0.17, frames: 14, note: 'NO REPLY, CALL' },
  { from: 1008, src: 'transition/sweep-fast-small',     volume: 0.17, frames: 14, note: 'THEN EMAIL' },
  { from: 1014, src: 'transition/sweep-short',          volume: 0.20, frames: 18, note: 'IT PICKS THE ONE' },
  { from: 1022, src: 'impact/bass-hit-short',           volume: 0.28, frames: 24, note: 'THEY ANSWER.' },
  { from: 1047, src: 'impact/hit-fast-exciting',        volume: 0.28, frames: 22, note: '17% - the other half of the comparison' },
  { from: 1047, src: 'light/sparkle-touch',             volume: 0.15, frames: 18, note: 'light on the 17%' },
  { from: 1086, src: 'transition/whoosh-big',           volume: 0.36, frames: 28, note: 'CUT 9 - the diagonal tear' },
  { from: 1090, src: 'impact/impact-cine-big',          volume: 0.32, frames: 34, note: 'CUT 9 - the two pieces sliding apart' },

  /* ================= 10 · AGAIN · 1095-1215 · purple ================= */
  { from: 1098, src: 'transition/sweep-short',          volume: 0.20, frames: 18, note: 'THEN IT' },
  { from: 1105, src: 'impact/hit-fast-exciting',        volume: 0.30, frames: 24, note: 'CALLS BACK.' },
  { from: 1137, src: 'transition/sweep-fast-small',     volume: 0.16, frames: 14, note: '68% more receptive' },
  { from: 1161, src: 'transition/sweep-fast-small',     volume: 0.16, frames: 14, note: '7% to 11% repeat customers' },
  { from: 1200, src: 'riser/riser-cine',                volume: 0.28, frames: 22, swell: 16, note: 'the run up to the money' },
  { from: 1206, src: 'transition/warp-slide',           volume: 0.34, frames: 26, note: 'CUT 10 - the count smearing into a bar' },
  { from: 1212, src: 'impact/impact-movie-epic',        volume: 0.34, frames: 36, note: 'CUT 10 - the bar clearing to the money' },

  /* ================= 11 · THE MONEY · 1215-1350 · near-black ================= */
  { from: 1219, src: 'counter/clock-knob-spin',         volume: 0.32, frames: 48, note: 'the odometer counting to $230,000' },
  { from: 1264, src: 'counter/clock-tick-single',       volume: 0.20, frames: 12, note: 'the last digit settling' },
  { from: 1269, src: 'transition/sweep-metal-quick',    volume: 0.20, frames: 16, note: 'Taima Titanium wiping in' },
  { from: 1293, src: 'transition/sweep-metal-quick',    volume: 0.19, frames: 16, note: "Goth N' Rock wiping in" },
  { from: 1341, src: 'transition/air-zoom-vacuum',      volume: 0.34, frames: 26, note: 'CUT 11 - the figures collapsing to a point' },
  { from: 1346, src: 'impact/impact-epic-trailer',      volume: 0.36, frames: 40, note: 'CUT 11 - the point opening out as the close' },

  /* ================= 12 · THE CLOSE · 1350-1440 · cream ================= */
  { from: 1356, src: 'transition/sweep-short',          volume: 0.20, frames: 18, note: 'EVERY ABANDONED' },
  { from: 1362, src: 'transition/sweep-short',          volume: 0.18, frames: 18, note: 'CART DESERVES' },
  { from: 1368, src: 'impact/bass-hit-short',           volume: 0.28, frames: 26, note: 'A PHONE CALL.' },
  { from: 1389, src: 'light/sparkle',                   volume: 0.20, frames: 26, note: 'the Outcraft mark landing' },
  { from: 1403, src: 'light/sparkle-poof-hit',          volume: 0.22, frames: 26, note: 'the one CTA' },
];
