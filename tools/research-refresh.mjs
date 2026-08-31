#!/usr/bin/env node
// Re-read every page in research/sources.json through Firecrawl, and say what changed.
//
//   npm run research:refresh                 all sources
//   npm run research:refresh -- home pricing just those slugs
//   npm run research:refresh -- --map        also re-map the site, to find new pages
//
// Each page lands in research/pages/<slug>.md with a header saying the URL and the date.
// Nothing is silently overwritten without telling you what moved.

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { ROOT, need, today, readJson, writeJson } from './lib.mjs';

const KEY = need('FIRECRAWL_API_KEY');
const API = 'https://api.firecrawl.dev/v2';
const PAGES = join(ROOT, 'research', 'pages');
const STATE = join(ROOT, 'research', 'cache', 'state.json');

const args = process.argv.slice(2);
const wantMap = args.includes('--map');
const only = args.filter((a) => !a.startsWith('--'));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// The Firecrawl free plan allows about 10 requests a minute. Keep a rolling window
// well under that, so a refresh never dies half way through.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const recent = [];

async function takeSlot() {
  for (;;) {
    const now = Date.now();
    while (recent.length && now - recent[0] > WINDOW_MS) recent.shift();
    if (recent.length < MAX_PER_WINDOW) {
      recent.push(now);
      return;
    }
    await sleep(WINDOW_MS - (now - recent[0]) + 250);
  }
}

async function api(path, body, attempt = 1) {
  await takeSlot();
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));

  if (res.status === 429 && attempt <= 4) {
    const stated = Number(res.headers.get('retry-after'));
    const wait = (Number.isFinite(stated) && stated > 0 ? stated : 20 * attempt) * 1000 + 1000;
    console.log(`       rate limited, waiting ${Math.round(wait / 1000)}s...`);
    await sleep(wait);
    return api(path, body, attempt + 1);
  }
  if (!res.ok || json.success === false) {
    throw new Error(`${path} HTTP ${res.status}: ${json.error || json.message || 'unknown'}`);
  }
  return json;
}

const hash = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);

// Strips the header we add, so a date change alone never counts as a content change.
const body = (md) => md.replace(/^---\n[\s\S]*?\n---\n/, '').trim();

const { sources } = readJson(join(ROOT, 'research', 'sources.json'), { sources: [] });
const state = readJson(STATE, { pages: {} });
const todo = only.length ? sources.filter((s) => only.includes(s.slug)) : sources;

if (todo.length === 0) {
  console.error(`No sources matched. Known slugs: ${sources.map((s) => s.slug).join(', ')}`);
  process.exit(1);
}

mkdirSync(PAGES, { recursive: true });
const changed = [];
const added = [];
const failed = [];

// Free tier allows 2 concurrent requests. `takeSlot` handles the per-minute cap.
for (let i = 0; i < todo.length; i += 2) {
  await Promise.all(
    todo.slice(i, i + 2).map(async (src) => {
      try {
        const json = await api('/scrape', {
          url: src.url,
          formats: ['markdown'],
          onlyMainContent: true,
        });
        const md = (json.data?.markdown || '').trim();
        if (!md) throw new Error('empty markdown');
        // HubSpot serves 404 pages with HTTP 200, so check the body, not the status.
        // Outcraft's sitemap lists pages that no longer exist; catch them here.
        if (md.length < 600 && /^#\s*404/m.test(md)) {
          throw new Error('page is 404 (served as HTTP 200). Remove it from research/sources.json.');
        }

        const file = join(PAGES, `${src.slug}.md`);
        const before = existsSync(file) ? body(readFileSync(file, 'utf8')) : null;
        const now = hash(md);

        writeFileSync(
          file,
          `---\nslug: ${src.slug}\nurl: ${src.url}\nwhy: ${src.why}\nfetched: ${today()}\nhash: ${now}\n---\n\n${md}\n`,
        );

        state.pages[src.slug] = { url: src.url, hash: now, fetched: today(), chars: md.length };

        if (before === null) added.push(src.slug);
        else if (hash(before) !== now) {
          changed.push({ slug: src.slug, was: before.length, now: md.length });
        }
        console.log(`  ok   ${src.slug.padEnd(18)} ${md.length} chars`);
      } catch (err) {
        failed.push({ slug: src.slug, why: err.message });
        console.log(`  FAIL ${src.slug.padEnd(18)} ${err.message}`);
      }
    }),
  );
}

if (wantMap) {
  console.log('\nMapping the site for pages we do not track yet...');
  try {
    const json = await api('/map', { url: 'https://www.outcraft.ai', limit: 200 });
    const links = (json.links || []).map((l) => (typeof l === 'string' ? l : l.url));
    const known = new Set(sources.map((s) => s.url.replace(/\/$/, '')));
    const fresh = links
      .filter((u) => !u.includes('/blog/') && !u.endsWith('.xml'))
      .filter((u) => !known.has(u.replace(/\/$/, '')));
    writeJson(join(ROOT, 'research', 'cache', 'sitemap.json'), { mapped: today(), links });
    if (fresh.length) {
      console.log(`  ${fresh.length} untracked pages. Add the useful ones to research/sources.json:`);
      for (const u of fresh) console.log(`    ${u}`);
    } else {
      console.log('  Nothing new.');
    }
  } catch (err) {
    console.log(`  map FAILED: ${err.message}`);
  }
}

state.last_refresh = today();
writeJson(STATE, state);

console.log('\n--- summary ---');
console.log(`new pages:     ${added.length}${added.length ? ' -> ' + added.join(', ') : ''}`);
console.log(`changed pages: ${changed.length}`);
for (const c of changed) console.log(`  ${c.slug}: ${c.was} -> ${c.now} chars. Re-check research/facts.json.`);
console.log(`failed:        ${failed.length}${failed.length ? ' -> ' + failed.map((f) => f.slug).join(', ') : ''}`);
if (changed.length) {
  console.log('\nA page changed. Any number in research/facts.json sourced from it may be stale.');
}
if (failed.length) process.exit(1);
