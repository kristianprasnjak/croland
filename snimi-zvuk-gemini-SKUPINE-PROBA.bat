@echo off
cd /d "%~dp0"
rem PROBA: provjera starih snimki + 1 skupina od 20 rijeci + 3 pojedinacne (internet, mom, one), glas Kore.
rem Svaka snimka se provjerava (Flash-Lite napise sto cuje). Trosak oko 0,02 USD.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0snimi-zvuk-gemini-skupine.ps1" -Samo 1
