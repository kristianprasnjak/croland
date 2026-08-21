@echo off
cd /d "%~dp0"

echo ====================================================
echo   Postavljanje GitHub Actions workflowa
echo ====================================================
echo.

if not exist "_deploy-workflow.yml" (
  echo GRESKA: _deploy-workflow.yml ne postoji u ovoj mapi.
  pause
  exit /b 1
)

if not exist ".github\workflows" mkdir ".github\workflows"
move /y "_deploy-workflow.yml" ".github\workflows\deploy.yml" >nul

echo Postavljeno: .github\workflows\deploy.yml
echo.
echo Jos jedno, rucno: na github.com/kristianprasnjak/croland
echo   Settings -^> Pages -^> Source = GitHub Actions
echo.
echo Bez toga Pages i dalje servira korijen repozitorija, a ne dist\.
echo.
pause
