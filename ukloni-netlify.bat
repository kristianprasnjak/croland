@echo off
cd /d "%~dp0"

echo ====================================================
echo   Uklanjanje Netlify ostataka iz projekta
echo ====================================================
echo.
echo Ovo brise:
echo   netlify.toml            (git)
echo   netlify\functions\      (git)
echo   package-lock.json       (git - ovisnosti su bile samo za Netlify funkcije)
echo   .netlify\               (lokalno, ionako nije u gitu)
echo   deno.lock               (lokalno, ostatak Netlify Edge Functiona)
echo.
echo Novi backend je u supabase\functions\ i vec je na svom mjestu.
echo.
set /p potvrda="Nastaviti? (d/n): "
if /i not "%potvrda%"=="d" (
  echo Odustao.
  pause
  exit /b 0
)

echo.
echo --- git rm ---
git rm -r --quiet netlify netlify.toml package-lock.json

echo --- lokalno ---
if exist ".netlify" rmdir /s /q ".netlify"
if exist "deno.lock" del /q "deno.lock"

echo.
echo Gotovo. Provjeri sa "git status", pa posalji sa posalji-na-github.bat
echo.
pause
