@echo off
chcp 65001 >nul
setlocal
pushd "%~dp0"

echo.
echo  ==========================================
echo   Croland - kompresija slika u WebP
echo  ==========================================
echo.
echo   Ulaz:   slike nekompresirano\   (originali, ne diraju se)
echo   Izlaz:  slike\                  (WebP, 512 px, kvaliteta 82)
echo.

rem --- 1. postoji li node? ---
where node >nul 2>nul
if errorlevel 1 (
  echo   GRESKA: Node.js nije pronaden.
  echo   Instalirajte ga s https://nodejs.org  pa pokrenite ovu datoteku ponovo.
  echo.
  pause
  exit /b 1
)

rem --- 2. postoji li ulazna mapa? ---
if not exist "slike nekompresirano\" (
  echo   GRESKA: nema mape "slike nekompresirano".
  echo   Preimenujte mapu s originalima u "slike nekompresirano" pa pokusajte ponovo.
  echo.
  pause
  exit /b 1
)

rem --- 3. je li sharp instaliran? ---
node -e "require('sharp')" >nul 2>nul
if errorlevel 1 (
  echo   Nedostaje paket "sharp" - instaliram ga sada.
  echo   Ovo traje minutu-dvije i radi se samo prvi put.
  echo.
  call npm install sharp
  if errorlevel 1 (
    echo.
    echo   GRESKA: instalacija paketa "sharp" nije uspjela.
    echo.
    pause
    exit /b 1
  )
  echo.
)

rem --- 4. konverzija ---
node konvertiraj-slike.js %*
if errorlevel 1 (
  echo.
  echo   GRESKA pri konverziji.
  echo.
  pause
  exit /b 1
)

rem --- 5. osvjezi data.js ---
if "%~1"=="--probno" goto kraj
if exist "osvjezi.js" (
  echo   Osvjezavam data.js ...
  node osvjezi.js
  echo.
)

:kraj
echo.
echo   Gotovo. Slike su u mapi "slike".
echo.
pause
popd
endlocal
