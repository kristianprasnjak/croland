@echo off
cd /d "%~dp0"

echo ====================================================
echo   Slanje projekta na GitHub
echo ====================================================
echo.

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo GRESKA: ova mapa nije git repozitorij.
  pause
  exit /b 1
)

echo --- Sto se mijenja ---
git status --short
echo.

set "poruka="
set /p poruka="Opis promjene (samo Enter = automatski): "
if "%poruka%"=="" set "poruka=Azuriranje %date% %time%"

echo.
echo --- Spremam ---
git add -A
git commit -m "%poruka%"

echo.
echo --- Saljem na GitHub ---
git push origin main
if errorlevel 1 (
  echo.
  echo PUSH NIJE USPIO. Pogledaj poruku iznad.
  pause
  exit /b 1
)

echo.
echo ====================================================
echo   Gotovo. Provjeri: github.com/kristianprasnjak/croland
echo ====================================================
pause
