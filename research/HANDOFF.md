# Handoff — Outcraft video workshop

Last session: **2026-08-31**. Read this first in a new session.

---

## Newest video: THE UNASKED QUESTION — video 4 (2026-08-31)

In **`checkout/`**, built in **HyperFrames**. 48.0s, 1440 frames, 120 BPM, 24
bars. Twelve scenes, eleven cuts, 91 sound cues, no voiceover. `check` passes
clean: 0 lint, 0 runtime, 0 layout, 43/43 contrast checks pass WCAG AA.
Nothing in `outcraft-teaser/`, `engine/` or `engine-hf/` was touched.

**The brief.** A completely new video — new components, new story, everything —
aimed at **B2C and e-commerce**, carrying the psychology, the speed and the
pitch, with animation pushed further than anything before it. He asked to be
shown the finished thing rather than consulted.

**The spine is a REFRAME.** All three rejected angles were problem-then-rescue
(see below). This one takes a belief the viewer already holds and turns it over:

> An abandoned cart isn't a lost sale. It's a question waiting to be asked.

That is Outcraft's own B2C hero line, so the spine is the company's positioning
rather than an invention. The film is the consequence of taking it literally:
a cart dies → 70% of them do → you call that a lost sale → it isn't, it's a
question → here are the four questions nobody answered → here is the email you
sent instead → so ask them → the questions get answered and the cart comes back
→ it picks the channel they answer on → then it calls back after they buy →
the money → one CTA.

**It closes its own loop.** The $284.00 cart that dies at 3.0s comes back alive,
in purple, at 30.2s — same digits, same size, same place on the frame.

### What the research pass found

`npm run research:refresh` re-read all 14 tracked pages: **0 failed, 6 changed**
since 2026-08-30. Firecrawl was then used directly on the four sources this film
is built from — the B2C page, the Goth N' Rock case study, the Taima case study,
and the channel-decision interview with Outcraft's CEO.

1. **facts.json went from 32 rows to 50.** Eighteen new facts, all with a source
   and a date. Run `npm run facts`.
2. **The Goth N' Rock case study had never been mined.** It is the best B2C
   material in the repo: 14% of carts recovered, ~$25,000 a month recovered,
   $9,000 a month in upsells, repeat customers from 7% to 11%. Plus the
   psychology the film runs on — ~70% cart abandonment, only 20% of first-time
   buyers ever buy again, 27% → 49% after a second purchase, 68% more receptive
   right after they buy.
3. **An orphan stat got traced.** `stat.phone_vs_email` ("phone recovers 17% of
   carts, email about 5%") had carried a risk note since 2026-08-29 saying its
   source URL was never recorded. It is the Goth N' Rock case study, quoting
   "one trial". The row now says so — and says the trial itself is still
   unnamed, which is why the film uses it as a **comparison** across two shots
   and never as a headline stat.
4. **One number was checked against a third party.** "About 70% of carts are
   abandoned" is Outcraft's own prose. It was verified against Baymard
   Institute, which puts it at 70.22% across fifty studies. It is on screen
   because it survived that check.
5. **Taima's $230k splits into $180k cart recovery + $42k upsells**, which is
   new detail nobody had.

**Still deliberately off screen:** the speed claim. `num.first_response`
("median first response under 30 seconds") is unapproved and conflicts with the
older 60-second figure. Video 2 left it off and so does this one — the film says
"in minutes", which is the home page's own wording.

### Three files, all 48.000s

| File | What it is |
| --- | --- |
| `checkout/out/outcraft-checkout-sound.mp4` | Music + sound design. **The one to show people.** |
| `checkout/out/outcraft-checkout-sfx-only.mp4` | Sound design, no music. |
| `checkout/out/outcraft-checkout-silent.mp4` | Picture only. |

### Two things to put to him

1. **Eleven of the eighteen new facts are unapproved.** Six of them are on
   screen: the 70% abandonment rate, the 5%/17% comparison, 68% receptiveness,
   Goth N' Rock's 14% and $9,000, and Taima's $230,000. None is invented and all
   six trace to a source, but he has never seen the Goth N' Rock study at all.
2. **The two customer marks in the money shot are inverted to white**, because
   that shot is near-black and both PNGs are dark on transparent. It preserves
   the shape exactly and is standard for a dark ground — but it is a change to
   somebody else's logo, so it is flagged rather than assumed.

**Nine new rules came out of the build** — read
[../checkout/NOTES.md](../checkout/NOTES.md). The big one: four of the eleven
cuts were built out of the colour the frame was already wearing and were
literally invisible on a rendered still.

---

## The research pipeline went in (2026-08-30)

Research and assets are no longer hand-made. They are pulled by script, and every
number and every file now records where it came from. Full command list in
[../CLAUDE.md](../CLAUDE.md), section "Research and assets".

**Start here, not with this document:**

```bash
npm run facts            # every number we may put on screen, with its source
npm run facts -- --risk  # the ones that could bite us
```

**What the first run found:**

1. **Two customer case studies nobody knew about.** Taima Titanium (over $230,000
   recovered, ~29% conversion, and a real channel split: 69% calls, 26% SMS, 5% email)
   and Warmy (5x more meetings, 3-5 a week to nearly 20). Warmy is the only source we
   have with a clean before/after pair. Neither has been shown to Seyan.
2. **The whole knowledge base is 404.** Five URLs are still in outcraft.ai's own
   sitemap.xml but serve a 404 body with an HTTP 200 status. Listed under `dead_links`
   in [sources.json](sources.json). The refresh tool now catches this by itself.
3. **The site contradicts itself on languages.** The home page says 40+, the pricing
   page says 30+. Ask Seyan before either goes on screen.
4. **A better speed number exists.** The pricing page says "median first response under
   30 seconds". That beats the 60-second Omnisend line the old research used.
5. **Product UI is available after all.** 15 polished product cards from the marketing
   site are now in `assets/product-ui/` — live queue, conversation timeline, voice call,
   cart recovery chat, recovered revenue. Seyan's account is still empty, but this is
   real reference material with realistic data. Video 2 is less blocked than we thought.
7. **The licensing worry is now a 5-item to-do, not a fog.** 29 of 34 sound files traced
   to a Mixkit free licence with a URL. These 5 still need checking before anything goes
   public: `bed.mp3`, `bed-36.mp3`, `sfx/light/sparkle.mp3`, `sfx/riser/riser-cine.mp3`,
   `sfx/transition/whoosh-big.mp3`. Run `npm run assets:verify -- --ship` to see the gate.

**Logos are solved.** All 20 integration logos are now real vector SVG in `assets/logos/`,
light and dark, from the Brandfetch Brand API — 59 files, every brand with a full lockup.
Each brand's own colours and fonts are in `assets/brands.json`, which is what a logo wall
needs if each mark should sit on its own colour.

One trap worth remembering: Brandfetch has **two** different credentials. The "starter key"
is a Bearer token for the Brand API and is the one that works. The short client ID
(`1idJezLIeuvwdZjhpHj`) is for the logo CDN links; it was tested on 2026-08-30 against every
documented URL shape and returns an HTML page, not an image. No tool uses it. Do not waste
time on it again.

---

## Newest video: THE ENGINE — video 2 (2026-08-30)

Compositions `Engine` (silent) and `EngineSound` (audio), in **`engine/`** — a
new Remotion project. 44.0s, 1320 frames, 120 BPM. Lint and tsc clean.
`outcraft-teaser/` was not touched; every cut in it still renders.

**The brief.** An engaging product explainer for the website hero: show the
integrations, show the system, show everything, premium and upbeat, erratic and
spontaneous, and use the six text-animation samples he handed over.

**The spine is a LOOP, not a funnel.** All three rejected angles were
problem-then-rescue. This one follows one signal round a circle and back to
where it started:

> your stack → one signal → something picks it up → an AI sales team → voice,
> SMS, email, WhatsApp → it reads the reply, picks the channel, picks the next
> move → it doesn't stop (the real cadence) → 24/7 → then it writes back into
> your stack → $100,000+ recovered every month → 30x ROI → logo, one CTA.

Scene 1 and scene 8 are the two ends of the loop on purpose. Fifteen
integration marks storm the frame in the first three seconds; six lockups get
ticked at the write-back. Somebody who watches only the first three seconds and
the last ten still gets the whole proposition.

**Three files render from the one timeline:**

| File | What it is |
| --- | --- |
| `engine/out/outcraft-engine-sound.mp4` | Music + sound design. **The one to show people.** -18.2 dB mean, peak -1.1 dBFS, nothing clipped. |
| `engine/out/outcraft-engine-sfx-only.mp4` | Sound design, no music. `--props=props-engine-nobgm.json`. -22.4 dB mean, peak -2.2. |
| `engine/out/outcraft-engine-silent.mp4` | Picture only. |

**The samples were actually used.** All six files in `code samples for text
animation/` are ported in `engine/src/engine/motion/textEffect.tsx`, which
keeps the motion-primitives API — `per`, `preset`, `variants`,
`staggerChildren` and `duration` still written in seconds — and replaces
framer-motion underneath with `useCurrentFrame`. Mount becomes a `start` frame;
`trigger={false}` becomes `exitAt`. The sample-by-sample mapping is at the top
of that file. `blur-slide` from 6.md is the default arrival in every shot;
4.md's rotateX flip is spent once, on ONE SIGNAL.; 3.md's per-line masked
stagger carries the decision shot.

**Ten cuts, no two the same move.** Counted off the code, not off the plan: a
logo implosion, a beacon swallowing the frame, purple barn doors, five cream
bars shredding, a skewed indigo panel, the cadence rail rolling off the top, a
black iris band, the logo wall opening outward, a black shutter, teal ink.

**The audio.** One frame-pinned table in `src/EngineSound.tsx`, 81 cues, no
audio code in any scene. The bed is `engine/public/audio/bed-44.mp3` — the same
120 BPM Mixkit tech-house bed as video 1, rebuilt to 44.0s as its own first
30.0s (15 bars) plus its own first 14.0s (7 bars), 15ms fade across the seam,
both sides on a downbeat.

**Every number on screen is an approved row in facts.json.** `pos.channels`,
`num.integrations`, `num.coverage`, `case.pulsetto.revenue`,
`case.pulsetto.roi`, `claim.decides`, `claim.cadence`. Two things to put to him:

1. **The cadence shows five of its seven steps** (1, 2, 3, 4 and 7, in order).
   Seven rows at a readable size do not fit between the safe margins. Nothing is
   invented, but he has seen all seven in an earlier cut.
2. **Three signal chips** — FORM FILL, ABANDONED CART, MISSED CALL — come from
   `pos.signals`, which is in facts.json with a source and a date but is not
   formally approved. Zero risk noted on the row; worth a yes.

**Deliberately left off:** the speed claim. `num.first_response` ("median first
response under 30 seconds") is unapproved and its own risk note flags a
conflict with the older 60-second figure. It is the single most tempting line
in the research and it stays off screen until he says otherwise.

**Before it goes on the site:** `npm run assets:verify -- --ship` still fails.
The engine's own asset copies are all recorded now — 64 new manifest rows, and
`engine/public/audio` and `engine/public/logos` are tracked by the gate — but
the music bed's Mixkit entry was never recorded and three SFX are unconfirmed.
Fine for showing someone; not fine for the homepage.

---

## Newest cut: the TYPE cut (2026-08-30)

Compositions `TypeCut` (silent) and `TypeCutSound` (audio). 31.5s, 945 frames,
120 BPM. Lint clean. `Punk` and `Explainer` are untouched and still render.

**Three files render from the one timeline:**

| File | What it is |
| --- | --- |
| `out/outcraft-typecut-sound.mp4` | Music + sound design. **The one to show people.** -17.0 dBFS RMS, peak -1.2, nothing clipped. |
| `out/outcraft-typecut-sfx-only.mp4` | Sound design, no music. `--props=props-nobgm.json`. |
| `out/outcraft-typecut-silent.mp4` | Picture only. |

**The picture.** No product UI at all — no cards, toggles, grids, chips or
icons. Eight shots of type, six flat grounds, one logo. All new code in
`outcraft-teaser/src/type/`; it does not reuse `src/ui/` or `src/punk/`.

**The spine.** 60 seconds to reach a lead → "Build a sales team." → "All four
of them." → the word TEAM throws its own four letters out of frame → four words
walk in one at a time and **stay**: CALLS. TEXTS. WHATSAPP. EMAILS. → "Same
lead. Same minute." → IT'S BUILT. → IT DOESN'T STOP. (NOW · 5 MIN · 6 HRS ·
3 DAYS · BOOKED.) → $100,000+ recovered → logo.

**Seven colour transitions, no move repeated:** cream curtain, five black
slats, indigo barn doors, purple slam, a black circle that swallows the frame,
a cream band opening out of the middle, teal flood. Plus the type-driven ones
inside the scenes.

**The audio.** One frame-pinned table in `src/TypeCutSound.tsx`, 43 cues, no
audio code in any scene file. The bed is `public/audio/bed.mp3` — the Mixkit
tech-house drum bed cut at a downbeat 15.661s into the source and time-stretched
from 124.5 BPM to 120 with ffmpeg `atempo`, so it sits on the film's grid. SFX
are copied into `public/audio/sfx/` from the video-shotcraft library.

**Licensing, before this goes anywhere public:** the SFX are mostly Mixkit
Free License (commercial use, no attribution), but
`.claude/skills/video-shotcraft/assets/audio/ATTRIBUTION.md` lists six files
whose origin could not be traced, and says the tech-house bed itself needs
re-checking against the Mixkit library before commercial use. Fine for showing
someone; check it before it goes on the site.

**Open question for him:** 31.5s, or trim. The two cheapest cuts are the
opening spec plate (2.0s) and one cadence stop (0.5s).

## Where we are

**Direction changed again, 2026-08-29 (third pass).** Seyan watched the finished
57.8s v2 explainer and said it was **bland**. The live plan is now
[CONCEPT-v3-punk.md](CONCEPT-v3-punk.md). Read that next.

v3 is the **punk cut**: 28.8s, 150 BPM, eleven sections, ten cuts and no two
cuts alike. Built, lint clean, rendered to
`outcraft-teaser/out/outcraft-punk.mp4` (composition id `Punk`).

**Revision 2 is in** — see the premium pass at the end of the concept doc. He
approved the direction and asked for five things, all applied: no camera shake
anywhere, centred type, the lead-source screen rebuilt as a logo wall with no
text, the purple block peeling fully off the agent card, and softer motion
throughout.

Four things he chose himself, so do not quietly undo them:

1. **Keep the product UI, but wreck it.** Panels get thrown, not presented.
2. **20-30s.** Not 58.
3. **Swiss punk**, not glitch. Clean but violent. Never crypto-ad.
4. **Open on the counter** `00:00` -> `00:60`, played as a machine stating a
   spec. Never as a lead being lost — that is the rejected shape.

`DO-NOT-DO.md` now has a "Suspended for the punk cut" section. Read it before
you "fix" anything in `src/punk/`. The calm `Explainer` composition stays on
disk as the fallback; do not delete it.

Research is done. The spine is now **assembly** ("you choose four things, then
it works and it doesn't stop") — deliberately not problem/rescue, which is the
shape of all three rejected angles.

Three of the eight acts are built and lint clean, cut together as the
`LookTest` composition (`outcraft-teaser/out/look-test.mp4`).

---

## What exists now

| File | What it is |
| --- | --- |
| [outcraft-site.md](outcraft-site.md) | What Outcraft does, in customer words. Positioning, the enemy, real proof numbers. |
| [outcraft-app.md](outcraft-app.md) | The logged-in app: nav map and design language. |
| [outcraft-campaign-setup.md](outcraft-campaign-setup.md) | The full 14-page campaign setup flow, plus the best shots for video. |
| [screens/](screens/) | 22 screenshots, 1920x1080. |
| [rejected-script-v1.md](rejected-script-v1.md) | A finished 39s script. **Rejected.** Record only. |
| [raw/](raw/) | Scraped case-study text. |

---

## Three angles Seyan rejected

Do **not** re-pitch these.

1. **"The Wait"** — lead fills form, waits, buys elsewhere; Outcraft calls in 60 seconds.
2. **"Collect vs Act"** — "most systems collect signals, Outcraft acts on them."
3. **"It Doesn't Stop"** — the real 7-step cadence as beats, ending on "Booked."
   He picked this one, read the full script, then said *"I don't like this angle."*

**The likely reason:** all three share one spine — *problem, then rescue*.
He is not rejecting the wording. He is rejecting the shape.

**Next time:** try a different spine. The customer's voice. The AI's own point
of view. One number. Humour. Or ask him what he wants the viewer to **feel**
before writing anything. Show a fragment, not a full script.

---

## Facts worth keeping

**Superseded by [facts.json](facts.json).** Run `npm run facts`.
The prose below is kept for context only; the JSON file is the one with sources and dates.


**What Outcraft is, in one line:**
An AI sales team that calls, texts, emails and WhatsApps every inbound signal
within minutes — until it books, buys, or hands over with full context.

**Proof numbers:** Pulsetto $100k+/month recovered, 30x ROI, 20%+ of carts
recovered. Omnisend 60-second response, 5x connection rate, 30+ meetings/month.
Industry: phone recovers 17% of carts vs ~5% by email.

**The real default outreach cadence** (from the app, not marketing):
Call now → Email 5 min → Call 6 h → SMS 1 day → Call 1 day → Email 2 days →
Call 2 days → end at 3 days.

**Nice detail:** the AI call has a background sound setting, default "Office",
so it sounds like a person in a room.

**Account state:** Seyan's account #90 is empty. Zero leads, $0 revenue,
all campaigns "Setup Not Completed". There is no real product footage to film.
This does not block video 1 (type only). It does block video 2.

---

## Browser access

`.mcp.json` and `start-chrome-for-claude.cmd` are set up. See
[../CLAUDE.md](../CLAUDE.md). If the `mybrowser` tools are missing, run the
`.cmd` file and restart Claude Code.

**Seyan's rules, binding:**
1. Never open Admin Routes — AI Available Actions, Debug, Admin Panel.
2. Never publish or launch a campaign.
3. Read-only unless he asks for an action.

A draft test campaign **"ZZ Research - Video (do not use)" (id 1304)** exists.
He asked to leave it. Do not archive or delete it.
