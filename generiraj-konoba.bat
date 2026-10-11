@echo off
chcp 65001 >nul
node "%~dp0redizajn\konoba\generiraj.js" %*
pause
