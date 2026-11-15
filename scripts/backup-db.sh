#!/usr/bin/env bash
#
# backup-db.sh — ежедневный дамп базы Twenty CRM.
#
#   ./scripts/backup-db.sh            — снять дамп, старше KEEP_DAYS удалить
#   KEEP_DAYS=14 ./scripts/backup-db.sh
#
# Формат: custom (сжатый, восстанавливается pg_restore).
# Класть в cron:  0 2 * * * /opt/twenty-crm/repos/twenty-fork/scripts/backup-db.sh >> /var/log/twenty-backup.log 2>&1
set -euo pipefail

CONTAINER="${CONTAINER:-twenty-db-1}"
DB="${DB:-default}"
BACKUP_DIR="${BACKUP_DIR:-/opt/twenty-crm/backups}"
KEEP_DAYS="${KEEP_DAYS:-7}"
STAMP="$(date +%Y%m%d-%H%M)"
TARGET="$BACKUP_DIR/default-$STAMP.dump.gz"

mkdir -p "$BACKUP_DIR"

# Не начинаем, если места меньше гигабайта: недописанный дамп хуже отсутствия.
free_mb=$(df -Pm "$BACKUP_DIR" | awk 'NR==2 {print $4}')
if [ "$free_mb" -lt 1024 ]; then
  echo "ОШИБКА: на $(dirname "$BACKUP_DIR") свободно ${free_mb} МБ, нужно ≥ 1024" >&2
  exit 1
fi

echo "[$(date '+%F %T')] дамп $DB из $CONTAINER -> $TARGET"
docker exec "$CONTAINER" pg_dump -U postgres -d "$DB" --format=custom --no-owner \
  | gzip -1 > "$TARGET.tmp"
mv "$TARGET.tmp" "$TARGET"
echo "[$(date '+%F %T')] готово: $(du -h "$TARGET" | cut -f1)"

# Проверяем, что дамп читается, и только потом удаляем старые.
gzip -t "$TARGET" || { echo "ОШИБКА: дамп повреждён" >&2; exit 1; }

deleted=$(find "$BACKUP_DIR" -name 'default-*.dump.gz' -type f -mtime +"$KEEP_DAYS" -print -delete | wc -l)
echo "[$(date '+%F %T')] удалено старых дампов (старше $KEEP_DAYS дней): $deleted"
