#!/usr/bin/env node
// Check that every asset on disk is recorded, and that nothing unapproved reaches a render.
//
//   npm run assets:verify           report only
//   npm run assets:verify -- --ship strict: fail if anything is not cleared for public use
//
// This is the gate that stops a video going on the website with music or a logo
// nobody can prove we are allowed to use.

import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, posix } from 'node:path';
import { ROOT, readJson, MANIFEST } from './lib.mjs';

const strict = process.argv.includes('--ship');

// Folders that must be fully described in assets/manifest.json.
const TRACKED = [
  'assets/logos',
  'assets/logos-customers',
  'assets/product-ui',
  'assets/testimonials',
  'assets/badges',
  'assets/audio',
  'outcraft-teaser/public/audio',
  'outcraft-teaser/public/logos',
  // Video 2 — the engine explainer. Every video's own public/ folder has to be
  // listed here, or the ship gate silently passes a film whose assets were
  // never checked.
  'engine/public/audio',
  'engine/public/logos',
  // Video 3 — the engine explainer, ported to HyperFrames. Same 66 files as
  // video 2 plus two bundled woff2 faces: Remotion fetched its fonts from
  // Google at build time, so nothing was ever on disk to record. Now there is.
  'engine-hf/assets/audio',
  'engine-hf/assets/logos',
  'engine-hf/assets/fonts',
  // Video 4 — the B2C checkout explainer, HyperFrames. Audio and fonts copied
  // from video 3; the two customer marks come from assets/logos-customers,
  // which is what the marketing site already publishes.
  'checkout/assets/audio',
  'checkout/assets/logos',
  'checkout/assets/fonts',
];

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

const manifest = readJson(MANIFEST, { assets: [] });
const byFile = new Map(manifest.assets.map((a) => [a.file, a]));

const onDisk = TRACKED.flatMap(walk);
const missing = onDisk.filter((f) => !byFile.has(f));
const ghosts = manifest.assets.filter((a) => !existsSync(join(ROOT, a.file)));
const unknownLicence = manifest.assets.filter((a) => !a.licence || a.licence === 'unknown');
const unapproved = manifest.assets.filter((a) => a.approved_for_video !== true);
const blocked = manifest.assets.filter((a) => a.approved_for_video === false);

console.log(`files on disk:      ${onDisk.length}`);
console.log(`rows in manifest:   ${manifest.assets.length}`);
console.log(`not recorded:       ${missing.length}`);
console.log(`recorded but gone:  ${ghosts.length}`);
console.log(`licence unknown:    ${unknownLicence.length}`);
console.log(`not yet approved:   ${unapproved.length}`);
console.log(`blocked:            ${blocked.length}`);

const show = (title, rows, fmt) => {
  if (!rows.length) return;
  console.log(`\n${title}`);
  for (const r of rows.slice(0, 40)) console.log(`  ${fmt(r)}`);
  if (rows.length > 40) console.log(`  ...and ${rows.length - 40} more`);
};

show('NOT RECORDED — add a manifest row or delete the file:', missing, (f) => f);
show('RECORDED BUT GONE — file was moved or deleted:', ghosts, (a) => a.file);
show('LICENCE UNKNOWN — cannot ship these:', unknownLicence, (a) => `${a.file}  (${a.source || 'no source'})`);
show('BLOCKED — do not use:', blocked, (a) => `${a.file}  ${a.licence_note || ''}`);

const problems = missing.length + ghosts.length + unknownLicence.length;
if (problems === 0) console.log('\nEverything on disk is recorded and has a licence.');

if (strict) {
  const stoppers = problems + unapproved.length;
  if (stoppers > 0) {
    console.log(`\n--ship FAILED. ${stoppers} assets are not cleared for public use.`);
    console.log('Set "approved_for_video": true on each row you have checked.');
    process.exit(1);
  }
  console.log('\n--ship PASSED. Safe to publish.');
} else if (problems > 0) {
  process.exit(1);
}
