@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ====================================================
echo   OBJAVA CROLANDA - sve u jednom
echo ====================================================
echo.
echo   1. osvjezavam data.js iz mapa igre/ slike/ zvuk/
echo   2. dijelim na javni i placeni dio
echo   3. uploadam placeni dio u Supabase
echo   4. saljem na GitHub (stranica se osvjezi za 1-2 min)
echo.
echo   Koraci 3 i 4 MORAJU ici zajedno. Ako se objavi samo
echo   jedno, lekcije od razine 2 stanu na "Loading this unit".
echo.
pause
echo.

echo --- 1/4  data.js -----------------------------------
call node osvjezi.js
if errorlevel 1 goto :greska

echo.
echo --- 2/4  podjela sadrzaja --------------------------
call node scripts\build.js
if errorlevel 1 goto :greska

echo.
echo --- 3/4  upload u Supabase ------------------------
call node uploadaj-sadrzaj.js
if errorlevel 1 goto :greska

echo.
echo --- 4/4  GitHub -----------------------------------
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo GRESKA: ova mapa nije git repozitorij.
  goto :greska
)

git add -A
git diff --cached --quiet
if not errorlevel 1 (
  echo Nema novih promjena za GitHub - preskacem commit.
  goto :gotovo
)

set "poruka="
set /p poruka="Opis promjene (samo Enter = automatski): "
if "%poruka%"=="" set "poruka=Objava %date% %time%"

git commit -m "%poruka%"
if errorlevel 1 goto :greska

git push origin main
if errorlevel 1 (
  echo.
  echo PUSH NIJE USPIO. Pogledaj poruku iznad.
  goto :greska
)

:gotovo
echo.
echo ====================================================
echo   GOTOVO. Sadrzaj i stranica su usklaeni.
echo   Stranica se objavljuje 1-2 minute nakon ovoga.
echo ====================================================
pause
exit /b 0

:greska
echo.
echo ====================================================
echo   PREKINUTO zbog greske iznad. Nista nije objavljeno
echo   napola - popravi gresku i pokreni objavi.bat opet.
echo ====================================================
pause
exit /b 1
