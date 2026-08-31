#!/usr/bin/env node
// Ask research/facts.json a question instead of reading a long document.
//
//   npm run facts                      everything, grouped
//   npm run facts -- --ok              only what Seyan has approved
//   npm run facts -- --ask             only what he has never been asked about
//   npm run facts -- --risk            only rows with a warning on them
//   npm run facts -- proof             only one kind: positioning product spec pricing proof industry claim
//   npm run facts -- --stale           facts whose source page changed after we last checked
//
// Rule: what `on_screen` says is what goes on screen, word for word.

import { join } from 'node:path';
import { ROOT, readJson } from './lib.mjs';

const { facts, updated } = readJson(join(ROOT, 'research', 'facts.json'), { facts: [] });
const state = readJson(join(ROOT, 'research', 'cache', 'state.json'), { pages: {} });

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const kinds = args.filter((a) => !a.startsWith('--'));

let rows = facts;
if (kinds.length) rows = rows.filter((f) => kinds.includes(f.kind));
if (flags.has('--ok')) rows = rows.filter((f) => f.approved === true);
if (flags.has('--ask')) rows = rows.filter((f) => f.approved === null);
if (flags.has('--risk')) rows = rows.filter((f) => f.risk);
if (flags.has('--stale')) {
  rows = rows.filter((f) => {
    const page = state.pages[f.source];
    return page && page.fetched > f.checked;
  });
}

const MARK = { true: '[ok]  ', false: '[NO]  ', null: '[ask] ' };

const groups = {};
for (const f of rows) (groups[f.kind] ??= []).push(f);

console.log(`research/facts.json, updated ${updated}. Showing ${rows.length} of ${facts.length}.\n`);
for (const [kind, list] of Object.entries(groups)) {
  console.log(`== ${kind}`);
  for (const f of list) {
    console.log(`  ${MARK[String(f.approved)]}${f.on_screen}`);
    console.log(`         ${f.id}  <- research/pages/${f.source}.md  (${f.checked})`);
    if (f.risk) console.log(`         RISK: ${f.risk}`);
  }
  console.log('');
}

if (!flags.size && !kinds.length) {
  const n = (v) => facts.filter((f) => f.approved === v).length;
  console.log(`approved ${n(true)} | never asked ${n(null)} | blocked ${n(false)} | carrying a risk ${facts.filter((f) => f.risk).length}`);
}
