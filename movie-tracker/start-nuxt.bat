@echo off
cd /d "%~dp0"
echo Starting Nuxt from: %CD%
echo.
set NODE_ENV=development
node "node_modules/nuxt/bin/nuxt.mjs" dev
pause
