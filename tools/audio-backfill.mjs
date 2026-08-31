#!/usr/bin/env node
// Match every audio file in a video folder back to the video-shotcraft attribution table,
// and write the result into assets/manifest.json.
//
//   npm run audio:backfill
//
// research/HANDOFF.md warns that some sound files have no traceable origin. This finds
// exactly which ones, so the list stops being a vague worry and becomes a short to-do.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, posix } from 'node:path';
import { ROOT, today, upsertAsset } from './lib.mjs';

const ATTRIB = join(ROOT, '.claude', 'skills', 'video-shotcraft', 'assets', 'audio', 'ATTRIBUTION.md');
const AUDIO_DIRS = ['outcraft-teaser/public/audio'];

if (!existsSync(ATTRIB)) {
  console.error(`No attribution file at ${ATTRIB}. Is the video-shotcraft skill installed?`);
  process.exit(1);
}

// The table is written in Chinese. These are the phrases that mean "origin unknown".
const UNTRACEABLE = /无法反查|来源待考/;
const MIXKIT_FREE = /Mixkit Sound Effects Free License|Mixkit SFX Free License/;

// Rows look like: | `file.mp3` | `sfx/dir/` | name | url |   (column count varies by table)
const table = new Map();
for (const line of readFileSync(ATTRIB, 'utf8').split(/\r?\n/)) {
  if (!line.trim().startsWith('|')) continue;
  const cells = line.split('|').slice(1, -1).map((c) => c.trim());
  const name = cells[0]?.replace(/`/g, '');
  if (!name || !name.endsWith('.mp3')) continue;
  const rest = cells.slice(1).join(' | ');
  const url = rest.match(/https?:\/\/\S+/)?.[0]?.replace(/[)\s|]+$/, '') || null;
  table.set(name, {
    original: rest.replace(/https?:\/\/\S+/, '').replace(/[|·]/g, ' ').replace(/\s+/g, ' ').trim(),
    url,
    traceable: !!url && !UNTRACEABLE.test(rest),
    free: MIXKIT_FREE.test(rest) || (!!url && url.includes('mixkit.co')),
    raw: rest,
  });
}
console.log(`attribution table: ${table.size} entries`);

function walk(dir) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return [];
  const out = [];
  for (const e of readdirSync(abs, { withFileTypes: true })) {
    const rel = posix.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(rel));
    else if (/\.(mp3|wav|m4a)$/i.test(e.name)) out.push(rel);
  }
  return out;
}

const files = AUDIO_DIRS.flatMap(walk);
const unknown = [];
let matched = 0;

for (const rel of files) {
  const name = rel.split('/').pop();
  const hit = table.get(name);
  const bytes = statSync(join(ROOT, rel)).size;
  const isBed = /(^|\/)bed[-.]/i.test(rel);

  let row = {
    id: `audio/${rel.replace(/^.*public\/audio\//, '')}`,
    kind: isBed ? 'music-bed' : 'sfx',
    file: rel,
    format: name.split('.').pop(),
    bytes,
    pulled: today(),
  };

  if (isBed) {
    // Described in research/HANDOFF.md: a Mixkit tech-house drum bed, cut and time-stretched.
    row = {
      ...row,
      source: 'mixkit-tech-house-bed',
      source_url: null,
      original_name: 'tech-house drum bed, cut at 15.661s and stretched 124.5 -> 120 BPM',
      licence: 'unknown',
      licence_note:
        'HANDOFF.md says the exact Mixkit entry was never recorded. Find it in the Mixkit ' +
        'library and confirm the licence BEFORE this goes on the website.',
      approved_for_video: null,
    };
    unknown.push(rel);
  } else if (hit?.traceable && hit.free) {
    row = {
      ...row,
      source: 'mixkit',
      source_url: hit.url,
      original_name: hit.original,
      licence: 'mixkit-sfx-free',
      licence_note: 'Mixkit Sound Effects Free License. Commercial use allowed, no attribution needed.',
      approved_for_video: true,
    };
    matched++;
  } else if (hit) {
    row = {
      ...row,
      source: 'mixkit-unconfirmed',
      source_url: hit.url,
      original_name: hit.original,
      licence: 'unknown',
      licence_note: `Attribution table could not trace this file. Raw entry: ${hit.raw}`,
      approved_for_video: null,
    };
    unknown.push(rel);
  } else {
    row = {
      ...row,
      source: 'not-in-attribution-table',
      source_url: null,
      licence: 'unknown',
      licence_note: 'This filename is not in the video-shotcraft attribution table at all. Trace it or replace it.',
      approved_for_video: null,
    };
    unknown.push(rel);
  }

  upsertAsset(row);
}

console.log(`audio files:       ${files.length}`);
console.log(`cleared for use:   ${matched}`);
console.log(`NEED CHECKING:     ${unknown.length}`);
for (const u of unknown) console.log(`  ${u}`);
console.log('\nManifest updated: assets/manifest.json');
