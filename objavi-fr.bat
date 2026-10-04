@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ====================================================
echo   OBJAVA FRANCUSKOG TECAJA
echo ====================================================
echo   1. gradi francais\stranica (javni dio) i zasticeno\data-plus-fr.json
echo   2. uploada placeni dio u Supabase
echo   3. salje francais\stranica na GitHub (repo francais)
echo.
pause
call node francais\izgradi-fr.js
if errorlevel 1 goto :greska
call node uploadaj-sadrzaj.js data-plus-fr.json
if errorlevel 1 goto :greska
cd /d "%~dp0francais\stranica"
if not exist .git (
  git init -b main
  git remote add origin https://github.com/kristianprasnjak/francais.git
  git fetch origin main
  git reset origin/main
)
git add -A
git diff --cached --quiet
if not errorlevel 1 ( echo Nema promjena. & goto :gotovo )
git commit -m "Objava %date% %time%"
if errorlevel 1 goto :greska
git push -u origin main
if errorlevel 1 goto :greska
:gotovo
echo GOTOVO. Stranica: https://kristianprasnjak.github.io/francais/
pause
exit /b 0
:greska
echo PREKINUTO zbog greske iznad.
pause
exit /b 1
