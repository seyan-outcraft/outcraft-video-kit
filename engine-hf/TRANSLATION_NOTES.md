# THE ENGINE — Remotion to HyperFrames

What this is, what came across exactly, and every place the two films differ.

Source: [engine/](../engine/) — `Engine` / `EngineSound`, Remotion, 4,862 lines
across 28 files.
Output: [index.html](index.html) — one HyperFrames composition, one paused GSAP
timeline.

**The Remotion project was not touched.** It still builds and still renders.
This is a one-way port, made with the `/remotion-to-hyperframes` workflow.

Same story, same 120 BPM grid, same 1,440 frames, same eleven scenes, same ten
cuts, same 83 sound cues, same brand kit, same facts on screen.

---

## Did it work

`npx hyperframes check` passes: 0 lint errors, 0 runtime errors, 0 layout
errors, 62/62 text contrast checks pass WCAG AA.

Twenty-seven frames were rendered from both films and compared with SSIM. The
Remotion still is the baseline in every case.

| Where | Frames sampled | Lowest SSIM | Mean |
| --- | --- | --- | --- |
| Scenes, across all eleven | 27 | 0.9935 | 0.998 |
| Eight of the ten cuts | 8 | 0.968 | 0.994 |
| Cuts 5 and 9 | 2 | — | deliberately different, see below |

The `/remotion-to-hyperframes` corpus sets 0.90 as the pass mark for its most
complex tier. Nothing here except the two deliberate changes is below 0.99.

The lowest scene frame is 0.9935, on the one shot that had to be rebuilt
(scene 3). The lowest cut frame is 0.968, on the twelve-frame implosion at the
end of scene 1 — fifteen tiles under motion blur, mid-flight, where a
half-frame of easing difference moves every pixel.

---

## Three things are different on purpose

### 1. Cuts 5 and 9 move. In the Remotion film they do not.

**This is a bug in `engine/`, not in the port, and it is worth your decision.**

`PanelWipe` in
[engine/src/engine/motion/transitions.tsx](../engine/src/engine/motion/transitions.tsx)
blends its start and end transform strings with

```js
const pa = a.match(/-?\d+/g)?.map(Number) ?? [0, 0, 0];
```

On the string `"translate3d(0, -110%, 0)"` that regular expression also matches
the **3** in `translate3d`. The numbers come out as `[3, 0, -110, 0]`, the
function reads the first two of them, and both panel cuts therefore render a
constant `translate3d(3%, 0%, 0)`.

The colour never travels. It appears whole on the cut frame, sits 3% right of
where it should, and vanishes.

Measured off the render rather than read off the code: at frame 1192 — seven
frames into a fifteen-frame move — the Remotion shutter's leading edge is
already at its landing row, 820px, which is exactly where it finishes.

Two of the film's ten cuts are affected:

| Cut | Frame | Engine.tsx describes it as |
| --- | --- | --- |
| 5 | 588 | "a hard indigo edge crosses from the right on a slant" |
| 9 | 1185 | "a black shutter drops from the top edge and lands" |

Neither happens. Copying that forward would mean knowingly shipping a broken
cut in a new deliverable, so **this port performs the move the source
describes**, on the source's own curve (`ease.swift`) and its own frame
numbers. Nothing else about either cut changed.

Two smaller things fall out of the same code, both left alone:

- **The panel box.** The source writes `inset: -260` on an `<AbsoluteFill>` and
  the comment says "oversized so a skewed edge never shows a corner of the shot
  behind". It cannot be oversized: `AbsoluteFill` forces `width: 100%` and
  `height: 100%`, and the `inset` shorthand only moves the box. So the Remotion
  panel is frame-sized and merely offset, and could never cover the
  bottom-right 260px even if it did travel. Here the box really is 2440x1600,
  because a panel that moves has to be able to land.
- **The slant.** `skewY(-8deg)` shears *horizontally*, so on a panel entering
  from the right it tilts the top and bottom edges and leaves the leading edge
  vertical. With the oversized box those edges are off-frame, so the slant is
  now invisible. The comment asks for "a hard diagonal on the leading edge",
  which is `skewX`. **Not changed** — that is a taste call, not a defect, and
  it is yours. Say the word and it is a one-character fix.

### 2. Scene 3 animates transforms, not font-size and margin

`SOMETHING PICKS IT UP.` steps down as `AN AI SALES TEAM.` lands under it. The
Remotion cut does that by tweening `fontSize` on the question and `marginTop`
on the answer.

HyperFrames rejects both (`gsap_non_transform_motion`), and it is right to:
both reflow text, so the tween snaps to whole device pixels and the ease-out
tail stutters under a seek-by-frame capture engine.

The step-down is a `scale` about the question's own top edge, and the two
offsets are `y`. The arithmetic that keeps the layout identical is written out
in the file — it solves for the same ask-top and answer-top the Remotion
version produces at every value of `open`, using a line-box ratio measured off
the real page rather than assumed.

Result: 0.9935 SSIM at the middle of the move, 0.9987 at its start. The residual
is rasterisation — a 132px glyph scaled to 0.76 is not bit-identical to the same
glyph drawn at 100px.

### 3. Landed type keeps an identity transform

DO-NOT-DO 54 says to drop the `transform` and `willChange` entirely once a move
is over, rather than leaving `translate3d(0,0,0) scale(1)`.

GSAP's `clearProps` is the tool for that, and it is not reliable under
arbitrary backward seeks — which is exactly how `snapshot --at` and a
re-render work. So it is not used.

**The defect that rule exists to prevent cannot occur here.** DO-NOT-DO 53's
finding was that a Remotion `spring()` approaches its target and never arrives,
so a landed word creeps a fraction of a pixel per frame and reads as vibration.
A GSAP tween reaches its end value exactly and then holds it. The value is
constant, so consecutive frames are identical — which is the thing that was
being measured.

---

## Everything that came across unchanged

- **The grid.** 120 BPM, 15 frames a beat, 24 bars, 1,440 frames, 48.0s. Every
  frame number in `engine/src/engine/beat.ts` survives as `F(frames)`.
- **The four brand curves.** `ease.out`, `ease.in`, `ease.inOut` and
  `ease.swift` are the same control points, solved by the same Newton-Raphson
  cubic-bezier solver Remotion's `Easing.bezier` uses, handed to GSAP as a plain
  function. No `CustomEase` plugin, no approximation to a named GSAP ease.
- **`TextEffect`.** Ported a second time — the motion-primitives API kept
  (`per`, `preset`, `variants`, `staggerChildren`, `duration` still in seconds,
  `mask` still sample 3's `segmentWrapperClassName`), the engine underneath
  replaced again. Framer-motion's wall clock became `useCurrentFrame`; here
  `useCurrentFrame` became a tween offset. All seven presets, all six of your
  samples.
- **Seeded randomness.** Remotion's `random()` is a specific string hash, and
  reimplementing it would be a source of silent drift. The eighteen values the
  film actually uses — fifteen storm launches and three `30x` scatters — were
  sampled once from Remotion itself and baked in as constants. The storm is
  the identical storm.
- **The one spring.** `pop` on `30x` is Remotion's `spring({damping: 14.4,
  mass: 0.8, stiffness: 96})` sampled at every frame and used as a GSAP ease
  table. It reaches exactly 1 at frame 13 and stops, as `settle()` made it.
- **All 83 sound cues**, frame-pinned, at the same levels, with the same
  four-frame tail fades and the same two riser swells. The bed carries the same
  fifteen-point energy envelope. `MASTER` is still 1.32.
- **The counter.** `$0` to `$100,000` still steps on a sixteenth — 14 steps,
  3.75 frames apart, cubic-decelerated — rather than tweening, and still holds
  the finished width from frame one.

---

## Two things this port had to get right that were invisible in Remotion

Both cost a round of stills, and both would have been easy to ship wrong.

**The type was 10% too narrow.** Bricolage Grotesque has an optical-size axis.
Asking `fonts.googleapis.com` for `opsz,wght@12..96,700` serves a file with
`opsz` live, and Chrome's `font-optical-sizing: auto` drives it to its 96
ceiling at 152px — a visibly narrower display cut. Remotion asks for
`ital,wght` only, so its file has `opsz` pinned at the family default. The
bundled woff2 is now the **exact file** `@remotion/google-fonts` resolves, taken
out of `engine/node_modules`, not re-requested from the API.

**The line height was wrong everywhere.** `engine/src/index.css` is one line —
`@import "tailwindcss"` — so every shot in that film is laid out under Tailwind
v4's preflight, which sets `line-height: 1.5` on the root. Nothing in the film
sets a line-height on Inter, so every eyebrow, pill and URL was ~20% shorter
here than in the original. That pushed the six-lockup wall in scene 8 twenty-
five pixels up the frame and moved the CTA in scene 11. The reset in
`index.html` now copies the three preflight rules that move pixels.

---

## Warnings that are left, and why

`npx hyperframes check` reports 6 warnings and 2 infos. None is a defect.

| Warning | Why it stays |
| --- | --- |
| `clip_media_fit` on cue52, cue58, cue66 | Three SFX files are shorter than the slot the Remotion cut gave them. HyperFrames shortens the slot to the media length at render, which is exactly what Remotion did — play the file, then silence. Trimming the slot would add a tail fade that the original does not have, and change the mix. |
| `composition_file_too_large`, `timeline_track_too_dense` x2 | One file, 1,750 lines, eleven scenes on one track. Splitting into sub-compositions is the HyperFrames house style and would make it easier to diff. Not done, because a sub-composition timeline cannot reach elements outside its own subtree, and this film's ten cuts and its ground layer sit above every scene. Worth revisiting if the film is ever re-cut. |
| `content_overlap` info, t=3.75s and 3.88s | `ONE SIGNAL.` is split per character on sample 4's flip. Adjacent glyphs overlap for two frames mid-rotation. That is the effect. |

---

## The three files

Rendered from one timeline, gated by two composition variables, so the SFX and
the picture are bit-identical across all three (DO-NOT-DO 51).

| File | Peak | Mean |
| --- | --- | --- |
| `out/outcraft-engine-hf-sound.mp4` | -1.2 dB | -18.6 dB |
| `out/outcraft-engine-hf-sfx-only.mp4` | -2.6 dB | -23.3 dB |
| `out/outcraft-engine-hf-silent.mp4` | silent | silent |

All three: 1920x1080, 30fps, 48.0s, H.264. Measured off the render, not assumed
(DO-NOT-DO 65). Nothing clips.

**These are not cleared to go public yet.** `npm run assets:verify -- --ship`
still fails on the same four music-bed files and three SFX files it already
failed on for video 2 — the Mixkit entries were never recorded. That is
pre-existing and unchanged by this port; it just now covers this folder too.

---

## Commands

```bash
cd engine-hf
npm run check                                              # lint, layout, contrast
npx hyperframes snapshot --at 3,9,17,26,37,45 -o out/frames # look before you render
npm run dev                                                # Studio, live preview

npx hyperframes render --output out/outcraft-engine-hf-sound.mp4
npx hyperframes render --output out/outcraft-engine-hf-sfx-only.mp4 --variables '{"bgm":false}'
npx hyperframes render --output out/outcraft-engine-hf-silent.mp4   --variables '{"bgm":false,"sfx":false}'

node tools/gen-audio.mjs        # rewrite the <audio> tags after editing tools/cues.mjs
node tools/record-assets.mjs    # re-record this folder's assets in the root manifest
```
