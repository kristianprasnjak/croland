#!/usr/bin/env python3
"""Zamijenjeno 05.10.2026. (ES faza 0): alati su sada zajednicki za sve jezike, u
croland-jezici/alati/izvuci-sucelje.py. Ovaj omotac samo poziva novu skriptu s --jezik de, pa stare naredbe
(i upute) i dalje rade. Stara verzija: izvuci-sucelje.py.bak-faza0."""
import os, subprocess, sys
ALAT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'croland-jezici', 'alati', 'izvuci-sucelje.py')
sys.exit(subprocess.call([sys.executable, ALAT, '--jezik', 'de'] + sys.argv[1:]))
