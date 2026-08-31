/**
 * Record this video's copied assets in the root assets/manifest.json.
 *
 * DO-NOT-DO 73: a video folder that is not in the ship gate means the gate
 * reports a clean pass on a film whose assets were never checked. Every file
 * under engine-hf/assets/ that came out of engine/public/ gets a row here
 * pointing back at the row it was copied from, carrying the SAME licence and
 * the SAME approval state — so anything unresolved in video 2 stays unresolved
 * here rather than quietly becoming clean.
 *
 * The two woff2 faces are new to the repo. Remotion fetched its fonts from
 * Google at build time and nothing was ever on disk to record; this port
 * bundles them, so they are real assets now and they get real rows.
 *
 *   node engine-hf/tools/record-assets.mjs
 *
 * Idempotent: re-running replaces this video's rows rather than duplicating.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = join(here, '..', '..');
const MANIFEST = join(ROOT, 'assets', 'manifest.json');

const MEDIA = /\.(svg|png|jpg|jpeg|webp|gif|mp3|wav|m4a|aac|mp4|mov|woff2?|otf|ttf)$/i;

function walk(dir) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return [];
  const out = [];
  for (const entry of readdirSync(abs, { withFileTypes: true })) {
    const rel = posix.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(rel));
    else if (MEDIA.test(entry.name)) out.push(rel);
  }
  return out;
}

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const byFile = new Map(manifest.assets.map((a) => [a.file, a]));

/* Drop any rows this script wrote before, so it can be re-run. */
manifest.assets = manifest.assets.filter((a) => !a.file.startsWith('engine-hf/assets/'));

const rows = [];
const orphans = [];

/* `assets/brand/` is deliberately not in this list, for the same reason
   `engine/public/brand` and `outcraft-teaser/public/brand` are not in the ship
   gate's TRACKED list: those are Outcraft's own marks, not third-party media
   whose licence has to be proved. */
for (const file of ['engine-hf/assets/audio', 'engine-hf/assets/logos'].flatMap(walk)) {
  /* engine-hf/assets/<rest>  <-  engine/public/<rest> */
  const source = file.replace('engine-hf/assets/', 'engine/public/');
  const parent = byFile.get(source);
  if (!parent) {
    orphans.push(file);
    continue;
  }
  rows.push({
    ...parent,
    id: parent.id,
    file,
    bytes: statSync(join(ROOT, file)).size,
    copied_from: source,
    copied_for: 'engine-hf',
  });
}

/* The two bundled brand faces. */
const FONTS = [
  {
    id: 'fonts/bricolage-grotesque-latin',
    file: 'engine-hf/assets/fonts/bricolage-grotesque-latin.woff2',
    original_name:
      'Bricolage Grotesque, latin subset. The exact woff2 @remotion/google-fonts resolves for weight 700, taken from engine/node_modules so the metrics match the Remotion cut frame for frame.',
    source: 'google-fonts',
    source_url:
      'https://fonts.google.com/specimen/Bricolage+Grotesque',
    licence: 'SIL Open Font License 1.1',
    licence_note: 'OFL permits embedding and redistribution. Already the brand display face.',
  },
  {
    id: 'fonts/inter-latin',
    file: 'engine-hf/assets/fonts/inter-latin.woff2',
    original_name:
      'Inter, latin subset. The exact woff2 @remotion/google-fonts resolves for weights 400 and 600.',
    source: 'google-fonts',
    source_url: 'https://fonts.google.com/specimen/Inter',
    licence: 'SIL Open Font License 1.1',
    licence_note: 'OFL permits embedding and redistribution. Already the brand body face.',
  },
];

for (const f of FONTS) {
  if (!existsSync(join(ROOT, f.file))) {
    orphans.push(f.file);
    continue;
  }
  rows.push({
    ...f,
    kind: 'font',
    format: 'woff2',
    bytes: statSync(join(ROOT, f.file)).size,
    pulled: '2026-08-30',
    approved_for_video: true,
    copied_for: 'engine-hf',
  });
}

manifest.assets.push(...rows);
manifest.assets.sort((a, b) => a.file.localeCompare(b.file));
manifest.updated = new Date().toISOString().slice(0, 10);

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');

console.log(`recorded ${rows.length} engine-hf rows`);
if (orphans.length) {
  console.log(`\nNO PARENT ROW — these need recording by hand:`);
  for (const o of orphans) console.log('  ' + o);
  process.exitCode = 1;
}
