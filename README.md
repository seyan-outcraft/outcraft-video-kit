# Outcraft AI — video kit

Make Outcraft motion videos from a brief. Claude does the building.

**New here? Read [SETUP.md](SETUP.md).** It takes 15 minutes, once.

---

## The short version

```bash
git clone https://github.com/<org>/outcraft-video-kit.git
cd outcraft-video-kit
npm install
cp .env.example .env      # then fill in two free API keys
claude
```

Then type `/new-video`, answer six questions, and wait.

You get three mp4 files: music + sound, sound only, and silent.

## What is in here

| Folder | What it is |
| --- | --- |
| `engine-hf/` | Reference film. 48s B2B explainer. Copy out of it, never into it. |
| `checkout/` | Reference film. 48s B2C explainer. Same rule. |
| `research/` | Every fact cleared for screen, with a source and a date. |
| `assets/` | Every logo and image, with its licence. |
| `outcraft-teaser/` | The brand kit. Colours, type, motion, marks. Locked. |
| `tools/` | The research and asset scripts behind `npm run ...`. |
| `.claude/skills/new-video/` | The skill that builds a film from a brief. |

## The house style

- **HyperFrames.** One HTML file, one paused GSAP timeline. No React.
- **120 BPM.** Never faster.
- **Music and sound design. No voiceover.**
- Big type, brand marks and colour. Product UI only with real screenshots.
- No two cuts the same.

## The rules

Six of them, in [SETUP.md](SETUP.md#the-rules-that-are-not-negotiable).
The short version: nothing goes on screen without a source, nothing ships
without a licence, and the brand kit never changes.
