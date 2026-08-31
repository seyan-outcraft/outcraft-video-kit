// Shared helpers for the workshop tools. No dependencies, node 22+.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Reads .env at the repo root into an object. Never throws if the file is missing. */
export function env() {
  const path = join(ROOT, '.env');
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (m) out[m[1]] = m[2].trim();
  }
  return out;
}

export function need(key, ...alsoTry) {
  const all = env();
  const value = [key, ...alsoTry].map((k) => all[k] || process.env[k]).find(Boolean);
  if (!value) {
    console.error(`\nMissing ${key}. Add it to .env at the project root.`);
    console.error(`See .env.example for where to get it.\n`);
    process.exit(1);
  }
  return value;
}

export const today = () => new Date().toISOString().slice(0, 10);

export function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function writeJson(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}

export const MANIFEST = join(ROOT, 'assets', 'manifest.json');

/** Inserts or replaces one asset row, keeping the file sorted by id. */
export function upsertAsset(row) {
  const m = readJson(MANIFEST, { updated: '', assets: [] });
  m.assets = m.assets.filter((a) => a.id !== row.id);
  m.assets.push(row);
  m.assets.sort((a, b) => a.id.localeCompare(b.id));
  m.updated = today();
  writeJson(MANIFEST, m);
  return m;
}
