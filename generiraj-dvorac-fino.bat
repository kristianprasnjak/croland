@echo off
chcp 65001 >nul
rem Dvorac: 15 pregrubih predmeta nanovo, na sitnijoj mrezi (inacice C i D), oko 1 $
rem Ponovno pokretanje preskace gotove slike.
node "%~dp0redizajn\gemini.js" redizajn/dvorac/popis-fino.json %*
pause
