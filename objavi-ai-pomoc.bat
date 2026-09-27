@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ====================================================
echo   AI POMOC - postavljanje funkcije "pomoc" u Supabase
echo ====================================================
echo.
echo   1. prenosim Gemini kljuc iz .env u Supabase (tajna)
echo   2. objavljujem funkciju "pomoc"
echo.
echo   Kljuc se ne ispisuje. Privremena datoteka se odmah brise.
echo.
pause

rem Samo GEMINI_ i AI_ retci - Stripe kljucevi iz .env su testni i NE smiju u produkciju.
findstr /b /c:"GEMINI_API_KEY=" /c:"GEMINI_MODEL=" /c:"AI_PRAVILO=" /c:"AI_DNEVNI_UKUPNO=" .env > "%TEMP%\croland-ai-tajne.env"
if errorlevel 1 (
  echo U .env nema retka GEMINI_API_KEY=...
  goto :kraj
)

echo --- 1/2  tajne -------------------------------------
call npx supabase@latest secrets set --env-file "%TEMP%\croland-ai-tajne.env"
set GRESKA=%errorlevel%
del "%TEMP%\croland-ai-tajne.env"
if not "%GRESKA%"=="0" goto :greska

echo.
echo --- 2/2  funkcija ----------------------------------
call npx supabase@latest functions deploy pomoc --use-api
if errorlevel 1 goto :greska

echo.
echo GOTOVO. Funkcija "pomoc" je objavljena.
goto :kraj

:greska
echo.
echo NESTO NIJE USPJELO - posalji sliku ovog prozora.
echo Ako pise da nisi prijavljen: pokreni  npx supabase@latest login  pa ponovo ovu datoteku.

:kraj
echo.
pause
