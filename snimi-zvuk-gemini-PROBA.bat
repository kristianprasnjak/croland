@echo off
cd /d "%~dp0"
rem Proba: 16 rijeci i recenica, dva glasa (zenski Kore, muski Charon). Trosak manje od 0,05 USD.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0snimi-zvuk-gemini.ps1" -Popis zvuk-gemini-proba.txt -Glasovi Kore,Charon -MaxUSD 0.2
pause
