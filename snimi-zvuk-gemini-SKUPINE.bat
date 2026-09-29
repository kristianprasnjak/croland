@echo off
cd /d "%~dp0"
rem SVE: preostale rijeci iz zvuk-gemini-nedostaje.txt - skupine od 20 + pojedinacne, glas Kore, sa provjerom.
rem Vec snimljeno se preskace. Kocnica 1,50 USD. Na dnevnom limitu stane samo - sutra pokreni ponovo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0snimi-zvuk-gemini-skupine.ps1"
