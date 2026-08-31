#!/usr/bin/env node
// Pull every image Outcraft's own marketing site uses, at the biggest size the CDN will give.
//
//   npm run assets:site            download everything new
//   npm run assets:site -- --list  show what it would do, download nothing
//   npm run assets:site -- --force re-download files we already have
//
// Why this source: these are the logos and product shots Outcraft's own marketing team
// already publishes. The crops are right, the customer logos are ones we are allowed to
// show, and the product cards carry realistic data our empty test account does not have.
//
// Run `npm run research:refresh` first. This reads research/pages/*.md.

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, today, upsertAsset } from './lib.mjs';

const PAGES = join(ROOT, 'research', 'pages');
const args = process.argv.slice(2);
const listOnly = args.includes('--list');
const force = args.includes('--force');

// Where each kind of image goes, and what we are allowed to do with it.
const RULES = [
  {
    kind: 'customer-logo',
    dir: 'assets/logos-customers',
    // Outcraft files these under a "Client logo" folder; the URL is percent-encoded.
    test: (u, alt) =>
      /client[^/]*logo/i.test(decodeURIComponent(u)) ||
      /^(pulsetto|omnisend|gothnrock|warmy|kiloverse|salesforge|humehealth|hume-health|taima)[-_]?\w*$/i.test(alt),
    licence: 'customer-mark-published-by-outcraft',
    licence_note: 'Outcraft already publishes this customer mark on its own site. Safe to reuse in Outcraft video. Do not restyle or recolour.',
  },
  {
    kind: 'integration-logo',
    dir: 'assets/logos',
    test: (u, alt) => /_logo\b/i.test(alt) || /_logo\.(png|svg|webp)$/i.test(u),
    licence: 'trademark-of-owner',
    licence_note: 'Third-party mark. Nominative use only: show it because the integration is real. Never imply endorsement, never restyle.',
  },
  {
    kind: 'product-ui',
    dir: 'assets/product-ui',
    test: (u, alt) => /(homepage|b2b|b2c)-/i.test(alt) && !/testimonial/i.test(alt),
    licence: 'outcraft-own',
    licence_note: 'Outcraft marketing asset. Free to use. Useful as reference for rebuilding the UI in React.',
  },
  {
    kind: 'testimonial',
    dir: 'assets/testimonials',
    test: (u, alt) => /testimonial/i.test(alt),
    licence: 'outcraft-own-shows-real-person',
    licence_note: 'Shows a named real person. Get their sign-off before putting their face in a video.',
  },
  {
    kind: 'badge',
    dir: 'assets/badges',
    test: (u, alt) => /g2|review|rating|award/i.test(alt),
    licence: 'third-party-badge',
    licence_note: 'G2 or similar. Badge rules apply and the score goes stale. Re-check before every publish.',
  },
];

const EXT_OF = { 'image/svg+xml': 'svg', 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' };

/** HubSpot's hs-fs CDN resizes on demand. Ask for a big width; it never upscales past the original. */
function biggest(url) {
  if (!url.includes('/hs-fs/')) return url;
  const u = new URL(url);
  u.searchParams.set('width', '2400');
  u.searchParams.delete('height');
  return u.toString();
}

const slugify = (s) =>
  decodeURIComponent(s).toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Collect every image across every scraped page, keeping the page it came from.
const found = new Map();
if (!existsSync(PAGES)) {
  console.error('No research/pages/. Run: npm run research:refresh');
  process.exit(1);
}
for (const file of readdirSync(PAGES).filter((f) => f.endsWith('.md'))) {
  const md = readFileSync(join(PAGES, file), 'utf8');
  const pageUrl = md.match(/^url:\s*(.+)$/m)?.[1] || '';
  for (const m of md.matchAll(/!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g)) {
    const [, alt, raw] = m;
    const key = raw.split('?')[0];
    if (!found.has(key)) found.set(key, { alt, raw, pages: new Set(), pageUrl });
    found.get(key).pages.add(file.replace('.md', ''));
  }
}

const plan = [];
for (const [clean, info] of found) {
  const rule = RULES.find((r) => r.test(clean, info.alt));
  if (!rule) continue;
  plan.push({ ...info, clean, rule, slug: slugify(info.alt || clean.split('/').pop()) });
}
plan.sort((a, b) => a.rule.kind.localeCompare(b.rule.kind) || a.slug.localeCompare(b.slug));

const counts = {};
for (const p of plan) counts[p.rule.kind] = (counts[p.rule.kind] || 0) + 1;
console.log(`${found.size} images seen. ${plan.length} classified:`);
for (const [k, n] of Object.entries(counts)) console.log(`  ${String(n).padStart(3)}  ${k}`);

if (listOnly) {
  console.log('\n--list, so nothing was downloaded.');
  for (const p of plan) console.log(`  ${p.rule.kind.padEnd(18)} ${p.slug}`);
  process.exit(0);
}

let saved = 0, skipped = 0, failed = 0;
for (const p of plan) {
  const dir = join(ROOT, p.rule.dir);
  mkdirSync(dir, { recursive: true });
  const already = readdirSync(dir).find((f) => f.replace(/\.[a-z0-9]+$/, '') === p.slug);
  if (already && !force) { skipped++; continue; }

  const url = biggest(p.raw);
  try {
    const res = await fetch(url);
    const mime = (res.headers.get('content-type') || '').split(';')[0].trim();
    if (!res.ok || !EXT_OF[mime]) throw new Error(`HTTP ${res.status} ${mime || 'no type'}`);
    const bytes = Buffer.from(await res.arrayBuffer());
    const file = `${p.slug}.${EXT_OF[mime]}`;
    writeFileSync(join(dir, file), bytes);

    upsertAsset({
      id: `${p.rule.kind}/${file}`,
      kind: p.rule.kind,
      file: `${p.rule.dir}/${file}`,
      format: EXT_OF[mime],
      bytes: bytes.length,
      source: 'outcraft-marketing-site',
      source_url: url,
      seen_on: [...p.pages].sort(),
      pulled: today(),
      licence: p.rule.licence,
      licence_note: p.rule.licence_note,
      approved_for_video: null,
    });
    console.log(`  ok   ${p.rule.kind.padEnd(18)} ${p.rule.dir}/${file} (${(bytes.length / 1024).toFixed(0)} KB)`);
    saved++;
  } catch (err) {
    console.log(`  FAIL ${p.rule.kind.padEnd(18)} ${p.slug}: ${err.message}`);
    failed++;
  }
}

console.log(`\nsaved ${saved}, already had ${skipped}, failed ${failed}`);
console.log('Manifest updated: assets/manifest.json');
