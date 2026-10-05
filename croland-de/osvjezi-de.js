#!/usr/bin/env node
// Zamijenjeno 05.10.2026. (ES faza 0): alat je zajednicki za sve jezike,
// croland-jezici/alati/osvjezi-jezik.js. Ovaj omotac ga poziva s --jezik de.
// Stara verzija: osvjezi-de.js.bak-faza0.
'use strict';
const path = require('path');
const r = require('child_process').spawnSync(process.execPath,
  [path.join(__dirname, '..', 'croland-jezici', 'alati', 'osvjezi-jezik.js'), '--jezik', 'de'], { stdio: 'inherit' });
process.exit(r.status === null ? 1 : r.status);
