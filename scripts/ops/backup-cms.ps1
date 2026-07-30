param(
  [Parameter(Mandatory = $true)]
  [string]$BackupRoot,
  [string]$ProjectRoot = "",
  [string]$MySqlBin = "C:\BtSoft\mysql\MySQL8.0\bin",
  [int]$RetentionDays = 14
)

$ErrorActionPreference = "Stop"

if (-not $ProjectRoot) {
  $ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
}

if (-not [System.IO.Path]::IsPathRooted($BackupRoot)) {
  throw "BackupRoot must be an absolute path."
}

$cmsEnv = Join-Path $ProjectRoot "apps\cms\.env"
if (-not (Test-Path $cmsEnv)) {
  throw "Missing CMS environment file: $cmsEnv"
}

function Get-DotEnvValue([string]$Path, [string]$Name) {
  $prefix = "$Name="
  $line = Get-Content -LiteralPath $Path |
    Where-Object { $_.StartsWith($prefix) } |
    Select-Object -Last 1
  if ($null -eq $line) { return "" }
  $value = $line.Substring($prefix.Length)
  if (
    $value.Length -ge 2 -and (
      ($value.StartsWith('"') -and $value.EndsWith('"')) -or
      ($value.StartsWith("'") -and $value.EndsWith("'"))
    )
  ) {
    return $value.Substring(1, $value.Length - 2)
  }
  return $value
}

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$target = Join-Path $BackupRoot "hongyun-cms-$stamp"
New-Item -ItemType Directory -Force -Path $target | Out-Null

$databaseClient = Get-DotEnvValue $cmsEnv "DATABASE_CLIENT"
if ($databaseClient -ne "mysql") {
  throw "Windows production backup expects DATABASE_CLIENT=mysql."
}

$databaseHost = Get-DotEnvValue $cmsEnv "DATABASE_HOST"
$databasePort = Get-DotEnvValue $cmsEnv "DATABASE_PORT"
$databaseName = Get-DotEnvValue $cmsEnv "DATABASE_NAME"
$databaseUser = Get-DotEnvValue $cmsEnv "DATABASE_USERNAME"
$databasePassword = Get-DotEnvValue $cmsEnv "DATABASE_PASSWORD"
if (-not $databasePort) { $databasePort = "3306" }

try {
  $env:MYSQL_PWD = $databasePassword
  $dump = Join-Path $target "database.sql"
  & (Join-Path $MySqlBin "mysqldump.exe") `
    "--single-transaction" "--routines" "--triggers" "--no-tablespaces" "--set-gtid-purged=OFF" `
    "--host=$databaseHost" "--port=$databasePort" "--user=$databaseUser" `
    "--result-file=$dump" $databaseName
  if ($LASTEXITCODE -ne 0) { throw "mysqldump failed with exit code $LASTEXITCODE" }
}
finally {
  Remove-Item Env:\MYSQL_PWD -ErrorAction SilentlyContinue
}

$uploads = Join-Path $ProjectRoot "apps\cms\public\uploads"
if (Test-Path $uploads) {
  Compress-Archive -LiteralPath $uploads -DestinationPath (Join-Path $target "uploads.zip")
}

$privateUploads = Join-Path $ProjectRoot "apps\api\.private-uploads"
if (Test-Path $privateUploads) {
  Compress-Archive -LiteralPath $privateUploads -DestinationPath (Join-Path $target "private-uploads.zip")
}

Get-ChildItem -LiteralPath $target -File |
  ForEach-Object {
    $hash = Get-FileHash -Algorithm SHA256 -LiteralPath $_.FullName
    "$($hash.Hash.ToLowerInvariant())  $($_.Name)"
  } |
  Set-Content -LiteralPath (Join-Path $target "SHA256SUMS") -Encoding ASCII

Get-ChildItem -LiteralPath $BackupRoot -Directory -Filter "hongyun-cms-*" |
  Where-Object { $_.CreationTime -lt (Get-Date).AddDays(-$RetentionDays) } |
  Remove-Item -Recurse -Force

Write-Output "Backup complete: $target"
