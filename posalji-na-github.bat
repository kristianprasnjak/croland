@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ====================================================
echo   OVA DATOTEKA SE VISE NE KORISTI
echo ====================================================
echo.
echo   Slala je samo na GitHub, bez uploada zasticenog
echo   sadrzaja u Supabase. Zbog toga su se stranica i
echo   sadrzaj razisli i lekcije od razine 2 prestale su
echo   se ucitavati.
echo.
echo   Umjesto nje koristi:  objavi.bat
echo   (osvjezi podatke, podijeli ih, uploada u Supabase
echo    i tek onda posalje na GitHub)
echo.

set "odg="
set /p odg="Pokrenuti objavi.bat sada? (D/N): "
if /i "%odg%"=="D" goto :pokreni
if /i "%odg%"=="Y" goto :pokreni

echo.
echo   U redu, nista nije poslano.
pause
exit /b 0

:pokreni
echo.
call "%~dp0objavi.bat"
exit /b %errorlevel%
