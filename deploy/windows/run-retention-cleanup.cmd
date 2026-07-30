@echo off
setlocal
cd /d "%~dp0..\..\apps\cms"
set "NODE_ENV=production"
"C:\BtSoft\nodejs\v22.23.2\node.exe" scripts\retention-cleanup.js
