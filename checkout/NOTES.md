# VIDEO 4 — THE UNASKED QUESTION

What it is, what is new in it, and every mistake it cost to find.

**48.0s · 1440 frames · 120 BPM · 24 bars · 1920x1080 · HyperFrames.**
Twelve scenes, eleven cuts, 91 sound cues, no voiceover.

Read [STORYBOARD.md](STORYBOARD.md) for the film itself. This file is the part
that is worth carrying into video 5.

---

## Why this film exists

Seyan asked for a completely new video in HyperFrames — new components, new
story, aimed at **B2C and e-commerce**, carrying the psychology and the pitch,
with animation pushed further than anything built so far.

Nothing here is reused from videos 1–3. Not a scene, not a component, not a
transition, not a text effect. The brand kit is copied in unchanged, which is
the rule; everything above it is new code.

---

## The spine, and why it is a different shape

Three earlier angles were rejected, and the note in
[../research/HANDOFF.md](../research/HANDOFF.md) works out why: all three were
**problem, then rescue**. He was rejecting the shape, not the wording.

This one is a **reframe**. One belief, turned over, and everything after it
follows from the new reading:

> An abandoned cart isn't a lost sale. It's a question waiting to be asked.

That is Outcraft's own B2C hero line — so the spine is the company's own
positioning rather than something invented for a film. The whole video is the
consequence of taking it literally: if it is a question, then somebody has to
ask it, and the product is the thing that asks.

**The film closes its own loop.** The $284.00 cart that dies at 3.0s comes back,
alive and in purple, at 30.2s. Same digits, same size, same place on the frame.
Somebody who watches the first four seconds and the last eight still gets the
whole proposition.

---

## The research pass

Everything on screen came through the shared pipeline at the repo root, and the
run is worth recording because it found things:

- **`npm run research:refresh`** re-read all 14 tracked pages. 0 failed, 6 had
  changed since 2026-08-30.
- **Firecrawl** was used directly on top of that for the B2C page, the Goth N'
  Rock case study, the Taima case study and the channel-decision interview with
  Outcraft's CEO — the four sources this film is built from.
- **18 new rows went into [../research/facts.json](../research/facts.json)**,
  taking it from 32 facts to 50. The Goth N' Rock case study had never been
  mined at all, and it is the best B2C material in the repo.
- **One orphan fact got traced.** `stat.phone_vs_email` — "phone recovers 17% of
  carts, email about 5%" — had carried a risk note since 2026-08-29 saying its
  source URL was never recorded. It is the Goth N' Rock case study, quoting
  "one trial". The row now says so, and says the underlying trial is still
  unnamed, which is why the film uses it as a **comparison** and never as a
  headline stat.
- **One number was verified against a third party.** "About 70% of carts are
  abandoned" is Outcraft's own prose; it was checked against Baymard Institute,
  which puts it at 70.22% across fifty studies. It is on screen because it
  survived that check, not because the site said it.

**One figure on screen is not a fact and must not be read as one.** The
$284.00 cart is an invented basket total — a dramatisation, the way a cart in
any product film is. Every other number in the film traces to a row in
facts.json with a source and a date. If anyone asks where $284.00 came from,
the answer is nowhere: it is a prop.

**The speed claim is still deliberately off screen.** `num.first_response`
("median first response under 30 seconds") is unapproved and conflicts with the
older 60-second figure. Video 2 left it off for that reason and so does this
one. The film says "in minutes", which is the home page's own wording.

---

## What is new in the code

| Thing | What it is |
| --- | --- |
| `maskWords` / `rise` | The film's one arrival: a word rising onto its baseline through its own window. Layout on the wrapper, transform on the span (DO-NOT-DO 69). |
| `.mw.desc` | An opt-in deeper mask skirt, used on exactly one line — the only one in the film with a descender in it. |
| `odometer` / `roll` | A total that counts without the line walking sideways under it: ten glyphs behind a one-glyph window, per digit. |
| `waveBars` | A 64-bar voice waveform whose heights come from a fixed sum of sines. Never a random number — every render has to draw the same wave. |
| `cubic` | The brand's four bezier curves as real beziers, so this film's motion language is identical to videos 1 and 2. |
| Bubbles, ticks, rail, chips, rings, envelope, proof rows | All new. |

---

## What it cost to find — new rules

Numbered from 75, continuing [../DO-NOT-DO.md](../DO-NOT-DO.md).

**75. Do not build a cut out of the colour the frame is already wearing.**
DO-NOT-DO 62 said this about a two-percent luminance difference. This film found
the absolute version: **four of the eleven cuts were literally invisible on a
rendered still.** A teal card flipping against a teal ground. A purple tear
sliding apart to reveal purple. A purple bar opening across a purple frame. An
indigo ring arriving *after* the ground had already turned indigo. Every one of
them was correct code doing exactly what it was told. A cut moves against the
colour it is **replacing**, never the colour it is becoming.

**76. Do not animate a complex clip-path string and assume it interpolated.**
The waveform wipe was a 41-point `polygon()` tweened from one shape to another.
It rendered at its end state on every sampled frame — a flat teal rectangle
where a ragged edge should have been travelling. The seam is now **cut once**
into a panel that is simply translated: a static clip-path and an animated
transform, which is the reliable half of each. Same picture, and it cannot
silently snap.

**77. Do not take an element out of flow without telling the layout audit.**
The odometer's digit column is ten glyphs tall behind a one-glyph window. The
nine that are out of view are clipped by `overflow: hidden`, but a box-measuring
audit cannot see a clip — it reported **32 layout errors**, every one of them a
hidden glyph "overlapping" something. `data-layout-allow-overflow` and
`data-layout-allow-overlap` on the window, the column and each glyph took it to
zero. Declare the intent; do not let a real error hide in a pile of false ones.

**78. `align-items: baseline` needs something on the baseline.**
The same change — moving the digit column to `position: absolute` — left each
odometer window with no in-flow content, so the row's baseline alignment fell
back to the window's bottom edge and every static character found a level of its
own. `$284.00` rendered with the `00` sitting higher than the `284`. Top-align
the row and give every child the same box height.

**79. A question mark has no counter.**
The iris cut was drawn to open through "the hole in the middle of the `?`".
There isn't one. A question mark is an open curve and a dot, and the dot is the
only closed shape in the character. The iris opens from the dot.

**80. `ease.in` is not a fast exit.**
The brand's exit curve is `[0.7, 0, 0.84, 0]`, which has barely left the
starting line at the halfway point. On a fifteen-frame move that meant the
diagonal tear had opened thirty-nine pixels when it was half over, and the
vacuum had shrunk a bubble by three percent. It is the right curve for something
leaving a held frame and the wrong one for a cut, where the move IS the shot.
Cuts use `inOut` or `swift`.

**81. Measure every hold; do not read it off the plan.**
Three headlines were under the 1.5s a line needs to be readable (DO-NOT-DO 26),
including `IT ISN'T.` at 0.80s — the denial the entire film turns on. None of it
was visible in the outline, which said "9.5–11.5" and looked generous. The hold
is from the frame a line finishes **landing** to the frame the cut takes it, and
the entrance can easily eat a second of it.

**82. Clamp every sound cue to the length of its own file.**
A slot longer than its media is silently shortened at render time, so the
four-frame tail fade every cue in this film carries would be tweening the volume
of a clip that had already stopped — which is how a cue clicks instead of
fading. `tools/gen-audio.mjs` now measures each file with `ffprobe` and clamps
the table. Six of the ninety-one cues were over.

**83. A cue pointing at a file that is not on disk is silence, and nothing
warns you.** `tools/gen-audio.mjs` throws if any `src` is missing.

---

## Sound

One frame-pinned table, [tools/cues.mjs](tools/cues.mjs), 91 cues. No audio code
in any scene (DO-NOT-DO 49). `node tools/gen-audio.mjs` writes the `<audio>`
elements into the markup between two markers — HyperFrames finds media with a
flat document query before any script runs, so they have to exist as real tags.

The bed is `assets/audio/bed-48.mp3`, the same 120 BPM Mixkit tech-house bed
video 2 built: time-stretched from 124.5 BPM with ffmpeg `atempo`, rebuilt to
48.0s from its own first 30.0s plus its own first 18.0s, with a 15ms fade across
a seam that lands on a downbeat on both sides (DO-NOT-DO 48, 66).

**Scene 6 is the quiet.** The email shot is the one the product is arguing with,
so it is the one place the bed drops — to 0.14 — and almost nothing happens.
Four cues in three seconds and one of them is a clock. Everything after it has
to feel like the room opening.

**The mix was measured off the render, not assumed** (DO-NOT-DO 65). The first
pass shipped at MASTER 1.18 and came out at -20.1 dB mean, peaking at -2.8 dBFS
— clean, but a full two decibels quieter than video 2 with headroom going spare.
At MASTER 1.40 it measures:

| File | Mean | Peak | Clipped |
| --- | --- | --- | --- |
| `outcraft-checkout-sound.mp4` | -18.6 dB | -0.9 dBFS | none |
| `outcraft-checkout-sfx-only.mp4` | -23.8 dB | -3.2 dBFS | none |
| `outcraft-checkout-silent.mp4` | silent | — | — |

`astats` on the music mix reports a peak of -0.88 dBFS and a **flat factor of
0.000000** — no sample reached full scale and nothing is flat-topped.

That puts it within half a decibel of video 2 (-18.2 mean, -1.1 peak), so the
four films can be played back to back without anyone reaching for the volume.

**The audio folder holds only what the film uses.** Thirty SFX and one bed. The
three unused beds and two unused SFX that came across with the copy were deleted
— every extra file is another licence to prove at the ship gate for nothing.

---

## Before it goes anywhere public

`npm run assets:verify -- --ship` still fails, and it fails for the **same four
reasons it already failed for videos 1, 2 and 3** — this film inherited them
rather than quietly clearing them:

- the Mixkit tech-house bed's own licence row was never recorded
- `sfx/light/sparkle.mp3`, `sfx/riser/riser-cine.mp3` and
  `sfx/transition/whoosh-big.mp3` are traced to Mixkit but unconfirmed

All 40 of this folder's asset rows point back at the row they were copied from
and carry the same licence and the same approval state, which is the point:
nothing became clean by being copied. `checkout/assets/{audio,logos,fonts}` are
in the ship gate's tracked list (DO-NOT-DO 73).

**One judgement call to flag:** the two customer marks in scene 11 are inverted
to white with `filter: brightness(0) invert(1)`, because the shot is near-black
and both PNGs are dark on transparent. Inverting preserves the shape of the mark
exactly and is how these logos are used on a dark ground — but it is a change to
somebody else's logo, so it is written down rather than assumed.

---

## Commands

```bash
cd checkout
npm run check          # lint, runtime, layout, motion, contrast
npm run dev            # HyperFrames Studio, live preview
npm run snapshot       # stills at twelve scene midpoints
npm run render:all     # all three files

node tools/gen-audio.mjs      # after editing tools/cues.mjs
node tools/record-assets.mjs  # after adding or changing an asset
```
