@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ====================================================
echo   CROLAND AI TESTER - instalacija (jednom)
echo ====================================================
echo.
where node >nul 2>&1
if errorlevel 1 (
  echo GRESKA: Node.js nije instaliran. Skini ga s https://nodejs.org ^(LTS^) pa pokreni ovo opet.
  pause
  exit /b 1
)
echo --- 1/4  paketi ^(moze potrajati par minuta^) ---
call npm install
if errorlevel 1 goto :greska
echo.
echo --- 2/4  preglednik za testiranje ---
echo Koristi se Microsoft Edge koji vec imas na racunalu - nista se ne preuzima.
echo.
echo --- 3/4  prijava u Claude ---
set "CLAUDE_EXE=%~dp0node_modules\@anthropic-ai\claude-agent-sdk-win32-x64\claude.exe"
if not exist "%CLAUDE_EXE%" set "CLAUDE_EXE=%~dp0node_modules\@anthropic-ai\claude-agent-sdk-win32-arm64\claude.exe"
if not exist "%CLAUDE_EXE%" (
  echo GRESKA: nije pronaden claude.exe u node_modules.
  goto :greska
)
"%CLAUDE_EXE%" auth status 2>nul | findstr /r /c:"loggedIn.*true" >nul
if not errorlevel 1 (
  echo Vec si prijavljen.
  goto :provjera
)
echo Otvorit ce se preglednik. Prijavi se SVOJIM Claude racunom ^(Pro pretplata^).
echo Ako pita "Claude account" ili "Console", izaberi Claude account / subscription.
echo.
"%CLAUDE_EXE%" auth login --claudeai
if errorlevel 1 goto :greska
:provjera
echo.
echo --- 4/4  provjera ---
node tester.js provjera
if errorlevel 1 (
  echo.
  echo Stanje prijave:
  "%CLAUDE_EXE%" auth status
  goto :greska
)
node tester.js limiti
echo.
echo ====================================================
echo   GOTOVO. Sljedeci korak: 2-PILOT-MIKE.bat
echo ====================================================
pause
exit /b 0
:greska
echo.
echo Instalacija nije uspjela - pogledaj poruku iznad.
pause
exit /b 1
