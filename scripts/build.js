// Assembles dist/ — the only folder Netlify publishes — from an explicit allowlist of
// runtime files/folders. Anything not listed here (scratch files, source .md/.txt/.csv,
// backups, dev tooling) can never end up on the live site even by accident.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const FILES = ['index.html', 'data.js', 'rjecnik.js', 'terms.html', 'privacy.html'];
const DIRS = ['slike', 'zvuk', 'mini-igre'];

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

for (const name of FILES) {
  const src = path.join(ROOT, name);
  if (!fs.existsSync(src)) throw new Error('build: missing required file ' + name);
  fs.copyFileSync(src, path.join(DIST, name));
}

for (const name of DIRS) {
  const src = path.join(ROOT, name);
  if (!fs.existsSync(src)) throw new Error('build: missing required folder ' + name);
  fs.cpSync(src, path.join(DIST, name), { recursive: true });
}

console.log('dist/ built:', FILES.concat(DIRS).join(', '));
