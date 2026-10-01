@echo off
cd /d "%~dp0..\.."
chcp 65001 >nul
echo ====================================================
echo   Croland DEUTSCH (lokalna proba)  ^>  http://localhost:8001/deutsch-proba.html
echo ====================================================
echo Ne prijavljuj se u probi - napredak bi otisao na tvoj pravi racun.
echo Prekid: Ctrl+C, pa Y.
echo.
node deutsch\lokalno\osvjezi-de.js || (echo GRESKA: treba Node.js & pause & goto :eof)
start "" "http://localhost:8001/deutsch-proba.html"
where python >nul 2>&1 && (python -m http.server 8001 & goto :eof)
where py >nul 2>&1 && (py -m http.server 8001 & goto :eof)
npx --yes http-server -p 8001 -c-1
