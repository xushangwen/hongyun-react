@echo off
setlocal
cd /d "%~dp0..\..\apps\api"
set "NODE_ENV=production"
set "NITRO_HOST=127.0.0.1"
set "NITRO_PORT=3001"
"C:\BtSoft\nodejs\v22.23.2\node.exe" --env-file=.env .output\server\index.mjs
