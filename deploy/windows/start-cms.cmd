@echo off
setlocal
cd /d "%~dp0..\..\apps\cms"
set "NODE_ENV=production"
set "HOST=127.0.0.1"
set "PORT=1337"
"C:\BtSoft\nodejs\v22.23.2\node.exe" node_modules\@strapi\strapi\bin\strapi.js start
