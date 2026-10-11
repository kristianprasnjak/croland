@echo off
chcp 65001 >nul
rem kruh se crta ponovno (prvi je ispao premalen), zatim se dovrsava cijeli set
if not exist "%~dp0redizajn\konoba-pixel\novo\kruh-A.staro*" node "%~dp0redizajn\gemini.js" redizajn/konoba-pixel/popis.json --ponovno kruh-A
node "%~dp0redizajn\gemini.js" redizajn/konoba-pixel/popis.json %*
pause
