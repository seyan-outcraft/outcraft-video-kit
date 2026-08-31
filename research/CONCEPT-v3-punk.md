# Video 1 v3 — "SPEC SHEET" · Swiss punk cut

Written 2026-08-29. Replaces [CONCEPT-v2-explainer.md](CONCEPT-v2-explainer.md),
which Seyan called bland. v2 stays on disk as the fallback render.

**Brief:** ultra creative, over-the-top, a lot of motion, no two transitions alike.
Keep the product UI but treat it as physical objects, not screens.

---

## Locked decisions

| | |
| --- | --- |
| Length | 28.8s — 864 frames @ 30fps |
| Grid | **150 BPM**. 1 beat = 12f. 1 bar = 48f = 1.6s. **18 bars.** |
| Ground | Opens near-black, cuts to cream, ends dark teal |
| UI | Real rebuilt cards, thrown around as physical panels |
| Type | Bricolage display, Inter tabular for all numbers |
| Sound | Silent render, but every hit sits on a beat |
| Composition id | `Punk` — new file, `Explainer` untouched |

## Rules being suspended for this cut

DO-NOT-DO 22 (one thing at a time), 24 (short travel), 26 (1.5s hold),
27 (no spin/bounce/flip), 28 (only two transitions).
Everything else still binds — especially 15 (max two brand colours per shot),
17 (one filled purple element), 19 (no emoji), 21 (never distort the logo).

---

## The spine

Not problem-then-rescue. It is a **spec sheet coming to life.**
A machine states its number, gets assembled in four moves, switches on,
refuses to stop, and shows its receipt.

---

## Second by second

### 1 · SPEC PLATE — bars 1–2 · f0–96 · 0.0–3.2s
Ground `nearBlack`. Datasheet layout, block sits on the left two thirds.

- `f0` Cut in hard. Eyebrow, top of block, purple, tracked wide: `OUTCRAFT / RESPONSE TIME`
- `f0–36` Giant tabular digits `00:00` race to `00:60`. **They step every 3 frames** (1/16 note), never smooth — a mechanical counter, not a tween.
- `f36` **SLAM** on `00:60`. Whole frame kicks 10px and settles over 4f. A coral 4px rule shoots left-to-right under the digits in 6f.
- `f48` `SECONDS` slides in under the rule, one letter at a time, 3f apart, from the right.
- `f72` Everything squashes to a flat line (scaleY→0) as a cream panel wipes up from the bottom.

> Why this and not "a lead is waiting": the number is a **boast**, not a threat.
> No victim on screen. That is what keeps it clear of the three rejected angles.

### 2 · THE PROMISE — bar 3 · f96–144 · 3.2–4.8s
Cream ground. Three words, one per beat, each arriving a **different way**.
They stack, they do not replace.

- `f96` `BUILD` — letters drop from above, overshoot 12px, snap back
- `f108` `A SALES` — slides in from the right at speed, hits a wall, letters ripple
- `f120` `TEAM.` — scales from 0 with the pop spring; purple block slams in behind it
- `f132` All three lines squash to one line and get dragged off left with a smear

### 3 · THE COUNT — bar 4 · f144–192 · 4.8–6.4s
- `f144` `IN` slides in from the left
- `f150–168` A slot-machine digit spins `1..9` every 3f, lands on `4` at f168
- `f168` `4` lands, purple block slams behind, frame kicks
- `f174` `CHOICES` types out sliced, 2f a letter
- `f186` **Whip pan left** into choice 1

### 4 · CHOICE 1 — OBJECTIVE — f192–264 · 6.4–8.8s
The 3x3 objective grid, but thrown, not faded.
- `f192` Nine cards fly in from nine different edges at once and slam onto the grid, 1f apart
- `f216` Eight cards go 25% and drop back in Z; **Recover Abandoned Checkout** flies forward, purple border stamps on with a hard hit
- `f240` Card holds, tiny float
- `f252` **Card slam-swap** out — card rockets down out of frame

### 5 · CHOICE 2 — SOURCE — f264–336 · 8.8–11.2s
- `f264` Source card rockets up from below, crosses card 1 mid-air
- `f276` Nine integration logos deal in like cards off a deck, 2f apart
- `f300` `KLAVIYO` gets picked: it scales up, everything else blows outward off-frame
- `f324` **Barn door** — frame splits down the middle, both halves fly apart

### 6 · CHOICE 3 — CHANNELS — f336–408 · 11.2–13.6s
- `f336` Four channel cards drop in on a hard vertical, landing on 4 consecutive beats
- `f360` Toggles flick purple **machine-gun**, one every 6f (1/8 note), each flick kicks the frame 3px
- `f396` **Stamp punch** — a purple block punches out from centre, fills the frame, then shrinks into the shape of the next card

### 7 · CHOICE 4 — AGENT — f408–480 · 13.6–16.0s
- `f408` Agent card unfolds from the shrinking purple block
- `f414` `Bridget` types itself into the name field, sliced, 2f a letter
- `f432` `Bridget (Ultra-realistic)` scrambles into place — random glyphs resolving to the real string, seeded
- `f450` Waveform detonates outward from the centre bar, then a linear playhead runs it
- `f468` **Vacuum** — all four cards from all four acts fly back on screen and get sucked into one point at centre

### 8 · SWITCH ON — f480–552 · 16.0–18.4s
- `f480` A single purple dot, alone on cream, pulsing on the beat
- `f504` It **detonates**. Four thin lines fire out to the four edges
- `f516` `IT'S BUILT.` slams on, letters arriving from four directions at once
- `f540` Line gets sucked back into the dot

### 9 · IT DOESN'T STOP — f552–672 · 18.4–22.4s
The real cadence, fired as a ticker, not a list. This is the loudest 4 seconds.
- `f552` Timeline rail draws across the frame in 8f
- `f564` Eight beats fire left to right, one every 12f: `CALL · EMAIL · CALL · SMS · CALL · EMAIL · CALL · BOOKED`
- Each beat: chip slams down onto the rail, frame kicks, timestamp counts up beside it (`NOW / +5 MIN / +6 H / +1 D …`)
- `f648` `BOOKED` lands in coral, everything else drops to 20%
- `f660` **Roll-up** — the whole frame rolls up like a slot reel

### 10 · THE RECEIPT — f672–768 · 22.4–25.6s
- `f672` `$0` on cream, huge, tabular
- `f672–720` Counts to `$100,000+` — stepping on 1/16, digits flickering, not smooth
- `f720` Lands. Frame kicks. Purple rule slams under it.
- `f732` `RECOVERED. EVERY MONTH.` slides in, letter by letter
- `f744` Small, quiet: `Pulsetto`
- `f756` **Ink flood** — dark teal floods diagonally from the bottom-left corner

### 11 · THE LOGO — f768–864 · 25.6–28.8s
- `f768` Dark teal fills. Motion stops dead for 12f. This is the only rest in the film, and it is what makes the logo land.
- `f780` Outcraft logo draws on, white, one clean move, no effects (rule 21)
- `f804` `outcraft.ai` fades in under it
- `f828` A single purple pill button scales in: `Book a demo`. One CTA, one purple element.
- `f852` Hold to `f864`

---

## Every transition is different. No repeats.

| # | Where | Move |
| --- | --- | --- |
| 1 | Spec → Promise | Squash-wipe: frame flattens, cream wipes up |
| 2 | Promise → Count | Drag-off left with smear |
| 3 | Count → Choice 1 | Whip pan |
| 4 | Choice 1 → 2 | Slam-swap: cards cross in mid-air |
| 5 | Choice 2 → 3 | Barn door split |
| 6 | Choice 3 → 4 | Stamp punch: purple block fills, shrinks into next card |
| 7 | Choice 4 → Switch on | Vacuum to a point |
| 8 | Switch on → Cadence | Detonate from the point |
| 9 | Cadence → Receipt | Slot-reel roll-up |
| 10 | Receipt → Logo | Diagonal ink flood |

---

## Components to build (`src/punk/`)

| File | What it does |
| --- | --- |
| `beat.ts` | The 150 BPM grid. `beat(n)`, `bar(n)`, `onBeat(frame)` |
| `SlotDigits.tsx` | Mechanical counter, steps on 1/16, never tweens |
| `SlamText.tsx` | Letters arrive from a chosen direction, overshoot, snap |
| `ScrambleText.tsx` | Random glyphs resolving to a string, seeded |
| `SliceType.tsx` | Typewriter by string slice (rule 6) |
| `Smear.tsx` | Directional motion-blur streak for whips and drags |
| `Panel.tsx` | A UI card as a physical object — 3D rotate, throw, land |
| `StampBlock.tsx` | Colour block that slams in behind type |
| `Vacuum.tsx` / `Detonate.tsx` | Suck-to-point and explode-from-point |
| `Ticker.tsx` | Cadence chips firing along a rail |

Everything still imports colour, type and easing from `src/brand/`.

---

## Built. What moved from the plan.

**Status: all eleven sections built, `npm run lint` clean, rendered to
`outcraft-teaser/out/outcraft-punk.mp4`.** Composition id `Punk` in
`src/Punk.tsx`.

Four things changed during the build and the code is the truth, not the shot
list above:

1. **The channels scene starts 12 frames early** (frame 324, not 336). The barn
   door in scene 5 has to tear open onto something, so scene 6 is already
   sitting underneath it. Its internal beats are offset by `LEAD` in the file,
   and it is lifted below scene 5 with a `zIndex` in `Punk.tsx`.
2. **Fonts now block the render.** `src/brand/fonts.ts` holds a `delayRender`
   until both faces load. Without it a still can be drawn before the woff2
   arrives and silently falls back to Helvetica, with no error.
3. **The agent card is 520 tall, not 560.** At 560 there was a hole under the
   waveform. The `StampPunch` in `Punk.tsx` shrinks to the same 520 — if you
   change one, change both or the cut stops matching.
4. **The receipt rule is black, not purple.** The `+` is the one purple element
   in that shot (DO-NOT-DO 17), so the rule under it had to give way.

Stills used to check the build are in `outcraft-teaser/out/punk-stills/`.

---

## Revision 2 — the premium pass

Seyan watched the first render: *"much better, and I feel good about it."*
Five notes, all applied. This is the current state of the code.

### 1. No camera shake. None.
`Kick` is deleted, not just unused. Every spring in the film is damped further
to compensate — a hard snap with no kick under it reads as cheap, so nothing
snaps any more, it settles. See `LAND_CONFIG` in `motion/text.tsx`.

### 2. Everything is centred
Scenes 1, 2, 3, 9 and 10 were left-hung against the safe area and left half the
frame empty. All of them are centred now, and `Tag` centres too, so the four
choice screens match the type screens.

### 3. The lead-source screen is a logo wall
The old version reused the objective grid — a logo with its own name printed
under it. Duplicated content, as Seyan said. `S05Source.tsx` is rebuilt:

- **Six tiles, six real logos, no text at all.** HubSpot, Salesforce, Shopify,
  Attio, Pipedrive, Klaviyo. The Lucide-mark fallbacks are gone from this shot —
  without a label they read as blank tiles.
- **A scan pass.** A purple highlight steps across every tile in turn before it
  settles. That is what makes the shot readable: it is the system looking at
  each source, not a grid appearing.
- **Klaviyo is last in the order** so the scan ends on the pick.
- **Isolate.** The other five drift out, Klaviyo travels to the middle of the
  wall with one ring pulse, drawn as a border so it can never go soft.

Logos are 60px tall at source. Drawn at 64, chosen tile scales to 1.12. Do not
push past that — there is no larger art.

### 4. The purple block genuinely leaves
`StampPunch` has a fourth phase, `wipe`: after it shrinks to the card shape it
peels off that card left to right and is gone. It used to just stop being drawn.

The card in `S07Agent.tsx` is now positioned dead-centre in the frame with its
tag hanging off it, because the block lands on the frame centre. **If the tag
ever pushes that card down again, the peel uncovers a card that is not where
the block is.** `cardWidth`/`cardHeight` in `Punk.tsx` must match `CARD_W` and
`CARD_H` in `S07Agent.tsx` — currently 1300 x 520.

### 5. Smoother all through
Travel distances cut (760px moves are now 260px — short travel reads as
expensive), `Smear` down to two faint ghosts, `Vacuum` rotation down from 14deg
to 5deg, grid card spin down from 44deg to 24deg.
