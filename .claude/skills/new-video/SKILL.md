---
name: new-video
description: Build a new Outcraft AI motion video from a brief. Interviews the user, checks every on-screen number against research/facts.json, scaffolds a new HyperFrames folder, writes the film, and renders all three cuts. Use for any request to make, create, plan or build an Outcraft video, teaser, explainer, feature reveal, social cutdown or ad. Also use when the user types /new-video or hands over a brief with no framework named.
---

# Make a new Outcraft video

You are building a 1920x1080 HyperFrames film in the Outcraft house style.
Work through the steps in order. Do not skip a step. Do not stop for approval
in the middle — build the whole film, then report.

## Step 0 — load the rules

Read these before you write anything:

1. `CLAUDE.md` at the repo root
2. `DO-NOT-DO.md` — every rule is binding
3. `outcraft-brand-book-v1.0.md`
4. `checkout/NOTES.md` — nine rules that cost a whole film to find
5. `engine-hf/TRANSLATION_NOTES.md`

Then load the `hyperframes` skill. It is the framework router.

## Step 1 — interview

Ask these six questions. Use `AskUserQuestion` so they can click. Ask them all
in one go, not one at a time.

1. **What is this film for?** Website hero, LinkedIn, paid social, sales deck,
   product page, launch announcement.
2. **Who is watching?** B2B buyer (pipeline, reps, cost per meeting) or B2C
   shopper (cart, checkout, basket). This decides the whole vocabulary.
3. **How long?** 15s social cutdown, 30s teaser, 45–48s explainer.
4. **What is the ONE idea?** One sentence. If they give three, make them pick.
   A film with two ideas has none.
5. **Any number or claim that must be on screen?** Take them verbatim. You
   will check them in Step 2.
6. **Any reference?** A film of ours to feel like, or a link.

If the user already wrote a full brief, do not re-ask what the brief answers.
Ask only what is missing.

## Step 2 — check the facts

Run:

```bash
npm run facts -- --ok
```

Every number from question 5 must appear there with a source and a date.

- **In the list and approved** — use it.
- **In the list with a risk note** — tell the user the note, then use the safe
  wording, not the raw number.
- **Not in the list** — it does **not** go on screen. Tell the user plainly.
  Offer to research it (`npm run research:refresh`) and add the row first.

Never soften this. A number with no row is a made-up number.

## Step 3 — pick the slug

Pick a short, lower-case, dashed slug from the brief. Say what you picked and
why, in one line. Examples: `ui-demo`, `feature-reveal`, `linkedin-cutdown`.

Refuse a slug that collides with `engine-hf`, `checkout`, `outcraft-teaser`,
`assets`, `research` or `tools`.

## Step 4 — write the brief down

Create `<slug>/BRIEF.md`. Their answers, in their words. This is the record of
what was asked for. It is not your interpretation.

## Step 5 — write the storyboard

Create `<slug>/STORYBOARD.md`. Copy the shape of
[checkout/STORYBOARD.md](../../../checkout/STORYBOARD.md).

It must contain:

- **The spine.** One line. What the film argues.
- **The scenes.** One row each: number, start, end, what is on screen, the
  words, the feeling.
- **The cuts.** One row each: frame, kind of cut, why that kind.
- **Video direction.** Type treatment, colour, marks, sound character.

Hard requirements:

- **120 BPM.** Never faster. At 120 BPM one bar is 2.0 seconds.
- Every scene start and every cut lands on a beat.
- **No two cuts the same kind.** Panels, bars, iris, barn doors, flood, whip,
  match cut — pick a different one each time.
- **Minimum hold is 1 bar (2.0s) for anything with words in it.** Video 2
  shipped with two shots under a bar and they were unreadable. See the note at
  the top of `engine-hf/`.
- Prefer a **reframe** over problem-then-rescue. `checkout/` does this; it is
  the stronger shape.

Show the user the spine and the scene list in your reply. Then keep going.
Do not wait.

## Step 6 — scaffold the folder

```bash
cp -r checkout/tools <slug>/tools
cp checkout/package.json checkout/hyperframes.json checkout/meta.json <slug>/
mkdir -p <slug>/assets <slug>/out
```

Then replace every `checkout` with `<slug>` in `<slug>/package.json`, and fix
the `--at` times in the `snapshot` script to your own scene midpoints.

## Step 7 — assets

Use the `media-use` skill for BGM, SFX, images and icons.

Brand marks and fonts come from this repo, not the internet:

```bash
cp outcraft-teaser/public/brand/*.svg <slug>/assets/brand/
cp -r checkout/assets/fonts <slug>/assets/fonts
```

Partner or customer logos:

```bash
npm run asset:logo -- <domain>     # partner mark, real vector SVG
npm run assets:site                # customer logos Outcraft already publishes
```

Never hand-grab a logo from a web page. Never use the site's own copy of a
partner logo — it is 67x60 px and goes soft at 1920x1080.

After adding anything:

```bash
cd <slug> && node tools/record-assets.mjs
```

## Step 8 — build the film

Write `<slug>/index.html`. One file. Grounds, scenes, cuts, one paused GSAP
timeline. Load `hyperframes-core` for the timing contract and
`hyperframes-animation` for the motion.

House style, not optional:

- Blur-slide words are the default text move.
- Big type, brand marks and colour. No product UI unless the brief asked for it
  **and** real screenshots exist in `assets/product-ui/`.
- No voiceover. Ever.
- Take every colour, size and curve from the brand book or a reference film.
  Invent nothing.

## Step 9 — sound

Write `<slug>/tools/cues.mjs`. One table. Every sound, frame-pinned. Copy the
shape from `checkout/tools/cues.mjs` — 91 cues, and it is the model.

Then:

```bash
cd <slug> && node tools/gen-audio.mjs
```

That writes the audio tags into the markup and clamps each cue to its file.
Never hand-write an audio tag.

## Step 10 — look at it

```bash
cd <slug>
npm run check
npm run snapshot
```

`check` covers lint, runtime, layout, motion and contrast. It must pass.

Then **actually open the stills** in `out/stills/` and read them. You are
looking for:

- Text that is cut off, too small, or outside the safe area.
- A shot that holds for under a bar and cannot be read.
- Contrast that fails.

Fix what you find. Snapshot again. Repeat until the stills are clean.

## Step 11 — render all three

Never one. Always three.

```bash
cd <slug>
npm run render:all
```

That gives you:

- `out/outcraft-<slug>-sound.mp4` — music + SFX
- `out/outcraft-<slug>-sfx-only.mp4` — sound design only
- `out/outcraft-<slug>-silent.mp4` — picture only

## Step 12 — close it out

1. Write `<slug>/NOTES.md`: what the film is, its spine, and any rule you had
   to find on the way.
2. Add the new video to the "Videos" table in the root `CLAUDE.md`.
3. Run the ship gate before anything goes public:

```bash
npm run assets:verify -- --ship
```

If it fails, the film does not go out. Fix the manifest rows first.

## Report

When you are done, say only:

- The slug and the length.
- The spine, in one line.
- Where the three files are.
- Anything you had to leave out, and why.
