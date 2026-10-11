@echo off
chcp 65001 >nul
rem Dvorac Vrana: pozadine soba, predmeti (inacice A i B) i sitnice za 04-tvrdjava.html
rem Popis: redizajn\dvorac\popis.json  -  slike idu u redizajn\dvorac\novo
rem Ponovno pokretanje preskace gotove slike i dovrsi samo ono sto fali.
rem Jedna slika ponovno:  generiraj-dvorac.bat --ponovno vaza-A
node "%~dp0redizajn\gemini.js" redizajn/dvorac/popis.json %*
pause
