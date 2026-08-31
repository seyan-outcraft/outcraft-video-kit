# Video 1 v2 — the homepage explainer

Written 2026-08-29, after Seyan changed the brief.
Replaces the kinetic-type teaser plan. See [HANDOFF.md](HANDOFF.md) for what came before.

**Status: all eight acts built. 57.8s. `npm run lint` passes clean.**
Composition id `Explainer`. Render at `../outcraft-teaser/out/outcraft-explainer.mp4`.

---

## What changed

The brief is now a **homepage explainer**, not a 30–45s type teaser.

| | Old brief | New brief |
| --- | --- | --- |
| Job | Hero teaser + LinkedIn | Main landing page explainer |
| Content | Big type only, no product UI | The product UI, rebuilt in React |
| Length | 30–45s | 57.8s |
| Order | One idea, fast | Start from scratch, step by step |
| Sound | Music + sound design | Silent-first. Sound added later. |

Two project rules are now out of date and I am treating them as superseded:

- CLAUDE.md "no product UI" — the new brief asks for product UI.
- DO-NOT-DO 31 "do not try to show everything" — still binding in spirit.
  We show **five** screens out of fourteen, not fourteen.

The UI is **not** screenshots on screen. Every screen is a React rebuild
using the real brand tokens, so it is sharp at any size, animates natively,
and gets reused for the next video.

---

## The spine: **assembly**

Seyan rejected three angles. All three were *problem → rescue*.
This one is not a rescue. It is a **build**.

> You choose four things. Then it works, and it does not stop.

No villain. No sad prospect. No "most companies fail to…".
The feeling is craft and momentum — a machine getting assembled and switched on.
Closest reference: Linear's product films.

The film answers the three questions a landing page visitor actually has:

1. What do I set up? → the objective, the source, the channels, the agent
2. What does it then do? → the cadence, and the decision on a reply
3. Did it work for anyone? → Pulsetto's numbers

---

## Shot list — 1735 frames @ 30fps

### Act 1a — The hook (0–4.3s · frames 0–130)

Cold open, cream ground. Two Bricolage lines: **"Build a sales team."**
then **"In four choices."** Word-stagger in, then out. No logo, no product.

DO-NOT-DO 29: the hook lands in the first two seconds; the logo waits for act 8.
These two lines are the spine of the film, so they are the first thing said.

`OpenScene.tsx`

### Act 1b — What are you trying to do? (4.3–12.5s · 130–375)

Objective grid, rebuilt from `screens/06-onboarding-step1.png`. Nine of the
app's ten objectives, in a clean 3x3 — "Qualify Inbound Lead" is dropped
because "Qualify Lead" already says it.

Cards stagger in. Then **Recover Abandoned Checkout** takes the purple border
and the other eight fall back to 25%. One selection, one purple element.
It is the objective with the clearest money attached, and it sets up act 7.

`ObjectiveScene.tsx` · `ChoiceGrid.tsx` · `GridCard.tsx`

### Act 2 — Where do the leads come from? (12.5–19.7s · 375–590)

Lead-source grid, rebuilt from `screens/07-onboarding-step2.png`. All nine
sources the app offers. **Klaviyo** is chosen — it is where an abandoned
checkout actually shows up for an ecommerce brand, so it follows straight on
from act 1.

**The logos are real.** They came from Outcraft's own integrations page
(`www.outcraft.ai/hubfs/*_logo.png`) — the same files the company already
publishes. Six sit in `outcraft-teaser/public/logos/`: Klaviyo, HubSpot, Attio,
Microsoft Dynamics, Salesforce, Pipedrive. CSV File and Custom API use our own
Lucide marks, exactly as the app does.

**GoHighLevel is the one gap.** It is not on the integrations page, so it falls
back to a Lucide mark. To fix: drop `public/logos/gohighlevel.png` in and set
`logo:` on that entry in `SourceScene.tsx`.

The source PNGs are only 60px tall, so they are drawn at 46px — about 1:1 — and
this scene's camera push is deliberately tiny. Do not enlarge them.

`SourceScene.tsx`

### Act 3 — Which channels? (19.7–24.7s · 590–740)

Four cards, rebuilt from `screens/14-campaign-channels.png`. The four toggles
flick purple one at a time on a 13-frame beat. Nothing else moves while that
runs.

The card border flashes purple on each flick and settles straight back to the
app's cool grey, so the frame carries one bright purple moment per beat instead
of four loud purple frames at the end.

`ChannelsScene.tsx` · `Toggle.tsx`

### Act 4 — Who is calling? (24.7–34.2s · 740–1025)

Agent card, rebuilt from `screens/19-agent-configuration.png`.
Agent Name **Bridget**. Voice **Bridget (Ultra-realistic)**. Both fields type
themselves — sliced, never faded per character.

Then the waveform lights up left to right. That playhead is linear on purpose:
audio does not ease. Bar heights come from Remotion's seeded `random()`, so the
shape is identical on every render.

It closes on **Call background sound · Office**. The AI call carries office
noise behind it, so it sounds like a person in a room. It is the most human
detail in the product and it reads with the sound off — which is why it gets
the hold at the end of the act.

`AgentScene.tsx` · `Field.tsx` · `Waveform.tsx`

### Act 5 — Then it does not stop (34.2–41.2s · 1025–1235)

The hero shot. The app's real default cadence, rebuilt from
`screens/16-campaign-sequence.png`. Eight rows arriving one per 12 frames:

> now · 5 minutes · 6 hours · 1 day · 1 day · 2 days · 2 days · 3 days

Every row gets the same move and the same spacing. The repetition is the
message, so nothing varies.

`SequenceScene.tsx`

### Act 6 — It reads the reply (41.2–48.8s · 1235–1465)

The only dark shot. Ground flips to the Dark Teal gradient on a hard cut.

A reply types in: *"Can you call me Thursday?"* Then three channel chips —
Call, Email, SMS. **Call** fills purple: the lead asked for a call, so it calls.
Then, in Bricolage: **"It picks the next move."**

Fifty seconds of the same light grey is fifty seconds of one note. This is the
moment the product stops being a setup form and starts making a decision, so it
gets its own ground. Two brand colours only — teal and purple.

`ReplyScene.tsx`

### Act 7 — Proof (48.8–54.6s · 1465–1640)

Performance Funnel, rebuilt from `screens/02-analytics-overview.png`, but
filled with a real customer instead of the zeros in the empty account:

> 100,000+ AI calls · 40% engagement · $100k+ per month — Pulsetto, six months live

Numbers run up and stop. **Every figure is published and real.** Nothing on
this card is invented. Do not invent numbers for this shot.

`ProofScene.tsx` · `CountUp.tsx`

### Act 8 — One thing to do (54.6–57.8s · 1640–1735)

Logo lands — here and nowhere else. One purple button, **Start free**. Then
`outcraft.ai`. One CTA, no second option.

`EndScene.tsx`

---

## The motion system

**Two transitions only, repeated** (rule 28):

1. **Push** — `src/transitions/push.tsx`. The screen you leave grows 6% and is
   gone by 60% of the cut; the one you arrive at starts at 40% and comes up
   from behind it. They never overlap while both are readable.
2. **Hard cut** — used only where the ground colour changes: cream into the
   objective grid, and in and out of act 6. A cross-fade there just smears one
   colour into another.

**One enter move, everywhere** — `src/ui/Rise.tsx`. Up 12–24px, decelerating,
0.985 → 1 scale. Cards, rows, stats, chips and headers all use it. That single
reuse is what makes nine different screens feel like one film.

**One camera move per shot** — `src/ui/Camera.tsx`. A slow 2.5D push in Z.
No tilt, no orbit, no fake laptop mockup.

**Sound, when it comes.** Silent-first, but every beat already sits on a frame:
four toggle clicks in act 3, eight ticks in act 5, one warm chord on the
numbers in act 7. Adding audio is a mix job, not a re-edit.

---

## What is built

Everything. `npm run lint` (eslint + tsc) passes clean.

```
src/ui/uiTokens.ts      the app design language, scaled 1.7x for video
src/ui/Screen.tsx       page ground + content column
src/ui/Card.tsx         white card, cool border, purple-on-active
src/ui/GridCard.tsx     a choice card — partner logo OR Lucide mark
src/ui/ChoiceGrid.tsx   3x3 of GridCards where exactly one gets chosen
src/ui/SceneHeader.tsx  eyebrow + page title, shared by every app screen
src/ui/IconChip.tsx     pale purple rounded square, Lucide icon
src/ui/Toggle.tsx       the purple switch, driven 0..1 by the frame
src/ui/Field.tsx        a labelled input that types itself
src/ui/Waveform.tsx     the voice preview, seeded so it never changes
src/ui/Rise.tsx         the one enter move, used everywhere
src/ui/CountUp.tsx      a number that runs up and stops
src/ui/Camera.tsx       2.5D push
src/transitions/push.tsx

src/scenes/OpenScene.tsx        act 1a
src/scenes/ObjectiveScene.tsx   act 1b
src/scenes/SourceScene.tsx      act 2
src/scenes/ChannelsScene.tsx    act 3
src/scenes/AgentScene.tsx       act 4
src/scenes/SequenceScene.tsx    act 5
src/scenes/ReplyScene.tsx       act 6
src/scenes/ProofScene.tsx       act 7
src/scenes/EndScene.tsx         act 8

src/Explainer.tsx       all eight acts — 57.8s
src/LookTest.tsx        acts 3, 5, 7 only — 17s, kept for quick look checks
```

Preview: `cd outcraft-teaser && npm run dev` → composition **Explainer**.

---

## Open items

1. **GoHighLevel logo.** The one missing mark. Fix is in act 2 above.
2. **Sign-off on the proof numbers** in act 7. They are Pulsetto's published
   figures, but putting a customer name and revenue on the homepage needs
   their yes.
3. **Sound.** Every beat already sits on a frame, so this is a mix, not a re-edit.
4. **A 30s cut**, if the homepage wants one: acts 1, 3, 5, 7, 8. Same
   components, no new work.
