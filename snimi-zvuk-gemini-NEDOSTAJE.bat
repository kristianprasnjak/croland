@echo off
cd /d "%~dp0"
rem Snima 758 rijeci iz rjecnika bez zvuka + 1 recenicu, glas Kore. Procjena ~0,40 USD, kocnica 1,50 USD.
rem Vec snimljeno se preskace - ako stane, samo ga pokreni ponovo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0snimi-zvuk-gemini.ps1" -Popis zvuk-gemini-nedostaje.txt -Glasovi Kore -MaxUSD 1.5
pause
