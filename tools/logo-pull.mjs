#!/usr/bin/env node
// Pull third-party brand logos, colours and fonts from the Brandfetch Brand API.
//
//   npm run asset:logo -- shopify.com hubspot.com
//   npm run asset:logo -- --all          every integration Outcraft lists
//   npm run asset:logo -- --refresh shopify.com   ignore the cache, ask again
//
// Gives real vector logos, light and dark, plus each brand's own colours. Far better
// than the 67x60 px copies on Outcraft's own site, which go soft at 1920x1080.
//
// QUOTA: the Brand API free tier is 100 brand lookups. Every answer is cached in
// research/cache/brandfetch/, and a cached brand costs nothing. Only --refresh spends.

import { writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, need, today, readJson, writeJson, upsertAsset } from './lib.mjs';

// A Brandfetch "starter key" is an API key for the Brand API, sent as a Bearer token.
// It is NOT the short client ID used by the logo CDN links. Different thing, different endpoint.
const KEY = need('BRANDFETCH_API_KEY', 'BRANDFETCH_CLIENT_ID');
const OUT_DIR = join(ROOT, 'assets', 'logos');
const CACHE = join(ROOT, 'research', 'cache', 'brandfetch');
const BRANDS = join(ROOT, 'assets', 'brands.json');

// The four cuts a logo wall actually needs. `logo` is the full lockup, `symbol` the mark alone.
const WANT = [
  { type: 'logo', theme: 'light' },
  { type: 'logo', theme: 'dark' },
  { type: 'symbol', theme: 'light' },
  { type: 'symbol', theme: 'dark' },
];
// Vector first. It stays sharp at any size, which is the whole point.
const FORMAT_ORDER = ['svg', 'png', 'webp', 'jpeg'];

// Every integration on outcraft.ai/integrations, as of 2026-08-30.
const ALL = [
  'salesforce.com', 'hubspot.com', 'pipedrive.com', 'attio.com', 'dynamics.microsoft.com',
  'shopify.com', 'klaviyo.com', 'omnisend.com', 'checkoutchamp.com',
  'slack.com', 'gmail.com', 'outlook.com', 'whatsapp.com', 'zendesk.com',
  'calendly.com', 'cal.com', 'chilipiper.com', 'monday.com',
  'zapier.com', 'make.com',
];

async function brand(domain, refresh) {
  mkdirSync(CACHE, { recursive: true });
  const file = join(CACHE, `${domain}.json`);
  if (!refresh && existsSync(file)) {
    const hit = readJson(file, null);
    if (hit) return { data: hit, spent: false };
  }
  const res = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
    headers: { Authorization: `Bearer ${KEY}` },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${json.message || json.error || 'unknown'}`);
  writeJson(file, json);
  return { data: json, spent: true };
}

/** Best available file for one type+theme: vector if there is one. */
function pick(logos, type, theme) {
  const entry = (logos || []).find((l) => l.type === type && l.theme === theme);
  if (!entry) return null;
  for (const fmt of FORMAT_ORDER) {
    const f = (entry.formats || []).find((x) => x.format === fmt);
    if (f) return f;
  }
  return null;
}

const args = process.argv.slice(2);
const refresh = args.includes('--refresh');
const domains = args.includes('--all') ? ALL : args.filter((a) => !a.startsWith('--'));

if (domains.length === 0) {
  console.error('Usage: npm run asset:logo -- <domain> [more...]   or   -- --all');
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
const brandBook = readJson(BRANDS, { comment: 'Colours and fonts of the brands we show. Pulled from Brandfetch. Handy when a logo wall needs each mark on its own brand colour.', updated: '', brands: {} });

let spent = 0, files = 0, missed = [];

for (const domain of domains) {
  const slug = domain.replace(/^www\./, '').split('.')[0].toLowerCase();
  let info;
  try {
    const got = await brand(domain, refresh);
    info = got.data;
    if (got.spent) spent++;
  } catch (err) {
    console.log(`\n${domain}\n  FAILED: ${err.message}`);
    missed.push(domain);
    continue;
  }

  console.log(`\n${domain}  ->  ${slug}   ${got_label(info)}`);

  brandBook.brands[slug] = {
    domain,
    name: info.name || slug,
    colors: Object.fromEntries((info.colors || []).map((c) => [c.type, c.hex])),
    fonts: Object.fromEntries((info.fonts || []).map((f) => [f.type, f.name])),
    pulled: today(),
  };

  let gotAny = false;
  for (const { type, theme } of WANT) {
    const f = pick(info.logos, type, theme);
    if (!f) { console.log(`  --   ${type}/${theme} not offered`); continue; }
    try {
      const res = await fetch(f.src);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const bytes = Buffer.from(await res.arrayBuffer());
      const name = `${slug}-${type}-${theme}.${f.format}`;
      writeFileSync(join(OUT_DIR, name), bytes);

      upsertAsset({
        id: `logo/${name}`,
        kind: 'integration-logo',
        file: `assets/logos/${name}`,
        brand: slug,
        domain,
        variant: type,
        theme,
        format: f.format,
        pixels: f.width && f.height ? `${f.width}x${f.height}` : 'vector',
        bytes: bytes.length,
        source: 'brandfetch-brand-api',
        source_url: f.src,
        pulled: today(),
        licence: 'trademark-of-owner',
        licence_note:
          'Brandfetch serves the file; it does not grant rights. The mark stays the property ' +
          'of its owner. Showing it because the integration is real (nominative use) is normally ' +
          'fine. Never restyle, recolour, or imply endorsement.',
        approved_for_video: null,
      });
      console.log(`  ok   ${type}/${theme}  ${name}  ${f.format === 'svg' ? 'vector' : f.width + 'x' + f.height}  (${(bytes.length / 1024).toFixed(1)} KB)`);
      files++;
      gotAny = true;
    } catch (err) {
      console.log(`  FAIL ${type}/${theme}: ${err.message}`);
    }
  }
  if (!gotAny) missed.push(domain);
}

brandBook.updated = today();
writeJson(BRANDS, brandBook);

function got_label(info) {
  const n = (info.logos || []).length;
  const c = (info.colors || []).length;
  return `${n} logo sets, ${c} colours`;
}

console.log(`\n${files} files written to assets/logos/`);
console.log(`brand colours and fonts: assets/brands.json`);
console.log(`manifest updated: assets/manifest.json`);
console.log(`quota spent this run: ${spent} of the 100 free brand lookups (cached lookups are free)`);
if (missed.length) {
  console.log(`\nno usable logo for: ${missed.join(', ')}`);
  process.exit(1);
}
