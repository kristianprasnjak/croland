"""Zamijenjeno 05.10.2026. (ES faza 0): zajednicko je sada u croland-jezici/alati/jezici_lib.py.
Ovaj modul samo prosljeduje iste funkcije, za skripte koje ga jos uvoze. Stara verzija: sucelje_lib.py.bak-faza0."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'croland-jezici', 'alati'))
from jezici_lib import js_literali, pregledi_mjesta, PREGLEDI_ENG_G  # noqa: F401
