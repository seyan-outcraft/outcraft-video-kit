# Setup — read this first

This repo makes Outcraft AI motion videos. You describe a brief, Claude builds
the film, and you get three mp4 files.

Takes about 15 minutes to set up. Do it once.

---

## 1. What you need

| Thing | Check it works |
| --- | --- |
| Node 20 or newer | `node --version` |
| Git | `git --version` |
| Claude Code | `claude --version` |
| ffmpeg (for rendering) | `ffmpeg -version` |

Missing something?

- Node — https://nodejs.org (take the LTS one)
- Git — https://git-scm.com/downloads
- Claude Code — https://claude.com/claude-code
- ffmpeg — Windows: `winget install ffmpeg` · Mac: `brew install ffmpeg`

---

## 2. Clone the repo

```bash
git clone https://github.com/<org>/outcraft-video-kit.git
cd outcraft-video-kit
npm install
```

---

## 3. Add your API keys

Two free signups. Neither asks for a card.

```bash
cp .env.example .env
```

Now open `.env` and fill in two lines:

| Key | Where to get it | What it does |
| --- | --- | --- |
| `FIRECRAWL_API_KEY` | https://www.firecrawl.dev | Re-reads outcraft.ai so on-screen facts stay true |
| `BRANDFETCH_API_KEY` | https://developers.brandfetch.com/register | Pulls partner logos as real vector SVG |

For Brandfetch, take the **starter key** (a Bearer token), not the short client
ID. They are two different things and only one works.

`.env` is gitignored. It never leaves your machine. Never paste a key anywhere
else.

---

## 4. Install the HyperFrames skills

The videos are built in HyperFrames. Claude needs its skills.

```bash
claude
```

Then inside Claude Code:

```
/plugin marketplace add hyperframes/hyperframes
/plugin install hyperframes
```

Check it worked — this should list `hyperframes`, `hyperframes-core` and
friends:

```
/skills
```

---

## 5. Test it before you build anything

Three commands. All three should pass.

```bash
npm run facts          # lists every number cleared for screen
npm run assets:verify  # every asset has a source and a licence
npm run brand:check    # the brand kit has not drifted
```

Then render one of the reference films end to end. It proves your machine can
do the whole job:

```bash
cd checkout
npm run check
npm run render:silent
```

You should get `checkout/out/outcraft-checkout-silent.mp4`. Watch it. That is
the house style. Your films should feel like that.

---

## 6. Make your first video

```bash
cd outcraft-video-kit
claude
```

Then type:

```
/new-video
```

Claude asks you six questions. Answer them. It then plans the film, builds it,
and renders three files into `<your-slug>/out/`:

| File | Use it for |
| --- | --- |
| `outcraft-<slug>-sound.mp4` | The final. Music + sound design. |
| `outcraft-<slug>-sfx-only.mp4` | When the page already has music. |
| `outcraft-<slug>-silent.mp4` | Social feeds that autoplay muted. |

---

## The rules that are not negotiable

Claude enforces these. Do not talk it out of them.

1. **A number with no source does not go on screen.** Everything on screen
   comes from `research/facts.json`, with a source and a date. If your number
   is not in there, add the row first.
2. **Every asset needs a licence row** in `assets/manifest.json`. The pull
   scripts write the row for you.
3. **`npm run assets:verify -- --ship` must pass** before anything goes public.
4. **Never change the brand kit.** It lives in `outcraft-teaser/src/brand/` and
   `outcraft-teaser/public/brand/`. If a value looks wrong, tell Seyan. He
   changes it upstream and it comes back to you.
5. **Never edit `engine-hf/` or `checkout/`.** They are finished films and the
   reference for everything. Copy out of them. Never into them.
6. **Never commit `.env`,** and never commit an mp4. Both are gitignored
   already — leave that alone.

---

## Staying up to date

Seyan's workshop is the upstream. Link it once:

```bash
git remote add upstream https://github.com/<org>/outcraft-video-kit.git
```

Then whenever you want the latest brand kit and pipeline:

```bash
git pull upstream main
```

---

## When something breaks

| Problem | Fix |
| --- | --- |
| `npm run check` fails | Read the error. It names the file and line. |
| Render is silent when it should have sound | Run `node tools/gen-audio.mjs`, then render again. |
| A logo looks blurry | You used a bitmap. Run `npm run asset:logo -- <domain>` for real vector. |
| `assets:verify` fails | An asset has no manifest row. Run `node tools/record-assets.mjs` in that video folder. |
| `brand:check` reports drift | You changed the brand kit. Run `npm run brand:sync` to put it back. |
| Claude does not know HyperFrames | Step 4 did not take. Re-run the plugin install. |

Still stuck? Ask Claude. It can read every file in this repo, including this one.
