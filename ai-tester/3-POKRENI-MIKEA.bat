@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Croland AI tester - Mike
echo ====================================================
echo   Mike uci hrvatski - dan po dan, dok ne odustane
echo ====================================================
echo.
echo  - Racunalo ne smije ugasiti ^(skripta ga drzi budnim dok radi^).
echo  - Kod limita sama pauzira i nastavlja kad se limit obnovi.
echo  - Mozes zatvoriti prozor kad hoces - sljedeci put nastavlja gdje je stao.
echo  - Izvjestaj se osvjezava nakon svakog dana: 5-OTVORI-IZVJESTAJ.bat
echo.
:petlja
node tester.js persona mike %*
if %errorlevel%==0 goto :kraj
if %errorlevel%==2 goto :kraj
echo.
echo Tester je stao zbog greske. Ponovno pokretanje za 60 sekundi ^(zatvori prozor za prekid^)...
timeout /t 60 >nul
goto :petlja
:kraj
echo.
pause
