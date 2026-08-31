# Outcraft AI — video kit

## What this is
This is the workshop where **every** Outcraft AI video gets built.
It is not one video. Each new brief becomes a **new folder** with its own film.

Framework: **HyperFrames**, every time. One HTML file, one paused GSAP timeline,
no React and no build step. Do not introduce another framework.

Brand: **Outcraft**, every time. The brand kit is locked. See "The brand kit".

## Start here
When the user has a new brief, run the skill:

```
/new-video
```

It interviews them, checks their facts, scaffolds the folder, writes the film,
and runs the three renders. Do not build a video by hand instead.

## Before you build anything
1. Read [DO-NOT-DO.md](DO-NOT-DO.md). Every rule there is binding.
2. Read [outcraft-brand-book-v1.0.md](outcraft-brand-book-v1.0.md).
3. Read [checkout/NOTES.md](checkout/NOTES.md). Nine hard-won rules live there.
4. Read [engine-hf/TRANSLATION_NOTES.md](engine-hf/TRANSLATION_NOTES.md).

## The two reference films
Copy patterns **out of** these. Never edit them. They are finished and closed.

| Film | Folder | What it is |
| --- | --- | --- |
| THE ENGINE | [engine-hf/](engine-hf/) | 48.0s B2B product explainer, homepage hero. 120 BPM, eleven scenes, ten cuts, 83 sound cues. |
| THE UNASKED QUESTION | [checkout/](checkout/) | 48.0s B2C / e-commerce explainer. 120 BPM, twelve scenes, eleven cuts, 91 sound cues. Built on a reframe, not problem-then-rescue. |

House style, taken from both:
- Music and sound design. **No voiceover.**
- 120 BPM grid. **Never go above 120 BPM.**
- Blur-slide words are the default text move.
- Big type, marks and colour. No product UI unless the brief asks for it and
  real screenshots exist.
- No two cuts the same.

## Research and assets — the shared pipeline
Run these from this root folder, not from a video folder.

| Need | Command |
| --- | --- |
| What can I put on screen? | `npm run facts` |
| Only what is approved | `npm run facts -- --ok` |
| Only what carries a warning | `npm run facts -- --risk` |
| Re-read outcraft.ai, report what changed | `npm run research:refresh` |
| Pull every logo and product shot the site uses | `npm run assets:site` |
| Pull every integration logo, vector | `npm run asset:logo -- --all` |
| Pull one logo | `npm run asset:logo -- shopify.com` |
| Is every asset recorded and licensed? | `npm run assets:verify` |
| **Gate before anything goes public** | `npm run assets:verify -- --ship` |
| Has the brand kit drifted? | `npm run brand:check` |

Binding rules:

1. **[research/facts.json](research/facts.json) is the only place a number comes
   from.** Not in there with a source and a date? It does not go on screen. Add
   the row first.
2. **[assets/manifest.json](assets/manifest.json) is the only place an asset
   comes from.** Every file needs a row saying where it came from and what the
   licence is. The pull scripts write the row for you.
3. **`npm run assets:verify -- --ship` must pass before a video goes public.**
4. **Two logo sources, two jobs.** `assets:site` gets the customer logos Outcraft
   already publishes. `asset:logo` gets partner marks from Brandfetch as real
   vector SVG. Never use the site's own copies for a partner logo — they are
   67x60 px and go soft at 1920x1080.
5. **Secrets live in `.env` at this root. `.env` is never committed.**
   See `.env.example`.

Copy assets into a video's own `assets/` folder. Never import across video folders.

## Making a new video
Do **not** edit an old film. Make a **new folder**.

Claude picks a slug from the brief and says what it picked. Short, lower-case,
dashes — `ui-demo`, `feature-reveal`, `linkedin-cutdown`.

```
outcraft-video-kit/
  engine-hf/       <- reference film. Leave alone.
  checkout/        <- reference film. Leave alone.
  ui-demo/         <- NEW video
    BRIEF.md          <- the brief, written down
    STORYBOARD.md     <- spine, scenes, cuts, video direction
    NOTES.md          <- what it is, and any rule it cost to find
    index.html        <- the whole film: grounds, scenes, cuts, one timeline
    hyperframes.json
    meta.json
    package.json
    tools/
      cues.mjs           <- every sound, one table
      gen-audio.mjs      <- writes the audio tags from that table
      record-assets.mjs  <- records this folder's assets in the root manifest
    assets/           <- music bed, SFX, logos, fonts. Copied in.
    out/              <- renders and stills. Gitignored.
```

Rules for every new video:
1. Copy `checkout/`'s `package.json`, `hyperframes.json` and `tools/` as the
   starting shape. Change the slug in every script.
2. Copy the brand marks from [outcraft-teaser/public/brand/](outcraft-teaser/public/brand/)
   and the two brand faces from `checkout/assets/fonts/`.
3. Never invent a colour, size or easing curve. Take it from the brand book, or
   from a reference film.
4. Reuse a scene by **copying** it in. Never edit the original.
5. Old videos stay on disk and stay working. Nothing gets deleted or renamed.
6. **Always render all three files** — music + SFX, SFX only, silent.
7. Add the new video to "Where things live" in this file.

## Where things live

### Videos
| Video | Folder | State |
| --- | --- | --- |
| THE ENGINE — B2B explainer | [engine-hf/](engine-hf/) | Built. Reference film. Read [TRANSLATION_NOTES.md](engine-hf/TRANSLATION_NOTES.md). |
| THE UNASKED QUESTION — B2C explainer | [checkout/](checkout/) | Built. Reference film. Read [NOTES.md](checkout/NOTES.md). |

### The shared pipeline
| Thing | Path |
| --- | --- |
| Facts cleared for screen, with source and date | [research/facts.json](research/facts.json) |
| Pages we re-read, and the dead links we found | [research/sources.json](research/sources.json) |
| The scraped pages themselves | [research/pages/](research/pages/) |
| Every asset, where it came from, and its licence | [assets/manifest.json](assets/manifest.json) |
| Third-party integration logos | [assets/logos/](assets/logos/) |
| Customer logos Outcraft already publishes | [assets/logos-customers/](assets/logos-customers/) |
| Product UI shots from the marketing site | [assets/product-ui/](assets/product-ui/) |
| Each partner brand's own colours and fonts | [assets/brands.json](assets/brands.json) |
| The scripts behind all of it | [tools/](tools/) |
| API keys. Never committed. | `.env` (see `.env.example`) |

### The brand kit — the master copy
Locked. If a value must change, change it here first, then say so out loud.

| Thing | Path |
| --- | --- |
| Brand colours, type scale, safe area | [outcraft-teaser/src/brand/tokens.ts](outcraft-teaser/src/brand/tokens.ts) |
| Easing, durations, springs, stagger | [outcraft-teaser/src/brand/motion.ts](outcraft-teaser/src/brand/motion.ts) |
| Fonts (Bricolage + Inter) | [outcraft-teaser/src/brand/fonts.ts](outcraft-teaser/src/brand/fonts.ts) |
| Logos and marks | [outcraft-teaser/public/brand/](outcraft-teaser/public/brand/) |
| Music beds and SFX from the first teaser | [outcraft-teaser/public/audio/](outcraft-teaser/public/audio/) |

The `outcraft-teaser/` folder holds the brand kit and nothing else. There is no
video in it here. The tools expect the kit at that path, so do not move it.

### Shared reading
| Thing | Path |
| --- | --- |
| Text animation references | [code samples for text animation/](code%20samples%20for%20text%20animation/) |
| Research: what Outcraft does | [research/outcraft-site.md](research/outcraft-site.md) |
| Research: the app UI | [research/outcraft-app.md](research/outcraft-app.md) |
| Research: campaign setup flow | [research/outcraft-campaign-setup.md](research/outcraft-campaign-setup.md) |
| Research: screenshots | [research/screens/](research/screens/) |

## Commands

Root level, from this folder:

```bash
npm run facts                    # what can go on screen, and what cannot
npm run research:refresh         # re-read outcraft.ai, report what changed
npm run assets:site              # pull every logo and product shot the site uses
npm run asset:logo -- --all      # every integration logo, as vector SVG
npm run assets:verify            # is everything recorded and licensed?
npm run assets:verify -- --ship  # the gate. Must pass before anything goes public.
npm run brand:check              # has the brand kit drifted?
```

Inside a video folder with slug `<slug>`:

```bash
cd <slug>
npm run check          # lint, runtime, layout, motion, contrast
npm run dev            # HyperFrames Studio, live preview
npm run snapshot       # stills at the scene midpoints

npm run render         # music + SFX
npm run render:sfx     # sound design only
npm run render:silent  # picture only
npm run render:all     # all three

node tools/gen-audio.mjs      # after editing tools/cues.mjs
node tools/record-assets.mjs  # after adding or changing an asset
```

There are **no** `remotion` commands here, no compositions to register and no
props files. HyperFrames only.

## Staying in sync with the main workshop
This kit is a copy. The brand kit, the research pipeline and the two reference
films come from Seyan's main workshop.

```bash
git pull upstream main    # get brand kit and pipeline updates
```

Never change a value inside `outcraft-teaser/src/brand/`. If a brand value is
wrong, tell Seyan. He changes it in the main workshop and it comes back down.

## Skills to use
- `/new-video` — the entry point for any new brief. Start here.
- `hyperframes` — the framework router
- `hyperframes-core`, `hyperframes-animation`, `hyperframes-audio`,
  `hyperframes-keyframes`, `hyperframes-cli`, `hyperframes-creative`
- `media-use` — sourcing BGM, SFX, logos, fonts
- `motion-art-direction`, `animation-principles`, `beat-sync-editing`
- `shot-composition`, `color-motion`, `logo-animation`, `motion-background`
- `better-typography`, `brand-guidelines`
