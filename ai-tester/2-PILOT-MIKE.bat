@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ====================================================
echo   PILOT: Mike, prva 2 dana
echo ====================================================
echo.
echo Prije pokretanja zapisi koliko pise u Claude aplikaciji:
echo   Settings - Usage - tjedni limit ^(weekly^), npr. 12 %%
echo Kad pilot zavrsi, pogledaj opet. Razlika = cijena 2 dana Mikea.
echo.
pause
node tester.js persona mike --pilot
echo.
node tester.js limiti
echo.
echo Izvjestaj: 5-OTVORI-IZVJESTAJ.bat   Nastavak testa: 3-POKRENI-MIKEA.bat
pause
