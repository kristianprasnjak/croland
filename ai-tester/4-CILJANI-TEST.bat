@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ====================================================
echo   CILJANI TEST jedne cjeline
echo ====================================================
echo.
echo Primjeri: Lesson 20   Grammar 12   Test 13   Vocabulary 7   Practice 18
echo.
set "cjelina="
set /p cjelina="Koja cjelina? "
if "%cjelina%"=="" exit /b 0
set "puta="
set /p puta="Koliko puta (Enter = 1)? "
if "%puta%"=="" set "puta=1"
set "uredaj="
set /p uredaj="Laptop umjesto mobitela? (D/N, Enter = N) "
set "dodatak="
if /i "%uredaj%"=="D" set "dodatak=--laptop"
echo.
node tester.js ciljano "%cjelina%" --puta %puta% %dodatak%
echo.
echo Izvjestaj: 5-OTVORI-IZVJESTAJ.bat
pause
