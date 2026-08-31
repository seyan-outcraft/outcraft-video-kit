# Outcraft video — the DO NOT list

One page. Read before every build. If a shot breaks a rule here, cut the shot.

---

## A. Remotion code — these break the render

1. **Do not use `useState` or `useEffect` to drive motion.** Remotion draws every frame on its own. State causes loops and flicker. All motion comes from `useCurrentFrame()`.
2. **Do not use CSS transitions or CSS `@keyframes` for motion.** They never play during a render. The browser jumps to the end state.
3. **Do not call `interpolate()` without `extrapolateLeft: 'clamp'` and `extrapolateRight: 'clamp'`.** Without them the value keeps growing after the range ends.
4. **Do not use the default `spring()` config on text.** It overshoots and wobbles. Use `spring$.text` from `src/brand/motion.ts`.
5. **Do not use `Math.random()`, `Date.now()`, or `new Date()`.** Every frame must look the same on every render. Use `random()` from Remotion with a fixed seed.
6. **Do not build a typewriter with per-character opacity.** Slice the string instead.
7. **Do not stack heavy CSS filters (`blur`, `drop-shadow`) on full-screen layers.** One filter runs on every frame and can double the render time.
8. **Do not leave un-memoized heavy work inside a component.** It runs once per frame.
9. **Do not load fonts inline in a scene.** Load once in `src/brand/fonts.ts`.

## B. Layout — 1920x1080

10. **Do not put key text outside the safe area.** 142px from left and right. 178px from top and bottom.
11. **Do not set a headline below 150px.** Do not set supporting text below 78px. This is a video, not a webpage.
12. **Do not put more than 5 words on screen at once.**
13. **Do not centre everything.** Pick one focal point per shot and build the frame around it.
14. **Do not add an element that does not earn its place.** No decorative dots, no filler icons.

## C. Brand — from the brand book

15. **Do not use more than two brand colours per shot.**
16. **Do not set body copy in Bricolage Grotesque.** Display face only. Body and UI are Inter.
17. **Do not show more than one filled purple element per frame.** Purple is the CTA colour.
18. **Do not use coral for anything large.** Small highlights only.
19. **Do not use emoji.**
20. **Do not use icons outside Lucide, at 1.5–2px stroke.**
21. **Do not stretch, rotate, recolour, or add effects to the logo.**

## D. Motion — taste

22. **Do not animate more than one thing at a time.** A second moving object splits attention.
23. **Do not use linear easing.** Things that enter decelerate. Things that leave accelerate.
24. **Do not move things far.** Short travel reads as expensive. Use `travel.sm` or `travel.md`.
25. **Do not use one curve for entering and a different feel for the same kind of move elsewhere.** One motion language, defined in `src/brand/motion.ts`.
26. **Do not hold a line of text for less than 1.5 seconds.** The viewer must be able to read it.
27. **Do not use spin, bounce, elastic, or flip.** They date the video instantly.
28. **Do not use a different transition for every cut.** Pick two and repeat them.

## E. Story — this is what kills SaaS videos

29. **Do not open with the logo.** Hook in the first 2 seconds. The logo lands at the end.
30. **Do not list features.** Show the decision a person makes. "Here is our reporting module" is weak. "Here is how a manager catches a problem early" is strong.
31. **Do not try to show everything the product does.** One idea. One video.
32. **Do not use technical or internal words.** Say it the way a customer says it.
33. **Do not use stock footage or stock people.** It looks generic and it does not match the product.
34. **Do not end without one clear next step.** One CTA. No choices.

## F. Process

35. **Do not render before the preview looks right.** Use `npx remotion studio`.
36. **Do not change the brand tokens inside a scene file.** Change `src/brand/tokens.ts`.
37. **Do not start a new video from scratch.** Reuse the scene components from this project.

---

## Suspended for the punk cut (`Punk` composition) — 2026-08-29

Seyan watched the finished 57.8s `Explainer` and called it bland. He asked for
ultra-creative, over-the-top motion, and for every cut to be different. These
five rules are what made v2 calm, so for the punk cut they are **off**:

| Rule | Why it is off |
| --- | --- |
| 22 — one thing at a time | Nine cards fly in at once on purpose |
| 24 — do not move things far | Panels travel the full frame and off it |
| 26 — hold a line 1.5s | Words land on the beat, three to a bar |
| 27 — no spin, bounce, flip | Cards spin in gently; the payoff word settles |
| 28 — two transitions, repeated | Ten cuts, ten different moves, no repeats |

### And one new rule, learned the hard way

**38. Do not shake the frame. Ever.** The first punk cut kicked the whole frame
on every hit. Seyan's note was blunt: *"There is a screen shake, and I do not
want it at all."* It reads as cheap on a landing page and it fights the premium
feel the video is for. Impact comes from the spring landing, the colour block
and the beat — never from moving the camera. The `Kick` component has been
deleted from `src/punk/motion/frame.tsx` so it cannot come back by accident.

**39. Centre the type.** Left-hung headlines left half the frame empty. Every
type shot in the punk cut is centred, and so is every scene tag.

**Everything else still binds**, especially 15 (two brand colours per shot),
17 (one filled purple element), 19 (no emoji), 21 (never distort the logo),
29 (logo last), 34 (one CTA), and all of section A.

This suspension applies to the `Punk` composition only. `Explainer` stays on
disk under the original rules as the fallback cut.

---

## The type cut (`TypeCut` / `TypeCutSound`) — 2026-08-30

Seyan asked for a new file, not an edit of the punk cut: same message, no
product UI, built out of the one thing he liked — the words blurring in and
rising in `AnimatedText`. Everything below came out of his notes on it.

**40. Do not run the grid faster than 120 BPM.** His note on the punk cut:
*"it is a tiny bit fast, so I cannot read fast enough."* Punk is 150 BPM, 12
frames a beat. The type cut is 120, 15 frames a beat. Slowing the grid costs
length — the same story comes to 31.5s. Reading time wins.

**41. Do not name a screen when you can name a benefit.** "In four choices"
was cut. His note: *"what does four choices mean? It feels detached."* It named
a settings page and the number was attached to nothing the viewer had seen. It
is now "All four of them.", and the two shots after it show the four.

**42. Do not make anything vanish to make room for the next thing.** His note,
and the most important one here. The first build of the four-channel shot flew
a big word in over the parked ones and ghosted them back to 10%, so CALLS.
appeared to disappear the moment TEXTS. arrived. A team that vanishes as it is
hired is the opposite of the point. The list now only ever grows: the stack
slides up, the arriving word takes the space under it, and hierarchy comes from
size and position — never from fading an item back.

**43. Do not size a hero element for the fullest frame it will ever be in.**
One word alone at the size that fits four words looks small and lost. The word
in the middle now steps down as the list fills (`BIG_AT` in T04Roster).

**44. Do not put a transition over the end of an animation.** Every colour cut
is placed after the move it is cutting away from has finished. The first build
covered the TEAM burst with the doors that were meant to reveal what the burst
led to.

**45. Do not use `ease.swift` on a transition whose shape is the point.** On a
swift curve the circle iris was at 95% of its size four frames in, so it never
read as a circle — the frame just went black. Shape-based cuts (circle, band,
barn doors) use `ease.inOut`; panels and bars keep swift.

**46. Do not mask a piece of type that is not moving vertically.** The mask in
`WordsReveal` is a box with `overflow: hidden` around each piece, so it can
only hide a move that runs up or down. On a word sliding in sideways, scaling
or scattering it clips the piece against its own edges and the move reads as a
stretch. `WordsReveal` now turns the mask off automatically.

**47. Do not draw a rule by flipping its transform origin.** Scaling in from
the left and out to the right meant changing `transform-origin` mid-shot, which
snapped the rule sideways by its own length on one frame. Use `clip-path`.

### Sound — from the first cut with audio

**48. Do not lay a music bed on without matching its tempo to the film's
grid.** The Mixkit tech-house bed is 124.5 BPM; the film is 120. It is cut at a
downbeat and time-stretched with ffmpeg `atempo` (which does not shift pitch)
so a beat lands within a third of a frame of every multiple of 15, all the way
through. That is the difference between hits that feel scored and hits that
feel sprinkled.

**49. Do not put audio in a scene file.** Sound is a timeline asset. Every cue
in the film is one row of the table in `src/TypeCutSound.tsx`, pinned to an
absolute frame, with a note saying what it is under.

**50. Do not use synthesised UI bleeps.** The vocabulary for a product film is
whoosh / impact / riser / sparkle / transition, plus real foley where the
picture earns it. Synth pluck and bloop make a brand film sound like a mobile
game.

**51. Do not ship only the version with music.** The same timeline renders
with music, with sound design only, and silent. Music licensing and the venue
it gets played in are not decided by the person who mixed it.

The type cut keeps every rule in sections A to F **except** 28 — it has seven
different colour transitions, because he asked for a lot of them. It does not
need the punk suspensions: nothing shakes, nothing spins, no line is held under
1.5 seconds and there is one focal point per frame.

---

## The punk cut at 120 BPM (`Punk2` / `Punk2Sound`) — 2026-08-30

Seyan watched the 150 BPM `outcraft-punk.mp4` and asked for a new file: the
same film, a little slower, with sound, with more transitions, and with the
discrepancies in it fixed. `Punk` and its render are untouched. Everything
below came out of that pass.

**52. Do not slow a film down by moving only its start frames.** A spring is a
differential equation and it does not care what the beat grid says. To slow a
move by a factor without changing its shape, divide stiffness by the factor
squared and damping by the factor, and leave mass alone. Change one of the two
and the landing changes character: softer stiffness on its own makes every word
arrive limp, and softer damping on its own makes it wobble.

**53. Do not land type on a spring.** This is the one that mattered. His note:
*"the texts are kind of shaking when they are still."* A Remotion `spring()`
approaches its target and never arrives, so a landed word sits a fraction of a
pixel off its mark and creeps there for a second or more. Every frame the
browser re-rasterises the glyph at a slightly different sub-pixel position, and
that reads as vibration, never as movement. Duration-based bezier curves reach
their end value exactly, on a frame you can name, and then stop. `SlamText`'s
two no-overshoot landings are curves now. `pop` is the only spring left in the
type kit, and it is forced to exactly 1 once it is past what the eye can
resolve. Proof: on the end card, two consecutive frames of the 150 BPM cut
differ by up to 4 levels of luma; in the new cut they are identical.

**54. Do not leave a transform on something that has stopped.** The other half
of 53. Once a move is over, drop the `transform` and the `willChange` entirely
rather than writing `translate3d(0,0,0) scale(1)`. An element with a
compositing hint is rasterised into its own texture and resampled; without one
it sits on the same pixel grid as static content.
`src/punk2/motion/settle.ts` is the whole story, and every card, panel, row,
tile and chip in the cut runs through it.

**55. Do not use an over-damped spring and call it "precise".** The old `dead`
landing was damping 200 against stiffness 110 — a damping ratio above eleven.
An over-damped spring's slow decay constant is damping divided by stiffness, so
that one took 1.8 seconds to settle. The lines meant to be the stillest in the
film were the ones that crawled the longest. If you want no overshoot,
critically damp it or use a curve.

**56. Do not centre a string that is still growing.** Anything typed, counted
or scrambled gets wider every few frames, and a centred box re-centres itself
every time, so the whole line walks sideways under its own type. Hold the
finished width from frame one — `reserve` on `SliceType` and `SlotNumber`, and
on the `Tag`. Then choose what happens inside that width: left for a
typewriter, centre for a counter.

**57. Do not hang a label off a group whose width is reserved.** Following on
from 56: with the width of "CHOICES" held from frame one, a centred "IN" sat
over the middle of "4 CHOICES" — which, for the whole second before CHOICES
exists, put the word out on its own to the right of a lone digit. Hang the
label off the element it belongs to, not off the group.

**58. Do not draw a white element before the thing that makes it readable.**
The reel in scene 3 is drawn white because it sits on a purple block, but the
block only stamped on when the reel *stopped*. So the reel spun white on cream
for eighteen frames where nobody could see it, and the 4 appeared out of
nowhere. Whatever gives an element its contrast has to be there for the whole
time the element is.

**59. Do not animate a group of things to a single rest position.** The four
recalled choice cards in scene 7 were absolutely positioned with no rest
position of their own, so all four flew in from the corners and landed stacked
on top of each other over the agent card. Four choices have to end up looking
like four choices. Give each one a real place to be.

**60. Do not fade a full-frame graphic to a low opacity and leave it there.**
The crosshair in scene 8 faded to 0.18 and stayed — two hairline rules lying
across a cream frame for the rest of the shot, which reads as a rendering
artefact rather than a decision. If it has handed over, take it to zero.

**61. Do not scatter characters further than a glyph is wide.** `IT'S BUILT.`
scattered from 620px, so eleven characters crossed each other's paths and the
middle of the frame turned into a pile of letters for two thirds of a second.
Under one glyph width no letter can reach its neighbour's slot, and the line
reads as assembling instead of spilling.

**62. Do not make a transition out of a colour the frame is already wearing.**
The first build of the cut into the objective swept four light-grey bars across
a cream ground. That is a two-percent difference in luminance: a transition
nobody could see happening. It is black now.

**63. Do not claim a cut is new without checking.** The 150 BPM cut's own header
said "ten cuts, no cut repeated". It had nine, and scenes 7 and 8 both ended on
the same vacuum. Count them.

**64. Do not run a transition against the move it is taking off the frame.**
Both new colour cuts in this film run right to left, because the type they are
covering is being dragged left. A panel crossing the other way reads as a lid
dropped over the shot; a panel running with it reads as the thing that removed
the words.

**65. Do not reuse a mix level from another film.** The type cut sits at MASTER
1.5. This one has more cues, and the handover into the receipt stacks a whoosh,
a clock spin and the bed on top of the cadence's tail — at 1.5 it sat flat on
0 dBFS with 219 clipped samples. It ships at 1.2, peaking at -0.6 dBFS. Measure
the render; do not assume it.

**66. Do not loop a music bed anywhere but on a downbeat.** The bed is 31.5s and
this film is 36.0s. `bed-36.mp3` is its first 30.0s — fifteen whole bars — then
its own first 6.0s again, with a 15ms fade across the seam. Both sides of the
joint are downbeats, so the loop is on the grid rather than merely near it.

The punk suspensions above still apply to this cut, except that rule 28 is back
in spirit: there are eleven cuts and no two are the same move.

---

## Video 2 — the engine explainer (`Engine` / `EngineSound`) — 2026-08-30

Seyan asked for a homepage-hero explainer: the integrations, the system,
everything, premium and upbeat, erratic and spontaneous, and built out of the
six text-animation samples he handed over. 44.0s, 22 bars, 120 BPM, in
[engine/](engine/). It is its own Remotion project. `outcraft-teaser/` was not
touched.

The punk suspensions apply to this film too — cards rotate in, panels travel
the full frame, ten cuts and no two the same. **38 (never shake the frame) and
39 (centre the type) both still bind, and so does everything in sections A to
F that is not on that list.**

**67. Do not set a headline without measuring it against the safe width.**
Three separate shots shipped their first build with type that silently
reflowed. `EVERY TOOL YOU RUN ON.` at 152px is about 1850px wide against a
1636px safe area: it broke to two lines and pushed itself off the top of the
frame. `AN AI SALES TEAM.` at 220px is 2040px and did the same. Bricolage
Grotesque 700 at these sizes runs roughly **0.55em per character** — 22
characters at 152px will not fit and no amount of tracking saves it. Render a
still and look at it before you believe a line fits, and put `whiteSpace:
'nowrap'` on any box whose job depends on one line, so the next person gets an
overflow they can see instead of a reflow they cannot.

**68. Do not let a vertically centred block grow later in the shot.** The
money shot centres a number, a rule, a line and a customer logo. The logo
arrives 92 frames in, which made the block taller, which re-centred it, which
shoved the number the viewer was reading upward at the worst possible moment.
Reserve the height from frame one and animate opacity inside it. This is
`reserve` from DO-NOT-DO 56 applied one level up: hold the finished layout from
the first frame, then animate within it.

**69. Do not put a font size only on the inner span of a masked line.** The
mask in `TextEffect` is a wrapper with `overflow: hidden` whose descender room
is set in `em`. An `em` is computed against the element's OWN font size, so a
size set only on the span inside it leaves the mask sized for 16px text around
a 160px glyph. Layout styles go on the wrapper; transform, opacity and filter
go on the inner span. And spacing between masked lines is `line-height`, never
`margin`, because the wrapper spends its own top and bottom margin cancelling
that padding.

**70. Do not open a door onto an empty frame.** The barn door into the four
channels finished parting eight frames before the first channel arrived, so
the cut revealed nothing and then waited. A door that opens onto something
already moving reads as one action; a door that opens onto a held empty frame
reads as a mistake. Anything revealed by a transition starts moving *during*
it.

**71. Do not port a mount-driven animation library by keeping its engine.**
The six samples are motion-primitives, which is framer-motion, which animates
on wall-clock time. Remotion draws frame N on demand, so a rendered frame would
show whatever framer happened to be doing (DO-NOT-DO 1, 2). The port keeps the
**API** — `per`, `preset`, `variants`, `staggerChildren` and `duration` still
written in seconds, `segmentWrapperClassName` as `mask` — and replaces
everything underneath with `useCurrentFrame` and clamped `interpolate`. Mount
becomes a `start` frame; `trigger={false}` becomes an `exitAt` frame. See
`engine/src/engine/motion/textEffect.tsx`, which carries the sample-by-sample
mapping at the top.

**72. Do not draw a wall of partner logos at one flat size.** Square marks
(Slack, WhatsApp, Pipedrive, Omnisend) fill a square box to all four corners
and read as much heavier than everything around them; wide marks (monday,
Klaviyo, Salesforce) touch two edges and read as timid. Every mark carries its
own `optical` fraction in `engine/src/engine/logos.ts`, and those numbers are
set off a rendered still, not guessed — Slack came out tiny at 0.78 and
Omnisend outweighed the frame at 0.76.

**73. Do not add a video folder without adding it to the ship gate.**
`tools/assets-verify.mjs` has a hard-coded list of tracked folders. A new
video's `public/` folder that is not on that list means the gate reports a
clean pass on a film whose assets were never checked. `engine/public/audio` and
`engine/public/logos` are on it now, and all 64 copied files have manifest rows
pointing back at the row they were copied from.

**74. Do not count a film's cuts from the plan.** Same lesson as 63, learned
again a different way: this film's cut table lists ten and there are ten,
because they were counted off the code and off stills, not off the outline that
described them.

---

## Video 4 — the B2C explainer (`checkout/`, HyperFrames) — 2026-08-31

Seyan asked for a completely new video — new components, new story, everything —
aimed at **B2C and e-commerce**, carrying the psychology and the pitch, with the
animation pushed further than anything before it. 48.0s, 24 bars, 120 BPM, in
[checkout/](checkout/). Its own HyperFrames project. Nothing else was touched.

The punk suspensions apply here too — panels travel the full frame, eleven cuts
and no two the same. **38 (never shake the frame) and 39 (centre the type) both
still bind, and so does everything in sections A to F that is not on that list.**
Rule 26 binds: every headline in this film was measured, and three of them had
to be given more time.

**75. Do not build a cut out of the colour the frame is already wearing.**
Rule 62 said this about a two-percent luminance difference. This film found the
absolute version, and it found it four times. **Four of the eleven cuts were
literally invisible on a rendered still:** a teal card flipping against a teal
ground, a purple tear sliding apart to reveal purple, a purple bar opening
across a purple frame, and an indigo ring that arrived *after* the ground had
already turned indigo. Every one was correct code doing exactly what it was
told. A cut moves against the colour it is **replacing**, never the colour it is
becoming — and if it needs a backdrop to be seen against, give it one.

**76. Do not animate a complex `clip-path` string and assume it interpolated.**
The waveform wipe was a 41-point `polygon()` tweened from one shape to another.
It rendered at its **end state** on every sampled frame — a flat rectangle where
a ragged edge should have been travelling. Cut the shape ONCE into the element
and animate a transform instead: a static clip-path and an animated translate
are the reliable half of each, they give the same picture, and they cannot
silently snap.

**77. Do not take an element out of flow without telling the layout audit.**
The odometer's digit column is ten glyphs tall behind a one-glyph window; the
nine out of view are clipped by `overflow: hidden`. A box-measuring audit cannot
see a clip, so it reported **32 layout errors**, every one a hidden glyph
"overlapping" something real. `data-layout-allow-overflow` and
`data-layout-allow-overlap` — on the window, the column AND each glyph — took it
to zero. Declare the intent, or a real error will hide in the pile of false ones.

**78. `align-items: baseline` needs something on the baseline.**
Moving that digit column to `position: absolute` left each window with no
in-flow content, so the row's baseline alignment fell back to the window's
bottom edge and every static character found a level of its own. `$284.00`
rendered with the `00` sitting higher than the `284`. Top-align the row and give
every child the same box height.

**79. A question mark has no counter.**
The iris cut was drawn to open through "the hole in the middle of the `?`".
There isn't one — a question mark is an open curve and a dot. Know the glyph
before building a shot out of its anatomy.

**80. `ease.in` is not a fast exit.**
The brand's exit curve is `[0.7, 0, 0.84, 0]`, which has barely left the
starting line at the halfway point. On a fifteen-frame move that meant the
diagonal tear had opened **thirty-nine pixels** when it was half over. It is the
right curve for something leaving a frame that stays, and the wrong one for a
cut, where the move IS the shot. Cuts use `inOut` or `swift`.

**81. Measure every hold; never read it off the plan.**
Three headlines came in under the 1.5 seconds of rule 26, including `IT ISN'T.`
at 0.80s — the denial the entire film turns on. None of it was visible in the
outline, which said "9.5–11.5" and looked generous. **The hold runs from the
frame a line finishes LANDING to the frame the cut takes it**, and the entrance
can eat a second of it on its own.

**82. Clamp every sound cue to the length of its own file.**
A slot longer than its media is silently shortened at render time, so a tail
fade written past the end is tweening the volume of a clip that already stopped
— which is how a cue clicks instead of fading. Measure each file with `ffprobe`
and clamp the table. Six of this film's ninety-one cues were over.

**83. A cue pointing at a file that is not on disk is silence, and nothing warns
you.** The generator throws if any `src` is missing.

---

*If a new rule is learned during a build, add it here.*
