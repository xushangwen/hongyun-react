#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 /absolute/path/to/hongyun-cms-backup" >&2
  exit 2
fi

backup_dir="$1"
case "$backup_dir" in
  /*) ;;
  *) echo "Backup directory must be absolute" >&2; exit 2 ;;
esac

[[ -f "$backup_dir/SHA256SUMS" ]] || { echo "Missing SHA256SUMS" >&2; exit 1; }
(cd "$backup_dir" && shasum -a 256 -c SHA256SUMS)
if [[ -f "$backup_dir/data.db" ]]; then
  sqlite3 "$backup_dir/data.db" "pragma integrity_check;" | grep -qx "ok"
fi
tar -tzf "$backup_dir/uploads.tar.gz" >/dev/null
if [[ -f "$backup_dir/private-uploads.tar.gz" ]]; then
  tar -tzf "$backup_dir/private-uploads.tar.gz" >/dev/null
fi
echo "Backup verification passed: $backup_dir"
