/**
 * Record this video's copied assets in the root assets/manifest.json.
 *
 * DO-NOT-DO 73: a video folder that is not in the ship gate means the gate
 * reports a clean pass on a film whose assets were never checked. Every media
 * file under checkout/assets/ gets a row here pointing back at the row it was
 * copied from, carrying the SAME licence and the SAME approval state — so
 * anything still unresolved upstream stays unresolved here rather than quietly
 * becoming clean.
 *
 * Where each thing came from:
 *
 *   checkout/assets/audio/*   <-  engine-hf/assets/audio/*   (video 3)
 *   checkout/assets/fonts/*   <-  engine-hf/assets/fonts/*   (video 3)
 *   checkout/assets/logos/*   <-  assets/logos-customers/*   (pulled from the
 *                                 marketing site, so safe to reuse)
 *
 * `assets/brand/` is deliberately not covered, for the same reason the other
 * videos' brand folders are not in the gate's TRACKED list: those are
 * Outcraft's own marks, not third-party media whose licence has to be proved.
 * `assets/vendor/gsap.min.js` is code, not media, and is not a manifest asset.
 *
 *   node tools/record-assets.mjs
 *
 * Idempotent: re-running replaces this video's rows rather than duplicating.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, posix, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

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

/* Which row upstream a copied file inherits its licence from. */
function parentOf(file) {
  if (file.startsWith('checkout/assets/audio/')) {
    return file.replace('checkout/assets/', 'engine-hf/assets/');
  }
  if (file.startsWith('checkout/assets/fonts/')) {
    return file.replace('checkout/assets/', 'engine-hf/assets/');
  }
  if (file.startsWith('checkout/assets/logos/')) {
    return file.replace('checkout/assets/logos/', 'assets/logos-customers/');
  }
  return null;
}

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const byFile = new Map(manifest.assets.map((a) => [a.file, a]));

/* Drop any rows this script wrote before, so it can be re-run. */
manifest.assets = manifest.assets.filter((a) => !a.file.startsWith('checkout/assets/'));

const rows = [];
const orphans = [];

for (const file of ['checkout/assets/audio', 'checkout/assets/fonts', 'checkout/assets/logos'].flatMap(walk)) {
  const source = parentOf(file);
  const parent = source && byFile.get(source);
  if (!parent) {
    orphans.push(file + (source ? '  (no row for ' + source + ')' : '  (no rule)'));
    continue;
  }
  rows.push({
    ...parent,
    file,
    bytes: statSync(join(ROOT, file)).size,
    copied_from: source,
    copied_for: 'checkout',
  });
}

manifest.assets.push(...rows);
manifest.assets.sort((a, b) => a.file.localeCompare(b.file));
manifest.updated = new Date().toISOString().slice(0, 10);

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');

console.log(`recorded ${rows.length} checkout rows`);
if (orphans.length) {
  console.log('\nNO PARENT ROW — these need recording by hand:');
  for (const o of orphans) console.log('  ' + o);
  process.exitCode = 1;
}
