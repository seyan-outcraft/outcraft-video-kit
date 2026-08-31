#!/usr/bin/env node
// Two checks that stop the brand kit rotting as videos multiply.
//
//   npm run brand:check    report drift and hardcoded colours
//   npm run brand:sync     copy the master kit over every video's copy
//
// 1. DRIFT. CLAUDE.md says each video folder holds its own copy of src/brand/.
//    Copies made by hand always drift. This compares them to the master.
// 2. HARDCODED COLOUR. DO-NOT-DO.md rule C: never write a hex colour in a scene.
//    Import it from src/brand/. This finds every scene that broke the rule.

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join, posix, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { ROOT } from './lib.mjs';

const MASTER = 'outcraft-teaser/src/brand';
const fix = process.argv.includes('--fix');
const hash = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 12);

function filesIn(dir) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs, { withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .sort();
}

// --- 1. drift -------------------------------------------------------------
const masterFiles = filesIn(MASTER);
if (masterFiles.length === 0) {
  console.error(`Master brand kit not found at ${MASTER}.`);
  process.exit(1);
}
const masterHash = Object.fromEntries(
  masterFiles.map((f) => [f, hash(readFileSync(join(ROOT, MASTER, f)))]),
);

// Every top-level folder that looks like a Remotion video project.
const videoDirs = readdirSync(ROOT, { withFileTypes: true })
  .filter((e) => e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules')
  .map((e) => e.name)
  .filter((d) => existsSync(join(ROOT, d, 'src', 'brand')))
  .filter((d) => posix.join(d, 'src/brand') !== MASTER);

console.log(`master:  ${MASTER}  (${masterFiles.length} files)`);
console.log(`copies:  ${videoDirs.length}${videoDirs.length ? ' -> ' + videoDirs.join(', ') : ' (none yet)'}\n`);

let drift = 0;
for (const dir of videoDirs) {
  const copy = posix.join(dir, 'src', 'brand');
  for (const f of masterFiles) {
    const target = join(ROOT, copy, f);
    const same = existsSync(target) && hash(readFileSync(target)) === masterHash[f];
    if (same) continue;
    drift++;
    const why = existsSync(target) ? 'DIFFERENT' : 'MISSING';
    console.log(`  ${why.padEnd(10)} ${copy}/${f}`);
    if (fix) {
      mkdirSync(join(ROOT, copy), { recursive: true });
      writeFileSync(target, readFileSync(join(ROOT, MASTER, f)));
      console.log(`  fixed      copied from master`);
    }
  }
  for (const f of filesIn(copy)) {
    if (!masterFiles.includes(f)) {
      drift++;
      console.log(`  EXTRA      ${copy}/${f}  (not in master. Add it to master, or delete it.)`);
    }
  }
}
if (drift === 0) console.log('  no drift.');

// --- 2. hardcoded colours -------------------------------------------------
const HEX = /#(?:[0-9a-f]{3}|[0-9a-f]{6})\b/gi;
// Black and white are structural, not brand colour. Allow them.
const ALLOWED = new Set(['#fff', '#ffffff', '#000', '#000000', '#0000', '#00000000']);

function walkSrc(dir, out = []) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return out;
  for (const e of readdirSync(abs, { withFileTypes: true })) {
    const rel = posix.join(dir, e.name);
    if (e.isDirectory()) walkSrc(rel, out);
    else if (/\.tsx?$/.test(e.name) && !rel.includes('/brand/')) out.push(rel);
  }
  return out;
}

const offenders = [];
for (const dir of [...videoDirs, 'outcraft-teaser']) {
  for (const file of walkSrc(posix.join(dir, 'src'))) {
    const lines = readFileSync(join(ROOT, file), 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const m of line.matchAll(HEX)) {
        if (ALLOWED.has(m[0].toLowerCase())) continue;
        offenders.push({ file, line: i + 1, hex: m[0], text: line.trim().slice(0, 78) });
      }
    });
  }
}

console.log(`\nhardcoded colours outside src/brand/: ${offenders.length}`);
const byFile = {};
for (const o of offenders) (byFile[o.file] ??= []).push(o);
for (const [file, rows] of Object.entries(byFile)) {
  console.log(`  ${file}  (${rows.length})`);
  for (const r of rows.slice(0, 4)) console.log(`    :${r.line}  ${r.hex}   ${r.text}`);
  if (rows.length > 4) console.log(`    ...and ${rows.length - 4} more`);
}
if (offenders.length) {
  console.log('\n  DO-NOT-DO.md rule C: import the colour from src/brand/tokens.ts instead.');
}

if (!fix && (drift > 0 || offenders.length > 0)) process.exit(1);
