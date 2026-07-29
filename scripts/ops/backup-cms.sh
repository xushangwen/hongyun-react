#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 /absolute/backup/directory" >&2
  exit 2
fi

backup_root="$1"
case "$backup_root" in
  /*) ;;
  *) echo "Backup directory must be absolute" >&2; exit 2 ;;
esac

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "$script_dir/../.." && pwd)"
timestamp="$(date +%Y%m%d-%H%M%S)"
target="$backup_root/hongyun-cms-$timestamp"
mkdir -p "$target"

cms_env="$project_root/apps/cms/.env"
if [[ ! -f "$cms_env" ]]; then
  echo "Missing $cms_env" >&2
  exit 1
fi

database_client="$(awk -F= '$1=="DATABASE_CLIENT"{print $2}' "$cms_env" | tail -1)"
database_client="${database_client:-sqlite}"

if [[ "$database_client" == "sqlite" ]]; then
  sqlite3 "$project_root/apps/cms/.tmp/data.db" ".backup '$target/data.db'"
  sqlite3 "$target/data.db" "pragma integrity_check;" | grep -qx "ok"
elif [[ "$database_client" == "mysql" ]]; then
  database_host="$(awk -F= '$1=="DATABASE_HOST"{print $2}' "$cms_env" | tail -1)"
  database_port="$(awk -F= '$1=="DATABASE_PORT"{print $2}' "$cms_env" | tail -1)"
  database_name="$(awk -F= '$1=="DATABASE_NAME"{print $2}' "$cms_env" | tail -1)"
  database_user="$(awk -F= '$1=="DATABASE_USERNAME"{print $2}' "$cms_env" | tail -1)"
  database_password="$(awk -F= '$1=="DATABASE_PASSWORD"{print substr($0,index($0,\"=\")+1)}' "$cms_env" | tail -1)"
  MYSQL_PWD="$database_password" mysqldump \
    --single-transaction --routines --triggers --no-tablespaces \
    -h "$database_host" -P "${database_port:-3306}" -u "$database_user" "$database_name" \
    > "$target/database.sql"
else
  echo "Unsupported DATABASE_CLIENT=$database_client" >&2
  exit 1
fi

tar -C "$project_root/apps/cms/public" -czf "$target/uploads.tar.gz" uploads
if [[ -d "$project_root/apps/api/.private-uploads" ]]; then
  tar -C "$project_root/apps/api" -czf "$target/private-uploads.tar.gz" .private-uploads
fi
if command -v sha256sum >/dev/null 2>&1; then
  find "$target" -type f ! -name SHA256SUMS -exec sha256sum {} \; > "$target/SHA256SUMS"
else
  find "$target" -type f ! -name SHA256SUMS -exec shasum -a 256 {} \; > "$target/SHA256SUMS"
fi
echo "Backup complete: $target"
