@echo off
cd /d "%~dp0"
chcp 65001 >nul

echo ====================================================
echo   Croland lokalno  ^>  http://localhost:8000/
echo ====================================================
echo.
echo Zasto posluzitelj, a ne dvoklik na index.html:
echo   Preko file:// preglednik nema "origin", pa Supabase nakon prijave
echo   ne zna kamo te vratiti i baci te na objavljenu stranicu.
echo   http://localhost:8000 je u Supabase Redirect URLs, pa prijava
echo   ostaje ovdje i vidis svoje lokalne promjene.
echo.
echo Prekid: Ctrl+C, pa Y.
echo.

start "" "http://localhost:8000/"

where python >nul 2>&1
if %errorlevel%==0 (
  python -m http.server 8000
  goto :eof
)

where py >nul 2>&1
if %errorlevel%==0 (
  py -m http.server 8000
  goto :eof
)

where node >nul 2>&1
if %errorlevel%==0 (
  npx --yes http-server -p 8000 -c-1
  goto :eof
)

echo GRESKA: nema ni Pythona ni Node.js na ovom racunalu.
pause
