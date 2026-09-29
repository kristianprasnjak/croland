@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Croland AI tester - izvjestaj
node tester.js izvjestaj
pause
